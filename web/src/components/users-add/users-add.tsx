import Button from "../button/button";
import { useState } from "react";
import Modal from "../modal/modal";
import UserForm from "../user-form/user-form";

export default function UsersAdd() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Button
        onClick={() => {
          console.log("ok");
          openModal();
        }}
      >
        Adicionar
      </Button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <UserForm />
      </Modal>
    </>
  );
}
