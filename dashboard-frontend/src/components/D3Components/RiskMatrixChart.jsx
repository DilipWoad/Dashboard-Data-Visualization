import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

const RiskMatrixChart = ({ data }) => {
  const svgRef = useRef(null);

  // 1. Process the raw JSON data
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      // Filter out any data points that are missing X or Y coordinates
      .filter(d => d.likelihood != null && d.intensity != null)
      .map((d, i) => ({
        id: i,
        x: Number(d.likelihood), // X-axis
        y: Number(d.intensity),  // Y-axis
        r: Number(d.relevance) || 1, // Radius (fallback to 1 if missing)
        category: d.pestle || 'Other' // Color grouping
      }));
  }, [data]);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    // 2. Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear any previous rendering
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 3. SCALES (Dynamically calculated based on your data)
    const maxX = d3.max(processedData, d => d.x) || 5; 
    const maxY = d3.max(processedData, d => d.y) || 100;
    const maxR = d3.max(processedData, d => d.r) || 10;

    const xScale = d3.scaleLinear()
      .domain([0, maxX + 1]) // Add a little padding to the right
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, maxY + 10]) // Add a little padding to the top
      .range([height, 0]);

    // Use scaleSqrt for bubbles because we perceive size by Area, not Radius
    const rScale = d3.scaleSqrt()
      .domain([0, maxR])
      .range([2, 24]); // Minimum 2px radius, maximum 24px radius

    // Dynamic color palette for the 'Pestle' categories
    const colorScale = d3.scaleOrdinal()
      .range(["#3b82f6", "#f97316", "#10b981", "#8b5cf6", "#6366f1", "#f43f5e", "#ec4899"]);

    // 4. AXES
    // X-Axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .attr("color", "#64748b");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Likelihood");

    // Y-Axis
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("color", "#64748b");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -margin.left + 15)
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Intensity");

    // 5. GRID LINES (Horizontal and Vertical)
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .attr("color", "#334155")
      .attr("stroke-opacity", 0.3);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
      .attr("color", "#334155")
      .attr("stroke-opacity", 0.3);

    // 6. DRAW BUBBLES
    const bubbles = svg.selectAll("circle")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 0) // Start at radius 0 for the entry animation
      .attr("fill", d => colorScale(d.category))
      .attr("opacity", 0.7) // Make them slightly transparent so overlapping bubbles are visible
      .attr("stroke", d => d3.color(colorScale(d.category)).darker(0.5))
      .attr("stroke-width", 1);

    // 7. HOVER EFFECTS (Interactivity)
    bubbles
      .on("mouseover", function() {
        d3.select(this)
          .attr("opacity", 1)
          .attr("stroke-width", 2);
      })
      .on("mouseout", function() {
         d3.select(this)
          .attr("opacity", 0.7)
          .attr("stroke-width", 1);
      });

    // 8. ANIMATION (Pop-in effect)
    bubbles.transition()
      .duration(1000)
      .delay((d, i) => i * 5) // Stagger the pop-in of each bubble slightly
      .attr("r", d => rScale(d.r));

  }, [processedData]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RiskMatrixChart;