import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import CheckBox from "../app/components/CheckBox";

describe("Testing CheckBox Component", () => {
  const wrapper = renderer.create(<CheckBox />);
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("<CheckBox />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<CheckBox />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("Testing CheckBox Component Width", () => {
  const wrapper = renderer.create(<CheckBox />);
  const styles = wrapper.toJSON().props.style;
  const width = styles[0].width;
  it("should have width as 24", () => {
    expect(width).toBe(24);
  });
});

describe("Testing CheckBox Component Style", () => {
  const wrapper = renderer.create(<CheckBox />);
  const styles = wrapper.toJSON().props.style;
  const height = styles[0].height;
  const borderRadius = styles[0].borderRadius;
  const borderWidth = styles[0].borderWidth;
  const borderColor = styles[0].borderColor;
  it("should have height as 24", () => {
    expect(height).toBe(24);
  });
  it("should have borderRadius as 4", () => {
    expect(borderRadius).toBe(4);
  });
  it("should have borderWidth as 2", () => {
    expect(borderWidth).toBe(2);
  });
  it("should have borderColor as coral", () => {
    expect(borderColor).toBe("coral");
  });
});
