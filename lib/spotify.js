import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
   'user-read-email',
   'playlist-read-private',
   'playlist-read-collaborative',
   'streaming',
   'user-read-private',
   'user-library-read',
   'user-top-read',
   //  'user-library-modify',
   'user-read-playback-state',
   'user-modify-playback-state',
   'user-read-currently-playing',
   'user-read-recently-played',
   'user-follow-read',
   'user-read-playback-position',
   'user-read-recently-played',
   'user-read-currently-playing',
].join(',');

const params = {
   scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const Login_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
   clientId: process.env.SPOTIFY_CLIENT_ID,
   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyAPI;

export { Login_URL };
