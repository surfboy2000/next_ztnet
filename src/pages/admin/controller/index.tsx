/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { clearConfigCache } from "prettier";
import { type ReactElement } from "react";
import { LayoutAuthenticated } from "~/components/layouts/layout";
import { api } from "~/utils/api";

const Controller = () => {
  const { data: controllerData, isLoading } =
    api.admin.getControllerStats.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { networkCount, totalMembers, controllerStatus } = controllerData;

  const { allowManagementFrom, allowTcpFallbackRelay, listeningOn } =
    controllerStatus?.config?.settings;

  const { online, tcpFallbackActive, version } = controllerStatus;

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="grid grid-cols-1 gap-5 space-y-4 pt-10 md:space-y-0 lg:grid-cols-2 xl:grid-cols-3">
          <div className="card-normal card w-60 bg-base-300 sm:w-96">
            <div className="card-body flex-grow-0">
              <h2 className="card-title flex justify-center">网络</h2>
              <p className="">网络数量： {networkCount}</p>
              <p className="">成员总数： {totalMembers}</p>
            </div>
          </div>
          <div className="card-normal card w-60 bg-base-300 sm:w-96">
            <div className="card-body">
              <h2 className="card-title flex justify-center">控制器</h2>
              <p className="">允许管理地址来自:</p>
              <ul className="list-inside list-disc">
                {allowManagementFrom.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
              <p className="">
                允许TCP中继: {allowTcpFallbackRelay ? "Yes" : "No"}
              </p>
              <p className="">监听：</p>
              <ul className="list-inside list-disc">
                {listeningOn.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-normal card w-60 bg-base-300 sm:w-96">
            <div className="card-body flex-grow-0">
              <h2 className="card-title flex justify-center">
                控制器统计
              </h2>
              <p className="">在线： {online ? "Yes" : "No"}</p>
              <p className="">
                TCP回滚激活： {tcpFallbackActive ? "Yes" : "No"}
              </p>
              <p className="">版本： {version}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Controller.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Controller;
