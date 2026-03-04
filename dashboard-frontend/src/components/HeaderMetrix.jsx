import MetrixCard from "./reuseableComponents/MetrixCard";

const HeaderMetrix = ({ dataMetric }) => {
  return (
    <div className="flex justify-between gap-2 overflow-auto ">
      <MetrixCard title={"Total insight"} value={dataMetric?.total_records ||0}/>
      <MetrixCard title={"Avg. Intensity"} value={dataMetric?.avg_intensity ||0}/>
      <MetrixCard title={"Avg. Likelihood"} value={dataMetric?.avg_likelihood||0}/>
      <MetrixCard title={"Avg. Relevance"} value={dataMetric?.avg_relevance ||0}/>
    </div>
  );
};

export default HeaderMetrix;
