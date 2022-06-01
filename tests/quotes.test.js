import getRandomNumberBetween from "../app/config/quotes";

test("check getRandomNumberBetween", () => {
  const t = getRandomNumberBetween();
  expect(t).toBeDefined();
});

test("check getRandomNumberBetween", () => {
  const t = getRandomNumberBetween();
  expect(t).toHaveProperty("author");
});

test("check getRandomNumberBetween", () => {
  const t = getRandomNumberBetween();
  expect(t).toHaveProperty("quote");
});
