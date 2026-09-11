import { Box, Typography } from "@mui/material";

const barTrack = {
  height: 10,
  borderRadius: 99,
  bgcolor: "rgba(108, 85, 249, 0.12)",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  bgcolor: "primary.main",
  borderRadius: 99,
};

export function SignalBars({ items, caption }) {
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        component="ul"
        sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {items.map((item) => (
          <Box component="li" key={item.label}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                {item.pct}% ({item.n} of {item.d})
              </Typography>
            </Box>
            <Box
              sx={barTrack}
              role="img"
              aria-label={`${item.label}: ${item.pct} percent, ${item.n} of ${item.d}`}
            >
              <Box sx={{ ...barFill, width: `${Math.min(100, item.pct)}%` }} />
            </Box>
          </Box>
        ))}
      </Box>
      {caption && (
        <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}

export function IndustryBars({ rows, caption }) {
  const max = 100;
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        component="ul"
        sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {rows.map((row) => (
          <Box component="li" key={row.name}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.75, flexWrap: "wrap" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {row.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                median {row.median} · {row.scored} scored / {row.n} in sample
              </Typography>
            </Box>
            <Box
              sx={barTrack}
              role="img"
              aria-label={`${row.name}: median performance ${row.median} from ${row.scored} scored homepages`}
            >
              <Box sx={{ ...barFill, width: `${(row.median / max) * 100}%` }} />
            </Box>
          </Box>
        ))}
      </Box>
      {caption && (
        <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}

export function Histogram({ bins, caption }) {
  const visible = bins.filter((b) => b.n > 0 || !["0–9", "10–19"].includes(b.label));
  const max = Math.max(...visible.map((b) => b.n), 1);
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))`,
          gap: { xs: 0.5, sm: 1 },
          alignItems: "end",
          height: 180,
          mb: 1,
        }}
        role="img"
        aria-label={visible.map((b) => `${b.label}: ${b.n} sites`).join(". ")}
      >
        {visible.map((b) => (
          <Box key={b.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
              {b.n}
            </Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: 40,
                height: `${(b.n / max) * 100}%`,
                minHeight: b.n ? 4 : 0,
                bgcolor: "primary.main",
                borderRadius: "6px 6px 0 0",
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))`,
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        {visible.map((b) => (
          <Typography key={b.label} variant="caption" color="text.secondary" sx={{ textAlign: "center", fontSize: { xs: "0.6rem", sm: "0.75rem" } }}>
            {b.label}
          </Typography>
        ))}
      </Box>
      {caption && (
        <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}

export function ScatterPlot({ points, caption, xLabel, yLabel }) {
  const w = 640;
  const h = 280;
  const pad = { t: 16, r: 16, b: 40, l: 44 };
  const xs = points.map((p) => p.mb);
  const xMin = 0;
  const xMax = Math.max(...xs, 1) * 1.05;
  const yMin = 0;
  const yMax = 100;
  const xScale = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (w - pad.l - pad.r);
  const yScale = (v) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.t - pad.b);

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width="100%"
          height="auto"
          role="img"
          aria-label={`${yLabel} versus ${xLabel} for ${points.length} scored homepages.`}
        >
          <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="#B4B2C5" />
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="#B4B2C5" />
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                x1={pad.l - 4}
                y1={yScale(tick)}
                x2={pad.l}
                y2={yScale(tick)}
                stroke="#B4B2C5"
              />
              <text x={pad.l - 8} y={yScale(tick) + 4} textAnchor="end" fontSize="11" fill="#645F88">
                {tick}
              </text>
            </g>
          ))}
          {points.map((pt, i) => (
            <circle key={i} cx={xScale(pt.mb)} cy={yScale(pt.p)} r="4" fill="#6C55F9" fillOpacity="0.7" />
          ))}
          <text x={w / 2} y={h - 8} textAnchor="middle" fontSize="12" fill="#645F88">
            {xLabel}
          </text>
          <text
            x={14}
            y={h / 2}
            textAnchor="middle"
            fontSize="12"
            fill="#645F88"
            transform={`rotate(-90 14 ${h / 2})`}
          >
            {yLabel}
          </text>
        </svg>
      </Box>
      {caption && (
        <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}
