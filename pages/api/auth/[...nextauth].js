import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { Login_URL } from '../../../lib/spotify';

const refreshAccessToken = async (token) => {
   try {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);

      const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
      console.log('refreshedToken is', refreshedToken);

      return {
         ...token,
         accessToken: refreshAccessToken.access_token,
         accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify API.
         refreshedToken: refreshedToken.refresh_token ?? token.refreshToken, // if refresh_token is not returned, use the one we have.
      };
   } catch (error) {
      console.error(error);

      return {
         ...token,
         error: 'Refresh Access Token Error',
      };
   }
};

export default NextAuth({
   // Configure one or more authentication providers
   providers: [
      SpotifyProvider({
         clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
         clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
         authorization: Login_URL,
      }),
      // ...add more providers here
   ],
   secret: process.env.JWT_SECRET,
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async jwt({ token, account, user }) {
         if (account && user) {
            return {
               ...token,
               accessToken: account.access_token,
               refreshToken: account.refresh_token,
               username: account.providerAccountId,
               accessTokenExpires: account.expires_at * 1000, //Handling expiriy time in milliseconds hence * 1000
            };
         }
         //  Retuns  previous token if the access token has not expired till now.
         if (Date.now() < token.accessTokenExpires) {
            return token;
         }
         //  If access token expire then we need to generate a new one(refresh token).
         console.log(
            'Access token has been expired. Generating a new one by Refressing...'
         );
         return await refreshAccessToken(token);
      },
      async session({ session, token }) {
         session.user.accessToken = token.accessToken;
         session.user.refreshToken = token.refreshToken;
         session.user.username = token.username;

         return session;
      },
   },
});
