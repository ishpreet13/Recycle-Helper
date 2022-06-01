import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import AppInputField from "../app/components/AppInputField";

describe("Testing AppInputField Component ", () => {
  const wrapper = renderer.create(<AppInputField />);
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("<AppInputField />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<AppInputField />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
