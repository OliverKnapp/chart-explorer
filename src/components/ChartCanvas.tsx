import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { ChartType, Dataset } from '../types';
import { buildEChartsOption } from '../utils/echartsOptionBuilder';
import { AlertCircle, CheckCircle2, AlertTriangle, XCircle, Info, SlidersHorizontal } from 'lucide-react';

interface ChartCanvasProps {
  dataset: Dataset;
  chartType: ChartType;
  titleSuffix?: string;
  onOpenDiagnostic: () => void;
  onChartTypeChange?: (type: ChartType) => void;
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({
  dataset,
  chartType,
  titleSuffix,
  onOpenDiagnostic,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  // Column mapping states
  const [selectedX, setSelectedX] = useState<string>(dataset.columns[0]?.key || '');
  const [selectedY, setSelectedY] = useState<string>(
    dataset.columns.find(c => c.type === 'numeric')?.key || dataset.columns[1]?.key || ''
  );
  const [showMapping, setShowMapping] = useState<boolean>(false);

  // Reset mapping when dataset changes
  useEffect(() => {
    setSelectedX(dataset.columns[0]?.key || '');
    setSelectedY(dataset.columns.find(c => c.type === 'numeric')?.key || dataset.columns[1]?.key || '');
  }, [dataset.id]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current, undefined, {
        renderer: 'canvas',
      });
    }

    const option = buildEChartsOption(dataset, chartType, selectedX, selectedY);
    // Use notMerge: false so universalTransition can smoothly interpolate series
    chartInstanceRef.current.setOption(option, { notMerge: false, lazyUpdate: false });

    const resizeObserver = new ResizeObserver(() => {
      chartInstanceRef.current?.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [dataset, chartType, selectedX, selectedY]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  const diagnostic = dataset.diagnostics[chartType];

  const getStatusBadge = () => {
    if (!diagnostic) return null;

    switch (diagnostic.status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Optimal
          </span>
        );
      case 'acceptable':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
            <Info className="w-3.5 h-3.5 text-zinc-600" />
            Akzeptabel
          </span>
        );
      case 'misleading':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Irreführend
          </span>
        );
      case 'absurd':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Absurd / Anti-Pattern
          </span>
        );
    }
  };

  const chartLabels: Record<ChartType, string> = {
    bar: 'Balkendiagramm',
    line: 'Liniendiagramm',
    scatter: 'Streudiagramm',
    pie: 'Kreis- / Donutdiagramm',
    radar: 'Radar- / Spinnendiagramm',
    treemap: 'Treemap (Kacheldiagramm)',
    heatmap: 'Heatmap (Matrix)',
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-matte-border shadow-subtle overflow-hidden">
      {/* Top Header */}
      <div className="px-5 py-3.5 border-b border-matte-border flex items-center justify-between bg-white">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-semibold text-matte-black">
              {chartLabels[chartType]}
              {titleSuffix && <span className="text-matte-muted ml-1 font-normal">({titleSuffix})</span>}
            </h2>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-matte-muted mt-0.5 truncate max-w-md">
            {dataset.title}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mapping Toggle */}
          <button
            onClick={() => setShowMapping(!showMapping)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              showMapping
                ? 'bg-matte-black text-white border-matte-black'
                : 'bg-white text-matte-muted hover:text-matte-black border-matte-border hover:bg-matte-subtle'
            }`}
            title="Achsen- und Spaltenzuordnung anpassen"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Achsen</span>
          </button>

          {/* Quick Diagnose CTA */}
          <button
            onClick={onOpenDiagnostic}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-matte-border bg-matte-subtle hover:bg-zinc-200 text-matte-black font-medium transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5 text-cobalt" />
            <span>Analyse</span>
          </button>
        </div>
      </div>

      {/* Optional Axis Mapping Bar */}
      {showMapping && (
        <div className="px-5 py-2.5 bg-matte-subtle border-b border-matte-border flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-matte-muted font-medium">Primär-Achse / Kategorie (X):</span>
            <select
              value={selectedX}
              onChange={e => setSelectedX(e.target.value)}
              className="bg-white border border-matte-border rounded px-2 py-1 text-xs text-matte-black focus:outline-none focus:border-cobalt"
            >
              {dataset.columns.map(col => (
                <option key={col.key} value={col.key}>
                  {col.label} ({col.type})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-matte-muted font-medium">Wert-Achse / Metrik (Y):</span>
            <select
              value={selectedY}
              onChange={e => setSelectedY(e.target.value)}
              className="bg-white border border-matte-border rounded px-2 py-1 text-xs text-matte-black focus:outline-none focus:border-cobalt"
            >
              {dataset.columns.map(col => (
                <option key={col.key} value={col.key}>
                  {col.label} {col.unit ? `[${col.unit}]` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main ECharts Canvas */}
      <div className="flex-1 w-full min-h-[380px] p-2 relative bg-white">
        <div ref={chartRef} className="w-full h-full" />
      </div>

      {/* Bottom Sub-Bar: Headline of Diagnostic */}
      <div className="px-5 py-2 border-t border-matte-border/60 bg-zinc-50/50 flex items-center justify-between text-xs">
        <span className="text-matte-muted truncate font-mono text-[11px]">
          {diagnostic ? diagnostic.headline : 'Keine Bewertung verfügbar'}
        </span>
        <button
          onClick={onOpenDiagnostic}
          className="text-cobalt hover:underline text-[11px] font-medium shrink-0 ml-3"
        >
          Details $\rightarrow$
        </button>
      </div>
    </div>
  );
};
