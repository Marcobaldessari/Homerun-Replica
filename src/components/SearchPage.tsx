import React, { useState, Fragment } from "react";

interface SearchPageProps {
  onBack: () => void;
  onServiceSelect: (serviceName: string) => void;
}

const backIconImg = "/69bc3e7016a8de92b9799edcf4448eb40f3c8fe2.svg";

export const SearchPage: React.FC<SearchPageProps> = ({
  onBack,
  onServiceSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample search results
  const searchResults = [
    "Deep Cleaning",
    "Regular Cleaning",
    "Window Cleaning",
    "Carpet Cleaning",
    "Move-in/Move-out Cleaning",
    "Office Cleaning",
    "Kitchen Deep Clean",
    "Bathroom Deep Clean",
    "Post-Construction Cleanup",
    "Eco-Friendly Cleaning",
  ];

  const filteredResults = searchResults.filter((result) =>
    result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Search Header */}
      <div className="mt-2 px-4 flex items-center">
        <button
          onClick={onBack}
          className="p-3 rounded-full"
          aria-label="Go back"
        >
          <img src={backIconImg} alt="Back" className="w-4 h-4" />
        </button>
        <div className="ml-2 flex-1 relative">
          <input
            type="text"
            placeholder="E.g., painter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 text-base font-normal text-[#0e0f11] outline-none"
          />
        </div>
      </div>

      {/* Search Results Section */}
      <div className="mt-4">
        <div className="px-4 py-2">
          <p className="text-sm text-[#6a7482] font-normal">
            {searchQuery ? "Search results" : "Popular services"}
          </p>
        </div>
        <div className="w-full">
          {filteredResults.map((service, index) => (
            <Fragment key={index}>
              <div
                className="px-4 py-4 w-full cursor-pointer"
                onClick={() => onServiceSelect(service)}
              >
                <p className="text-base text-[#0e0f11] font-normal">
                  {service}
                </p>
              </div>
              {index < filteredResults.length - 1 && (
                <div className="px-4">
                  <div className="h-px bg-[#e3e5e8] w-full"></div>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {filteredResults.length === 0 && searchQuery && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-[#6a7482]">
              No services found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
