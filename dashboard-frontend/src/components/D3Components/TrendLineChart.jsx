import { useRef, useEffect } from "react";
import * as d3 from "d3";

const mockData = [
  { date: new Date(2016, 0, 1), value: 0.5 },
  { date: new Date(2016, 6, 1), value: 3.8 },
  { date: new Date(2017, 0, 1), value: 1.8 },
  { date: new Date(2017, 6, 1), value: 2.2 },
  { date: new Date(2018, 0, 1), value: 1.1 },
  { date: new Date(2018, 6, 1), value: 4.0 },
  { date: new Date(2019, 0, 1), value: 1.5 },
  { date: new Date(2019, 6, 1), value: 3.8 },
  { date: new Date(2020, 0, 1), value: 1.0 },
  { date: new Date(2020, 6, 1), value: 4.2 },
];

const TrendLineChart = ({data,setDateRange, dateRange}) => {
  const svgRef = useRef();
  console.log("Trend data :: ",data)

  useEffect(() => {
    if (!data || data.length === 0) return;
    //create a space/canvas for the svg
    const margins = { top: "20", right: "20", bottom: "30", left: "40" };
    const width = 400 - margins.right - margins.left;
    const height = 300 - margins.top - margins.bottom;

    //clear any previous render (in order to get fresh and live data)
    d3.select(svgRef.current).selectAll("*").remove();

    //Now we will create new render of charts
    //1) Make the container for the svg
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`);

    //SCALE
    // x-Scale
    console.log("jbdkbvbvbkvbasdbnvalsknvasklnkls",dateRange)
    
    const xScale = d3
      .scaleTime()
      .domain([dateRange.min,dateRange.max]) //this finds the min and max value
      .range([0, width]); //Now this will range of pixel , and based on the min-max it points in in-btw date

      console.log("X scale : : ",xScale)
    //y-Scale
    const maxY = d3.max(data, d => d.intensity) || 10;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxY*1.1]) //min=0 and max=5 0,1,2,3,4,5
      .range([height, 0]); //so as svg is inverse(upside-down) of normal graph so we start with height length till 0

    //AXES
    //xAxis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat("%Y"));
    svg
      .append("g") // g means grid a grid line only one
      .attr("transform", `translate(0,${height})`) //from top -> (0,height)
      .call(xAxis)
      .attr("color", "#64748b");

    const yAxis = d3.axisLeft(yScale).ticks(10);
    svg.append("g").call(yAxis).attr("color", "#64748b");

    // Add horizontal grid lines (styling the ticks)
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .attr("color", "#334155")
      .attr("stroke-opacity", 0.5);

    // svg.append("g")
    //   .attr("class", "grid")
    //   .call(d3.axisTop(xScale)
    //     .tickSize(-height)
    //     .tickFormat("")
    //   )
    //   .attr("color", "#334155") // Tailwind slate-700
    //   .attr("stroke-opacity", 0.5);

    //Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.end_year))
      .y((d) => yScale(d.intensity))
      .curve(d3.curveMonotoneX);

    // 7. DRAW THE LINE
    const path = svg
      .append("path")
      .datum(data) // Bind the data
      .attr("fill", "none")
      .attr("stroke", "#3b82f6") // Tailwind blue-500
      .attr("stroke-width", 2.5)
      .attr("d", lineGenerator);

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }, [data]);
  return (
    <div className="flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TrendLineChart;
