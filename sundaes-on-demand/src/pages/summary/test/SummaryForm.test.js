import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
// import { userEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("checkbox disables button on first click and enables on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // set up userEvent
  const user = userEvent.setup();

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  const overlay = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(overlay).not.toBeInTheDocument();
});
// test("popover responds to hover", () => {
//   render(<SummaryForm />);
//   const nullProver = screen.queryByText(
//     /no ice cream will actually be delivered/i
//   );
//   expect(nullProver).not.toBeInTheDocument();
//   const termsandconditions = screen.getByText(/terms and conditions/i);
//   userEvent.hover(termsandconditions);
//   //No ice cream will actually be delivered
//   const popover = screen.getByText(/no ice cream will actually be delivered/i);
//   expect(popover).toBeInTheDocument();
//   // popover disappears when we mouse out
//   userEvent.unhover(termsandconditions);
//   const nullPopoverAgain = screen.queryByText(
//     /no ice cream will actually be delivered/i
//   );
//   expect(nullPopoverAgain).not.toBeInTheDocument();
// });
