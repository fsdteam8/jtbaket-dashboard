"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

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

// ✅ Schema definition
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
      confirmNewPassword: "",
    },
  });

  // ✅ Mutation for changing password
  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData?.error || "Password change failed");
      }

      return responseData;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Password change failed");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <div>
      <div className="py-[52px] px-8 bg-white rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">Change Password</h2>
        <div className="flex items-center gap-2 pt-[14px]">
          <Link
            href="/dashboard"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Dashboard
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <Link href="/dashboard/setting">
            <p className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline">
              Settings
            </p>
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <p className="text-base text-[#929292] font-medium leading-[120%]">
            Change Password
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-[#1F2937] leading-[120%] pb-[36px] pt-[60px]">
          Change Password
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className="h-[51px] border border-[#595959] rounded-full p-4 text-base font-semibold"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3 right-3"
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5 text-[#616161]" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-[#616161]" />
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
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="********"
                          className="h-[51px] border border-[#595959] rounded-full p-4 text-base font-semibold"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute top-3 right-3"
                        >
                          {showNewPassword ? (
                            <Eye className="w-5 h-5 text-[#616161]" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-[#616161]" />
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="********"
                          className="h-[51px] border border-[#595959] rounded-full p-4 text-base font-semibold"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute top-3 right-3"
                        >
                          {showConfirmPassword ? (
                            <Eye className="w-5 h-5 text-[#616161]" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-[#616161]" />
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
                type="submit"
                disabled={isPending}
                className="h-[45px] text-base font-medium bg-secondary text-white py-[13px] px-[38px] rounded-full"
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
