import { getProviders, signIn } from 'next-auth/react';

const Login = (props) => {
   return (
      <div className='flex flex-col justify-center min-h-screen w-full items-center bg-[#1c1c1c]'>
         <img
            className='w-52 mb-5'
            src='https://links.papareact.com/9xl'
            alt='Spotify Logo'
         />
         {Object.values(props.providers).map((provider) => (
            <div key={provider.name}>
               <button
                  className='bg-[#18D860] text-white p-5 rounded-3xl'
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
               >
                  Login with {provider.name}
               </button>
            </div>
         ))}
      </div>
   );
};

export default Login;

export const getServerSideProps = async () => {
   const providers = await getProviders();

   return {
      props: {
         providers,
      },
   };
};
