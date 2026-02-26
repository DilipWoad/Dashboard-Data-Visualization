import React, { useState, useEffect, useRef, useCallback } from "react";

const DateRangeSlider = ({ minYear = 2016, maxYear = 2050, onChange }) => {
  const [minVal, setMinVal] = useState(minYear);
  const [maxVal, setMaxVal] = useState(maxYear);

  // refs
  const minValRef = useRef(minYear);
  const maxValRef = useRef(maxYear);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minYear) / (maxYear - minYear)) * 100),
    [minYear, maxYear],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Handle changes and pass data to parent
  useEffect(() => {
    if (onChange) {
      onChange({ min: minVal, max: maxVal });
    }
  }, [minVal, maxVal]);

  return (
    <div className="flex flex-col w-full max-w-sm p-2 bg-slate-800 rounded-xl shadow-lg font-sans">
      {/* This style block is the secret sauce. 
        It makes the invisible inputs pass-through to clicks, 
        EXCEPT for the actual slider thumbs. 
      */}
      <style>{`
        .multi-range-slider {
          pointer-events: none;
        }
        .multi-range-slider::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .multi-range-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      `}</style>

      <div className="flex justify-between items-center mb-6">
        <label className="text-slate-300 font-semibold text-sm">
          Time Range
        </label>
      </div>

      <div className="relative flex items-center justify-center h-5">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          // Added multi-range-slider class, and dynamic z-index so min thumb stays clickable if they get too close
          className={`absolute w-full appearance-none h-2 opacity-0 multi-range-slider ${
            minVal > maxYear - 5 ? "z-40" : "z-30"
          }`}
        />
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="absolute w-full appearance-none z-30 h-2 opacity-0 multi-range-slider"
        />

        {/* Custom Track and Thumbs */}
        <div className="relative w-full h-1.5 bg-slate-600 rounded-md z-10">
          <div
            ref={range}
            className="absolute h-1.5 bg-blue-500 rounded-md z-20"
          ></div>

          {/* Left Thumb (Min) */}
          <div
            className="absolute h-4 w-4 rounded-full bg-white shadow border border-slate-300 z-30 -mt-1.5 -ml-2 pointer-events-none"
            style={{ left: `${getPercent(minVal)}%` }}
          ></div>

          {/* Right Thumb (Max) */}
          <div
            className="absolute h-4 w-4 rounded-full bg-white shadow border border-slate-300 z-30 -mt-1.5 -ml-2 pointer-events-none"
            style={{ left: `${getPercent(maxVal)}%` }}
          ></div>
        </div>
      </div>

      {/* Value Display */}
      <div className="flex justify-between items-center mt-5 text-slate-400 text-xs font-medium">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>
    </div>
  );
};

export default DateRangeSlider;
