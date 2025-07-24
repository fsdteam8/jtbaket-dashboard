"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Current Password must be at least 6 characters.",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "New Password must be at least 8 characters.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
    confirmNewPassword: z.string().min(6, {
      message: "Confirm New Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password.",
    path: ["newPassword"],
  });

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
  });

  const {mutate, isPending} = useMutation({
    mutationKey : ["change-password"],
    mutationFn : (values: { oldPassword: string; newPassword: string })=>fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
      method : "POST",
      headers : {
        "content-type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify(values)
    }).then(res => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Password changed successfully");
      form.reset();
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
      const requestData = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    mutate(requestData);
  }
  return (
    <div>
      <div className="py-[52px] px-8 bg-white rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Change Password
        </h2>
        <div className="flex items-center gap-2 pt-[14px]">
          <Link
            href="/dashboard"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Dashboard
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <Link href="/dashboard/setting">
            <p className="text-base text-[#929292] font-medium leading-[120%]  hover:text-secondary hover:underline">
              Settings
            </p>
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <p className="text-base text-[#929292] font-medium leading-[120%]">
            Change Password
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-[#1F2937] leading-[120%] pb-[36px] pt-[60px]">Change Password</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-manrope leading-[120%] tracking-[0%] text-[#1F2937]">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-[51px] border border-[#595959] rounded-full py-2 px-4 text-lg font-semibold font-manrope leading-[120%]"
                        placeholder="XXXXXXXXXXX"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-3 right-3 disabled:opacity-50"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="text-[#616161] w-5 h-5" />
                        ) : (
                          <EyeOff className="text-[#616161] w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-5">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-manrope leading-[120%] tracking-[0%] text-[#1F2937]">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          className="w-full h-[51px] border border-[#595959] rounded-full py-2 px-4 text-lg font-semibold font-manrope leading-[120%]"
                          placeholder="XXXXXXXXXXX"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-3 right-3 disabled:opacity-50"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <Eye className="text-[#616161] w-5 h-5" />
                          ) : (
                            <EyeOff className="text-[#616161] w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-manrope leading-[120%] tracking-[0%] text-[#1F2937]">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full h-[51px] border border-[#595959] rounded-full py-2 px-4 text-lg font-semibold font-manrope leading-[120%]"
                          placeholder="XXXXXXXXXXX"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-3 right-3 disabled:opacity-50"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <Eye className="text-[#616161] w-5 h-5" />
                          ) : (
                            <EyeOff className="text-[#616161] w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-[61px]">
              <Button
              disabled={isPending}
                className="h-[45px] text-base font-medium bg-secondary text-[#F4F4F4] leading-[120%] py-[13px] px-[38px] rounded-full"
                type="submit"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
