import UploadButton from "./UploadButton";
import DashboardFiles from "./DashboardFiles";

const Dashboard = () => {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My Files</h1>
        <UploadButton />
      </div>
      <DashboardFiles />
    </main>
  );
};

export default Dashboard;
