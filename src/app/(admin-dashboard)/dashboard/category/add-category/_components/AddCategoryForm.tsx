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
import { Save } from "lucide-react";

const formSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
});

const AddCategoryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="mt-8 border-y border-[#6459491A]/10 py-10 px-[50px]">
      <h3 className="text-lg font-bold text-[#131313] leading-[120%] pb-8">
        General Category
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-[#424242] leading-[120%] pb-3">
                  Category Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[50px] border-dashed border-[#707070] py-[13px] px-[12px] placeholder:text-[#707070] text-primary font-medium leading-[120%] "
                    placeholder="Type category name here. . ."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-end mt-8">
            <Button
              className="h-[45px] flex items-center gap-[10px] text-base font-normal text-[#F4F4F4] leading-[120%] bg-secondary py-[13px] px-[26px] rounded-full"
              type="submit"
            >
              <Save />
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
