import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import AutomotiveScreen from "../app/screens/SubCategoryScreens/AutomotiveScreen";

act(() => {
  describe("Testing AutomotiveScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<AutomotiveScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("AutomotiveScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<AutomotiveScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("AutomotiveScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AutomotiveScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Auto Fluids"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Auto Fluids",
    });
  });
});

describe("AutomotiveScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AutomotiveScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Car Batteries"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Car Batteries",
    });
  });
});

describe("AutomotiveScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AutomotiveScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Tires"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Tires",
    });
  });
});

describe("AutomotiveScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AutomotiveScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Used Motor Oil and Filters"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Used Motor Oil and Filters",
    });
  });
});
