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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Category,
  CategoryResponse,
} from "../../../category/_components/category-container";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Product type is required.",
  }),
  category: z
    .string()
    .min(1, { message: "Please select a category." })
    .optional(),
  price: z
    .string()
    .min(1, {
      message: "Price is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid positive number.",
    }),
  quantity: z
    .string()
    .min(1, {
      message: "Quantity is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a valid positive number.",
    }),
  //   quantity: z
  //     .string()
  //     .min(1, {
  //       message: "Quantity is required.",
  //     })
  //     .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
  //       message: "Quantity must be a valid positive number.",
  //     }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  thumbnail: z.any().optional(),
});

export type GetProductResponse = {
  status: boolean;
  message: string;
  data: Product;
};

export type Product = {
  _id: string;
  name: string;
  type: "indoor" | "outdoor"; // assuming these are fixed values
  quantity: number;
  price: number;
  description: string;
  thumbnail: string; // URL to image
  category: {
    _id: string;
    name: string;
  };
  stockStatus: "inStock" | "lowStock" | "outOfStock";
  productId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

const EditProductForm = ({ productId }: { productId: string }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      thumbnail: undefined,
    },
  });

  const { data: singleProduct } = useQuery<GetProductResponse>({
    queryKey: ["product", productId],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log(singleProduct?.data);

  useEffect(() => {
    if (singleProduct?.data) {
      form.reset({
        name: singleProduct?.data?.name || "",
        type: singleProduct?.data?.type || "",
        category: singleProduct?.data?.category?._id || "",
        price: singleProduct?.data?.price?.toString() || "",

        quantity: singleProduct?.data?.quantity?.toString() || "",

        description: singleProduct?.data?.description || "",
        thumbnail: undefined,
      });
      if (singleProduct.data.thumbnail) {
        setPreviewImage(singleProduct.data.thumbnail);
      }
    }
  }, [singleProduct, form]);

  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("thumbnail", [file]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // get category api logic
  const { data } = useQuery<CategoryResponse>({
    queryKey: ["category-all-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log(data?.data?.categories);

  // product post api
  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-category", productId],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          contentType: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Product edit successfully");
      form.reset();
      router.push("/dashboard/product-management");
      queryClient.invalidateQueries({ queryKey: ["product-all-data"] });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("category", values.category || "");
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    const imageFile = values.thumbnail?.[0];
    if (imageFile) {
      formData.append("thumbnail", imageFile);
    }
    mutate(formData);
  }

  return (
    <div className="pb-[133px]">
      <div className="bg-white shadow-[0px_0px_4px_0px_#00000040] py-[39px] px-[80px] mt-[42px] rounded-md ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[50px] w-full rounded-full border border-[#B6B6B6] placeholder:text-black/20 p-4 text-primary font-semibold text-lg"
                        placeholder="Procut Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                      Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full h-[50px] border border-[#B6B6B6] rounded-full">
                          <SelectValue placeholder="Type Name" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="indoor">In Door</SelectItem>
                          <SelectItem value="outdoor">Out Door</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-[50px] border border-[#B6B6B6] rounded-full">
                        <SelectValue placeholder="Category Name" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {data?.data?.categories?.map((category: Category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[50px] w-full rounded-full border border-[#B6B6B6] placeholder:text-black/20 p-4 text-primary font-semibold text-lg"
                        placeholder="Add Price ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[50px] w-full rounded-full border border-[#B6B6B6] placeholder:text-black/20 p-4 text-primary font-semibold text-lg"
                        placeholder="Add Quantity ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                    Descriptioin
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[174px] w-full rounded-[20px] border border-[#B6B6B6] placeholder:text-black/20 p-4 text-primary font-semibold text-lg"
                      placeholder="Description ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold text-[#1F2937] leading-[120%]">
                      Upload Image
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        {!previewImage ? (
                          <div
                            className={`
                                  h-[200px] border border-[#B6B6B6] rounded-[20px] p-8 text-center cursor-pointer transition-colors
                                  ${
                                    isDragOver
                                      ? "border-blue-400 bg-blue-50"
                                      : "border-gray-300 hover:border-gray-400"
                                  }
                                `}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                          >
                            <div className="h-full flex flex-col items-center justify-center space-y-3">
                              <div className="flex flex-col items-center justify-center ">
                                <ImagePlus className="w-[38px] h-[38px] text-secondary " />
                                <p className="text-base font-medium text-secondary leading-[120%] pt-2">
                                  Upload
                                </p>
                              </div>
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageChange(file);
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              width={292}
                              height={200}
                              src={previewImage || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-[200px] object-cover rounded-lg border border-[#B6B6B6]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                form.setValue("thumbnail", undefined);
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
                            >
                              <X className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                            >
                              <Upload className="h-4 w-4 text-gray-600" />
                            </button>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageChange(file);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-[21px]">
              <button
                disabled={isPending}
                type="submit"
                className="text-base text-white font-medium leading-[120%] bg-secondary py-[16px] px-[61px] rounded-full"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="text-base text-[#E54155] font-medium leading-[120%] border border-[#E54155] py-[15px] px-[38px] rounded-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProductForm;
