import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ErrorMessage from "../app/components/ErrorMessage";

describe("Testing Error Message Component when it is visible and error is present", () => {
  const wrapper = renderer.create(
    <ErrorMessage visible={true} error={"Fake Error"} />
  );
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("Testing Error Message Component when it is not visible and error is present", () => {
  const wrapper = renderer.create(
    <ErrorMessage visible={false} error={"Fake Error"} />
  );
  it("should not render", () => {
    expect(wrapper.toJSON()).toBeNull();
  });
});

describe("Testing Error Message Component when it is  visible and error is not present", () => {
  const wrapper = renderer.create(<ErrorMessage visible={true} error={""} />);
  it("should not render", () => {
    expect(wrapper.toJSON()).toBeNull();
  });
});

describe("Testing Error Message Component when it is not visible and error is not present", () => {
  const wrapper = renderer.create(<ErrorMessage visible={false} error={""} />);
  it("should not render", () => {
    expect(wrapper.toJSON()).toBeNull();
  });
});

describe("<ErrorMessage />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(
      <ErrorMessage visible={true} error={"Fake Error"} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
