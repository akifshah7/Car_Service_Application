import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosClient.get(
          "http://localhost:8000/api/bookings/",
          {
            withCredentials: true, // Ensure credentials are sent
          }
        );
        setBookings(response.data);
        console.log("Car selected:", response.data);
      } catch (error) {
        console.error(
          "Error selecting car:",
          error.response?.data || error.message
        );
      }
    };
    fetchBookings();
  }, []);
  return (
    <div className="bg-gray-100 h-[calc(100vh-4rem)] w-full flex flex-col py-4 px-6 overflow-y-auto">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="card bg-white rounded-md px-4 py-2 shadow-md border-l-8 border-blue-500 mb-4"
        >
          <section className="flex justify-between p-2 border-b-[1px] border-gray-200">
            <div className="flex flex-col gap-y-2">
              <span>{booking.service_type.toLowerCase()} Service</span>
              <span>
                {booking.car_brand} {booking.car_model} ({booking.fuel_type},{" "}
                {booking.transmission})
              </span>
            </div>
            <span>₹{booking.price}</span>
          </section>
          <section className="flex justify-between p-2">
            <span>{booking.appointment_date}</span>
            <span
              className={`badge ${
                booking.status === "pending"
                  ? "bg-red-200 text-red-500"
                  : "bg-green-200 text-green-500"
              } rounded-full`}
            >
              {booking.status}
            </span>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ViewBookings;
