import { useEffect, useRef, useState } from "react";
import DateRangeSlider from "../utils/DateRangeSlider";
import Select from "react-select";
import MultipleCheckBox from "../utils/MultipleCheckBox";

const SidebarFilter = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState({ min: "2016", max: "2050" });
  const [showFilter, setShowFilter] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);

  const [selectedPestle,setSelectedPestle] = useState([]);

  const regions = [
    { value: "Northern America", label: "Northern America" },
    { value: "Central America", label: "Central America" },
    { value: "South America", label: "South America" },
    { value: "Western Europe", label: "Western Europe" },
    { value: "Northern Europe", label: "Northern Europe" },
    { value: "Southern Europe", label: "Southern Europe" },
    { value: "Eastern Europe", label: "Eastern Europe" },
    { value: "Europe", label: "Europe" },
    { value: "Northern Africa", label: "Northern Africa" },
    { value: "Western Africa", label: "Western Africa" },
    { value: "Central Africa", label: "Central Africa" },
    { value: "Southern Africa", label: "Southern Africa" },
    { value: "Africa", label: "Africa" },
    { value: "Western Asia", label: "Western Asia" },
    { value: "Southern Asia", label: "Southern Asia" },
    { value: "Central Asia", label: "Central Asia" },
    { value: "Eastern Asia", label: "Eastern Asia" },
    { value: "South-Eastern Asia", label: "South-Eastern Asia" },
    { value: "Asia", label: "Asia" },
    { value: "Oceania", label: "Oceania" },
    { value: "World", label: "World" },
  ];

  const allCountries = [
    {
      value: "United States of America",
      label: "United States of America",
      region: "Northern America",
    },
    { value: "Canada", label: "Canada", region: "Northern America" },
    { value: "Mexico", label: "Mexico", region: "Central America" },
    { value: "Brazil", label: "Brazil", region: "South America" },
    { value: "Colombia", label: "Colombia", region: "South America" },
    { value: "Argentina", label: "Argentina", region: "South America" },
    { value: "Venezuela", label: "Venezuela", region: "South America" },

    { value: "Russia", label: "Russia", region: "Europe" || "Eastern Europe" },
    {
      value: "Ukraine",
      label: "Ukraine",
      region: "Europe" || "Eastern Europe",
    },
    {
      value: "United Kingdom",
      label: "United Kingdom",
      region: "Europe" || "Northern Europe",
    },
    {
      value: "Germany",
      label: "Germany",
      region: "Europe" || "Western Europe",
    },
    {
      value: "Estonia",
      label: "Estonia",
      region: "Europe" || "Eastern Europe",
    },
    {
      value: "Austria",
      label: "Austria",
      region: "Europe" || "Western Europe",
    },
    { value: "Spain", label: "Spain", region: "Europe" || "Southern Europe" },
    {
      value: "Hungary",
      label: "Hungary",
      region: "Europe" || "Eastern Europe",
    },

    {
      value: "Saudi Arabia",
      label: "Saudi Arabia",
      region: "Asia" || "Western Asia",
    },
    { value: "Lebanon", label: "Lebanon", region: "Asia" || "Western Asia" },
    { value: "India", label: "India", region: "Asia" || "Southern Asia" },
    {
      value: "Azerbaijan",
      label: "Azerbaijan",
      region: "Asia" || "Western Asia",
    },
    {
      value: "Indonesia",
      label: "Indonesia",
      region: "Asia" || "South-Eastern Asia",
    },
    { value: "Iraq", label: "Iraq", region: "Asia" || "Western Asia" },
    { value: "Iran", label: "Iran", region: "Asia" || "Western Asia" },
    { value: "China", label: "China", region: "Asia" || "Eastern Asia" },
    { value: "Japan", label: "Japan", region: "Asia" || "Eastern Asia" },
    { value: "Kuwait", label: "Kuwait", region: "Asia" || "Western Asia" },

    {
      value: "Nigeria",
      label: "Nigeria",
      region: "Africa" || "Western Africa",
    },
    { value: "Angola", label: "Angola", region: "Africa" || "Central Africa" },
    { value: "Egypt", label: "Egypt", region: "Africa" || "Northern Africa" },
    {
      value: "South Africa",
      label: "South Africa",
      region: "Africa" || "Southern Africa",
    },
    {
      value: "Mali, Niger",
      label: "Mali, Niger",
      region: "Africa" || "Western Africa",
    },
    { value: "Libya", label: "Libya", region: "Africa" || "Northern Africa" },
    {
      value: "Burkina Faso",
      label: "Burkina Faso",
      region: "Africa" || "Western Africa",
    },
    {
      value: "South Sudan",
      label: "South Sudan",
      region: "Africa" || "Central Africa",
    },
    {
      value: "Morocco",
      label: "Morocco",
      region: "Africa" || "Northern Africa",
    },

    { value: "Australia", label: "Australia", region: "Oceania" },
  ];

  const sectors = [
    { value: "Energy", label: "Energy" },
    { value: "Environment", label: "Environment" },
    { value: "Government", label: "Government" },
    { value: "Aerospace & defence", label: "Aerospace & defence" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
    { value: "Financial services", label: "Financial services" },
    { value: "Support services", label: "Support services" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Food & agriculture", label: "Food & agriculture" },
    { value: "Automotive", label: "Automotive" },
    { value: "Tourism & hospitality", label: "Tourism & hospitality" },
    { value: "Construction", label: "Construction" },
  ];

  const topics = [
    { value: "gas", label: "gas" },
    { value: "oil", label: "oil" },
    { value: "consumption", label: "consumption" },
    { value: "market", label: "market" },
    { value: "gdp", label: "gdp" },
    { value: "war", label: "war" },
    { value: "production", label: "production" },
    { value: "export", label: "export" },
    { value: "battery", label: "battery" },
    { value: "biofuel", label: "biofuel" },
    { value: "policy", label: "policy" },
    { value: "economy", label: "economy" },
    { value: "strategy", label: "strategy" },
    { value: "robot", label: "robot" },
    { value: "growth", label: "growth" },
    { value: "economic", label: "economic" },
    { value: "energy", label: "energy" },
    { value: "unemployment", label: "unemployment" },
    { value: "trade", label: "trade" },
    { value: "demand", label: "demand" },
    { value: "economic growth", label: "economic growth" },
    { value: "industry", label: "industry" },
    { value: "capital", label: "capital" },
    { value: "food", label: "food" },
    { value: "worker", label: "worker" },
    { value: "tourist", label: "tourist" },
    {
      value: "artificial intelligence",
      label: "artificial intelligence",
    },
    { value: "climate", label: "climate" },
    { value: "power", label: "power" },
    { value: "crisis", label: "crisis" },
    { value: "transport", label: "transport" },
    { value: "vehicle", label: "vehicle" },
    { value: "peak oil", label: "peak oil" },
    { value: "ice, coal", label: "ice, coal" },
    { value: "business", label: "business" },
    { value: "finance", label: "finance" },
    { value: "work", label: "work" },
    { value: "gamification", label: "gamification" },
    { value: "inflation", label: "inflation" },
    { value: "asylum", label: "asylum" },
    { value: "interest rate", label: "interest rate" },
    { value: "risk", label: "risk" },
    { value: "car", label: "car" },
    { value: "gasoline", label: "gasoline" },
    { value: "plastic", label: "plastic" },
    { value: "electricity", label: "electricity" },
    { value: "bank", label: "bank" },
    { value: "population", label: "population" },
    { value: "money", label: "money" },
    { value: "technology", label: "technology" },
    { value: "aquaculture", label: "aquaculture" },
    { value: "tension", label: "tension" },
    { value: "terrorism", label: "terrorism" },
  ];

  const pestleList = [
    "Industries",
    "Environmental",
    "Economic",
    "Political",
    "Technological",
    "Organization",
    "Healthcare",
    "Social",
    "Lifestyles",
  ];

  //if selectedRegion not world then show filter out by regions , if world , show all
  const availableCountries =
    selectedRegion && selectedRegion.value !== "World"
      ? allCountries.filter(
          (country) => country.region === selectedRegion.value,
        )
      : allCountries;

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const handleRegionChange = (choice) => {
    setSelectedRegion(choice);

    setSelectedCountry([]); //for new set of countries
  };

  const handleCountryChange = (choices) => {
    setSelectedCountry(choices);
  };

  const handleSectorChange = (choices) => {
    setSelectedSector(choices);
  };

  const handleTopicChange = (choices) => {
    setSelectedTopic(choices);
  };

  const handleResetFilters = () => {
    setDateRange({ min: 2016, max: 2050 });
    setSelectedRegion(null);
    setSelectedCountry([]);
    setSelectedSector(null);
    setSelectedTopic(null);
  };

  useEffect(() => {
    if (onFilterChange) {
      // Package all the current filter states into one object
      const currentFilters = {
        dateRange: dateRange,
        region: selectedRegion ? selectedRegion.value : null,
        // react-select multi returns an array of objects, we map it to just the strings
        countries: selectedCountry ? selectedCountry.map((c) => c.value) : [],
        // Assuming you add state for these later:
        sectors: selectedSector.map((s) => s.value),
        topics: selectedTopic.map((t) => t.value),
      };

      // Send it to the parent
      onFilterChange(currentFilters);
    }
  }, [dateRange, selectedRegion, selectedCountry]);

  return (
    <div className="bg-red-600 w-64 p-2 overflow-y-scroll">
      <div className="bg-cyan-300 flex justify-between p-2 z-20">
        <p>Filters</p>{" "}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="cursor-pointer"
        >
          <span
            className={`transition-transform inline-block duration-300 ${showFilter ? "rotate-180" : "rotate-0"}`}
          >
            ▼
          </span>
        </button>
      </div>
      {
        <div
          className={` transition-all duration-500 ease-in-out overflow-hidden ${showFilter ? "opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col mt-2">
            <div className="bg-purple-400">
              <DateRangeSlider
                minYear={2016}
                maxYear={2050}
                onChange={handleDateChange}
              />
              <div className=" text-white">
                Current Selected Range: {dateRange.min} - {dateRange.max}
              </div>
            </div>
          </div>
          <div>
            <label>Region</label>
            <Select
              options={regions}
              value={selectedRegion}
              onChange={handleRegionChange}
            />
          </div>
          <div>
            <label>Country</label>
            <Select
              options={availableCountries}
              value={selectedCountry}
              onChange={handleCountryChange}
              isMulti
              isSearchable
            />
          </div>
          <div>
            <label>Sector</label>
            <Select
              options={sectors}
              value={selectedSector}
              onChange={handleSectorChange}
              isMulti
              isSearchable
            />
          </div>
          <div className="">
            <label>Topic</label>
            <Select
              className=""
              options={topics}
              value={selectedTopic}
              onChange={handleTopicChange}
              isMulti
              isSearchable
            />
          </div>
          <div>
            <label>Pestle</label>
            <MultipleCheckBox items={pestleList} selectedPestle={selectedPestle} setSelectedPestle={setSelectedPestle}  />
          </div>

          <button
            onClick={handleResetFilters}
            className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      }
    </div>
  );
};

export default SidebarFilter;
