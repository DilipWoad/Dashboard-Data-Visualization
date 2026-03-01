import { useEffect, useState } from "react";
import { base_url, formatToDDMMYYYY } from "../constant.js";
import HeaderMetrix from "./HeaderMetrix";
import MainBody from "./MainBody";
import SidebarFilter from "./SidebarFilter";
import axios from "axios";

const Body = () => {
  const [filterData, setFilterData] = useState(null);
  const [dataMetric, setDataMetric] = useState(null);
  const [insightFeed, setInsightFeed] = useState([]);

  const onFilterChange = async (urlData) => {
    // console.log("This DATA WILL GO TO BACKEND :: ",urlData)
    const queryString = new URLSearchParams(urlData).toString();

    // const url = `${base_url}?${queryString}`;

    // console.log("This the params url :: ",url);
    try {
      const res = await axios.get(`${base_url}?${queryString}`);
      const data = res.data.data;
      getInsightData(data);
      console.log("Data from the Backend :: ", data);
    } catch (error) {
      console.error("Error while fetching data :: ", error);
    }

    getDataMetric(queryString);
  };

  const getAllFilterData = async () => {
    try {
      const res = await axios.get(`${base_url}/filters`);

      setFilterData(res.data.data);
      console.log("Filter :: ", res.data.data);
    } catch (error) {
      console.log("Error while fetching filter data :: ", error);
    }
  };

  const getDataMetric = async (queryStr) => {
    try {
      const res = await axios.get(`${base_url}/metrics?${queryStr}`);
      setDataMetric(res.data.data);
      console.log("Metric :: ", res.data.data);
    } catch (error) {
      console.log("Error while fetching filter data :: ", error);
    }
  };

  const getInsightData = (data) => {
    const insightData = data.map((item) => ({
      _id: item._id,
      title: item.title,
      sector: item.sector,
      published: item.published !== "" ?formatToDDMMYYYY(item.published) :"",
      region: item.region,
      intensity: item.intensity,
      likelihood: item.likelihood,
      url: item.url,
    }));
    console.log("Insight Data :: ", insightData);
    setInsightFeed(insightData);
    // (title, sector, source, url);
  };

  useEffect(() => {
    !filterData && getAllFilterData();
  }, []);
  return (
    <div className="bg-gray-600 h-full p-2 flex flex-col gap-2">
      <HeaderMetrix dataMetric={dataMetric} />
      <div className="flex gap-2 flex-1 overflow-auto">
        <SidebarFilter onFilterChange={onFilterChange} />
        <MainBody insightFeed={insightFeed} />
      </div>
    </div>
  );
};
export default Body;
