
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: ["Apple", "Banana", "Mango"],
    datasets: [
      {
        data: [25, 35, 40],
        backgroundColor: ["#f87171", "#facc15", "#4ade80"],
      },
    ],
  };

  return <Pie data={data} />;
}
