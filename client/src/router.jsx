import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/components/Login";
import Navbar from "./common/components/Navbar";
import CarSelection from "./features/car-selection/components/CarSelection";
import { AuthProvider } from "./features/auth/AuthProvider";
import ServiceSelection from "./pages/ServiceSelection";
import ViewBookings from "./pages/ViewBookings";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Login />} />
        <Route path="/car-selection" element={<CarSelection />} />
        <Route path="/service-selection" element={<ServiceSelection />} />
        <Route path="/view-bookings" element={<ViewBookings />}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
