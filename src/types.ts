export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'radar' | 'treemap' | 'heatmap';

export interface DatasetColumn {
  key: string;
  label: string;
  type: 'numeric' | 'categorical' | 'temporal';
  unit?: string;
}

export interface DiagnosticAssessment {
  status: 'optimal' | 'acceptable' | 'misleading' | 'absurd';
  headline: string;
  critique: string;
  scientificReference: string;
  lieFactorEstimate: string;
  cognitiveIssues: string[];
}

export interface Dataset {
  id: string;
  title: string;
  field: string;
  description: string;
  source: string;
  recommendedType: ChartType;
  columns: DatasetColumn[];
  data: Record<string, any>[];
  diagnostics: Record<ChartType, DiagnosticAssessment>;
}
