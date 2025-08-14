"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { UserResponse } from "../../../../../../../types/UserProfiledatatype";

// ✅ Schema (email is shown but not editable)
const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(), // shown but disabled
  phone: z.string().optional(),
  country: z.string().optional(),
  cityState: z.string().optional(),
});

type ProfilePayload = z.infer<typeof formSchema>;

const PersonalInfoForm = () => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;
  const userId = (session?.user as { id?: string })?.id;
  const [isEditing, setIsEditing] = useState(true);
  const form = useForm<ProfilePayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      cityState: "",
    },
  });


  const { data } = useQuery<UserResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    enabled: !!token && !!useId,
  });

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.address?.country || "",
        cityState: user.address?.cityState || "",
      });
    }
  }, [data, form]);


  const profileMutation = useMutation<UserResponse, Error, ProfilePayload>({
    mutationFn: async (formData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Failed to update profile");
      return resData;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(true)
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmit = (values: ProfilePayload) => {
    const { name, phone, country, cityState } = values;
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    const payload = {
      name,
      phone,
      address: {
        country,
        cityState,
      },
    };

    profileMutation.mutate(payload);
  };



  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="w-full flex items-center justify-between pt-[56px] pb-[32px]">
            <h3 className="text-2xl font-semibold text-[#212121] leading-[120%]">
              Personal Information Edit
            </h3>
            {/* {open ? (
              <button
                type="button"
                onClick={() => setOPen(false)}
                className="flex items-center gap-2 text-base font-medium text-white bg-primary py-[10px] px-[16px] rounded-full"
              >
                <SquarePen className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <button
                type="submit"
                disabled={profileMutation.isPending}
                className="flex items-center gap-2 text-base font-medium text-white bg-primary py-[10px] px-[16px] rounded-full disabled:opacity-60"
              >
                <SquarePen className="w-4 h-4" />
                {profileMutation.isPending ? "Updating..." : "Save"}
              </button>
            )} */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={profileMutation.isPending}
                className="flex items-center gap-2 text-base font-medium text-white bg-primary leading-[120%] py-[10px] px-[16px] rounded-full disabled:opacity-60"
              >
                <SquarePen className="w-4 h-4" />
                {profileMutation.isPending
                  ? "Updating..."
                  : !isEditing
                    ? "Save"
                    : "Edit"}
              </button>
              {!isEditing &&
                <button
                  type="button"
                  onClick={() => {
                    if (data?.data) {
                      const user = data.data;
                      form.reset({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        country: user.address?.country || "",
                        cityState: user.address?.cityState || "",
                      });
                    }
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 text-base font-medium text-black border border-primary leading-[120%] py-[10px] px-[16px] rounded-full disabled:opacity-60"
                >
                  <SquarePen className="w-4 h-4" />
                  Cancel
                </button>

              }
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-[30px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditing}
                      placeholder="Enter Full Name ..."
                      {...field}
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base font-semibold placeholder:text-[#595959]"
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditing}
                      placeholder="Enter Email ..."
                      {...field}
                      className="border border-[#595959] bg-gray-100 cursor-not-allowed h-[51px] rounded-full p-4 text-base font-semibold placeholder:text-[#595959]"
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditing}
                      placeholder="Enter Phone Number ..."
                      {...field}
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base font-semibold placeholder:text-[#595959]"
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
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditing}
                      placeholder="Enter Country ..."
                      {...field}
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base font-semibold placeholder:text-[#595959]"
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
                  <FormLabel>City/State</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditing}
                      placeholder="Enter City/State ..."
                      {...field}
                      className="border border-[#595959] h-[51px] rounded-full p-4 text-base font-semibold placeholder:text-[#595959]"
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
