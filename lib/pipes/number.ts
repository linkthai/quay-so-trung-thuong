export function NumberPipe(
  value: any,
  {
    currency = false,
    compact = false,
    percent = false,
    signDisplay = false,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: Partial<{
    currency: boolean | string;
    compact: boolean;
    percent: boolean;
    signDisplay: boolean;
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  }> = {
    currency: false,
    compact: false,
    percent: false,
    signDisplay: undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
): string {
  if (isNaN(Number(value))) return "0";
  let number = new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
    style: currency ? "currency" : percent ? "percent" : "decimal",
    currency: currency
      ? typeof currency == "boolean"
        ? "USD"
        : currency
      : undefined,
    currencyDisplay: "symbol",
    signDisplay:
      signDisplay === undefined ? "auto" : signDisplay ? "exceptZero" : "never",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
  return number;
}
