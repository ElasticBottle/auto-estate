import type { ChartConfiguration } from "chart.js";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Title,
  Tooltip,
} from "chart.js";
import type { CSSProperties } from "react";
import React from "react";

Chart.register(
  LinearScale,
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  PieController,
  Legend,
  Title,
  Tooltip
);

export interface ReactChartsProps {
  option: ChartConfiguration;
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
      chart = new Chart(chartRef.current, option);
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
