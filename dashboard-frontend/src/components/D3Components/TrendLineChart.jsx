import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

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

const TrendLineChart = () => {
  // 1. Create a reference to the SVG element
  const svgRef = useRef(null);

  useEffect(() => {
    // 2. Set up dimensions and margins
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear any previous charts (important for React hot-reloading)
    d3.select(svgRef.current).selectAll("*").remove();

    // 3. Create the main SVG container and append a group (<g>) shifted by margins
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 4. SCALES
    // X Scale (Time): Maps dates to pixel width
    const xScale = d3.scaleTime()
      .domain(d3.extent(mockData, d => d.date)) // [minDate, maxDate]
      .range([0, width]); // [0 pixels, 340 pixels]

    // Y Scale (Linear): Maps values (0 to 5) to pixel height
    // Note: SVG y=0 is at the TOP, so range is [height, 0] to flip it
    const yScale = d3.scaleLinear()
      .domain([0, 5])
      .range([height, 0]);

    // 5. AXES
    // Create bottom axis and format the ticks to show just the year
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%Y"));
    svg.append("g")
      .attr("transform", `translate(0,${height})`) // Move it to the bottom
      .call(xAxis)
      .attr("color", "#64748b"); // Tailwind slate-500

    // Create left axis
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g")
      .call(yAxis)
      .attr("color", "#64748b");

    // Add horizontal grid lines (styling the ticks)
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat("")
      )
      .attr("color", "#334155") // Tailwind slate-700
      .attr("stroke-opacity", 0.5);

    // 6. THE LINE GENERATOR
    // This tells D3 how to extract X and Y coordinates from your data objects
    const lineGenerator = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX); // This makes the line smooth/curvy

    // 7. DRAW THE LINE
    const path = svg.append("path")
      .datum(mockData) // Bind the data
      .attr("fill", "none")
      .attr("stroke", "#3b82f6") // Tailwind blue-500
      .attr("stroke-width", 2.5)
      .attr("d", lineGenerator); // Feed data through the generator

    // 8. ANIMATION (The "draw in" effect)
    // Get the total length of the path in pixels
    const totalLength = path.node().getTotalLength();

    // Set up dash array and dash offset to hide the line initially
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition() // Start a D3 transition
      .duration(2000) // 2 seconds
      .ease(d3.easeLinear) // Smooth, even speed
      .attr("stroke-dashoffset", 0); // Animate to fully visible

  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TrendLineChart;