import React from "react";
import renderer, { act, create } from "react-test-renderer";

import App from "../App";

act(() => {
  describe("<App />", () => {
    let tree;
    it("has 1 child", async () => {
      act(() => {
        tree = create(<App />);
      });
      await expect(tree.toJSON().children.length).toBe(1);
    });
  });
});

act(() => {
  it("App should render correctly", async () => {
    let tree;
    act(() => {
      tree = create(<App />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
