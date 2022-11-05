import SpotifyWebApi from 'spotify-web-api-node'

const scopes =[
"user-read-recently-played",
"user-read-playback-position",
"playlist-read-collaborative",
"user-read-playback-state",
"user-read-email",
"streaming",
"user-top-read",
"user-follow-read",
"user-read-currently-playing",
"user-library-read",
"playlist-read-private",
"user-read-private",
].join(',');

const params ={
    scope: scopes,
};
const queryParamString = new URLSearchParams(params);
const LOGIN_URL =
"https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,

})
export default spotifyApi;
export  {LOGIN_URL};
