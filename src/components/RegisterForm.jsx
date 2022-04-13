import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required."),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Mininum of 8 characters"),
    passwordConf: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .min(18, "Minimum age is 18 years old and above to register")
      .required("Age is required."),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            {...register("name")}
          />
          <Form.Text className="text-danger">{errors?.name?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          <Form.Text className="text-danger">
            {errors?.email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Form.Text className="text-danger">
            {errors?.password?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("passwordConf")}
          />
          <Form.Text className="text-danger">
            {errors?.passwordConf?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            defaultValue={18}
            placeholder="Your Age"
            {...register("age")}
          />
          <Form.Text className="text-danger">{errors?.age?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select {...register("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select a Plan</Form.Label>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Basic"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                value="Basic"
                {...register("plan")}
              />
              <Form.Check
                inline
                label="Premium"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                value="Premium"
                {...register("plan")}
              />
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
