import React from 'react';
import {
  BarChart2,
  TrendingUp,
  ScatterChart as ScatterIcon,
  PieChart as PieIcon,
  CircleDot,
  LayoutGrid,
  Grid,
  Upload,
  BookOpen,
} from 'lucide-react';
import { ChartType, Dataset } from '../types';

interface ChartControlBubbleProps {
  label?: string; // e.g. 'A' or 'B'
  badgeColor?: 'black' | 'cobalt';
  datasets?: Dataset[];
  activeDataset?: Dataset;
  onSelectDataset?: (dataset: Dataset) => void;
  onOpenUpload?: () => void;
  activeChartType: ChartType;
  onSelectChartType: (type: ChartType) => void;
  recommendedType?: ChartType;
}

export const ChartControlBubble: React.FC<ChartControlBubbleProps> = ({
  label,
  badgeColor = 'black',
  datasets,
  activeDataset,
  onSelectDataset,
  onOpenUpload,
  activeChartType,
  onSelectChartType,
  recommendedType,
}) => {
  const chartButtons: { type: ChartType; label: string; icon: React.ReactNode }[] = [
    { type: 'bar', label: 'Balken', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { type: 'line', label: 'Linie', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { type: 'scatter', label: 'Streuung', icon: <ScatterIcon className="w-3.5 h-3.5" /> },
    { type: 'pie', label: 'Kreis', icon: <PieIcon className="w-3.5 h-3.5" /> },
    { type: 'radar', label: 'Radar', icon: <CircleDot className="w-3.5 h-3.5" /> },
    { type: 'treemap', label: 'Treemap', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { type: 'heatmap', label: 'Heatmap', icon: <Grid className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-matte-border rounded-2xl shadow-dock p-3 flex flex-col sm:flex-row items-center gap-3">
      {/* Optional Left Section: Badge & Dataset Selector */}
      <div className="flex items-center space-x-2 shrink-0">
        {label && (
          <span
            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded text-white ${
              badgeColor === 'cobalt' ? 'bg-cobalt' : 'bg-matte-black'
            }`}
          >
            {label}
          </span>
        )}

        {/* Dataset Dropdown & Upload (when provided) */}
        {datasets && activeDataset && onSelectDataset && (
          <div className="flex items-center space-x-1 border-r border-matte-border pr-2">
            <BookOpen className="w-3.5 h-3.5 text-matte-muted ml-0.5" />
            <select
              value={activeDataset.id}
              onChange={e => {
                const selected = datasets.find(d => d.id === e.target.value);
                if (selected) onSelectDataset(selected);
              }}
              aria-label="Datensatz"
              className="bg-transparent text-xs font-medium text-matte-black py-1 px-1.5 rounded-lg hover:bg-matte-subtle transition-colors focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[160px] truncate"
            >
              {datasets.map(d => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>

            {onOpenUpload && (
              <button
                onClick={onOpenUpload}
                className="p-1 rounded-lg text-matte-muted hover:text-matte-black hover:bg-matte-subtle transition-colors cursor-pointer"
                title="Eigenen CSV-Datensatz importieren"
                aria-label="CSV-Import"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Chart Types: Flex Wrap into new rows when constrained, ZERO horizontal scroll! */}
      <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-start">
        {chartButtons.map(btn => {
          const isActive = activeChartType === btn.type;
          const isRec = recommendedType === btn.type;
          return (
            <button
              key={btn.type}
              onClick={() => onSelectChartType(btn.type)}
              className={`relative px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                isActive
                  ? badgeColor === 'cobalt'
                    ? 'bg-cobalt text-white shadow-sm'
                    : 'bg-matte-black text-white shadow-sm'
                  : 'text-matte-black hover:bg-matte-subtle border border-transparent hover:border-matte-border/50'
              }`}
              title={`${btn.label} ${isRec ? '(Empfohlen)' : ''}`}
            >
              {btn.icon}
              <span>{btn.label}</span>
              {isRec && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white' : 'bg-cobalt'
                  }`}
                  title="Empfohlener Diagrammtyp"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
