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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  rememberMe: z.boolean(),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-0">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 sm:p-7 md:p-8 rounded-2xl bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.10)]">
        <h3 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-[#1F2937] text-center leading-tight">
          Welcome Back
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-5 sm:pt-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-sm sm:text-base font-medium pb-2">
                    Email
                    <sup>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 2.94136L5.09314 2.75025L3.99841 0L2.90367 2.75025L0 2.94136L2.22709 4.83239L1.49628 7.70097L3.99841 6.11939L6.50055 7.70097L5.76973 4.83239L8 2.94136Z"
                          fill="#04AF1E"
                        />
                      </svg>
                    </sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
                      className="w-full h-[48px] sm:h-[52px] text-sm sm:text-base rounded-full p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-sm sm:text-base font-medium pb-2">
                    Password
                    <sup>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 2.94136L5.09314 2.75025L3.99841 0L2.90367 2.75025L0 2.94136L2.22709 4.83239L1.49628 7.70097L3.99841 6.11939L6.50055 7.70097L5.76973 4.83239L8 2.94136Z"
                          fill="#04AF1E"
                        />
                      </svg>
                    </sup>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password..."
                        className="w-full h-[48px] sm:h-[52px] text-sm sm:text-base rounded-full p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                        {...field}
                      />
                      <button type="button" className="absolute top-3.5 right-4">
                        {showPassword ? (
                          <Eye onClick={() => setShowPassword(false)} />
                        ) : (
                          <EyeOff onClick={() => setShowPassword(true)} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Remember Me + Forgot Password */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <FormItem className="flex items-center justify-center gap-2">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm "
                    >
                      Remember Me
                    </Label>
                    {/* <FormMessage className="text-red-500" /> */}
                  </FormItem>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-secondary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] sm:h-[52px] text-base sm:text-lg font-bold text-white bg-secondary rounded-full shadow-md"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
