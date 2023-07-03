import { type NextPage } from "next";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
const formSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
});
type FormSchemaType = z.infer<typeof formSchema>;

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <div className="m-auto flex h-screen w-screen max-w-7xl flex-wrap justify-center gap-5 p-5">
      <div className="flex flex-col  justify-center ">
        <div className="mr-au mb-1.5  text-3xl font-semibold text-black">
          Login
        </div>
        <div className="mb-11 max-w-lg text-xs text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          molestiae omnis explicabo voluptas. Sed, facilis obcaecati?
          Praesentium qui quo delectus facere, tempore officiis ipsum expedita,
          assumenda blanditiis sapiente iure iusto?
        </div>
        <Image
          src="/imgs/sample-img.jpg"
          alt="Login Image"
          width={321}
          height={223}
          className="mx-auto"
        />
      </div>

      <form
        action="submit"
        className="mt-4 flex flex-col items-start justify-center gap-2"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="phoneNumber" className="text-base">
          Enter your phone number
        </label>
        <input
          {...register("phoneNumber")}
          id="phoneNumber"
          type="text"
          className="h-[50px] w-[321px] rounded-md border-[0.5px] border-solid border-[#14224A]"
        />
        {errors.phoneNumber && (
          <span className="mt-2 block text-red-800">
            {errors.phoneNumber.message}
          </span>
        )}
        <button
          type="submit"
          className="mt-11 h-[50px] w-[321px] rounded-md border-none bg-[#14224A] text-[18px] font-bold text-white"
          disabled={isSubmitting}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Login;
