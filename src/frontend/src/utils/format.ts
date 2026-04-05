// Number and currency formatting utilities

export function formatCurrency(
  amount: number,
  currency: string,
  inrRate = 87,
): string {
  if (!amount || amount === 0) return currency === "INR" ? "\u20b90" : "$0";
  if (currency === "INR") {
    const inr = amount * inrRate;
    if (inr >= 9950000)
      return `\u20b9${(inr / 10000000).toFixed(2).replace(/\.00$/, "")}Cr`;
    if (inr >= 99500)
      return `\u20b9${(inr / 100000).toFixed(2).replace(/\.00$/, "")}L`;
    if (inr >= 995)
      return `\u20b9${(inr / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return `\u20b9${inr.toLocaleString()}`;
  }
  if (amount >= 995000)
    return `$${(amount / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
  if (amount >= 995)
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `$${amount.toLocaleString()}`;
}

export function compactNumber(num: number): string {
  if (!num || num === 0) return "0";
  if (num >= 995000)
    return `${(num / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
  if (num >= 995) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return num.toLocaleString();
}
