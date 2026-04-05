// Color and glow computation utilities for Top500 comparison cards

export function getColorForDelta(oldVal: number, newVal: number): string {
  if (oldVal === 0 && newVal === 0) return "rgb(255,255,255)";
  if (oldVal === 0) return "oklch(0.72 0.18 142)";
  const pct = (newVal - oldVal) / oldVal;
  if (Math.abs(pct) < 0.005) return "rgb(240,240,240)";

  const intensity = Math.min(Math.abs(pct), 1.0);
  const step = Math.ceil(intensity * 10);

  if (pct > 0) {
    const l = 0.88 - (step - 1) * 0.036;
    const c = 0.05 + (step - 1) * 0.015;
    return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 142)`;
  }
  const l = 0.88 - (step - 1) * 0.036;
  const c = 0.05 + (step - 1) * 0.015;
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 25)`;
}

export function getMrrGlowStyle(
  decMrr: number,
  nowMrr: number,
): { boxShadow: string; borderColor: string } {
  if (decMrr === 0 && nowMrr === 0)
    return { boxShadow: "none", borderColor: "rgba(63,63,70,0.6)" };
  if (decMrr === 0 && nowMrr > 0)
    return {
      boxShadow:
        "inset 0 0 14px 0 rgba(34,197,94,0.18), 0 0 0 1px rgba(34,197,94,0.35)",
      borderColor: "rgba(34,197,94,0.4)",
    };
  const pct = (nowMrr - decMrr) / decMrr;
  if (Math.abs(pct) < 0.005)
    return { boxShadow: "none", borderColor: "rgba(63,63,70,0.6)" };
  const intensity = Math.min(Math.abs(pct), 1.0);
  const step = Math.ceil(intensity * 5);
  if (pct > 0) {
    const glowAlpha = (0.06 + (step - 1) * 0.055).toFixed(3);
    const borderAlpha = (0.25 + (step - 1) * 0.1).toFixed(3);
    return {
      boxShadow: `inset 0 0 ${8 + step * 4}px 0 rgba(34,197,94,${glowAlpha}), 0 0 0 1px rgba(34,197,94,${borderAlpha})`,
      borderColor: `rgba(34,197,94,${borderAlpha})`,
    };
  }
  const glowAlpha = (0.06 + (step - 1) * 0.055).toFixed(3);
  const borderAlpha = (0.25 + (step - 1) * 0.1).toFixed(3);
  return {
    boxShadow: `inset 0 0 ${8 + step * 4}px 0 rgba(239,68,68,${glowAlpha}), 0 0 0 1px rgba(239,68,68,${borderAlpha})`,
    borderColor: `rgba(239,68,68,${borderAlpha})`,
  };
}
