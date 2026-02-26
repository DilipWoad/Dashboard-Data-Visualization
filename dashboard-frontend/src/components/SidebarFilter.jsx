const SidebarFilter = () => {
  return (
    <div className="bg-red-600 w-50 px-2">
      <p>Filters</p>
      <div className="flex flex-col">
        <label>Date Range</label>
        <input 
        className="mx-2" 
        min={2016} 
        max={2050} 
        defaultValue={2020}
        type="range" 
        />
      </div>
      <div>Region & country</div>
      <div>Sector & Topic</div>
      <div>Pestle</div>
    </div>
  );
};

export default SidebarFilter;
