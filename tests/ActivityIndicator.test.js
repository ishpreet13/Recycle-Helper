import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ActivityIndicator from "../app/components/ActivityIndicator";

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("Testing Activity Indicator Component when it is not visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={false} />);
  it("should not render", () => {
    expect(wrapper.toJSON()).toBeNull();
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { position } = styles;
  it("should have absolute position", () => {
    expect(position).toBe("absolute");
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { backgroundColor } = styles;
  it("should have white backgroundColor", () => {
    expect(backgroundColor).toBe("white");
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { height } = styles;
  it("should have height 100%", () => {
    expect(height).toBe("100%");
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { opacity } = styles;
  it("should have 0.8 opacity", () => {
    expect(opacity).toBe(0.8);
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { width } = styles;
  it("should have width 100%", () => {
    expect(width).toBe("100%");
  });
});

describe("Testing Activity Indicator Component when it is visible", () => {
  const wrapper = renderer.create(<ActivityIndicator visible={true} />);
  const styles = wrapper.toJSON().props.style;
  const { zIndex } = styles;
  it("should have zIndex as 1", () => {
    expect(zIndex).toBe(1);
  });
});

describe("<ActivityIndicator />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<ActivityIndicator visible={true} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
