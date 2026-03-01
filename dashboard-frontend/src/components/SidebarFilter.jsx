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

  const [selectedPestle, setSelectedPestle] = useState([]);

  const regions = [
    { value: "Northern America", label: "Northern America" },
    { value: "Central America", label: "Central America" },
    { value: "South America", label: "South America" },
    { value: "Western Europe", label: "Western Europe" },
    { value: "Northern Europe", label: "Northern Europe" },
    { value: "Southern Europe", label: "Southern Europe" },
    { value: "Eastern Europe", label: "Eastern Europe" },
    // { value: "Europe", label: "Europe" },
    { value: "Northern Africa", label: "Northern Africa" },
    { value: "Western Africa", label: "Western Africa" },
    { value: "Central Africa", label: "Central Africa" },
    { value: "Southern Africa", label: "Southern Africa" },
    { value: "Eastern Africa", label: "Eastern Africa" },
    // { value: "Africa", label: "Africa" },
    { value: "Western Asia", label: "Western Asia" },
    { value: "Southern Asia", label: "Southern Asia" },
    { value: "Central Asia", label: "Central Asia" },
    { value: "Eastern Asia", label: "Eastern Asia" },
    { value: "South-Eastern Asia", label: "South-Eastern Asia" },
    // { value: "Asia", label: "Asia" },
    { value: "Oceania", label: "Oceania" },
    { value: "World", label: "World" },
  ];

  const allCountries = [
    //America
    {
      value: "United States of America",
      label: "United States of America",
      region: "Northern America",
    },
    { value: "Canada", label: "Canada", region: "Northern America" },

    { value: "Mexico", label: "Mexico", region: "Central America" },
    { value: "Belize", label: "Belize", region: "Central America" },

    { value: "Brazil", label: "Brazil", region: "South America" },
    { value: "Colombia", label: "Colombia", region: "South America" },
    { value: "Argentina", label: "Argentina", region: "South America" },
    { value: "Venezuela", label: "Venezuela", region: "South America" },

    //Europe
    {
      value: "United Kingdom",
      label: "United Kingdom",
      region: "Northern Europe",
    },
    { value: "Russia", label: "Russia", region: "Eastern Europe" },
    {
      value: "Ukraine",
      label: "Ukraine",
      region: "Eastern Europe",
    },
    {
      value: "Estonia",
      label: "Estonia",
      region: "Eastern Europe",
    },
    {
      value: "Hungary",
      label: "Hungary",
      region: "Eastern Europe",
    },
    {
      value: "Germany",
      label: "Germany",
      region: "Western Europe",
    },
    {
      value: "Austria",
      label: "Austria",
      region: "Western Europe",
    },
    { value: "Spain", label: "Spain", region: "Southern Europe" },

    //Asia
    { value: "China", label: "China", region: "Eastern Asia" },
    { value: "Japan", label: "Japan", region: "Eastern Asia" },
    { value: "Iraq", label: "Iraq", region: "Western Asia" },
    { value: "Iran", label: "Iran", region: "Western Asia" },
    { value: "Kuwait", label: "Kuwait", region: "Western Asia" },
    {
      value: "Saudi Arabia",
      label: "Saudi Arabia",
      region: "Western Asia",
    },
    {
      value: "Azerbaijan",
      label: "Azerbaijan",
      region: "Western Asia",
    },
    { value: "Lebanon", label: "Lebanon", region: "Western Asia" },
    { value: "India", label: "India", region: "Southern Asia" },
    {
      value: "Indonesia",
      label: "Indonesia",
      region: "South-Eastern Asia",
    },

    //Africa
    { value: "Libya", label: "Libya", region: "Northern Africa" },
    { value: "Egypt", label: "Egypt", region: "Northern Africa" },
    { value: "Morocco", label: "Morocco", region: "Northern Africa"},

    { value: "Angola", label: "Angola", region: "Central Africa" },
    { value: "Gabon", label: "Gabon", region: "Central Africa" },
    { value: "South Sudan", label: "South Sudan", region: "Central Africa"},

    { value: "Mali, Niger", label: "Mali, Niger", region: "Western Africa"},

    { value: "Burkina Faso", label: "Burkina Faso", region: "Western Africa"},
    { value: "Nigeria", label: "Nigeria", region: "Western Africa"},
    { value: "South Africa", label: "South Africa", region: "Southern Africa"},
    
    //Australia
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
  const availableCountries = allCountries.filter(
    (country) => country.region === selectedRegion?.value,
  );

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

  const makeCheckboxFalse = (pestle) => {
    pestle.length >= 1 && pestle.forEach((item) => (item.isChecked = false));
    setSelectedPestle([]);
  };

  const handleResetFilters = () => {
    setDateRange({ min: 2016, max: 2050 });
    setSelectedRegion(null);
    setSelectedCountry([]);
    setSelectedSector([]);
    setSelectedTopic([]);
    setSelectedPestle([]);
    //make checkbox as false
    makeCheckboxFalse(selectedPestle);
  };

  useEffect(() => {
    if (onFilterChange) {
      // Package all the current filter states into one object
      console.log("Pestle :: ", selectedPestle);
      const currentFilters = {
        // end_year: dateRange.max,
        region: selectedRegion ? selectedRegion.value : null,
        // react-select multi returns an array of objects, we map it to just the strings
        country: selectedCountry ? selectedCountry.map((c) => c.value) : null,
        // Assuming you add state for these later:
        sector: selectedSector ? selectedSector?.map((s) => s.value) : null,
        topic: selectedTopic ? selectedTopic?.map((t) => t.value) : null,
        pestle: selectedPestle ? selectedPestle?.map((p) => p.name) : null,
      };
      // Send it to the parent
      onFilterChange(currentFilters);
    }
  }, [
    dateRange,
    selectedRegion,
    selectedCountry,
    selectedSector,
    selectedTopic,
    selectedPestle,
  ]);

  return (
    <div className=" w-64 p-2 overflow-y-auto text-white rounded-lg bg-slate-800">
      <div className="bg-blue-800 rounded-lg flex justify-between p-2 z-20">
        <p className="text-slate-200 font-semibold">Filters</p>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="cursor-pointer"
        >
          <span
            className={`transition-transform text-slate-300 inline-block duration-300 ${showFilter ? "rotate-180" : "rotate-0"}`}
          >
            ▼
          </span>
        </button>
      </div>
      {
        <div
          className={` transition-all flex flex-col gap-5 duration-500 ease-in-out overflow-hidden ${showFilter ? "opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col mt-2">
            <div className="">
              <DateRangeSlider
                minYear={2016}
                maxYear={2050}
                onChange={handleDateChange}
              />
              {/* <div className=" text-white text-sm">
                Selected Range: {dateRange.min} - {dateRange.max}
              </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold">Region</label>
            <Select
              className="text-black"
              options={regions}
              value={selectedRegion}
              onChange={handleRegionChange}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold">Country</label>
            <Select
              className="text-black"
              options={availableCountries}
              value={selectedCountry}
              onChange={handleCountryChange}
              isMulti
              isSearchable
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold">Sector</label>
            <Select
              className="text-black"
              options={sectors}
              value={selectedSector}
              onChange={handleSectorChange}
              isMulti
              isSearchable
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold">Topic</label>
            <Select
              className="text-black"
              options={topics}
              value={selectedTopic}
              onChange={handleTopicChange}
              isMulti
              isSearchable
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold">Pestle</label>
            <MultipleCheckBox
              items={pestleList}
              selectedPestle={selectedPestle}
              setSelectedPestle={setSelectedPestle}
            />
          </div>

          <button
            onClick={handleResetFilters}
            className="w-full mt-4 bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      }
    </div>
  );
};

export default SidebarFilter;
