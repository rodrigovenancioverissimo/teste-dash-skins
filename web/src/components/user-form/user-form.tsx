import Button from "../button/button";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import Joi from "joi";
import TextInput from "../text-input/text-input";
import formValidate from "@/utils/form-validate";
import createUser from "@/axios/create-user.axios";
import { User } from "@/interfaces/user";
import { useUserContext } from "@/context/users.context";

const validationSchema = Joi.object({
  name: Joi.string().required().label("Nome"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  age: Joi.number().required().label("Idade").min(3).max(120),
  avatar: Joi.string(),
});

interface Props {
  initialValues?: {
    name: string;
    email: string;
    age: number;
    avatar: string;
  };
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
  const [submitting, setSubmitting] = useState(false);
  const { users, setUsers } = useUserContext();

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    console.log("Valores do formulário:", values);
    if (id) {
      //update
    } else {
      const user = await createUser({ ...values, age: parseInt(values.age) });
      console.log(user);
      setUsers([...users, user]);
      if (afterSubmitting) afterSubmitting();
    }
    setSubmitting(false);
  };

  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
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
