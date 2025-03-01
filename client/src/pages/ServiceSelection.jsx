import { useState } from "react";
import { useAtomValue } from "jotai";
import { carSelectionAtom } from "../states/carSelection";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router";
import { delay } from "../utils/delay";

const ServiceSelection = () => {
  const selectedCar = useAtomValue(carSelectionAtom);
  const [selectedService, setSelectedService] = useState("BASIC");

  const navigate = useNavigate();

  console.log(selectedService);

  const services = [
    {
      key: "BASIC",
      name: "Basic Service",
      price: 2499,
      features: [
        "Engine Oil Exchange",
        "Oil Filter Replacement",
        "Basic Inspection",
        "Interior Vacuum Cleaning",
      ],
    },
    {
      key: "COMPREHENSIVE",
      name: "Comprehensive Service",
      price: 4999,
      features: [
        "All Basic Service Items",
        "Air Filter Replacement",
        "Brake Fluid Check & Top-up",
        "Battery Health Check",
        "Complete Exterior Wash",
      ],
    },
  ];

  const createBooking = async (id) => {
    try {
      const response = await axiosClient.post(
        "http://localhost:8000/api/bookings/create/",
        {
          car_selection: selectedCar.carSelectionId,
          service_pack: id,
        },
        {
          withCredentials: true, // Ensure credentials are sent
        }
      );
      navigate("/view-bookings");
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error(
        "Error selecting car:",
        error.response?.data || error.message
      );
    }
  };

  const createServiceSelection = async () => {
    try {
      const response = await axiosClient.post(
        "http://localhost:8000/api/service-selections/create/",
        {
          service_type: selectedService,
        },
        {
          withCredentials: true, // Ensure credentials are sent
        }
      );
      await delay(2000);
      await createBooking(response.data.id);
      console.log("Car selected:", response.data);
    } catch (error) {
      console.error(
        "Error selecting car:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-100 w-full">
      {/* Car Details */}
      <div className="bg-white h-24 flex flex-col shadow-md p-2">
        <h2 className="font-semibold">Your Car</h2>
        <span>
          {`${selectedCar.carBrand} ${selectedCar.carModel} (${selectedCar.fuelType}, ${selectedCar.transmission})`}
        </span>
      </div>

      {/* Service Selection */}
      <div className="flex flex-col p-2 gap-y-4">
        <h2 className="text-xl font-bold">Select Service</h2>

        {services.map((service) => (
          <div
            key={service.key}
            className="card shadow-md p-4 rounded-xl bg-white"
          >
            <label className="label cursor-pointer flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="service"
                  className="radio radio-primary"
                  checked={selectedService === service.key}
                  onChange={() => setSelectedService(service.key)}
                />
                <span className="text-xl font-semibold text-black">
                  {service.name}
                </span>
              </div>
              <span className="text-lg font-semibold text-blue-500">
                ₹{service.price}
              </span>
            </label>

            <p className="divider my-0"></p>
            <ul className="list-disc pl-5 font-light text-sm">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Book Appointment Button */}
        <button
          onClick={createServiceSelection}
          className="btn h-16 rounded-full text-lg w-full bg-blue-500 text-white"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
