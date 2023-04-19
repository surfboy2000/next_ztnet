import Head from "next/head";
import type { ReactElement } from "react";
import { LayoutAuthenticated } from "~/components/layouts/layout";
import type { NextPageWithLayout } from "../_app";
import { globalSiteTitle } from "~/utils/global";

const Dashboard: NextPageWithLayout = () => {
  const title = `${globalSiteTitle} - Dashboard`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="UAV vpn dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-10">
        <div className="mx-auto max-w-6xl space-y-10 bg-cover bg-center bg-no-repeat">
          {/* <div className="absolute inset-0 z-0">test </div> */}
          <div className="col-start-2 mx-0 flex justify-center text-5xl">
            欢迎来到 {globalSiteTitle}
          </div>
          {/* grid with cards  */}
          <div className="grid grid-flow-col gap-3">
            <div className="card w-96 bg-primary shadow-xl">
              <div className="card-body">
                <h2 className="card-title">成员</h2>
                <p>
                  任何地点、任何形式，Next ZTnet为企业和个人在本地、
                  云、桌面和移动设备 之间创建安全网络
                </p>
              </div>
            </div>
            <div className="card w-96 bg-primary shadow-xl">
              <div className="card-body">
                <h2 className="card-title">任何地点</h2>
                <p>
                  安全连接无处不在: Next ZTnet全球网络
                  解决方案
                </p>
              </div>
            </div>
            <div className="card w-96 bg-primary shadow-xl">
              <div className="card-body">
                <h2 className="card-title">无限可能</h2>
                <p>随时随地实现无缝连接</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;

// export const getServerSideProps = (context) =>
//   ProtectedPageRoute(context, null, async () => {
//     // fetch props
//     return {
//       props: {},
//     };
//   });
