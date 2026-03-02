import TrendLineChart from "./D3Components/TrendLineChart";

const Dashboard = ({data,setDateRange, dateRange}) => {
  return (
    // This is gemini design
    <div className="  font-sans text-slate-300 flex flex-col gap-2">
      {/* Top Row: Map (Takes up 2/3) and Line Chart (Takes up 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-100">
        <div className="lg:col-span-3 bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-lg">
          <h2 className="text-sm font-semibold mb-2 text-slate-100">
            Global Heatmap
          </h2>
          <p>Global</p>
        </div>
        <div className="bg-slate-800 lg:col-span-2 rounded-lg p-4 border border-slate-700 shadow-lg">
          <h2 className="text-sm font-semibold mb-2 text-slate-100">
            Trend Over Time
          </h2>
          <TrendLineChart data={data} setDateRange={setDateRange} dateRange={dateRange}/>
        </div>
      </div>

      {/* Bottom Row: Bar Chart and Bubble Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-60">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-lg">
          <h2 className="text-sm font-semibold mb-2 text-slate-100">
            Sector Distribution (Energy, Financial)
          </h2>
          <p>Bar chart</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-lg">
          <h2 className="text-sm font-semibold mb-2 text-slate-100">
            Risk Matrix (Likelihood vs. Intensity)
          </h2>
          <p>Bubble chart</p>
        </div>
      </div>
    </div>

    // This is my desgin //////////////
    // <div className="h-full  font-sans text-slate-300 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-1">
    //   {/* Top Row: Map (Takes up 2/3) and Line Chart (Takes up 1/3) */}
    //   <div className="lg:row-span-2 bg-slate-800 rounded-lg p-2  border border-slate-700 shadow-lg">
    //     <h2 className="text-sm font-semibold  text-slate-100">
    //       Global Heatmap
    //     </h2>
    //     <p>Global Heat</p>
    //   </div>
    //   <div className="bg-slate-800 rounded-lg border p-2  border-slate-700 shadow-lg">
    //     <h2 className="text-sm font-semibold text-slate-100">
    //       Trend Over Time
    //     </h2>
    //     <p>Trend line</p>
    //   </div>

    //   {/* Bottom Row: Bar Chart and Bubble Chart */}
    //   <div className="grid lg:grid-cols-2 lg:col-start-2 gap-1">
    //     <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 shadow-lg">
    //       <h2 className="text-sm font-semibold  text-slate-100">
    //         Sector Distribution
    //       </h2>
    //       <p>Bar chart</p>
    //     </div>
    //     <div className="bg-slate-800 rounded-lg p-1 border border-slate-700 shadow-lg">
    //       <h2 className="text-sm font-semibold  text-slate-100">
    //         Risk Matrix
    //       </h2>
    //       <p>Bubble chart</p>
    //     </div>
    //   </div>
    // </div>
    // //////////////
  );
};

export default Dashboard;
