import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Answer from "../components/Answer";

const mockQuestions = [
  {
    id: "1",
    text: "Yes or No?",
    answer: "Yes, No",
  },
  {
    id: "2",
    text: "Range",
    answer: {
      min: 0,
      max: 10,
      step: 1,
    },
  },
];

describe("Answer component", () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders Yes/No answer buttons when a `Yes, No` type question is given", () => {
    expect.hasAssertions();

    act(() => {
      render(<Answer answer={mockQuestions[0].answer} />, container);
    });

    expect(container.querySelector("button").textContent).toBe("Yes");
  });

  it("Does not render Yes/No answer buttons when a non-`Yes, No` type question is given", () => {
    expect.hasAssertions();

    act(() => {
      render(<Answer answer={mockQuestions[1].answer} />, container);
    });

    expect(container.querySelector("button")).toBeNull();
  });

  it("renders range answer when a range type question is given", () => {
    expect.hasAssertions();

    act(() => {
      render(<Answer answer={mockQuestions[1].answer} />, container);
    });

    expect(container.querySelector("input").getAttribute("type")).toBe("range");
  });

  it("Does not render range answer when a non-range type question is given", () => {
    expect.hasAssertions();

    act(() => {
      render(<Answer answer={mockQuestions[0].answer} />, container);
    });

    expect(container.querySelector("input")).toBeNull();
  });
});
