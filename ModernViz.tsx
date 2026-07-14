import React, { useMemo, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

interface SankeyNode extends d3Sankey.SankeyNodeExtraProperties {
  name: string;
}

interface SankeyLink extends d3Sankey.SankeyLinkExtraProperties {
  source: number | string | SankeyNode;
  target: number | string | SankeyNode;
  value: number;
}

export const SmartFactorySankey = () => {
  const [data, setData] = useState<{ nodes: SankeyNode[], links: SankeyLink[] } | null>(null);

  const width = 900;
  const height = 500;

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await d3.csv("https://huggingface.co/datasets/Fdddhhhill/smart_factory_performance/resolve/main/smart_factory_performance.csv");
      
      const nodes: { name: string }[] = [];
      const links: { source: string, target: string, value: number }[] = [];

      const addLink = (source: string, target: string) => {
        const link = links.find(l => l.source === source && l.target === target);
        if (link) link.value++;
        else links.push({ source, target, value: 1 });
        if (!nodes.find(n => n.name === source)) nodes.push({ name: source });
        if (!nodes.find(n => n.name === target)) nodes.push({ name: target });
      };

      rawData.forEach((d: any) => {
        addLink(d.Machine_Type, d.Production_Line);
        addLink(d.Production_Line, d.Operational_Status);
      });

      // Map names to indices for D3-Sankey
      const nodeMap = new Map(nodes.map((n, i) => [n.name, i]));
      const formattedLinks = links.map(l => ({
        source: nodeMap.get(l.source)!,
        target: nodeMap.get(l.target)!,
        value: l.value
      }));

      setData({ nodes, links: formattedLinks });
    };

    fetchData();
  }, []);

  const graph = useMemo(() => {
    if (!data) return null;
    const sankey = d3Sankey.sankey<SankeyNode, SankeyLink>()
      .nodeWidth(15)
      .nodePadding(20)
      .extent([[1, 1], [width - 1, height - 5]]);
    
    return sankey(data);
  }, [data]);

  if (!graph) return <div className="text-cyan-500 animate-pulse">Syncing Factory Telemetry...</div>;

  return (
    <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 shadow-2xl">
      <h2 className="text-cyan-400 font-mono mb-4">FLOW_SYSTEM: MACHINE_TO_STATUS</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <g style={{ mixBlendMode: 'screen' }}>
          {graph.links.map((link, i) => (
            <path
              key={i}
              d={d3Sankey.sankeyLinkHorizontal()(link) || ""}
              fill="none"
              stroke="rgba(34, 211, 238, 0.2)"
              strokeWidth={Math.max(1, link.width!)}
              className="hover:stroke-cyan-400 transition-colors duration-300"
            />
          ))}
        </g>
        {graph.nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={node.x0}
              y={node.y0}
              width={node.x1! - node.x0!}
              height={node.y1! - node.y0!}
              className="fill-indigo-600 stroke-indigo-400"
              rx={2}
            />
            <text
              x={node.x0! < width / 2 ? node.x1! + 6 : node.x0! - 6}
              y={(node.y1! + node.y0!) / 2}
              dy="0.35em"
              textAnchor={node.x0! < width / 2 ? "start" : "end"}
              className="fill-slate-300 font-mono text-[10px] pointer-events-none"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};