import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import GlassScreen from "../app/screens/SubCategoryScreens/GlassScreen";

act(() => {
  describe("Testing GlassScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<GlassScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("GlassScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<GlassScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("GlassScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<GlassScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Non-Container Glass"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "NonContainer Glass",
    });
  });
});

describe("GlassScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<GlassScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Glass Container"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Glass Container",
    });
  });
});
