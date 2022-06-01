import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import HouseholdWasteScreen from "../app/screens/SubCategoryScreens/HouseholdWasteScreen";

act(() => {
  describe("Testing HouseholdWasteScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<HouseholdWasteScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("HouseholdWasteScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<HouseholdWasteScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("CFLs"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "CFLs",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Fluorescent Tubes"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Fluorescent Tube",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Mercury Containing Items"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Mercury Containing Items",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Medical Sharps"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Medical Sharps",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Medications"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Medications",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Paint"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Paint",
    });
  });
});

describe("HouseholdWasteScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HouseholdWasteScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Pesticides and Containers"));
    expect(navigate).toHaveBeenCalledWith("InstructionScreen", {
      documentName: "Pesticides and Containers",
    });
  });
});
