"use client"

import { Line } from 'react-chartjs-2';
import { PriceHistoryItem, Product } from "@/types";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChartProps {
  priceHistory: PriceHistoryItem[];
}

const ChartComponent: React.FC<ChartProps> = ({ priceHistory }) => {
  const chartData = {
    labels: priceHistory.map(item => item.date),
    datasets: [
      {
        label: 'Price History',
        data: priceHistory.map(item => item.price),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD', // Adjust this according to your date format
          tooltipFormat: 'll', // Format for tooltip display
        },
      },
      // Other scale configurations for y-axis if needed
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ChartComponent;
