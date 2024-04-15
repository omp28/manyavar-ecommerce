import { BarChart } from "@mui/x-charts/BarChart";

const pData = [
  1398, 9800, 3908, 4800, 3800, 4300, 3000, 2000, 2780, 1890, 2390, 3490,
];
const xLabels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function Chart() {
  return (
    <div>
      <BarChart
        width={1000}
        height={600}
        series={[{ data: pData, id: "pvId" }]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </div>
  );
}
