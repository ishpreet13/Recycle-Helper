import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import PlasticScreen from "../app/screens/SubCategoryScreens/PlasticScreen";

act(() => {
  describe("Testing PlasticScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<PlasticScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("PlasticScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<PlasticScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Packing Peanuts"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Packing Peanuts",
    });
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Plastic Containers"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Plastic Container",
    });
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Plastic Bags"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Plastic Bags",
    });
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Plastic Cap and Lids"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Plastic Cap and Lids",
    });
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Plastic Jugs and Bottles"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Plastic Jugs and Bottles",
    });
  });
});

describe("PlasticScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<PlasticScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Plastic Wrap and Film"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Plastic Wrap and Film",
    });
  });
});
