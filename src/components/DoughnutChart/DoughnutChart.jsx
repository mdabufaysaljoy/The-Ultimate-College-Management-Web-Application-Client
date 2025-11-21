import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ doughnutData }) {
  const data = {
    labels: doughnutData.labels,
    datasets: [
      {
        data: doughnutData.value,
        backgroundColor: [
          // Red
          "#00A8E8",
          "#FF0000", // Vivid Sky Blue
          "#FFD300", // Bright Yellow
          "#008000", // Green
          "#FF7F00", // Orange
          "#6A0DAD", // Purple
          "#00FF7F", // Spring Green
          "#0000FF", // Pure Blue
          "#FF1493", // Deep Pink
          "#00CED1", // Dark Turquoise
          "#D2691E", // Chocolate
          "#1E90FF", // Dodger Blue
        ],
      },
    ],
  };

  return <Doughnut data={data} />;
}
