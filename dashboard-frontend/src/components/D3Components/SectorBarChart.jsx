import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

const SectorBarChart = ({ data }) => {
  const svgRef = useRef(null);

  // 1. Process the raw JSON data
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group the data by "sector" and calculate the average intensity and relevance
    const grouped = d3.rollups(
      data,
      (v) => ({
        intensity: d3.mean(v, d => d.intensity || 0),
        relevance: d3.mean(v, d => d.relevance || 0)
      }),
      (d) => d.sector
    );

    // Convert the grouped Map back into an array of objects
    let arr = Array.from(grouped, ([sector, values]) => ({
      sector: sector || "Uncategorized",
      intensity: values.intensity,
      relevance: values.relevance,
      total: values.intensity + values.relevance
    }))
    // Remove uncategorized/empty sectors for a cleaner chart
    .filter(d => d.sector !== "Uncategorized" && d.sector !== "");

    // Sort by the highest total value and grab the top 6 sectors
    arr.sort((a, b) => b.total - a.total);
    return arr.slice(0, 6);

  }, [data]);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    // 2. Set up dimensions and margins
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear any previous rendering
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 3. THE STACK GENERATOR
    // We want to stack 'intensity' (blue) and 'relevance' (orange)
    const stackKeys = ['intensity', 'relevance'];
    const stackGenerator = d3.stack().keys(stackKeys);
    
    // This transforms our simple array into an array of "layers". 
    // It calculates the y0 (bottom) and y1 (top) positions for each segment.
    const stackedSeries = stackGenerator(processedData);

    // 4. SCALES
    // X Scale (Band Scale for Categories)
    const xScale = d3.scaleBand()
      .domain(processedData.map(d => d.sector))
      .range([0, width])
      .padding(0.3); // Space between the bars

    // Y Scale (Linear Scale for Values)
    // We find the maximum total stack height to set the top of our Y axis
    const maxY = d3.max(stackedSeries, layer => d3.max(layer, sequence => sequence[1]));
    const yScale = d3.scaleLinear()
      .domain([0, maxY * 1.1]) // Add 10% padding to the top
      .range([height, 0]);

    // Color Scale
    const colorScale = d3.scaleOrdinal()
      .domain(stackKeys)
      .range(["#3b82f6", "#f97316"]); // Tailwind blue-500, orange-500

    // 5. AXES
    // X-Axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(5))
      .attr("color", "#64748b") // Tailwind slate-500
      .selectAll("text") // Rotate labels slightly if they are long
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("text-anchor", "end");

    // Y-Axis
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("color", "#64748b");

    // Y-Axis Label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -margin.left + 15)
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .text("Avg Value");

    // Horizontal Grid Lines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .attr("color", "#334155")
      .attr("stroke-opacity", 0.5);

    // 6. DRAW THE STACKED BARS
    // First, we create a group (<g>) for each "layer" (intensity layer, then relevance layer)
    const layerGroups = svg.selectAll("g.layer")
      .data(stackedSeries)
      .enter()
      .append("g")
      .attr("class", "layer")
      .attr("fill", d => colorScale(d.key)); // Apply blue to the first group, orange to the second

    // Next, inside those layer groups, we draw the individual rectangles for each sector
    layerGroups.selectAll("rect")
      .data(d => d) // D3 automatically passes down the array of sequences for this specific layer
      .enter()
      .append("rect")
        .attr("x", d => xScale(d.data.sector))
        .attr("width", xScale.bandwidth())
        // Start the bars at the bottom of the chart for the animation
        .attr("y", height) 
        .attr("height", 0)
        .attr("rx", 2) // Slightly rounded corners
      .transition() // 7. ANIMATION
        .duration(800)
        .delay((d, i) => i * 100) // Stagger the animation left-to-right
        // Animate up to the calculated top (d[1]) and bottom (d[0]) bounds
        .attr("y", d => yScale(d[1])) 
        .attr("height", d => yScale(d[0]) - yScale(d[1]));

  }, [processedData]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SectorBarChart;