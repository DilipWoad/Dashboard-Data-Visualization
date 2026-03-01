import MetrixCard from "./reuseableComponents/MetrixCard";

const HeaderMetrix = ({ dataMetric }) => {
  // const { avg_intensity, avg_likelihood, avg_relevance, total_records } = dataMetric;
  if(!dataMetric) return <p>Loading..</p>
  return (
    <div className="flex justify-between gap-2 overflow-auto ">
      <MetrixCard title={"Total insight"} value={dataMetric.total_records}/>
      <MetrixCard title={"Avg. Intensity"} value={dataMetric.avg_intensity}/>
      <MetrixCard title={"Avg. Likelihood"} value={dataMetric.avg_likelihood}/>
      <MetrixCard title={"Avg. Relevance"} value={dataMetric.avg_relevance}/>
    </div>
  );
};

export default HeaderMetrix;
