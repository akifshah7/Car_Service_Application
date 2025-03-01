import { useLocation } from "react-router";
import { signOutUser } from "../../features/auth/auth.service";

const Navbar = () => {
  const location = useLocation();

  const userSignout = () => {
    signOutUser();
    window.location.href = "/";
  };

  const routeToBookingsPage = () => {
    window.location.href = "/view-bookings";
  };

  const routeToCarSelection = () => {
    window.location.href = "/car-selection";
  };

  const getHeading = () => {
    switch (location.pathname) {
      case "/":
        return "Car Service App";
      case "/car-selection":
        return "Car Selection";
      case "/service-selection":
        return "Service Selection";
      case "/view-bookings":
        return "My Bookings";
      default:
        return "My App";
    }
  };

  return (
    <nav className="bg-blue-500 flex justify-center items-center p-2 w-full h-16 relative">
      <h1 className="text-white text-2xl">{getHeading()}</h1>

      {/* Show the menu only if the path is NOT "/" */}
      {location.pathname !== "/" && (
        <div className="dropdown dropdown-end absolute right-4">
          <label tabIndex="0" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
          >
            <li onClick={userSignout}>
              <a>Logout</a>
            </li>
            <li onClick={routeToBookingsPage}>
              <a>View Bookings</a>
            </li>
            <li onClick={routeToCarSelection}>
              <a>Car Selection</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
