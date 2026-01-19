import "./Dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, loading, upcomingBooking, bookingSummary, bookings } = useContext(AuthContext);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  var formattedDate = "No upcoming reservations.";
  if (upcomingBooking?.bookingDate) {
    const bookingDate = new Date(upcomingBooking.bookingDate);
    const now = new Date();

    if (bookingDate > now) {
      formattedDate = formatDate(upcomingBooking.bookingDate);
    }
  }

  var loyaltyPoints = bookingSummary && bookingSummary[0] ? bookingSummary[0].loyaltyPoints : "0"
  var totalBookings = bookingSummary && bookingSummary[0] ? bookingSummary[0].totalBookings : "0"

  const overviewItems = [
    { heading: "Next Reservation", icon: <i className='fas fa-calendar-alt' style={{ fontSize: "2rem", color: "rgba(249, 216, 216)" }}></i>, info: formattedDate },
    { heading: "Loyalty Points", icon: <i className='fas fa-dollar-sign' style={{ fontSize: "2rem", color: "rgba(249, 216, 216)" }}></i>, info: loyaltyPoints },
    { heading: "All Reservations", icon: <i className='fas fa-infinity' style={{ fontSize: "2rem", color: "rgba(249, 216, 216)" }}></i>, info: totalBookings }
  ];

  const getBookingStatusLabel = (status) => {
    switch (status) {
      case "confirmed":
        return <i className='far fa-calendar-check'></i>;
      case "pending":
        return <i className='fas fa-hourglass-half'></i>;
      case "cancelled":
        return <i className='far fa-calendar-times'></i>;
      default:
        return status;
    }
  };

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
            <b><u>Overview</u></b>
          </div>
          <div className="dashboard_info_tile_holder flex_row">
            {overviewItems.map((overviewItem, index) => (
              <div
                key={index}
                className="dashboard_info_tile flex_column color_green font_size_s"
              >
                <div className="dashboard_info_tile_icon flex_column">
                  {overviewItem.icon}
                </div>
                <div className="dashboard_info_tile_heading flex_column">
                  <b><u>{overviewItem.heading}</u></b>
                </div>
                <div className="dashboard_info_tile_info flex_column">
                  {overviewItem.info}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my_reservations_holder flex_column">
          <div className="dashboard_info_overview_heading_holder color_green flex_row font_size_s">
            <div style={{ width: "80%" }}>
              <b><u>My Reservations</u></b>
            </div>
            <div style={{ width: "20%", display: "flex", flexFlow: "row nowrap", justifyContent: "flex-end" }}>
              <u>See all</u>
            </div>
          </div>
          <div className="my_reservations_tiles_holder flex_column">
            {bookings && bookings.length > 0 ? (
              bookings.slice(0, 2).map((bookingItem, index) => (
                <div key={index} className="my_reservations_tile_holder flex_row">
                  <div className="my_reservation_tile color_green">
                    <div className="my_reservation_tile_description_holder flex_column">
                      <div>{formatDate(bookingItem.bookingDate)}</div>
                      <div style={{ fontSize: "1.2rem" }}>
                        - {getBookingStatusLabel(bookingItem.bookingStatus)}
                      </div>
                    </div>
                  </div>
                  <div className="my_reservation_view_holder flex_column color_green font_size_xs">
                    <i className="fas fa-greater-than"></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_reservations color_green">
                No reservations found.
              </div>
            )}
        </div>
      </div>
    </div>
    </div >
  );
};

export default Dashboard;