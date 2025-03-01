import { atomWithStorage } from "jotai/utils";

export const carSelectionAtom = atomWithStorage("carSelection", {
  carBrand: "",
  carModel: "",
  fuelType: "",
  transmission: "",
  carSelectionId: null
});
