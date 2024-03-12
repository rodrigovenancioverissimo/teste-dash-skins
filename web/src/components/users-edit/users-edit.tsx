import { useState } from "react";
import Button from "../button/button";
import { MdEdit } from "react-icons/md";
import { User } from "@/interfaces/user";
import Modal from "../modal/modal";
import UserForm from "../user-form/user-form";

interface Props {
  user: User;
}

export default function UsersEdit({ user }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <UserForm
          afterSubmitting={closeModal}
          initialValues={user}
          id={user._id}
        />
      </Modal>
      <Button onClick={openModal}>
        <MdEdit />
      </Button>
    </>
  );
}
