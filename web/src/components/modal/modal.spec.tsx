import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Modal from "./modal";

describe("Modal component", () => {
  test("renders modal when isOpen is true", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal content
      </Modal>
    );
    const modalContent = getByText("Modal content");
    expect(modalContent).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal content
      </Modal>
    );
    const modalContent = queryByText("Modal content");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("calls onClose function when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Modal
      </Modal>
    );
    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders children inside the modal", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Child content</div>
      </Modal>
    );
    const childContent = getByText("Child content");
    expect(childContent).toBeInTheDocument();
  });
});
