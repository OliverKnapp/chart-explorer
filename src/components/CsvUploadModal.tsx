import React, { useState } from 'react';
import Papa from 'papaparse';
import { X, Upload, FileSpreadsheet, Check } from 'lucide-react';
import { ChartType, Dataset, DatasetColumn } from '../types';

interface CsvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDatasetUploaded: (dataset: Dataset) => void;
}

export const CsvUploadModal: React.FC<CsvUploadModalProps> = ({
  isOpen,
  onClose,
  onDatasetUploaded,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    setError(null);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        if (!results.data || results.data.length === 0) {
          setError('Die CSV-Datei enthält keine lesbaren Daten.');
          return;
        }

        const rawRows = results.data as Record<string, any>[];
        const fields = results.meta.fields || Object.keys(rawRows[0] || {});

        if (fields.length < 2) {
          setError('Die CSV-Datei muss mindestens zwei Spalten enthalten.');
          return;
        }

        // Infer columns
        const columns: DatasetColumn[] = fields.map(key => {
          const sampleVal = rawRows.find(r => r[key] !== null && r[key] !== undefined)?.[key];
          let type: 'numeric' | 'categorical' | 'temporal' = 'categorical';

          if (typeof sampleVal === 'number') {
            type = 'numeric';
          } else if (
            typeof sampleVal === 'string' &&
            (/\b(19|20)\d{2}\b/.test(sampleVal) || !isNaN(Date.parse(sampleVal)))
          ) {
            type = 'temporal';
          }

          return {
            key,
            label: key,
            type,
          };
        });

        // Determine recommended type
        const hasTemporal = columns.some(c => c.type === 'temporal');
        const recommendedType: ChartType = hasTemporal ? 'line' : 'bar';

        const customDataset: Dataset = {
          id: `custom-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          field: 'Benutzerdefinierter Datensatz (CSV)',
          description: `Vom Nutzer importierte Datei mit ${rawRows.length} Datenpunkten und ${columns.length} Spalten.`,
          source: 'Lokaler Upload',
          recommendedType,
          columns,
          data: rawRows.slice(0, 50), // Cap at 50 rows for optimal performance
          diagnostics: {
            bar: {
              status: recommendedType === 'bar' ? 'optimal' : 'acceptable',
              headline: 'Kategoriale Balkenprojektion',
              critique: 'Stellt diskrete Werte entlang der Basislinie gegenüber.',
              scientificReference: 'Cleveland & McGill (1984)',
              lieFactorEstimate: '1.00',
              cognitiveIssues: ['Standard-Kategorisierung']
            },
            line: {
              status: recommendedType === 'line' ? 'optimal' : 'misleading',
              headline: 'Kontinuierliche Linienprojektion',
              critique: hasTemporal
                ? 'Ideale Abbildung zeitlicher Dynamiken.'
                : 'Verbindung unzusammenhängender Kategorien täuscht falschen Trend vor.',
              scientificReference: 'Cairo (2019): "How Charts Lie"',
              lieFactorEstimate: hasTemporal ? '1.00' : '1.50',
              cognitiveIssues: hasTemporal ? ['Keine'] : ['Scheinbare Kontinuität']
            },
            scatter: {
              status: 'acceptable',
              headline: 'Punktstreuung',
              critique: 'Reine Darstellung ohne Interpolation.',
              scientificReference: 'Wilkinson (2005)',
              lieFactorEstimate: '1.00',
              cognitiveIssues: ['Fehlende Trendführung']
            },
            pie: {
              status: 'absurd',
              headline: 'Unzulässige Kreisteilung',
              critique: 'Addition nicht-relationaler Messwerte zu einer 360°-Scheibe.',
              scientificReference: 'Tufte (1983)',
              lieFactorEstimate: '2.50',
              cognitiveIssues: ['Winkelverzerrung', 'Unleserliche Beschriftung']
            },
            radar: {
              status: 'misleading',
              headline: 'Polare Netzverzerrung',
              critique: 'Polygonfläche verzerrt proportionale Wahrnehmung.',
              scientificReference: 'Few (2005)',
              lieFactorEstimate: '2.20',
              cognitiveIssues: ['Flächenillusion']
            },
            treemap: {
              status: 'acceptable',
              headline: 'Flächenkachelung',
              critique: 'Visualisiert relative Größenordnungen über Rechtecke.',
              scientificReference: 'Shneiderman (1992)',
              lieFactorEstimate: '1.30',
              cognitiveIssues: ['Flächenvergleich ungenauer als Längen']
            },
            heatmap: {
              status: 'acceptable',
              headline: 'Farbwert-Matrix',
              critique: 'Quantitäten codiert über Helligkeitswerte.',
              scientificReference: 'Ware (2012)',
              lieFactorEstimate: '1.20',
              cognitiveIssues: ['Farbwahrnehmung subjektiv']
            }
          }
        };

        onDatasetUploaded(customDataset);
        onClose();
      },
      error: err => {
        setError(`Fehler beim Parsen der CSV: ${err.message}`);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-matte-border shadow-dock p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-matte-muted hover:text-matte-black hover:bg-matte-subtle transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center border border-cobalt-100">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-matte-black">
              Eigenen CSV-Datensatz importieren
            </h3>
            <p className="text-xs text-matte-muted">
              Lade deine Daten hoch und erzwinge sie in beliebige Diagrammtypen
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <div
          onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? 'border-cobalt bg-cobalt-50/30'
              : 'border-matte-border hover:border-matte-black/40 bg-zinc-50/50'
          }`}
          onClick={() => {
            const input = document.getElementById('csv-file-input') as HTMLInputElement;
            input?.click();
          }}
        >
          <input
            id="csv-file-input"
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={e => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <Upload className="w-8 h-8 mx-auto text-matte-muted mb-2" />
          <p className="text-xs font-semibold text-matte-black">
            Klicke hier oder ziehe eine .CSV-Datei hinein
          </p>
          <p className="text-[11px] text-matte-muted mt-1">
            Unterstützt Standard-Tabellen mit Spaltenüberschriften (z. B. Zeit, Kategorien, Zahlenwerte).
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-matte-border flex items-center justify-between text-xs text-matte-muted">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-cobalt" />
            100% Client-seitige Verarbeitung
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-matte-border hover:bg-matte-subtle text-matte-black transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};
