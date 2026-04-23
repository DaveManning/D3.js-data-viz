import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  category: string;
  value: number;
}

export const ModernDataViz: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const margin = { top: 40, right: 30, bottom: 40, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = useMemo(() => 
    d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.2),
  [data, width]);

  const yScale = useMemo(() => 
    d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([height, 0])
      .nice(),
  [data, height]);

  useEffect(() => {
    if (!svgRef.current) return;
    const g = d3.select(svgRef.current);
    g.select<SVGGElement>(".x-axis").call(d3.axisBottom(xScale));
    g.select<SVGGElement>(".y-axis").call(d3.axisLeft(yScale));
  }, [xScale, yScale]);

  return (
    <div className="glass p-6 rounded-3xl border-slate-800 shadow-2xl">
      <svg 
        viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}
        className="w-full h-auto text-slate-400 font-mono text-[10px]"
      >
        <g ref={svgRef} transform={`translate(${margin.left},${margin.top})`}>
          <g className="x-axis text-slate-500" transform={`translate(0,${height})`} />
          <g className="y-axis text-slate-500" />
          {data.map((d, i) => (
            <rect
              key={`${d.category}-${i}`}
              x={xScale(d.category)}
              y={yScale(d.value)}
              width={xScale.bandwidth()}
              height={height - yScale(d.value)}
              className="fill-indigo-500 hover:fill-cyan-400 transition-all duration-300"
              rx={4}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};