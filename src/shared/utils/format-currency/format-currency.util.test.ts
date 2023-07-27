import { formatCurrency } from "./format-currency.util";

describe("formatCurrency", () => {
  it("should return $1,000.00 when formatCurrency is called with argument 1000", () => {
    const stubProps = 1000;
    const expectedResult = "$1,000.00";

    const result = formatCurrency(stubProps);

    expect(result).toBe(expectedResult);
  });

  it('should create formatCurrency', () => {
    expect(formatCurrency).toBeTruthy();
  });


  it("should return -$500.00 when formatCurrency is called with argument -500", () => {
    const stubProps = -500;
    const expectedResult = "-$500.00";

    const result = formatCurrency(stubProps);

    expect(result).toBe(expectedResult);
  });

  it("should return $0.00 when formatCurrency is called with argument 0", () => {
    const stubProps = 0;
    const expectedResult = "$0.00";

    const result = formatCurrency(stubProps);

    expect(result).toBe(expectedResult);
  });
});
