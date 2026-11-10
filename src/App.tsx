import { useState } from 'react';
import { CURATED_DATASETS } from './data/datasets';
import { ChartType, Dataset } from './types';
import { ChartCanvas } from './components/ChartCanvas';
import { FloatingDock } from './components/FloatingDock';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';
import { DocumentationModal } from './components/DocumentationModal';
import { CsvUploadModal } from './components/CsvUploadModal';
import { FileText, Columns2, Square } from 'lucide-react';

export function App() {
  const [datasets, setDatasets] = useState<Dataset[]>(CURATED_DATASETS);
  const [activeDataset, setActiveDataset] = useState<Dataset>(CURATED_DATASETS[0]);
  
  // Chart types
  const [primaryChartType, setPrimaryChartType] = useState<ChartType>('line');
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
    <div className="min-h-screen bg-white text-matte-black flex flex-col font-sans pb-32">
      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-2 flex flex-col">
        {/* Top Header Row with Dataset Information, Split-View Toggle and Dokumentation Button */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-matte-border pb-4">
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
            <h1 className="text-xl sm:text-2xl font-serif text-matte-black mt-1 tracking-tight">
              {activeDataset.title}
            </h1>
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

        {/* Charts Container with strict height bounds to avoid any infinite flexbox growth */}
        <div className="flex-1 w-full min-h-0">
          {!isSplitView ? (
            /* Single Hero View */
            <div className="h-[580px] w-full min-h-0">
              <ChartCanvas
                dataset={activeDataset}
                chartType={primaryChartType}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              />
            </div>
          ) : (
            /* Split View: Two Charts Side-by-Side */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[580px] min-h-0">
              {/* Left Chart A */}
              <div className="h-full min-h-0 flex flex-col">
                <ChartCanvas
                  dataset={activeDataset}
                  chartType={primaryChartType}
                  titleSuffix="A"
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />
              </div>

              {/* Right Chart B */}
              <div className="h-full min-h-0 flex flex-col">
                <ChartCanvas
                  dataset={activeDataset}
                  chartType={secondaryChartType}
                  titleSuffix="B"
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Dock: Spawns Bubble A and Bubble B at the bottom in Split View */}
      <FloatingDock
        datasets={datasets}
        activeDataset={activeDataset}
        onSelectDataset={handleDatasetChange}
        activeChartType={primaryChartType}
        onSelectChartType={setPrimaryChartType}
        secondaryChartType={secondaryChartType}
        onSelectSecondaryChartType={setSecondaryChartType}
        isSplitView={isSplitView}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

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
