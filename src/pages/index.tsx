import {
  type NextPage,
  type GetServerSideProps,
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { type User, type Session } from "next-auth";
import { getSession } from "next-auth/react";
// import { signIn } from "next-auth/react";
// import { signIn, signOut, useSession } from "next-auth/react";
import LoginForm from "~/components/loginForm";
import Link from "next/link";

const Home: NextPage<{ auth: User }> = ({ auth }) => {
  console.log(auth);
  return (
    <>
      <Head>
        <title>UAVnet</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen justify-center">
        <div
          className="relative bg-cover bg-center bg-no-repeat"
          // style='background-image: url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80);'
        >
          <div className="absolute inset-0 z-0 "></div>
          <div className="mx-0 min-h-screen justify-center sm:flex sm:flex-row">
            <h1 className="mb-3 text-5xl font-bold">uavnet</h1>
            <div className="z-10 flex  flex-col self-center p-10 sm:max-w-5xl  xl:max-w-2xl">
              <div className="hidden flex-col self-start text-white  lg:flex">
                {/* <img src="" className="mb-3" /> */}
                <h1 className="mb-3 text-5xl font-bold">Hi, Welcome Back</h1>
                {auth?.name && (
                  <h2 className="mb-3 text-center text-4xl font-bold text-slate-200">
                    {auth.name}
                  </h2>
                )}
                <p className="pr-3">
                  A VPN management for drones using the UAVcast application is a
                  powerful solution that helps drone operators securely and
                  easily manage their UAVcast VPN connections.
                </p>
              </div>
              {auth && (
                <div className="mt-10">
                  <Link href="/dashboard">
                    <button className="btn-block btn">Goto Dashboard</button>
                  </Link>
                </div>
              )}
            </div>
            {auth ? "Your are signed In" : <LoginForm />}
            {/* <RegisterForm /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

interface Props {
  auth?: Session["user"];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const session = await getSession(context);

  if (!session || !("user" in session)) {
    return { props: {} };
  }

  return {
    props: { auth: session.user },
  };
};
