'use client';

import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  BubbleController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from 'chart.js';
import { QuadrantConfig } from '../../data/quadrantConfigs';
import { compLabelMap } from '../../data/competitors';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

interface QuadrantChartProps {
  config: QuadrantConfig;
  title: string;
  subtitle: string;
  selectedCompetitors: Set<string>;
  height: string;
}

const qlPillBase: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 600,
  padding: '4px 9px',
  borderRadius: 5,
  border: '1px solid',
  lineHeight: 1,
  whiteSpace: 'nowrap',
};

export default function QuadrantChart({ config: cfg, title, subtitle, selectedCompetitors, height }: QuadrantChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const visiblePoints = cfg.points.filter(p => {
      if (p.isWisdom) return true;
      const compId = Object.keys(compLabelMap).find(id => compLabelMap[id] === p.label);
      return compId ? selectedCompetitors.has(compId) : false;
    });

    const gridColor = 'rgba(109,40,217,0.06)';
    const tickColor = '#8A839A';

    const quadrantPlugin: Plugin<'bubble'> = {
      id: 'quadrantOverlay',
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const { left, right, top, bottom, width, height: areaHeight } = chartArea;
        const midX = left + width / 2;
        const midY = top + areaHeight / 2;

        ctx.save();

        ctx.strokeStyle = 'rgba(109,40,217,0.18)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(midX, top); ctx.lineTo(midX, bottom); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(left, midY); ctx.lineTo(right, midY); ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '600 9.5px "Inter", sans-serif';
        ctx.textBaseline = 'alphabetic';
        chart.data.datasets.forEach((ds, i) => {
          const meta = chart.getDatasetMeta(i);
          if (meta.data[0]) {
            const { x, y } = meta.data[0];
            ctx.fillStyle = ds.label === 'WisdomAI' ? '#6D28D9' : '#1A1525';
            ctx.textAlign = 'center';
            const dataPoint = ds.data[0] as { r?: number };
            ctx.fillText(ds.label || '', x, y - (dataPoint.r || 8) - 5);
          }
        });

        ctx.restore();
      },
    };

    chartRef.current = new ChartJS(canvasRef.current, {
      type: 'bubble',
      data: {
        datasets: visiblePoints.map(p => ({
          label: p.label,
          data: [{ x: p.x, y: p.y, r: p.r }],
          backgroundColor: p.isWisdom ? p.color + 'cc' : p.color + '44',
          borderColor: p.color,
          borderWidth: p.isWisdom ? 2.5 : 1.5,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 10, right: 10, bottom: 10, left: 10 } },
        scales: {
          x: {
            min: 0, max: 100,
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, font: { size: 10 }, maxTicksLimit: 5 },
            title: { display: true, text: cfg.xLabel, color: tickColor, font: { size: 10 } },
          },
          y: {
            min: 0, max: 100,
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, font: { size: 10 }, maxTicksLimit: 5 },
            title: { display: true, text: cfg.yLabel, color: tickColor, font: { size: 10 } },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.dataset.label}` },
            backgroundColor: '#fff',
            borderColor: '#ddd',
            borderWidth: 0.5,
            titleColor: '#1A1525',
            bodyColor: '#5E566E',
            padding: 8,
          },
        },
        animation: { duration: 300 },
      } as ChartOptions<'bubble'>,
      plugins: [quadrantPlugin],
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [cfg, selectedCompetitors, height]);

  const qlStyles: React.CSSProperties[] = [
    { background: '#F4F2F8', color: '#5E566E', borderColor: 'rgba(109,40,217,0.2)' },
    { background: 'rgba(23,135,85,0.08)', color: '#178755', borderColor: 'rgba(23,135,85,0.25)' },
    { background: '#F4F2F8', color: '#5E566E', borderColor: 'rgba(109,40,217,0.2)' },
    { background: 'rgba(176,122,24,0.08)', color: '#B07A18', borderColor: 'rgba(176,122,24,0.25)' },
  ];

  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div className="chart-subtitle">{subtitle}</div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ ...qlPillBase, ...qlStyles[0] }}>{cfg.quadrantLabels[0]}</span>
          <span style={{ ...qlPillBase, ...qlStyles[1] }}>{cfg.quadrantLabels[1]}</span>
        </div>
        <div className="chart-wrap" style={{ height }}>
          <canvas ref={canvasRef}></canvas>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ ...qlPillBase, ...qlStyles[2] }}>{cfg.quadrantLabels[2]}</span>
          <span style={{ ...qlPillBase, ...qlStyles[3] }}>{cfg.quadrantLabels[3]}</span>
        </div>
      </div>
    </div>
  );
}
