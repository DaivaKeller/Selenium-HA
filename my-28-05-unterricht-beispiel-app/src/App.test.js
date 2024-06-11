import { fireEvent, render, screen } from '@testing-library/react';
import App from "./App";


test("button click flow", () => {
  render(<App />);

  const buttonElement = screen.getByRole("button", { name: /Farbe zu rot wechseln/i });
  expect(buttonElement).toHaveClass("rot");

  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("blau");
  expect(buttonElement).toHaveTextContent("Farbe zu blau wechseln");

  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("rot");
  expect(buttonElement).toHaveTextContent("Farbe zu rot wechseln");
});

test("checkbox click flow", () => {
  render(<App />);
  
  const buttonElement = screen.getByRole("button", { name: /Farbe zu rot wechseln/i });
  const checkBoxElement = screen.getByLabelText(/Button deaktivieren/i);

  expect(buttonElement).toBeEnabled();
  expect(checkBoxElement).not.toBeChecked();

  fireEvent.click(checkBoxElement);
  expect(checkBoxElement).toBeChecked();
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("grau");
  fireEvent.click(checkBoxElement);
  expect(checkBoxElement).not.toBeChecked();
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("rot");

  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("blau");
});