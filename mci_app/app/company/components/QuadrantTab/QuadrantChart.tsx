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

    const qlStyles = [
      { bg: '#F4F2F8', text: '#5E566E', border: 'rgba(109,40,217,0.2)' },
      { bg: 'rgba(23,135,85,0.08)', text: '#178755', border: 'rgba(23,135,85,0.25)' },
      { bg: '#F4F2F8', text: '#5E566E', border: 'rgba(109,40,217,0.2)' },
      { bg: 'rgba(176,122,24,0.08)', text: '#B07A18', border: 'rgba(176,122,24,0.25)' },
    ];

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

        const labels = cfg.quadrantLabels;
        const pY = 5, pX = 9, r = 5, fs = 9;
        const pillH = fs + pY * 2;

        const positions = [
          { bxFn: () => left, by: top - pillH - 4 },
          { bxFn: (pw: number) => right - pw, by: top - pillH - 4 },
          { bxFn: () => left, by: bottom + 4 },
          { bxFn: (pw: number) => right - pw, by: bottom + 4 },
        ];

        ctx.font = `500 ${fs}px 'Inter', sans-serif`;
        labels.forEach((text, i) => {
          const pos = positions[i];
          const st = qlStyles[i];
          const tw = ctx.measureText(text).width;
          const pillW = tw + pX * 2;
          const bx = Math.max(left, Math.min(pos.bxFn(pillW), right - pillW));
          const by = pos.by;

          ctx.beginPath();
          ctx.moveTo(bx + r, by);
          ctx.lineTo(bx + pillW - r, by);
          ctx.quadraticCurveTo(bx + pillW, by, bx + pillW, by + r);
          ctx.lineTo(bx + pillW, by + pillH - r);
          ctx.quadraticCurveTo(bx + pillW, by + pillH, bx + pillW - r, by + pillH);
          ctx.lineTo(bx + r, by + pillH);
          ctx.quadraticCurveTo(bx, by + pillH, bx, by + pillH - r);
          ctx.lineTo(bx, by + r);
          ctx.quadraticCurveTo(bx, by, bx + r, by);
          ctx.closePath();
          ctx.fillStyle = st.bg;
          ctx.fill();
          ctx.strokeStyle = st.border;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = st.text;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.font = `600 ${fs}px 'Inter', sans-serif`;
          ctx.fillText(text, bx + pX, by + pillH / 2);
        });

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
        layout: { padding: { top: 28, right: 12, bottom: 28, left: 12 } },
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
  }, [cfg, selectedCompetitors]);

  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div className="chart-subtitle">{subtitle}</div>
      <div className="chart-wrap" style={{ height }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
