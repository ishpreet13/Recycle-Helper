import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import AdditionalFluidScreen from "../app/screens/SubCategoryScreens/AdditionalFluidScreen";
import HomeStack from "../app/navigation/HomeStack";

act(() => {
  describe("Testing AdditionalFluidScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<AdditionalFluidScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("AdditionalFluidScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<AdditionalFluidScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("Testing AdditionalFluidScreen  Style", () => {
  const wrapper = renderer.create(<AdditionalFluidScreen />);
  const styles = wrapper.toJSON().props.style;
  const flex = styles.flex;
  const backgroundColor = styles.backgroundColor;
  it("should have flex 1", () => {
    expect(flex).toBe(1);
  });
  it("should have backgroundColor #fff", () => {
    expect(backgroundColor).toBe("#fff");
  });
});

describe("AdditionalFluidScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AdditionalFluidScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Auto Fluids"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Auto Fluids",
    });
  });
});

describe("AdditionalFluidScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AdditionalFluidScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Used Motor Oil and Filters"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Used Motor Oil and Filters",
    });
  });
});

describe("AdditionalFluidScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AdditionalFluidScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Cooking Oil"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Cooking Oil",
    });
  });
});
