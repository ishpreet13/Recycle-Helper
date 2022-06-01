import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import CongratulationsScreen from "../app/screens/CongratulationsScreen";

act(() => {
  describe("Testing CongratulationsScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<CongratulationsScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

describe("CongratulationsScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <CongratulationsScreen navigation={{ navigate }} />
    );
    fireEvent.press(getByText("Go back to home page"));
    expect(navigate).toHaveBeenCalledWith("Home");
  });
});
