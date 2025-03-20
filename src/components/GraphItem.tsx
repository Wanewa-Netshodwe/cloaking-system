import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ✅ Register required components for an area chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  month: string;
  title: string;
  perc: string;
  borderColor: string;
  color: string;
  dataValues: number[];
};

export default function GraphItem({
  borderColor,
  color,
  dataValues,
  month,
  perc,
  title,
}: Props) {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: dataValues,
        borderColor: `${borderColor}`,
        backgroundColor: `${color}`,
        pointRadius: 0, // ✅ Remove points (dots)
        pointHoverRadius: 0,
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false }, // ✅ Disable tooltip
      legend: { display: false }, // ✅ Remove legend (if needed)
    },
    scales: {
      x: {
        display: false, // ✅ Remove x-axis
      },
      y: {
        display: false, // ✅ Remove y-axis
      },
    },
  };

  return (
    <div className="border-2 bg-white p-5 w-[280px] border-[#C6E6FB] rounded-md">
      <p className="font-poppins font-semibold text-[17px] mb-5">{title}</p>

      <div className=" flex gap-8  h-[75px]">
        <div>
          <p className="font-poppins font-bold text-[15px] ">{month}</p>
          <p className="font-poppins font-bold text-[36px] ">{perc}</p>
        </div>
        <div className="relative">
          {" "}
          <Line data={data} options={options} width={120} height={65} />
          <div className="absolute w-[100px] -bottom-1 left-3 bg-white blur-md  h-6"></div>
        </div>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faArrowTrendDown}
          className="text-red-500 w-[15px] h-[15px]"
        />
        <span className="text-red-500 font-poppins  font-semibold text-[12px]">
          {" "}
          -25%{" "}
        </span>
        <span className="text-[#83ACD8] font-poppins font-semibold   text-[12px]">
          {" "}
          Compared to January
        </span>
      </div>
    </div>
  );
}
