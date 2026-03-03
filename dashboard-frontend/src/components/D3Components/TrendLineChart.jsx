import { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";

const TrendLineChart = ({ data, setDateRange, dateRange }) => {
  const svgRef = useRef();

  // 1. Process the Data with Fallback Date Logic
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Step A: Calculate a valid year for EVERY data point
    const validData = data.map((d) => {
      let calculatedYear = null;

      // 1. Try end_year first
      if (d.end_year && d.end_year !== "") {
        calculatedYear = parseInt(d.end_year, 10);
      } 
      // 2. Fallback to start_year
      else if (d.start_year && d.start_year !== "") {
        calculatedYear = parseInt(d.start_year, 10);
      } 
      // 3. Fallback to 'published' string
      else if (d.published && d.published !== "") {
        const pubDate = new Date(d.published.replace(',', '')); // clean the string
        if (!isNaN(pubDate.getTime())) {
          calculatedYear = pubDate.getFullYear();
        }
      } 
      // 4. Fallback to 'added' string
      else if (d.added && d.added !== "") {
        const addedDate = new Date(d.added.replace(',', '')); // clean the string
        if (!isNaN(addedDate.getTime())) {
          calculatedYear = addedDate.getFullYear();
        }
      }

      return {
        // Convert whatever year we found into a Date object (Jan 1st of that year)
        date: calculatedYear ? new Date(calculatedYear, 0, 1) : null,
        intensity: Number(d.intensity) || 0,
      };
    })
    // Only drop the data point if ALL 4 date fields were completely missing/invalid
    .filter((d) => d.date !== null && !isNaN(d.date.getTime()));

    // Step B: Group by year and calculate the average intensity
    const aggregated = d3.rollups(
      validData,
      (v) => d3.mean(v, (leaf) => leaf.intensity),
      (d) => d.date.getTime()
    );

    // Step C: Convert back to array and sort chronologically
    return Array.from(aggregated, ([time, avgIntensity]) => ({
      date: new Date(time),
      intensity: avgIntensity,
    })).sort((a, b) => a.date - b.date);

  }, [data]);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    const margins = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margins.right - margins.left;
    const height = 300 - margins.top - margins.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`);

    // FIX 1: Add a Clip Path. 
    // This creates an invisible rectangle that hides any part of the line drawn outside the axes.
    svg.append("defs").append("clipPath")
      .attr("id", "chart-clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // SCALES
    const minDate = dateRange?.min 
      ? new Date(dateRange.min.toString()) 
      : d3.min(processedData, (d) => d.date);
      
    const maxDate = dateRange?.max 
      ? new Date(dateRange.max.toString()) 
      : d3.max(processedData, (d) => d.date);

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    // FIX 2: Calculate Max Y based ONLY on data currently visible inside the date range.
    // This prevents the line from being squashed flat if you zoom in on a quiet period.
    const visibleData = processedData.filter(d => d.date >= minDate && d.date <= maxDate);
    const maxY = d3.max(visibleData, (d) => d.intensity) || 10;
    
    const yScale = d3
      .scaleLinear()
      .domain([0, maxY * 1.1]) 
      .range([height, 0]);

    // AXES
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat("%Y"));
      
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("color", "#64748b");

    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(yAxis).attr("color", "#64748b");

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .attr("color", "#334155")
      .attr("stroke-opacity", 0.5);

    // LINE GENERATOR
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.intensity)) 
      .curve(d3.curveMonotoneX);

    // DRAW THE LINE
    const path = svg
      .append("path")
      .datum(processedData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6") 
      .attr("stroke-width", 2.5)
      .attr("d", lineGenerator)
      .attr("clip-path", "url(#chart-clip)"); // APPLY THE CLIP PATH HERE

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  }, [processedData, dateRange]); 

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TrendLineChart;