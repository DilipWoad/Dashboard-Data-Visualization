import InsightFeed from "./InsightFeed";

const MainBody = ({ insightFeed }) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto gap-2">
      <div className="bg-slate-800 flex-1 text-white rounded-lg">Dashboard charts</div>
      <div className="">
        <InsightFeed feedData={insightFeed} />
      </div>
    </div>
  );
};

export default MainBody;
