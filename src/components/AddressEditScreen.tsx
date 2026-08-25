import React, { useState } from "react";
import { Header } from "./FormHeader";
import { CTA } from "./CTA";
import { OptionPickerSheet } from "./OptionPickerSheet";
import { UserAddress } from "../data/user";

interface AddressEditScreenProps {
  address: UserAddress;
  onSave: (address: UserAddress) => void;
  onBack: () => void;
}

type PickerField = "city" | "district" | "neighborhood" | null;

// Mock geo hierarchy — this prototype has no real geocoding/places API, so
// each level's options are keyed off the parent level actually selected.
const CITIES = ["Milan", "Rome", "Turin", "Naples", "Bologna", "Florence"];

const DISTRICTS_BY_CITY: Record<string, string[]> = {
  Milan: ["Milan", "Sesto San Giovanni", "Monza"],
  Rome: ["Rome", "Fiumicino", "Guidonia Montecelio"],
  Turin: ["Turin", "Moncalieri", "Collegno"],
  Naples: ["Naples", "Pozzuoli", "Casoria"],
  Bologna: ["Bologna", "Casalecchio di Reno", "Imola"],
  Florence: ["Florence", "Fiesole", "Scandicci"],
};

const NEIGHBORHOODS_BY_DISTRICT: Record<string, string[]> = {
  Milan: ["Brera", "Navigli", "Isola"],
  "Sesto San Giovanni": ["Centro", "Rondò"],
  Monza: ["Centro", "San Fruttuoso"],
  Rome: ["Trastevere", "Monti", "EUR"],
  Fiumicino: ["Centro", "Isola Sacra"],
  "Guidonia Montecelio": ["Guidonia", "Montecelio"],
  Turin: ["Centro", "San Salvario", "Crocetta"],
  Moncalieri: ["Centro", "Borgo San Pietro"],
  Collegno: ["Centro", "Leumann"],
  Naples: ["Vomero", "Chiaia", "Centro Storico"],
  Pozzuoli: ["Centro", "Arco Felice"],
  Casoria: ["Centro"],
  Bologna: ["Centro", "Santo Stefano", "Navile"],
  "Casalecchio di Reno": ["Centro"],
  Imola: ["Centro"],
  Florence: ["Centro Storico", "Oltrarno", "Campo di Marte"],
  Fiesole: ["Centro"],
  Scandicci: ["Centro"],
};

interface AddressPickerRowProps {
  label: string;
  value: string;
  onOpen: () => void;
}

const AddressPickerRow: React.FC<AddressPickerRowProps> = ({ label, value, onOpen }) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-semibold text-[#0e0f11]">{label}</label>
    <button
      type="button"
      onClick={onOpen}
      className="w-full h-14 flex items-center justify-between px-4 border border-[#b8c0ca] rounded-lg text-left"
    >
      <span className="text-base text-[#0e0f11] truncate">{value}</span>
      <img src="/icons/ChevronDown.svg" alt="" className="w-3 h-[7px] shrink-0" />
    </button>
  </div>
);

export const AddressEditScreen: React.FC<AddressEditScreenProps> = ({
  address,
  onSave,
  onBack,
}) => {
  const [city, setCity] = useState(address.city);
  const [district, setDistrict] = useState(address.district);
  const [neighborhood, setNeighborhood] = useState(address.neighborhood);
  const [locationDenied, setLocationDenied] = useState(false);
  const [openPicker, setOpenPicker] = useState<PickerField>(null);

  const districtOptions = DISTRICTS_BY_CITY[city] ?? [district].filter(Boolean);
  const neighborhoodOptions =
    NEIGHBORHOODS_BY_DISTRICT[district] ?? [neighborhood].filter(Boolean);

  const isValid = city.trim().length > 0 && district.trim().length > 0;

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        // Prototype: no real geocoding API — resolve to the mock user's own city.
        setLocationDenied(false);
        setCity("Milan");
        setDistrict("Milan");
        setNeighborhood("Milan");
      },
      () => setLocationDenied(true)
    );
  };

  const handleSelectCity = (value: string) => {
    setCity(value);
    const firstDistrict = DISTRICTS_BY_CITY[value]?.[0] ?? "";
    setDistrict(firstDistrict);
    setNeighborhood(NEIGHBORHOODS_BY_DISTRICT[firstDistrict]?.[0] ?? "");
    setOpenPicker(null);
  };

  const handleSelectDistrict = (value: string) => {
    setDistrict(value);
    setNeighborhood(NEIGHBORHOODS_BY_DISTRICT[value]?.[0] ?? "");
    setOpenPicker(null);
  };

  const handleSelectNeighborhood = (value: string) => {
    setNeighborhood(value);
    setOpenPicker(null);
  };

  const handleSave = () => {
    if (!isValid) return;
    onSave({ city: city.trim(), district: district.trim(), neighborhood: neighborhood.trim() });
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      <Header title="Address" onBackClick={onBack} showCloseButton={false} />

      <div className="flex flex-col flex-grow pb-28">
        <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Your location
          </h2>
          <p className="text-sm text-[#6a7482]">
            Use the location button to autofill your address or manually
            select it below. Changes won't affect your active requests but
            will apply to new requests.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-5">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="w-full flex items-center justify-center gap-2 bg-[#e8f0fe] text-[#0b57d0] font-semibold rounded-lg px-4 py-3"
          >
            <img src="/icons/LocationPin.svg" alt="" className="w-4 h-4" />
            Use my location
          </button>

          <AddressPickerRow label="City" value={city} onOpen={() => setOpenPicker("city")} />
          <AddressPickerRow
            label="District"
            value={district}
            onOpen={() => setOpenPicker("district")}
          />
          <AddressPickerRow
            label="Neighborhood"
            value={neighborhood}
            onOpen={() => setOpenPicker("neighborhood")}
          />

          {locationDenied && (
            <div className="bg-[#fdecea] rounded-lg p-3 flex flex-col gap-1">
              <p className="text-sm font-semibold text-[#e1590e]">
                Location access denied
              </p>
              <p className="text-sm text-[#e1590e]">
                You didn't provide access to your location. Please check
                your settings to share it.
              </p>
            </div>
          )}
        </div>
      </div>

      <CTA onClick={handleSave} disabled={!isValid}>
        Save
      </CTA>

      {openPicker === "city" && (
        <OptionPickerSheet
          title="Choose a city"
          options={CITIES}
          selected={city}
          onSelect={handleSelectCity}
          onClose={() => setOpenPicker(null)}
        />
      )}
      {openPicker === "district" && (
        <OptionPickerSheet
          title="Choose a district"
          options={districtOptions}
          selected={district}
          onSelect={handleSelectDistrict}
          onClose={() => setOpenPicker(null)}
        />
      )}
      {openPicker === "neighborhood" && (
        <OptionPickerSheet
          title="Choose a neighborhood"
          options={neighborhoodOptions}
          selected={neighborhood}
          onSelect={handleSelectNeighborhood}
          onClose={() => setOpenPicker(null)}
        />
      )}
    </div>
  );
};
