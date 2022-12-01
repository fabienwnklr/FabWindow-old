require("../docs/src/.vuepress/public/FabModalManager")

const FabModalManager = window.FabModalManager

test("Setup new FabModalManager", () => {
  const instance = new FabModalManager()
  expect(sum(1, 2)).toBe(3)
})
