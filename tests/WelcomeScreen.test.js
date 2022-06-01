import "react-native";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import WelcomeScreen from "../app/screens/WelcomeScreen";

act(() => {
  describe("Testing WelcomeScreen ", () => {
    let wrapper;
    it("should render", async () => {
      act(() => {
        wrapper = renderer.create(<WelcomeScreen />);
      });
      expect(wrapper.toJSON()).toBeTruthy();
    });
  });
});

act(() => {
  it("WelcomeScreen should render correctly", async () => {
    let tree;
    act(() => {
      tree = renderer.create(<WelcomeScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("WelcomeScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<WelcomeScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Login"));
    expect(navigate).toHaveBeenCalledWith("Login");
  });
});

describe("WelcomeScreen ", () => {
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(<WelcomeScreen navigation={{ navigate }} />);
    fireEvent.press(getByText("Sign Up"));
    expect(navigate).toHaveBeenCalledWith("SignUp");
  });
});
