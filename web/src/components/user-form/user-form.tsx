import Button from "../button/button";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import Joi from "joi";
import TextInput from "../text-input/text-input";
import formValidate from "@/utils/form-validate";
import createUser from "@/axios/create-user.axios";
import { useUserContext } from "@/context/users.context";
import { User } from "@/interfaces/user";
import updateUser from "@/axios/update-user.axios";

const validationSchema = Joi.object({
  name: Joi.string().required().label("Nome"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  age: Joi.number().required().label("Idade").min(3).max(120),
  avatar: Joi.string().allow("", null),
});

interface Props {
  initialValues?: Partial<User>;
  id?: string;
  afterSubmitting?: () => void;
}

interface FormValues {
  name: string;
  email: string;
  age: string;
  avatar: string;
}

export default function UserForm({
  id,
  initialValues,
  afterSubmitting,
}: Props) {
  const iv = initialValues;
  const [submitting, setSubmitting] = useState(false);
  const { users, setUsers } = useUserContext();

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const age = parseInt(values.age);
    if (id) {
      const user = await updateUser({ ...values, age, id });
      if (user) {
        const updatedUsers = users.map((u) => (u._id === user?._id ? user : u));
        setUsers(updatedUsers);
        if (afterSubmitting) afterSubmitting();
      }
    } else {
      const user = await createUser({ ...values, age });
      if (user) {
        setUsers([...users, user]);
        if (afterSubmitting) afterSubmitting();
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          age: iv?.age,
          avatar: iv?.avatar,
          email: iv?.email,
          name: iv?.name,
        }}
        validate={(values) => formValidate(values, validationSchema)}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className='bg-white  p-8 mb-4 flex flex-col gap-4'
          >
            <Field
              name='name'
              render={(props) => <TextInput {...props} label='Nome' />}
            />
            <Field
              name='email'
              render={(props) => <TextInput {...props} label='Email' />}
            />
            <Field
              name='age'
              type='number'
              render={(props) => (
                <TextInput
                  {...props}
                  type='number'
                  label='Idade'
                  min={3}
                  max={120}
                />
              )}
            />
            <Field
              name='avatar'
              render={(props) => <TextInput {...props} label='Avatar' />}
            />
            <Button type='submit' disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        )}
      />
    </>
  );
}
