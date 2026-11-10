import React from 'react';
import { X, AlertCircle, CheckCircle2, AlertTriangle, XCircle, BookOpen, Scale, Eye } from 'lucide-react';
import { ChartType, Dataset } from '../types';

interface DiagnosticDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset;
  primaryChartType: ChartType;
  secondaryChartType?: ChartType;
  isSplitView: boolean;
}

export const DiagnosticDrawer: React.FC<DiagnosticDrawerProps> = ({
  isOpen,
  onClose,
  dataset,
  primaryChartType,
  secondaryChartType,
  isSplitView,
}) => {
  if (!isOpen) return null;

  const primaryDiagnostic = dataset.diagnostics[primaryChartType];
  const secondaryDiagnostic = secondaryChartType ? dataset.diagnostics[secondaryChartType] : null;

  const chartLabels: Record<ChartType, string> = {
    bar: 'Balkendiagramm',
    line: 'Liniendiagramm',
    scatter: 'Streudiagramm',
    pie: 'Kreis- / Donutdiagramm',
    radar: 'Radar- / Spinnendiagramm',
    treemap: 'Treemap (Kacheldiagramm)',
    heatmap: 'Heatmap (Matrix)',
  };

  const renderStatusBadge = (status: 'optimal' | 'acceptable' | 'misleading' | 'absurd') => {
    switch (status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Methodisch Optimal
          </span>
        );
      case 'acceptable':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-600" />
            Akzeptabel
          </span>
        );
      case 'misleading':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Irreführend / Verzerrt
          </span>
        );
      case 'absurd':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Absurd / Anti-Pattern
          </span>
        );
    }
  };

  const renderDiagnosticBlock = (type: ChartType, diag: typeof primaryDiagnostic | null | undefined) => {
    if (!diag) return null;

    return (
      <div className="space-y-4 border border-matte-border rounded-xl p-5 bg-white shadow-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-bold text-matte-black">{chartLabels[type]}</h4>
            {type === dataset.recommendedType && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cobalt-50 text-cobalt border border-cobalt-100">
                Empfehlung
              </span>
            )}
          </div>
          {renderStatusBadge(diag.status)}
        </div>

        <div>
          <h5 className="text-xs font-semibold text-matte-black font-serif text-base mb-1">
            {diag.headline}
          </h5>
          <p className="text-xs text-matte-muted leading-relaxed">
            {diag.critique}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="border border-matte-border/70 rounded-lg p-3 bg-zinc-50/50">
            <div className="flex items-center space-x-1.5 text-matte-muted mb-1">
              <Scale className="w-3.5 h-3.5 text-matte-black" />
              <span className="text-[11px] font-medium uppercase font-mono">Tufte Lie Factor</span>
            </div>
            <div className="text-xs font-mono font-semibold text-matte-black">
              {diag.lieFactorEstimate}
            </div>
          </div>

          <div className="border border-matte-border/70 rounded-lg p-3 bg-zinc-50/50">
            <div className="flex items-center space-x-1.5 text-matte-muted mb-1">
              <Eye className="w-3.5 h-3.5 text-cobalt" />
              <span className="text-[11px] font-medium uppercase font-mono">Wahrnehmung</span>
            </div>
            <div className="text-xs text-matte-black font-medium truncate">
              {diag.scientificReference.split(':')[0]}
            </div>
          </div>
        </div>

        {/* Cognitive Issues Checklist */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-matte-black uppercase tracking-wider block mb-2 font-mono">
            Kognitive Schwachstellen & Risiken:
          </span>
          <ul className="space-y-1.5">
            {diag.cognitiveIssues.map((issue, idx) => (
              <li key={idx} className="text-xs text-matte-muted flex items-start space-x-2">
                <span className="text-matte-black font-bold">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scientific Citation */}
        <div className="border-t border-matte-border/60 pt-3 flex items-start space-x-2 text-[11px] text-matte-muted">
          <BookOpen className="w-3.5 h-3.5 text-cobalt shrink-0 mt-0.5" />
          <span className="italic">
            <strong>Theoretischer Bezug:</strong> {diag.scientificReference}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-drawer border-l border-matte-border flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-matte-border flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cobalt" />
              <h3 className="text-base font-semibold text-matte-black">
                Wissenschaftliche Diagnose
              </h3>
            </div>
            <p className="text-xs text-matte-muted mt-0.5">
              Evaluation nach Tufte & Cleveland-McGill Kriterien
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-matte-muted hover:text-matte-black hover:bg-matte-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Dataset Overview */}
          <div className="bg-matte-subtle border border-matte-border rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-matte-muted tracking-wider block mb-1">
              Aktiver Datensatz
            </span>
            <h4 className="text-sm font-bold text-matte-black">{dataset.title}</h4>
            <p className="text-xs text-matte-muted mt-1 leading-relaxed">
              {dataset.description}
            </p>
            <div className="mt-2 text-[11px] text-matte-muted border-t border-matte-border/50 pt-2 font-mono">
              Quelle: {dataset.source}
            </div>
          </div>

          {/* Primary Chart Diagnosis */}
          {renderDiagnosticBlock(primaryChartType, primaryDiagnostic)}

          {/* Secondary Chart Diagnosis in Split View */}
          {isSplitView && secondaryChartType && (
            <div>
              <div className="flex items-center space-x-2 my-4">
                <div className="h-[1px] flex-1 bg-matte-border" />
                <span className="text-xs font-mono text-matte-muted uppercase">
                  Vergleichs-Diagramm
                </span>
                <div className="h-[1px] flex-1 bg-matte-border" />
              </div>
              {renderDiagnosticBlock(secondaryChartType, secondaryDiagnostic)}
            </div>
          )}

          {/* Educational Principles Footnote */}
          <div className="border border-matte-border rounded-xl p-4 bg-zinc-50/50 text-xs text-matte-muted space-y-2">
            <h5 className="font-semibold text-matte-black text-xs font-sans">
              Die zwei Denkweisen in Chart-Explorer
            </h5>
            <p>
              <strong>Scientific Thinking:</strong> Basiert auf der formalen Analyse von Skalenniveaus (Stevens 1946) und empirischer Wahrnehmungsgenauigkeit (Cleveland & McGill 1984).
            </p>
            <p>
              <strong>Creative Thinking:</strong> Erlaubt das gezielte Übertreten dieser Regeln, um durch das provokante Erzeugen visueller Dissonanz ein tieferes Verständnis für Informationsintegrität zu schaffen.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-matte-border bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-matte-black text-white hover:bg-zinc-800 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
