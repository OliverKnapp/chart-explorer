import { useState } from 'react';
import { CURATED_DATASETS } from './data/datasets';
import { ChartType, Dataset } from './types';
import { ChartCanvas } from './components/ChartCanvas';
import { ChartControlBubble } from './components/ChartControlBubble';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';
import { DocumentationModal } from './components/DocumentationModal';
import { CsvUploadModal } from './components/CsvUploadModal';
import { FileText, Columns2, Square, BookOpen, ExternalLink } from 'lucide-react';

export function App() {
  const [datasets, setDatasets] = useState<Dataset[]>(CURATED_DATASETS);
  const [activeDataset, setActiveDataset] = useState<Dataset>(CURATED_DATASETS[0]);
  
  // Chart types
  const [primaryChartType, setPrimaryChartType] = useState<ChartType>(CURATED_DATASETS[0].recommendedType);
  const [secondaryChartType, setSecondaryChartType] = useState<ChartType>('pie');
  
  // Views and Modals
  const [isSplitView, setIsSplitView] = useState<boolean>(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);
  const [isDocOpen, setIsDocOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  const handleDatasetChange = (dataset: Dataset) => {
    setActiveDataset(dataset);
    setPrimaryChartType(dataset.recommendedType);
    const otherType: ChartType = dataset.recommendedType === 'pie' ? 'bar' : 'pie';
    setSecondaryChartType(otherType);
  };

  const handleAddCustomDataset = (newDataset: Dataset) => {
    setDatasets(prev => [newDataset, ...prev]);
    setActiveDataset(newDataset);
    setPrimaryChartType(newDataset.recommendedType);
  };

  return (
    <div className="min-h-screen bg-white text-matte-black flex flex-col font-sans pb-16">
      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-6 flex flex-col">
        {/* Top Header Row with Dataset Title, Source, Split-View Toggle and Dokumentation */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-matte-border pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-tight text-matte-black font-sans">
                Chart-Explorer
              </span>
              <span className="text-matte-border font-mono">•</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-matte-muted">
                {activeDataset.field}
              </span>
              <span className="text-matte-border font-mono">•</span>
              <span className="text-[11px] font-mono text-cobalt font-medium">
                Empfohlen: {activeDataset.recommendedType.toUpperCase()}
              </span>
            </div>
            
            {/* Title and Source Badge side-by-side */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mt-1.5">
              <h1 className="text-xl sm:text-2xl font-serif text-matte-black tracking-tight">
                {activeDataset.title}
              </h1>
              {activeDataset.sourceUrl ? (
                <a
                  href={activeDataset.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-matte-black hover:text-cobalt bg-matte-subtle hover:bg-zinc-200 border border-matte-border px-2.5 py-0.5 rounded-lg font-mono transition-colors group cursor-pointer"
                  title={`Originalquelle öffnen: ${activeDataset.sourceUrl}`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-cobalt group-hover:scale-105 transition-transform" />
                  <span>Quelle: {activeDataset.source}</span>
                  <ExternalLink className="w-3 h-3 text-matte-muted group-hover:text-cobalt ml-0.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-matte-muted bg-matte-subtle border border-matte-border px-2.5 py-0.5 rounded-lg font-mono">
                  <BookOpen className="w-3.5 h-3.5 text-cobalt" />
                  <span>Quelle: {activeDataset.source}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action buttons: Split-View Toggle and Dokumentation */}
          <div className="flex items-center space-x-2.5 self-start sm:self-auto shrink-0">
            {/* Split View Button */}
            <button
              onClick={() => setIsSplitView(!isSplitView)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                isSplitView
                  ? 'bg-cobalt text-white border-cobalt shadow-sm'
                  : 'bg-white text-matte-black border-matte-border hover:bg-matte-subtle shadow-subtle'
              }`}
              title="Side-by-Side Vergleichsansicht"
            >
              {isSplitView ? <Square className="w-3.5 h-3.5" /> : <Columns2 className="w-3.5 h-3.5" />}
              <span>{isSplitView ? 'Hero-Ansicht' : 'Split-View'}</span>
            </button>

            {/* Dokumentation Button */}
            <button
              onClick={() => setIsDocOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-matte-black hover:text-cobalt bg-white hover:bg-matte-subtle border border-matte-border px-3.5 py-2 rounded-xl transition-all shadow-subtle cursor-pointer"
            >
              <FileText className="w-4 h-4 text-matte-black" />
              <span>Dokumentation</span>
            </button>
          </div>
        </div>

        {/* Dynamic Canvas & Settings View */}
        {!isSplitView ? (
          /* Single Hero View: Chart on top, Control Bubble directly underneath */
          <div className="flex flex-col space-y-4">
            <div className="h-[560px] w-full min-h-0">
              <ChartCanvas
                dataset={activeDataset}
                chartType={primaryChartType}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              />
            </div>

            {/* Single Bubble directly below Hero Chart */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-4xl">
                <ChartControlBubble
                  datasets={datasets}
                  activeDataset={activeDataset}
                  onSelectDataset={handleDatasetChange}
                  onOpenUpload={() => setIsUploadOpen(true)}
                  activeChartType={primaryChartType}
                  onSelectChartType={setPrimaryChartType}
                  recommendedType={activeDataset.recommendedType}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Split View: Two Columns Side-by-Side, each with its chart and its own bubble underneath */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column A */}
            <div className="flex flex-col space-y-4 min-h-0">
              <div className="h-[500px] w-full min-h-0">
                <ChartCanvas
                  dataset={activeDataset}
                  chartType={primaryChartType}
                  titleSuffix="A"
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />
              </div>

              {/* Bubble A: Directly below Diagram A */}
              <ChartControlBubble
                label="A"
                badgeColor="black"
                datasets={datasets}
                activeDataset={activeDataset}
                onSelectDataset={handleDatasetChange}
                onOpenUpload={() => setIsUploadOpen(true)}
                activeChartType={primaryChartType}
                onSelectChartType={setPrimaryChartType}
                recommendedType={activeDataset.recommendedType}
              />
            </div>

            {/* Column B */}
            <div className="flex flex-col space-y-4 min-h-0">
              <div className="h-[500px] w-full min-h-0">
                <ChartCanvas
                  dataset={activeDataset}
                  chartType={secondaryChartType}
                  titleSuffix="B"
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />
              </div>

              {/* Bubble B: Directly below Diagram B */}
              <ChartControlBubble
                label="B"
                badgeColor="cobalt"
                activeChartType={secondaryChartType}
                onSelectChartType={setSecondaryChartType}
                recommendedType={activeDataset.recommendedType}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      <DiagnosticDrawer
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        dataset={activeDataset}
        primaryChartType={primaryChartType}
        secondaryChartType={secondaryChartType}
        isSplitView={isSplitView}
      />

      <DocumentationModal
        isOpen={isDocOpen}
        onClose={() => setIsDocOpen(false)}
      />

      <CsvUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDatasetUploaded={handleAddCustomDataset}
      />
    </div>
  );
}

export default App;
