import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface ChartProps {
  symbol: string;
  data: {
    time: string;
    value: number;
  }[];
}

export function TradingChart({ symbol, data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'white' },
          textColor: 'black',
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      const lineSeries = chart.addLineSeries({
        color: '#2563eb',
        lineWidth: 2,
      });

      // Sort data by time to ensure ascending order
      const sortedData = [...data].sort((a, b) => 
        new Date(a.time).getTime() - new Date(b.time).getTime()
      );

      // Ensure unique timestamps
      const uniqueData = sortedData.reduce((acc, curr) => {
        const exists = acc.find(item => item.time === curr.time);
        if (!exists) {
          acc.push(curr);
        }
        return acc;
      }, [] as typeof data);

      lineSeries.setData(uniqueData);
      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">{symbol} Price Chart</h2>
      <div ref={chartContainerRef} />
    </div>
  );
}