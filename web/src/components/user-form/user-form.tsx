import Button from "../button/button";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import Joi from "joi";
import TextInput from "../text-input/text-input";
import formValidate from "@/utils/form-validate";

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
}

export default function UserForm({ id, initialValues }: Props) {
  const iv = initialValues;
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    setSubmitting(true);
    if (id) {
      //update
    } else {
      //create
    }
    console.log("Valores do formulário:", values);
    setSubmitting(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={(values) => formValidate(values, validationSchema)}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className='bg-white  p-8 mb-4 flex flex-col gap-4'
          >
            <Field
              name='name'
              initialValue={iv?.name}
              render={(props) => <TextInput {...props} label='Nome' />}
            />
            <Field
              name='email'
              initialValue={iv?.email}
              render={(props) => <TextInput {...props} label='Email' />}
            />
            <Field
              name='age'
              type='number'
              initialValue={iv?.age.toString()}
              render={(props) => (
                <TextInput {...props} label='Idade' min={3} max={120} />
              )}
            />
            <Field
              name='avatar'
              initialValue={iv?.avatar}
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
