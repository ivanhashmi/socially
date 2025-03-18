import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { createUserAccount } from "@/lib/appwrite/api";

const SignupForm = () => {
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className="lg:w-1/2 flex justify-center items-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h1 className="text-2xl pt-5 ">Create a new account</h1>
        <p className="text-gray-500 text-xl lg:text-base">
          To use socially enter your account details.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="h-12 bg-gray-50 focus-visible:ring-1 focus-visible:ring-offset-1 !important"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="h-12 bg-gray-50 focus-visible:ring-1 focus-visible:ring-offset-1 !important"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="h-12 bg-gray-50 focus-visible:ring-1 focus-visible:ring-offset-1 !important"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-12 bg-gray-50 focus-visible:ring-1 focus-visible:ring-offset-1 !important"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 bg-indigo-500 text-white hover:bg-indigo-600 flex gap-2 !important hover:cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
