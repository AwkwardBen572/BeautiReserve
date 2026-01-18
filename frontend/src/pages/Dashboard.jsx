import "./Dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const overviewItems = ["Next Appointment", "Loyalty Points", "Total Appointments"];

  if (loading) {
    return <div className="dashboard_main_holder">Loading...</div>;
  }

  return (
    <div className="dashboard_main_holder flex_column font_1">
      <div className="dashboard_greeting_holder flex_row flex">
        <div className="dashboard_greeting flex_row font_size color_white">
          Hello, {user.fullName}
        </div>
      </div>

      <div className="dashboard_info_holder flex_column">
        <div className="dashboard_info_overview_holder flex_column">
          <div className="dashboard_info_overview_heading_holder color_green flex_column font_size_s">
            Overview
          </div>
          <div className="dashboard_info_tile_holder flex_row">
            {overviewItems.map((overviewItem, index) => (
              <div
                key={index}
                className="dashboard_info_tile flex_column color_green font_size_s"
              >
                <div className="dashboard_info_tile_heading flex_column">
                  {overviewItem}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;