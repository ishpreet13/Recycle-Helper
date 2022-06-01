import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import MetalScreen from "../app/screens/SubCategoryScreens/MetalScreen";

act(() => {
  describe("Testing MetalScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<MetalScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("MetalScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<MetalScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Aerosol Cans"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Aerosol Cans",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Aluminum Cans"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Aluminum Cans",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Aluminum Foil"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Aluminum Foil",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Aluminium Takeout Containers"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Aluminium Takeout Containers",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Metal Caps and Lids"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Metal Caps and Lids",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Scrap Metal"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Scrap Metal",
    });
  });
});

describe("MetalScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<MetalScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Tin or Steel Cans"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Tin or Steel Cans",
    });
  });
});
