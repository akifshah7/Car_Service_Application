import { useState, useEffect } from "react";
import { dummyCarModels, dummyCars } from "../../../data/cars";
import axiosClient from "../../../axiosClient";
import { useSetAtom } from "jotai";
import { carSelectionAtom } from "../../../states/carSelection";
import { useNavigate } from "react-router";

const CarSelection = () => {
  const [selectedCarBrand, setSelectedCarBrand] = useState("");
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState("Petrol");
  const [selectedTransmission, setSelectedTransmission] = useState("Manual");

  const setCarSelection = useSetAtom(carSelectionAtom);

  const navigate = useNavigate();

  console.log(selectedFuelType);
  console.log(selectedTransmission);

  useEffect(() => {
    if (selectedCarBrand) {
      setSelectedCarModel("");
      const models = dummyCarModels.filter(
        (model) => model.brand === selectedCarBrand
      );
      setFilteredModels(models);
    } else {
      setFilteredModels([]);
    }
  }, [selectedCarBrand]);

  const createCarSelection = async () => {
    try {

      const response = await axiosClient.post(
        "http://localhost:8000/api/cars/car-selections/create/",
        {
          car_brand: selectedCarBrand,
          car_model: selectedCarModel,
          fuel_type: selectedFuelType,
          transmission: selectedTransmission,
        },
        {
          withCredentials: true, // Ensure credentials are sent
        }
      );
      setCarSelection({
        carBrand: selectedCarBrand,
        carModel: selectedCarModel,
        fuelType: selectedFuelType,
        transmission: selectedTransmission,
        carSelectionId: response.data.id,
      });
      navigate('/service-selection');
      console.log("Car selected:", response.data);
    } catch (error) {
      console.error(
        "Error selecting car:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="px-4 py-2 flex flex-col gap-y-4 mb-2">
      <label className="form-control w-full max-w-full">
        <div className="label mb-2">
          <span className="text-black text-lg">Select Car Brand</span>
        </div>
        <select
          value={selectedCarBrand}
          onChange={(e) => setSelectedCarBrand(e.target.value)}
          className="select bg-white select-bordered border-1 text-gray-600 border-gray-400 w-full h-12 rounded-sm"
        >
          <option value="" disabled hidden>
            Select a car brand
          </option>
          {dummyCars.map((brand) => (
            <option key={brand.id} value={brand.carName}>
              {brand.carName}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label mb-2">
          <span className="text-black text-lg">Select Car Model</span>
        </div>
        <select
          value={selectedCarModel}
          onChange={(e) => setSelectedCarModel(e.target.value)}
          className="select bg-white select-bordered border-1 text-gray-600 border-gray-400 w-full h-12 rounded-sm"
          disabled={!selectedCarBrand}
        >
          <option value="" disabled>
            {selectedCarBrand ? "Select a model" : "Select a brand first"}
          </option>
          {filteredModels.map((model) => (
            <option key={model.id} value={model.model}>
              {model.model}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label mb-2">
          <span className="text-black text-lg">Fuel Type</span>
        </div>
        <div className="flex items-center gap-x-2 w-full">
          {["Petrol", "Diesel"].map((fuel) => (
            <div
              key={fuel}
              className="card flex justify-center shadow-md w-1/2 h-18"
            >
              <div className="form-control">
                <label className="label cursor-pointer ml-2">
                  <input
                    type="radio"
                    name="fuelType"
                    className="radio radio-primary radio-lg"
                    value={fuel}
                    checked={selectedFuelType === fuel}
                    onChange={() => setSelectedFuelType(fuel)}
                  />
                  <span className="text-lg text-black">{fuel}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label mb-2">
          <span className="text-black text-lg">Transmission Type</span>
        </div>
        <div className="flex items-center gap-x-2 w-full">
          {["Manual", "Automatic"].map((transmission) => (
            <div
              key={transmission}
              className="card flex justify-center shadow-md w-1/2 h-18"
            >
              <div className="form-control">
                <label className="label cursor-pointer ml-2">
                  <input
                    type="radio"
                    name="transmission"
                    className="radio radio-primary radio-lg"
                    value={transmission}
                    checked={selectedTransmission === transmission}
                    onChange={() => setSelectedTransmission(transmission)}
                  />
                  <span className="text-lg text-black">{transmission}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </label>
      <button
        onClick={createCarSelection}
        className="w-full btn bg-blue-500 rounded-full h-16 text-xl font-semibold text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default CarSelection;
