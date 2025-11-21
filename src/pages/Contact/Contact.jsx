import Swal from "sweetalert2";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useForm } from "react-hook-form";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAuth from "../../hooks/useAuth/useAuth";
import useContactMessage from "../../hooks/useContactMessage/useContactMessage";
const Contact = () => {
  const { user } = useAuth();
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [_, refetchContactMessages] = useContactMessage();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user ? user.displayName : "",
      email: "email.com",
    },
  });
  const handleOnSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axiosPublic.post("/contact", data);
      // console.log(response.data);
      if (response.data.success) {
        refetchContactMessages();
        Swal.fire({
          title: response.data.message,
          icon: "success",
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);
  return (
    <section id="contact" className="py-12">
      <SectionHeading>Contact Us</SectionHeading>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="space-y-4 lg:w-2/3 mx-auto bg-brand-navyblue/90 p-4 rounded-2xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg text-white">
            Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Jhon Doe"
            className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
            {...register("name", { required: true, minLength: "3" })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="text-red-500">Name must be at least 3 characters</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg text-white">
            Enter Your Email: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
            id="email"
            placeholder="example@mail.com"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              minLength: 6,
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {errors.email?.type === "minLength" && (
            <p className="text-red-500">Email must be at least 4 characters</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500">This is not right email pattern</p>
          )}
        </div>
        <ReCaptcha onValidate={setIsValidCaptcha}></ReCaptcha>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-white text-lg">
            Write Your Queries Here: <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={8}
            type="text"
            name="message"
            id="message"
            className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
            {...register("message", { required: true, minLength: 30 })}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message?.type === "required" && (
            <p className="text-red-500">Queries cannot be empty</p>
          )}
          {errors.message?.type === "minLength" && (
            <p className="text-red-500">
              Queries must be at least 30 characters
            </p>
          )}
        </div>
        <button
          disabled={!isValidCaptcha}
          type="submit"
          className="btn btn-primary w-full"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
