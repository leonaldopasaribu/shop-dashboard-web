import { createIntl } from "@formatjs/intl";

export function formatCurrency(value: number): string {
  const intl = createIntl({
    locale: "en-US",
  });

  return intl.formatNumber(value, {
    style: "currency",
    currency: "USD",
  });
}
