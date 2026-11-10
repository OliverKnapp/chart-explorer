import { useState } from 'react';
import { CURATED_DATASETS } from './data/datasets';
import { ChartType, Dataset } from './types';
import { Navbar } from './components/Navbar';
import { ChartCanvas } from './components/ChartCanvas';
import { FloatingDock } from './components/FloatingDock';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';
import { DocumentationModal } from './components/DocumentationModal';
import { CsvUploadModal } from './components/CsvUploadModal';
import { Sparkles, ArrowRightLeft } from 'lucide-react';

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
    // Pick an intentionally bad or alternative chart for secondary
    const otherType: ChartType = dataset.recommendedType === 'pie' ? 'bar' : 'pie';
    setSecondaryChartType(otherType);
  };

  const handleAddCustomDataset = (newDataset: Dataset) => {
    setDatasets(prev => [newDataset, ...prev]);
    setActiveDataset(newDataset);
    setPrimaryChartType(newDataset.recommendedType);
  };

  // Quick preset shortcuts to test extreme anti-patterns immediately
  const handleQuickAntiPattern = (datasetId: string, chart: ChartType) => {
    const ds = datasets.find(d => d.id === datasetId);
    if (ds) {
      setActiveDataset(ds);
      setPrimaryChartType(chart);
    }
  };

  return (
    <div className="min-h-screen bg-white text-matte-black flex flex-col font-sans pb-28">
      {/* Navigation Header */}
      <Navbar onOpenDoc={() => setIsDocOpen(true)} />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Top Context & Anti-Pattern Presets */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-matte-muted">
                {activeDataset.field}
              </span>
              <span className="text-matte-border">•</span>
              <span className="text-[11px] font-mono text-cobalt font-medium">
                Empfohlen: {activeDataset.recommendedType.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-matte-black mt-0.5 tracking-tight">
              {activeDataset.title}
            </h2>
          </div>

          {/* Quick Anti-Pattern Chips */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-matte-muted mr-1 hidden md:inline">
              Schnelltest Anti-Patterns:
            </span>
            <button
              onClick={() => handleQuickAntiPattern('climate-anomaly', 'pie')}
              className="text-xs px-2.5 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>Klima im Tortendiagramm</span>
            </button>
            <button
              onClick={() => handleQuickAntiPattern('income-education', 'line')}
              className="text-xs px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
            >
              <span>Einkommen als Linie</span>
            </button>
            <button
              onClick={() => handleQuickAntiPattern('biodiversity-habitat', 'radar')}
              className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors"
            >
              <span>Arten im Spinnennetz</span>
            </button>
          </div>
        </div>

        {/* Charts Container */}
        <div className="flex-1 w-full">
          {!isSplitView ? (
            /* Single Hero View */
            <div className="h-[560px] w-full">
              <ChartCanvas
                dataset={activeDataset}
                chartType={primaryChartType}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              />
            </div>
          ) : (
            /* Split View: Two Charts Side-by-Side */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-auto lg:h-[560px]">
              {/* Left Chart */}
              <div className="h-[480px] lg:h-full flex flex-col">
                <ChartCanvas
                  dataset={activeDataset}
                  chartType={primaryChartType}
                  titleSuffix="Ansicht A"
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />
              </div>

              {/* Right Chart */}
              <div className="h-[480px] lg:h-full flex flex-col">
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="text-xs font-mono text-matte-muted uppercase flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-cobalt" />
                    Vergleichs-Diagramm B:
                  </span>
                  <div className="flex items-center space-x-1">
                    {(['bar', 'line', 'scatter', 'pie', 'radar', 'treemap', 'heatmap'] as ChartType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setSecondaryChartType(type)}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                          secondaryChartType === type
                            ? 'bg-matte-black text-white font-medium'
                            : 'bg-matte-subtle text-matte-muted hover:text-matte-black'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 h-[440px] lg:h-full">
                  <ChartCanvas
                    dataset={activeDataset}
                    chartType={secondaryChartType}
                    titleSuffix="Ansicht B"
                    onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Dock Navigation */}
      <FloatingDock
        datasets={datasets}
        activeDataset={activeDataset}
        onSelectDataset={handleDatasetChange}
        activeChartType={primaryChartType}
        onSelectChartType={setPrimaryChartType}
        isSplitView={isSplitView}
        onToggleSplitView={() => setIsSplitView(!isSplitView)}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
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
