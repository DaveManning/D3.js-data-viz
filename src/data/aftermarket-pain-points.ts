/**
 * Aftermarket & service pain points, scored across five impact dimensions.
 * Source: paretoData.csv (the canonical, one-row-per-pain-point matrix).
 *
 * Each dimension is scored 1–5. The "Total weighted score" column in the CSV
 * was left blank to be computed from the weights baked into its headers — that
 * computation lives in `weightedScore` below and is what the Pareto ranks by.
 */

export interface PainPoint {
  /** Full descriptive name (from the CSV). */
  painPoint: string;
  /** Short label for axis ticks; full name remains available for reference. */
  label: string;
  revenue: number;
  margin: number;
  cash: number;
  customer: number;
  strategic: number;
}

/** Dimension weights from the CSV headers (sum to 1.0). */
export const impactWeights = {
  revenue: 0.25,
  margin: 0.35,
  cash: 0.15,
  customer: 0.15,
  strategic: 0.1,
} as const;

export const painPoints: PainPoint[] = [
  { painPoint: 'Low capture of aftermarket demand', label: 'Aftermarket capture', revenue: 2, margin: 1, cash: 4, customer: 2, strategic: 1 },
  { painPoint: 'Poor spare-parts availability and long lead times', label: 'Spare-parts availability', revenue: 2, margin: 2, cash: 3, customer: 1, strategic: 2 },
  { painPoint: 'Pricing and discounting that erode margin', label: 'Pricing & discounting', revenue: 3, margin: 3, cash: 5, customer: 1, strategic: 4 },
  { painPoint: 'Fragmented data and weak commercial focus on service', label: 'Fragmented data', revenue: 2, margin: 3, cash: 2, customer: 3, strategic: 5 },
  { painPoint: 'Inefficient supply chain, inventory, and obsolescence management', label: 'Supply chain & inventory', revenue: 4, margin: 2, cash: 5, customer: 4, strategic: 2 },
  { painPoint: 'Underproductive field workforce and service operations', label: 'Field workforce', revenue: 1, margin: 1, cash: 3, customer: 1, strategic: 3 },
  { painPoint: 'Slow and complex delivery-to-cash processes', label: 'Delivery-to-cash', revenue: 2, margin: 1, cash: 4, customer: 2, strategic: 3 },
  { painPoint: 'Organizational design that sidelines service', label: 'Org design', revenue: 5, margin: 3, cash: 2, customer: 3, strategic: 1 },
  { painPoint: 'Talent shortages and capability gaps in service', label: 'Talent gaps', revenue: 2, margin: 4, cash: 1, customer: 5, strategic: 5 },
  { painPoint: 'Misaligned or weak customer value proposition', label: 'Value proposition', revenue: 5, margin: 3, cash: 4, customer: 3, strategic: 2 },
];

/** Weighted total impact for a pain point, using `impactWeights`. */
export function weightedScore(p: PainPoint): number {
  return (
    p.revenue * impactWeights.revenue +
    p.margin * impactWeights.margin +
    p.cash * impactWeights.cash +
    p.customer * impactWeights.customer +
    p.strategic * impactWeights.strategic
  );
}

/** Flat rows ready for the Pareto factory: short label + rounded weighted score. */
export const painPointScores = painPoints.map((p) => ({
  label: p.label,
  painPoint: p.painPoint,
  score: Math.round(weightedScore(p) * 100) / 100,
}));
