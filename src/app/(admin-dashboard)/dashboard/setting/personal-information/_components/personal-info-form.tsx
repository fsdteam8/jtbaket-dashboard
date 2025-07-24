"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 11 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  cityState: z.string().min(2, {
    message: "City/State must be at least 2 characters.",
  }),
});

const PersonalInfoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      cityState: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="w-full flex items-center justify-between pt-[56px] pb-[32px]">
            <h3 className="text-2xl font-semibold text-[#212121] leading-[120%]">
              Personal Information Edit
            </h3>
            <button
              type="submit"
              className="flex items-center gap-2 text-base font-medium text-white bg-secondary leading-[120%] py-[10px] px-[16px] rounded-full"
            >
              <SquarePen className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter First Name ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter Last Name ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter Email ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter Phone Number ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    Countery
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter Country ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#1F2937] leading-[120%]">
                    City/State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base text-primary leading-normal font-semibold placeholder:text-[#595959]"
                      placeholder="Enter city/state ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
