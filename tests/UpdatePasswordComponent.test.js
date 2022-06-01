import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import UpdatePasswordComponent from "../app/components/UpdatePasswordComponent";

describe("Testing UpdatePasswordComponent ", () => {
  const wrapper = renderer.create(<UpdatePasswordComponent />);
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("<UpdatePasswordComponent />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<UpdatePasswordComponent />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
