import { EChartsOption } from 'echarts';
import { ChartType, Dataset } from '../types';

const COBALT = '#0047AB';
const MATTE_BLACK = '#121212';
const MATTE_GRAY = '#71717A';
const MATTE_LIGHT_GRAY = '#E4E4E7';

export function buildEChartsOption(
  dataset: Dataset,
  chartType: ChartType,
  selectedXKey?: string,
  selectedYKey?: string
): EChartsOption {
  // Determine X and Y columns with safe fallbacks
  const xCol = dataset.columns.find(c => c.key === selectedXKey) || dataset.columns[0] || { key: 'x', label: 'X', type: 'categorical' as const };
  const yCol = dataset.columns.find(c => c.key === selectedYKey) || dataset.columns.find(c => c.type === 'numeric') || dataset.columns[1] || dataset.columns[0] || { key: 'y', label: 'Y', type: 'numeric' as const };

  const xKey = xCol.key;
  const yKey = yCol.key;

  const rawData = dataset.data || [];

  // Consistent high-performance animation configuration
  const baseAnimation = {
    animation: true,
    animationDuration: 700,
    animationDurationUpdate: 700,
    animationEasing: 'cubicOut' as const,
    animationEasingUpdate: 'cubicOut' as const,
  };

  const commonTooltip = {
    trigger: 'item' as const,
    backgroundColor: '#FFFFFF',
    borderColor: MATTE_LIGHT_GRAY,
    borderWidth: 1,
    padding: [10, 14],
    textStyle: {
      color: MATTE_BLACK,
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
    },
    extraCssText: 'box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.08); border-radius: 8px;',
  };

  const monochromeColors = [
    COBALT,
    '#18181B',
    '#3F3F46',
    '#52525B',
    '#71717A',
    '#A1A1AA',
    '#27272A',
    '#003887',
  ];

  switch (chartType) {
    case 'bar': {
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        grid: { top: 40, right: 30, bottom: 60, left: 60, containLabel: true },
        xAxis: {
          type: 'category',
          data: rawData.map(d => String(d[xKey] ?? '')),
          axisLine: { lineStyle: { color: MATTE_LIGHT_GRAY } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'Inter, sans-serif', fontSize: 11, rotate: rawData.length > 8 ? 30 : 0 },
          axisTick: { show: false },
        },
        yAxis: {
          type: 'value',
          name: yCol.unit ? `(${yCol.unit})` : undefined,
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#F4F4F5', type: 'dashed' } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 },
        },
        series: [
          {
            type: 'bar',
            id: 'bar-series',
            data: rawData.map((d, i) => ({
              id: `bar-${i}`,
              name: String(d[xKey] ?? ''),
              value: Number(d[yKey]) || 0,
              itemStyle: {
                color: i === 0 ? COBALT : monochromeColors[i % monochromeColors.length],
                borderRadius: [4, 4, 0, 0],
              },
            })),
            barMaxWidth: 38,
            animationDuration: 750,
            animationEasing: 'cubicOut',
          },
        ],
      };
    }

    case 'line': {
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        grid: { top: 40, right: 30, bottom: 60, left: 60, containLabel: true },
        xAxis: {
          type: 'category',
          data: rawData.map(d => String(d[xKey] ?? '')),
          axisLine: { lineStyle: { color: MATTE_LIGHT_GRAY } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'Inter, sans-serif', fontSize: 11, rotate: rawData.length > 8 ? 30 : 0 },
          axisTick: { show: false },
        },
        yAxis: {
          type: 'value',
          name: yCol.unit ? `(${yCol.unit})` : undefined,
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#F4F4F5', type: 'dashed' } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 },
        },
        series: [
          {
            type: 'line',
            id: 'line-series',
            smooth: 0.2,
            data: rawData.map((d, i) => ({
              id: `line-${i}`,
              name: String(d[xKey] ?? ''),
              value: Number(d[yKey]) || 0,
              itemStyle: {
                color: i === 0 ? COBALT : MATTE_BLACK,
                borderColor: '#FFFFFF',
                borderWidth: 2,
              },
            })),
            lineStyle: {
              color: COBALT,
              width: 2.5,
            },
            symbolSize: 8,
            animationDuration: 750,
            animationEasing: 'cubicOut',
          },
        ],
      };
    }

    case 'scatter': {
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        grid: { top: 40, right: 30, bottom: 60, left: 60, containLabel: true },
        xAxis: {
          type: 'category',
          data: rawData.map(d => String(d[xKey] ?? '')),
          axisLine: { lineStyle: { color: MATTE_LIGHT_GRAY } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'Inter, sans-serif', fontSize: 11, rotate: rawData.length > 8 ? 30 : 0 },
        },
        yAxis: {
          type: 'value',
          name: yCol.unit ? `(${yCol.unit})` : undefined,
          splitLine: { lineStyle: { color: '#F4F4F5', type: 'dashed' } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 },
        },
        series: [
          {
            type: 'scatter',
            id: 'scatter-series',
            symbolSize: 14,
            data: rawData.map((d, i) => ({
              id: `scatter-${i}`,
              name: String(d[xKey] ?? ''),
              value: Number(d[yKey]) || 0,
              itemStyle: {
                color: i % 2 === 0 ? COBALT : MATTE_BLACK,
                borderColor: '#FFFFFF',
                borderWidth: 1.5,
              },
            })),
            animationDuration: 750,
            animationEasing: 'cubicOut',
          },
        ],
      };
    }

    case 'pie': {
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        series: [
          {
            type: 'pie',
            id: 'pie-series',
            radius: ['35%', '70%'],
            center: ['50%', '50%'],
            animationType: 'expansion',
            animationDuration: 750,
            animationEasing: 'cubicOut',
            itemStyle: {
              borderRadius: 3,
              borderColor: '#FFFFFF',
              borderWidth: 2,
            },
            label: {
              color: MATTE_BLACK,
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              formatter: '{b}: {c}',
            },
            data: rawData.map((d, i) => ({
              id: `pie-${i}`,
              name: String(d[xKey] ?? ''),
              value: Math.max(0.01, Math.abs(Number(d[yKey])) || 0.1),
              itemStyle: {
                color: monochromeColors[i % monochromeColors.length],
              },
            })),
          },
        ],
      };
    }

    case 'treemap': {
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        series: [
          {
            type: 'treemap',
            id: 'treemap-series',
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            animationDuration: 750,
            animationEasing: 'cubicOut',
            itemStyle: {
              borderColor: '#FFFFFF',
              borderWidth: 2,
              gapWidth: 2,
            },
            data: rawData.map((d, i) => ({
              id: `treemap-${i}`,
              name: String(d[xKey] ?? ''),
              value: Math.max(0.01, Math.abs(Number(d[yKey])) || 0.1),
              itemStyle: {
                color: monochromeColors[i % monochromeColors.length],
              },
            })),
          },
        ],
      };
    }

    case 'radar': {
      const numbers = rawData.map(d => Math.abs(Number(d[yKey])) || 0);
      const maxVal = Math.max(1, ...numbers) * 1.15;
      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        radar: {
          indicator: rawData.map(d => ({
            name: String(d[xKey] ?? ''),
            max: maxVal,
          })),
          axisName: {
            color: MATTE_GRAY,
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
          },
          splitLine: {
            lineStyle: {
              color: MATTE_LIGHT_GRAY,
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#FFFFFF', '#FAFAFA'],
            },
          },
          axisLine: {
            lineStyle: {
              color: MATTE_LIGHT_GRAY,
            },
          },
        },
        series: [
          {
            type: 'radar',
            id: 'radar-series',
            animationDuration: 750,
            animationEasing: 'cubicOut',
            data: [
              {
                value: rawData.map(d => Math.abs(Number(d[yKey])) || 0),
                name: yCol.label,
                itemStyle: {
                  color: COBALT,
                },
                lineStyle: {
                  color: COBALT,
                  width: 2,
                },
                areaStyle: {
                  color: 'rgba(0, 71, 171, 0.12)',
                },
              },
            ],
          },
        ],
      };
    }

    case 'heatmap': {
      const categories = rawData.map(d => String(d[xKey] ?? ''));
      const metrics = [yCol.label, 'Referenz'];
      const heatmapData: [number, number, number][] = [];

      rawData.forEach((_, i) => {
        const val = Math.abs(Number(rawData[i]?.[yKey])) || 0;
        heatmapData.push([i, 0, val]);
        heatmapData.push([i, 1, Math.round(val * 0.75)]);
      });

      const maxVal = Math.max(1, ...rawData.map(d => Math.abs(Number(d[yKey])) || 0));

      return {
        ...baseAnimation,
        tooltip: commonTooltip,
        grid: { top: 40, right: 30, bottom: 60, left: 80, containLabel: true },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: { lineStyle: { color: MATTE_LIGHT_GRAY } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'Inter, sans-serif', fontSize: 10, rotate: rawData.length > 8 ? 35 : 0 },
        },
        yAxis: {
          type: 'category',
          data: metrics,
          axisLine: { lineStyle: { color: MATTE_LIGHT_GRAY } },
          axisLabel: { color: MATTE_GRAY, fontFamily: 'Inter, sans-serif', fontSize: 11 },
        },
        visualMap: {
          min: 0,
          max: maxVal,
          calculable: false,
          orient: 'horizontal',
          left: 'center',
          bottom: 10,
          inRange: {
            color: ['#F4F4F5', '#71717A', COBALT, MATTE_BLACK],
          },
          textStyle: {
            color: MATTE_GRAY,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
          },
        },
        series: [
          {
            type: 'heatmap',
            id: 'heatmap-series',
            animationDuration: 750,
            animationEasing: 'cubicOut',
            data: heatmapData,
            itemStyle: {
              borderColor: '#FFFFFF',
              borderWidth: 2,
            },
          },
        ],
      };
    }
  }
}
