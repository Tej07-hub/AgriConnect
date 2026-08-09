import { Outlet } from "react-router-dom";
import Sidebar from "../../components/retailer/Sidebar";
import Topbar from "../../components/retailer/Topbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Dashboard;


