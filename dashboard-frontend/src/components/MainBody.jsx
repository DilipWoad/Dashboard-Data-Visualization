import Dashboard from "./Dashboard";
import InsightFeed from "./InsightFeed";

const MainBody = ({ insightFeed,data,setDateRange, dateRange  }) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto gap-1">
      <div className=" flex-1 text-white rounded-lg">
        <Dashboard data={data} setDateRange={setDateRange} dateRange={dateRange}/>
      </div>
      <div className="">
        <InsightFeed feedData={insightFeed} />
      </div>
    </div>
  );
};

export default MainBody;
