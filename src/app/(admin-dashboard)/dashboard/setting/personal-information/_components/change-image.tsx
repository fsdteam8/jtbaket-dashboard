"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { UserResponse } from "../../../../../../../types/UserProfiledatatype";

const ProfileCard = () => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;
  const userId = (session?.user as { id?: string })?.id;
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ["me"],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/upload-avatar/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Profile image updated successfully");
      setImageFile(null);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.message || "Image upload failed");
    },
  });

  const handleFileIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    mutation.mutate(formData);
  };

  const user = data?.data;

  return (
    <div className="flex flex-col items-center p-6 rounded-lg max-w-sm mx-auto">
      <div className="relative">
        {isLoading ? (
          <Skeleton className="w-56 h-56 rounded-full" />
        ) : (
          <Avatar
            className="w-56 h-56 border-2 border-gray-200 cursor-pointer"
            onClick={handleFileIconClick}
          >
            <AvatarImage
              src={selectedImage || user?.profileImage || "/placeholder-avatar.jpg"}
              alt={user?.name || "Profile Avatar"}
              className="object-cover"
            />
            <AvatarFallback className="text-xl">
              {user?.name?.slice(0, 2).toUpperCase() || "BE"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="mt-6 text-center">
        {isLoading ? (
          <>
            <Skeleton className="w-32 h-6 mx-auto mb-2 rounded" />
            <Skeleton className="w-24 h-4 mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || "User Name"}</h2>
            <p className="mt-2 text-gray-600">{user?.role || "User Role"}</p>
          </>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {selectedImage ?

        <Button
          onClick={handleEditClick}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/10 transition-colors"
          disabled={!imageFile || mutation.isPending}
        >
          {mutation.isPending ? "Saveing..." : "Save"}
        </Button>
        :
        <Button
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/10 transition-colors"
          disabled={!imageFile || mutation.isPending}
        >
          Edit Image
        </Button>
      }

    </div>
  );
};

export default ProfileCard;
