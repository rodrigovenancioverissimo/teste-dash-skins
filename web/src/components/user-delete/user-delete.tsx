import { MdDelete } from "react-icons/md";
import Button from "../button/button";
import { useState } from "react";
import deleteUser from "@/axios/delete-user.axios";
import { useUserContext } from "@/context/users.context";

export default function UserDelete({ id }: { id: string }) {
  const { users, setUsers } = useUserContext();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    await deleteUser(id);
    setUsers(users.filter((u) => u._id !== id));
    setSubmitting(false);
  };

  return (
    <>
      <Button
        className='bg-red-500 hover:bg-red-700'
        onClick={onSubmit}
        disabled={submitting}
      >
        <MdDelete />
      </Button>
    </>
  );
}
