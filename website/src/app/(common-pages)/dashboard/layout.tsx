import DashboardSidebar from "./DashboardSidebar";
import './style.dashboard.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="ps-container">
      <div className="mt-40 mb-40">
        <div className="ps-section--account crop-avatar customer-page">
          <div className="container">
            <div className="dashboard-div">
              <DashboardSidebar />
              <div className="dashboard-children">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
