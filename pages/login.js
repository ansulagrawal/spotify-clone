import { getProviders } from 'next-auth/react';

const Login = (props) => {
   return <div></div>;
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
