import ExternalLinkIcon from "./reuseableComponents/ExternalLinkIcon";
import ProgressBar from "./reuseableComponents/ProgressBar";

const InsightFeed = ({ feedData }) => {
  //   const feedData = [
  //     {
  //       id: 1,
  //       title: "U.S. natural gas consump...",
  //       sector: "Energy",
  //       region: "Middle East",
  //       publishedDate: "10/08/2018",
  //       intensity: 7.5,
  //       likelihood: 4.2,
  //     },
  //     {
  //       id: 2,
  //       title: "OPEC oil production cuts...",
  //       sector: "Energy",
  //       region: "Nigeria",
  //       publishedDate: "10/08/2018",
  //       intensity: 4.2,
  //       likelihood: 4.2,
  //     },
  //     {
  //       id: 3,
  //       title: "OPEC oil production cuts...",
  //       sector: "Energy",
  //       region: "Nigeria",
  //       publishedDate: "02/08/2018",
  //       intensity: 3.0,
  //       likelihood: 3.8,
  //     },
  //     {
  //       id: 4,
  //       title: "U.S. natural gas consump...",
  //       sector: "Middle East",
  //       region: "Nigeria",
  //       publishedDate: "09/08/2018",
  //       intensity: 2.7,
  //       likelihood: 3.8,
  //     },
  //   ];
  return (
    <div className="bg-slate-800 p-2 rounded-lg text-slate-300 font-sans w-full ">
      <h2 className="text-base font-semibold  text-slate-50">
        Insight Feed {`(${feedData.length})`}
      </h2>

      <div className="overflow-x-auto w-full h-36">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Sector</th>
              <th className="p-3 font-medium">Region</th>
              <th className="p-3 font-medium">Published Date</th>
              <th className="p-3 font-medium">Intensity</th>
              <th className="p-3 font-medium">Likelihood</th>
              <th className="p-3 font-medium">Link</th>
            </tr>
          </thead>
          <tbody className="">
            {feedData.map((row) => (
              <tr
                key={row._id}
                className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors "
              >
                <td className="p-3 text-slate-200 truncate max-w-40">{row.title}</td>
                <td className="p-3  w-5">{row.sector}</td>
                <td className="p-3">{row.region}</td>
                <td className="p-3">{row.published}</td>
                <td className="p-3 bg-red-400   ">
                  <ProgressBar value={row.intensity} colorClass="bg-blue-500" max={100} />
                </td>
                <td className="p-3">
                  <ProgressBar
                    value={row.likelihood}
                    colorClass="bg-orange-500"
                    max={10}
                  />
                </td>
                <td className="p-3 text-right">
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open insight: ${row.title}`}
                    className="inline-block p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <ExternalLinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightFeed;
