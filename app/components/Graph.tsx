import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import type { CSSProperties } from "react";
import React from "react";

Chart.register(
  LinearScale,
  BarElement,
  BarController,
  CategoryScale,
  Title,
  Tooltip
);

export interface ReactChartsProps {
  option: any;
  style?: CSSProperties;
  className?: string;
}

export function ReactCharts({
  option,
  style,
  className,
}: ReactChartsProps): JSX.Element {
  const chartRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    // Initialize chart
    let chart: Chart | undefined;
    if (chartRef.current !== null) {
      chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Without Incentive", "With Incentive"],
          datasets: [
            {
              label: "Payment",
              data: [65, 5],
              backgroundColor: [
                // "rgba(255, 99, 132, 0.2)",
                // "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                // "rgba(54, 162, 235, 0.2)",
                // "rgba(153, 102, 255, 0.2)",
                // "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                // "rgb(255, 99, 132)",
                // "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                // "rgb(54, 162, 235)",
                // "rgb(153, 102, 255)",
                // "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Custom Chart Title",
            },
          },
        },
      });
    }

    function resizeChart() {
      chart?.resize();
    }
    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    window.addEventListener("resize", resizeChart);
    // Return cleanup function
    return () => {
      chart?.destroy();
      window.removeEventListener("resize", resizeChart);
    };
  }, [option]);

  return (
    <div className={className} style={{ ...style }}>
      <canvas ref={chartRef} />
    </div>
  );
}
