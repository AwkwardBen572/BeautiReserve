import "./Dashboard.css";

const Dashboard = () => {
  const overviewItems = ["Next Appointment", "Loyalty Points", "Total Appointments"];
  return (
    <div className="dashboard_main_holder flex_column font_1">
      <div className="dashboard_greeting_holder flex_row flex">
        <div className="dashboard_greeting flex_row font_size color_white">
          Hello, Ben Collins
        </div>
      </div>
      <div className="dashboard_info_holder flex_column">
        <div className="dashboard_info_overview_holder flex_column">
          <div className="dashboard_info_overview_heading_holder color_green flex_column font_size_s">
            Overview
          </div>
          <div className="dashboard_info_tile_holder flex_row">
            {overviewItems.map((overviewItem, index) => (
              <div className="dashboard_info_tile flex_column color_green font_size_s">
                <div className="dashboard_info_tile_heading flex_column" key={index}>{overviewItem}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;