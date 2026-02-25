import { Data } from "../models/data.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncRequestHandler from "../utils/asyncReqestHandler.js";

const queryFilters = (query) => {
  const filter = {};

  const { end_year, topic, sector, region, pestle, source, country } = query;

  if (end_year) filter.end_year = end_year;

  if (topic) filter.topic = { $regex: topic, $options: "i" };
  if (sector) filter.sector = { $regex: sector, $options: "i" };
  if (region) filter.region = { $regex: region, $options: "i" };
  if (pestle) filter.pestle = { $regex: pestle, $options: "i" };
//   if (source) filter.source = { $regex: source, $options: "i" };
  if (country) filter.country = { $regex: country, $options: "i" };

  return filter;
};

const getDashboardData = asyncRequestHandler(async (req, res) => {
  //this will give us the data based on the filters applied

  //call the queryFilter function here
  const filters = queryFilters(req.query);

  //now we can find data based on the filters
  const data = await Data.find(filters).limit(1000);

  if (!data || data.length === 0) {
    // Note: We don't throw an error here because an empty filter result
    // is valid (e.g., no Energy data in 2050). We return an empty array.
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No data found matching filters"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Data fetched Successfully."));
});

const getFilterOptions = asyncRequestHandler(async (req, res) => {
  const [end_years, topics, sectors, regions, pestles, countries, sources] =
    await Promise.all([
      Data.distinct("end_year"),
      Data.distinct("topic"),
      Data.distinct("sector"),
      Data.distinct("region"),
      Data.distinct("pestle"),
      Data.distinct("country"),
    //   Data.distinct("source"),
    ]);

  const responseData = {
    end_years: end_years.filter((item) => item),
    topics: topics.filter((item) => item),
    sectors: sectors.filter((item) => item),
    regions: regions.filter((item) => item),
    pestles: pestles.filter((item) => item),
    countries: countries.filter((item) => item),
    sources: sources.filter((item) => item),
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, responseData, "Filter options fetched successfully"),
    );
});

const getSummaryMetrics = async (req, res, next) => {
  const filters = queryFilters(req.query);

  // Use MongoDB Aggregation Pipeline
  const metrics = await Data.aggregate([
    { $match: filters }, // 1. Filter documents first
    {
      $group: {
        _id: null, // 2. Group all matching docs into one pile
        total_records: { $sum: 1 },
        avg_intensity: { $avg: "$intensity" },
        avg_likelihood: { $avg: "$likelihood" },
        avg_relevance: { $avg: "$relevance" },
      },
    },
    {
      $project: {
        _id: 0, // Remove the ID from result
        total_records: 1,
        avg_intensity: { $round: ["$avg_intensity", 2] }, // Round to 2 decimals
        avg_likelihood: { $round: ["$avg_likelihood", 2] },
        avg_relevance: { $round: ["$avg_relevance", 2] },
      },
    },
  ]);

  // Handle case where no data matches (metrics array will be empty)
  const result =
    metrics.length > 0
      ? metrics[0]
      : {
          total_records: 0,
          avg_intensity: 0,
          avg_likelihood: 0,
          avg_relevance: 0,
        };

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Summary metrics calculated"));
};


// need to make a controller for getting scours, title, url ,channels etc
// or we can get that data from the dashborad data

export { getDashboardData, getFilterOptions, getSummaryMetrics };

