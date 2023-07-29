import { mergeClassNames } from "./merge-class-names.util.";

describe("mergeClassNames", () => {
  it("should return empty className when mergeClassNames is call without paramater", () => {
    expect(mergeClassNames()).toBe("");
  });

  it('should return "text-red-500" when mergeClassNames is called with "text-red-500"', () => {
    expect(mergeClassNames("text-red-500")).toBe("text-red-500");
  });

  it(`should return "text-red-500 bg-blue-200" when mergeClassNames is called with ${{
    "text-red-500": true,
    "font-bold": false,
    "bg-blue-200": true,
  }} `, () => {
    const stubClassNames = {
      "text-red-500": true,
      "font-bold": false,
      "bg-blue-200": true,
    };

    expect(mergeClassNames(stubClassNames)).toBe("text-red-500 bg-blue-200");
  });
});
