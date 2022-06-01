import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ConstructionScreen from "../app/screens/SubCategoryScreens/ConstructionScreen";

act(() => {
  describe("Testing ConstructionScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<ConstructionScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("ConstructionScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<ConstructionScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("ConstructionScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <ConstructionScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Carpet"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Carpet",
    });
  });
});

describe("ConstructionScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <ConstructionScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Construction Waste"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Construction Waste",
    });
  });
});
