import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {replaceCamelWithSpace} from './App';

test("button has correct initial color", () => {
  render(<App />);
  //find an element with role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  //expect to color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button has correct initial text", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);
  //check that button start out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox is checked, button should be disabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray and revert to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Change to blue" });
  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });
  //enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "red" });
});

test("Clicked disabled button has gray background and revert to blue", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color:gray");
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color:blue");
});

describe("spacees before camel-case letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpace('Red')).toBe('Red');
  });
  test("work for one inner capital letter", () => {
    expect(replaceCamelWithSpace('MidnightBlue')).toBe('Midnight Blue');
  });
  test("work for multiple inner capital letter", () => {
    expect(replaceCamelWithSpace('MediumVoiletRed')).toBe("Medium Voilet Red")
  });
});
