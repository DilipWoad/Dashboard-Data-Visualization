import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const GlobalHeatmap = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  // 1. Process the RAW JSON data passed into the component
  const dataMap = useMemo(() => {
    const mapAgg = new Map();
    if (!data || data.length === 0) return mapAgg;

    // Loop through the raw data and sum the 'intensity' for each 'country'
    data.forEach(d => {
      const countryName = d.country;
      // Skip entries with no country specified
      if (countryName && countryName.trim() !== "") {
        const currentIntensity = mapAgg.get(countryName) || 0;
        mapAgg.set(countryName, currentIntensity + (Number(d.intensity) || 0));
      }
    });

    return mapAgg;
  }, [data]);

  useEffect(() => {
    if (dataMap.size === 0) return;

    const width = 800;
    const height = 500;

    // Clear any previous maps (useful for hot-reloading in React)
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g");

    // 2. Find the maximum intensity value to set our color scale limit
    const maxVal = d3.max(Array.from(dataMap.values())) || 100;

    // 3. Set up the Color Scale (Light Slate to Deep Black/Blue)
    const colorScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range(["#cbd5e1", "#020617"]);

    // 4. Fetch the Geographic Data (TopoJSON)
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((worldData) => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;
        
        // Remove Antarctica to frame the map better
        const filteredCountries = countries.filter(d => d.properties.name !== "Antarctica");

        // 5. Setup Projection and Path Generator
        const projection = d3.geoMercator()
          .fitSize([width, height], { type: "FeatureCollection", features: filteredCountries });
        const pathGenerator = d3.geoPath().projection(projection);

        // 6. Draw the Countries
        svg.append("g")
          .selectAll("path")
          .data(filteredCountries)
          .enter()
          .append("path")
          .attr("d", pathGenerator)
          .attr("fill", d => {
            // Match the map's country name with your JSON's country name
            const countryName = d.properties.name;
            const value = dataMap.get(countryName);
            
            // If the country has an intensity value, color it. Otherwise, dark grey.
            return value ? colorScale(value) : "#334155"; 
          })
          .attr("stroke", "#0f172a") 
          .attr("stroke-width", 0.5)
          .style("cursor", "pointer")
          .style("transition", "fill 0.2s ease")
          // 7. Interactive Tooltips
          .on("mouseover", function(event, d) {
            d3.select(this)
              .attr("stroke", "#3b82f6") 
              .attr("stroke-width", 2)
              .raise(); // Brings the hovered country border to the front

            const countryName = d.properties.name;
            const value = dataMap.get(countryName) || 0;
            
            setTooltip({
              show: true,
              x: event.pageX,
              y: event.pageY,
              content: `${countryName}: ${value} Total Intensity`
            });
          })
          .on("mousemove", (event) => {
            setTooltip(prev => ({ ...prev, x: event.pageX, y: event.pageY }));
          })
          .on("mouseout", function(event, d) {
            d3.select(this)
              .attr("stroke", "#0f172a")
              .attr("stroke-width", 0.5);
              
            setTooltip({ show: false, x: 0, y: 0, content: '' });
          });

        // 8. Draw the Map Legend
        const legendWidth = 200;
        const legendHeight = 10;
        
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "map-gradient")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%");

        linearGradient.append("stop").attr("offset", "0%").attr("stop-color", "#cbd5e1");
        linearGradient.append("stop").attr("offset", "100%").attr("stop-color", "#020617");

        const legendGroup = svg.append("g")
            .attr("transform", `translate(20, ${height - 40})`);

        legendGroup.append("rect")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#map-gradient)")
            .attr("rx", 2);

        legendGroup.append("text")
            .attr("x", 0)
            .attr("y", 25)
            .text("0")
            .attr("font-size", "12px")
            .attr("fill", "#94a3b8");

        legendGroup.append("text")
            .attr("x", legendWidth)
            .attr("y", 25)
            .text(maxVal)
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .attr("fill", "#94a3b8");
      });
  }, [dataMap]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {/* Dynamic Tooltip */}
      {tooltip.show && (
        <div 
          className="fixed bg-slate-900 text-slate-100 text-xs py-1.5 px-3 rounded border border-slate-700 pointer-events-none shadow-lg z-50 transform -translate-x-1/2 -translate-y-[150%]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default GlobalHeatmap;