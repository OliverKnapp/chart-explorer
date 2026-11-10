import React from 'react';
import {
  BarChart2,
  TrendingUp,
  ScatterChart as ScatterIcon,
  PieChart as PieIcon,
  CircleDot,
  LayoutGrid,
  Grid,
  Columns2,
  Square,
  Upload,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { ChartType, Dataset } from '../types';

interface FloatingDockProps {
  datasets: Dataset[];
  activeDataset: Dataset;
  onSelectDataset: (dataset: Dataset) => void;
  activeChartType: ChartType;
  onSelectChartType: (type: ChartType) => void;
  isSplitView: boolean;
  onToggleSplitView: () => void;
  onOpenDiagnostic: () => void;
  onOpenUpload: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  datasets,
  activeDataset,
  onSelectDataset,
  activeChartType,
  onSelectChartType,
  isSplitView,
  onToggleSplitView,
  onOpenDiagnostic,
  onOpenUpload,
}) => {
  const chartButtons: { type: ChartType; label: string; icon: React.ReactNode }[] = [
    { type: 'bar', label: 'Balken', icon: <BarChart2 className="w-4 h-4" /> },
    { type: 'line', label: 'Linie', icon: <TrendingUp className="w-4 h-4" /> },
    { type: 'scatter', label: 'Streuung', icon: <ScatterIcon className="w-4 h-4" /> },
    { type: 'pie', label: 'Kreis', icon: <PieIcon className="w-4 h-4" /> },
    { type: 'radar', label: 'Radar', icon: <CircleDot className="w-4 h-4" /> },
    { type: 'treemap', label: 'Treemap', icon: <LayoutGrid className="w-4 h-4" /> },
    { type: 'heatmap', label: 'Heatmap', icon: <Grid className="w-4 h-4" /> },
  ];

  return (
    <nav aria-label="Steuerungsleiste" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-[95vw]">
      <div className="bg-white/95 backdrop-blur-md border border-matte-border rounded-2xl shadow-dock px-3 py-2 flex items-center space-x-2 sm:space-x-3">
        {/* Dataset Dropdown */}
        <div className="flex items-center space-x-1 pr-2 border-r border-matte-border">
          <BookOpen className="w-4 h-4 text-matte-muted ml-1" />
          <select
            value={activeDataset.id}
            onChange={e => {
              const selected = datasets.find(d => d.id === e.target.value);
              if (selected) onSelectDataset(selected);
            }}
            aria-label="Wissenschaftlicher Datensatz"
            className="bg-transparent text-xs font-medium text-matte-black py-1.5 px-2 rounded-lg hover:bg-matte-subtle transition-colors focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[190px] truncate"
          >
            {datasets.map(d => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="p-1.5 rounded-lg text-matte-muted hover:text-matte-black hover:bg-matte-subtle transition-colors"
            title="Eigenen CSV-Datensatz importieren"
            aria-label="Eigenen CSV-Datensatz importieren"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Chart Types Pill Selector */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          {chartButtons.map(btn => {
            const isActive = activeChartType === btn.type;
            const isRec = activeDataset.recommendedType === btn.type;
            return (
              <button
                key={btn.type}
                onClick={() => onSelectChartType(btn.type)}
                className={`relative px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
                  isActive
                    ? 'bg-matte-black text-white shadow-sm'
                    : 'text-matte-black hover:bg-matte-subtle'
                }`}
                title={`${btn.label} ${isRec ? '(Empfohlen für diesen Datensatz)' : ''}`}
                aria-label={`${btn.label}${isRec ? ' (Empfohlen für diesen Datensatz)' : ''}`}
              >
                {btn.icon}
                <span className="hidden md:inline">{btn.label}</span>
                {isRec && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-cobalt-100' : 'bg-cobalt'
                    }`}
                    title="Empfohlener Diagrammtyp"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-matte-border" />

        {/* Actions: Split-View & Diagnose */}
        <div className="flex items-center space-x-1 pl-1">
          {/* Split View Toggle */}
          <button
            onClick={onToggleSplitView}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors border ${
              isSplitView
                ? 'bg-cobalt text-white border-cobalt'
                : 'bg-white text-matte-black border-matte-border hover:bg-matte-subtle'
            }`}
            title="Side-by-Side Vergleichsansicht umschalten"
            aria-label="Side-by-Side Vergleichsansicht umschalten"
          >
            {isSplitView ? <Square className="w-3.5 h-3.5" /> : <Columns2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isSplitView ? 'Hero' : 'Split-View'}</span>
          </button>

          {/* Diagnose Button */}
          <button
            onClick={onOpenDiagnostic}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 bg-matte-black hover:bg-zinc-800 text-white transition-colors"
            title="Wissenschaftliche Fehleranalyse öffnen"
            aria-label="Wissenschaftliche Fehleranalyse öffnen"
          >
            <Sparkles className="w-3.5 h-3.5 text-cobalt-100" />
            <span className="hidden sm:inline">Diagnose</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
