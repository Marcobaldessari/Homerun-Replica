import React, { useState } from "react";

interface SearchPageProps {
  onBack: () => void;
  onServiceSelect: (serviceName: string) => void;
}

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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {searchQuery ? `Results for "${searchQuery}"` : "Popular Services"}
        </h2>

        <div className="space-y-2">
          {filteredResults.map((result, index) => (
            <div
              key={index}
              onClick={() => onServiceSelect(result)}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-green-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium">{result}</span>
                <span className="text-green-500">→</span>
              </div>
            </div>
          ))}
        </div>

        {filteredResults.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No services found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
