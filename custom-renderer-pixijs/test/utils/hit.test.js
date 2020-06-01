import { hit } from "../../src/utils/hit";

describe("hit", () => {
  test("should 1+1=2", () => {
    expect(hit(1, 1)).toBe(2);
  });
});
