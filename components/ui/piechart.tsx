'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

interface PieChartProps {
  gross: number;
  net: number;
}

const PieChart: React.FC<PieChartProps> = ({ gross, net }) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [grossPercent, setGrossPercent] = useState(0);
  const [netPercent, setNetPercent] = useState(0);

  const data = useMemo(() => [
    { name: "Gross Total", value: parseFloat(grossPercent.toFixed(2)), color: "#FF6384" },
    { name: "Net Total", value: parseFloat(netPercent.toFixed(2)), color: "#36A2EB" },
  ], [grossPercent, netPercent]);

  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const segments = useMemo(() => {
    let cumulativePercent = 0;
    return data.map((item, index) => {
      const percent = (item.value / total) * 100;
      const startPercent = cumulativePercent;
      cumulativePercent += percent;

      return {
        ...item,
        id: index,
        percent,
        startPercent,
        endPercent: cumulativePercent,
      };
    });
  }, [data, total]);

  const centerX = 75;
  const centerY = 75;
  const radius = 60;

  useEffect(() => {
    const total = gross + net;
    const calcuGross = gross / total * 100;
    const calcuNet = net / total * 100;

    setGrossPercent(calcuGross);
    setNetPercent(calcuNet);
  }, [gross, net]);

  // Function to format numbers as ##.##
  const formatNumber = (num) => {
    return parseFloat(num.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative">
        <svg width="250" height="350" viewBox="0 0 150 150">
          {segments.map((segment) => {
            const startAngle = ((segment.startPercent / 100) * Math.PI * 2 - Math.PI / 2);
            const endAngle = ((segment.endPercent / 100) * Math.PI * 2 - Math.PI / 2);

            const x1 = (centerX + radius * Math.cos(startAngle)).toFixed(2);
            const y1 = (centerY + radius * Math.sin(startAngle)).toFixed(2);
            const x2 = (centerX + radius * Math.cos(endAngle)).toFixed(2);
            const y2 = (centerY + radius * Math.sin(endAngle)).toFixed(2);

            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius * 0.7;
            const labelX = (centerX + labelRadius * Math.cos(midAngle)).toFixed(2);
            const labelY = (centerY + labelRadius * Math.sin(midAngle)).toFixed(2);

            const largeArcFlag = segment.percent > 50 ? 1 : 0;
            const pathData = `
              M ${centerX} ${centerY}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

            return (
              <g key={segment.id}>
                <path
                  d={pathData}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1"
                  onMouseEnter={() => setHoveredSegment(segment.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {Math.round(segment.percent)}%
                </text>
              </g>
            );
          })}

          {/* Tooltip for hovered segment */}
          {hoveredSegment !== null && segments[hoveredSegment] && (
            <g>
              <rect
                x={centerX - 40}
                y={centerY - 25}
                width="80"
                height="50"
                rx="3"
                fill="rgba(0,0,0,0.7)"
              />
              <text x={centerX} y={centerY - 10} textAnchor="middle" fill="white" fontSize="8">
                {segments[hoveredSegment].name}
              </text>
              <text x={centerX} y={centerY + 5} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                {formatNumber(segments[hoveredSegment].value)} ({Math.round(segments[hoveredSegment].percent)}%)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <div className="text-sm">
              <div className="font-medium">{item.name}</div>
              <div>{formatNumber(item.value)} ({Math.round((item.value / total) * 100)}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PieChart), { ssr: false });