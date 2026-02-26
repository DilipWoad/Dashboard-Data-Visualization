import { useState } from "react";
import DateRangeSlider from "../utils/DateRangeSlider";
import Select from "react-select";

const SidebarFilter = () => {
  const [dateRange, setDateRange] = useState({ min: "2016", max: "2050" });
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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

  const countries = [
    {
      value: "United States of America",
      label: "United States of America",
    },
    { value: "Canada", label: "Canada" },
    { value: "Mexico", label: "Mexico" },
    { value: "Brazil", label: "Brazil" },
    { value: "Colombia", label: "Colombia" },
    { value: "Argentina", label: "Argentina" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Russia", label: "Russia" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Germany", label: "Germany" },
    { value: "Estonia", label: "Estonia" },
    { value: "Austria", label: "Austria" },
    { value: "Spain", label: "Spain" },
    { value: "Hungary", label: "Hungary" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "India", label: "India" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iraq", label: "Iraq" },
    { value: "Iran", label: "Iran" },
    { value: "China", label: "China" },
    { value: "Japan", label: "Japan" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Angola", label: "Angola" },
    { value: "Egypt", label: "Egypt" },
    { value: "South Africa", label: "South Africa" },
    { value: "Mali, Niger", label: "Mali, Niger" },
    { value: "Libya", label: "Libya" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Morocco", label: "Morocco" },
    { value: "Australia", label: "Australia" },
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
  const handleDateChange = (range) => {
    setDateRange(range);
  };

  return (
    <div className="bg-red-600 w-50 px-2">
      <p>Filters</p>
      <div className="flex flex-col">
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
        <Select options={regions} />
      </div>
      <div>
        <label>Country</label>
        <Select options={countries} isMulti isSearchable />
      </div>
      <div>
        <label>Sector</label>
        <Select options={sectors} isMulti isSearchable />
      </div>
      <div className="">
        <label>Topic</label>
        <Select className="" options={topics} isMulti isSearchable />
      </div>
      <div>Pestle</div>
    </div>
  );
};

export default SidebarFilter;
