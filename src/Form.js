import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.css";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required!"),
  email: yup.string().email().required("Email is required!"),
  age: yup.number().positive().integer().min(18).required("Age is required!"),
  password: yup.string().min(4).max(10).required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match!")
    .required("Confirm Password is required!"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // ⭐ Inject random stars on mount
  useEffect(() => {
    const container = document.querySelector(".starry-bg");
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${1 + Math.random() * 3}s`;
      container.appendChild(star);
    }
  }, []);

  return (
    <>
      <div className="starry-bg"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name..." {...register("fullName")} />
        <p>{errors.fullName?.message}</p>

        <input type="text" placeholder="Email..." {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="number" placeholder="Age..." {...register("age")} />
        <p>{errors.age?.message}</p>

        <input type="password" placeholder="Password..." {...register("password")} />
        <p>{errors.password?.message}</p>

        <input
          type="password"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
