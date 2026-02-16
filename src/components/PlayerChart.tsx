import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist-min";
import type { Data, Layout } from "plotly.js";
import type { DateRange } from "../types";

const Plot = createPlotlyComponent(Plotly as object);

type PlayerChartProps = {
  title: string;
  dates: string[];
  minValues: Array<number | null>;
  maxValues: Array<number | null>;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  showControls: boolean;
};

function toPlotSeries(values: Array<number | null>): Array<number | null> {
  return values.map((value) => (value == null ? null : value));
}

export function PlayerChart({
  title,
  dates,
  minValues,
  maxValues,
  range,
  onRangeChange,
  showControls
}: PlayerChartProps) {
  const minSeries = toPlotSeries(minValues);
  const maxSeries = toPlotSeries(maxValues);

  const traces: Data[] = [
    {
      x: dates,
      y: minSeries,
      type: "scatter",
      mode: "lines",
      line: { width: 0 },
      hoverinfo: "skip",
      showlegend: false
    },
    {
      x: dates,
      y: maxSeries,
      type: "scatter",
      mode: "lines",
      line: {
        width: 3,
        color: "#dc2828",
        shape: "spline"
      },
      fill: "tonexty",
      fillcolor: "rgba(220, 40, 40, 0.25)",
      name: "Daily max",
      hovertemplate: "%{x}<br>%{y:,} players<extra></extra>"
    }
  ];

  const layout: Partial<Layout> = {
    title: {
      text: title,
      font: {
        color: "#f3f4f6",
        family: "Sora, sans-serif",
        size: 18
      },
      x: 0,
      xanchor: "left"
    },
    paper_bgcolor: "#171717",
    plot_bgcolor: "#171717",
    margin: { t: 52, b: 44, l: 48, r: 20 },
    hovermode: "x unified",
    hoverlabel: {
      bgcolor: "#0a0a0a",
      bordercolor: "#dc2828",
      font: { color: "#f3f4f6", family: "JetBrains Mono, monospace" }
    },
    xaxis: {
      type: "date",
      range: [range.start, range.end],
      tickfont: { color: "#a3a3a3" },
      gridcolor: "rgba(255,255,255,0.02)",
      linecolor: "#262626",
      rangeslider: {
        visible: showControls,
        bgcolor: "#111111",
        bordercolor: "#262626",
        thickness: 0.09
      },
      rangeselector: showControls
        ? {
            bgcolor: "#111111",
            activecolor: "#dc2828",
            bordercolor: "#262626",
            font: { color: "#f3f4f6" },
            buttons: [
              { count: 1, label: "1M", step: "month", stepmode: "backward" },
              { count: 6, label: "6M", step: "month", stepmode: "backward" },
              { count: 1, label: "1Y", step: "year", stepmode: "backward" },
              { step: "all", label: "All" }
            ]
          }
        : undefined,
      showspikes: true,
      spikecolor: "#f3f4f6",
      spikethickness: 1,
      spikedash: "dot"
    },
    yaxis: {
      automargin: true,
      gridcolor: "#262626",
      zerolinecolor: "#262626",
      tickfont: { color: "#a3a3a3" }
    },
    showlegend: false,
    autosize: true
  };

  return (
    <div className="chart-shell">
      <Plot
        data={traces}
        layout={layout}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: ["lasso2d", "select2d", "toImage"]
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "430px" }}
        onRelayout={(event: Readonly<Record<string, unknown>>) => {
          const start = event["xaxis.range[0]"];
          const end = event["xaxis.range[1]"];
          if (typeof start === "string" && typeof end === "string") {
            onRangeChange({ start: start.slice(0, 10), end: end.slice(0, 10) });
          }
        }}
      />
    </div>
  );
}
