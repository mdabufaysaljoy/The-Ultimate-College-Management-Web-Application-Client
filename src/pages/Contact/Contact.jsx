import Swal from "sweetalert2";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useForm } from "react-hook-form";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAuth from "../../hooks/useAuth/useAuth";
import useContactMessage from "../../hooks/useContactMessage/useContactMessage";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import bgimage from "../../assets/contact-background.jpg";
import { LocateIcon, LocationEditIcon } from "lucide-react";
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
      email: user ? user.email : "",
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
    <section id="contact" className="my-12">
      <div
        className="w-full h-[400px]  bg-cover bg-center mb-8 flex items-center ps-36 "
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="max-w-1/2 space-y-8">
          <h2 className="text-5xl font-bold">Contact & Location</h2>
          <div className="flex gap-2">
            <FaLocationDot fontSize={50} />
            <p className="text-xl font-semibold">
              United City, Madani Avenue, Badda, Dhaka, <br /> Dhaka 1212,
              Bangladesh
            </p>
          </div>
          <div className="text-lg text-white font-bold">
            <div className="p-4 bg-brand flex items-center gap-6">
              <FaPhoneAlt />
              09604 848848
            </div>
            <div className="divider m-[-9px] p-0"></div>
            <div className="p-4 bg-brand flex items-center gap-6">
              <MdOutlinePhoneAndroid />
              Admission Office: +8801759039498, +8801759039465, <br />{" "}
              +8801759039451, +8801914001470, +8801550704732
            </div>
          </div>
        </div>
      </div>
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
        <PrimaryButton
          disabled={!isValidCaptcha}
          type="submit"
          className="w-full"
        >
          Submit
        </PrimaryButton>
      </form>
    </section>
  );
};

export default Contact;
