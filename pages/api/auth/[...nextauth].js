import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi , { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(){
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const{ body: refreshedToken} = await spotifyApi.refreshAccessToken();
          console.log(refreshedToken);
    return{
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshedToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)
    return{
      ...token,
      error: 'refreshAccessTokenError',
    }
  }
}
export default NextAuth({
  //secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
      async jwt({ token, account, user})
      {
        if(account&&user)
        {
          return{
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000,
            user,
          }
        }
        if(Date.now() < token.accessTokenExpires)
        {
          return token;
        }
        return await refreshAccessToken(token)
      },
      async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
  
        return session
      },

     }
  })
