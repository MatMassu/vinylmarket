import shippingCosts from "@/data/shipping_costs.json";

export type Zone = 1 | 2 | 3 | 4;

// "CAPITAL_FEDERAL" → "CAPITAL FEDERAL" (for branch API lookup)
export function provinceKeyToApiName(key: string): string {
  return key.replace(/_/g, " ");
}

// "CAPITAL FEDERAL" → "CAPITAL_FEDERAL" (for zone lookup)
export function provinceNameToKey(name: string): string {
  return name.replace(/ /g, "_");
}

// "CAPITAL_FEDERAL" → "Capital Federal" (for display)
export function provinceKeyToDisplay(key: string): string {
  return key
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function getZone(province: string, postalCode: string): Zone {
  const cp = parseInt(postalCode, 10);
  if (!isNaN(cp)) {
    const { range, additional } = shippingCosts.zone_1_postal_codes;
    if ((cp >= range[0] && cp <= range[1]) || additional.includes(cp)) {
      return 1;
    }
  }
  const z = (shippingCosts.province_zones as Record<string, number>)[province];
  return ((z ?? 2) as Zone);
}

export function isCABA(province: string): boolean {
  return province === "CAPITAL_FEDERAL";
}

// Returns an error string or null if valid.
export function validatePostalCode(postalCode: string, province: string): string | null {
  if (!/^\d{4}$/.test(postalCode)) {
    return "El código postal debe ser de 4 dígitos.";
  }
  const cp = parseInt(postalCode, 10);
  if (province === "CAPITAL_FEDERAL" && (cp < 1000 || cp > 1999)) {
    return "El código postal no corresponde a Capital Federal.";
  }
  if (
    province !== "CAPITAL_FEDERAL" &&
    province !== "BUENOS_AIRES" &&
    cp >= 1000 &&
    cp <= 1893
  ) {
    return "Ese código postal corresponde a CABA o GBA.";
  }
  return null;
}

export function computePackageHeightCm(
  items: Array<{ thickness_mm: number | null; quantity: number }>
): number {
  const totalMm = items.reduce((sum, i) => sum + (i.thickness_mm ?? 0) * i.quantity, 0);
  const withOverhead = totalMm + (shippingCosts as any).pkg_overhead_mm;
  return Math.max(withOverhead / 10, 1);
}

export function getShippingPrice(
  zone: Zone,
  service: "EP" | "CP",
  correoService: "DTD" | "BRA",
  packageHeightCm: number
): number {
  const tiers = shippingCosts.height_tiers;
  const tier =
    tiers.find((t) => packageHeightCm <= t.max_height_cm) ?? tiers[tiers.length - 1];
  const zonePrices = (tier.prices as Record<string, Record<string, Record<string, number>>>)[
    String(zone)
  ];
  return zonePrices[correoService][service];
}
