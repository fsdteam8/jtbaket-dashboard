// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { ChevronRight, Edit } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// interface PersonalInformationProps {
//   onBack: () => void
// }

// const formSchema = z.object({
//   firstName: z.string().min(2, {
//     message: "First name must be at least 2 characters.",
//   }),
//   lastName: z.string().min(2, {
//     message: "Last name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   phone: z.string().min(10, {
//     message: "Phone number must be at least 10 characters.",
//   }),
//   country: z.string().min(2, {
//     message: "Country must be at least 2 characters.",
//   }),
//   cityState: z.string().min(2, {
//     message: "City/State must be at least 2 characters.",
//   }),
// })

// export function PersonalInformation({ onBack }: PersonalInformationProps) {
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "Bessie",
//       lastName: "Edwards",
//       email: "darrellsteward@gmail.com",
//       phone: "(307) 555-0133",
//       country: "Syria",
//       cityState: "Alabama",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//     // Handle form submission here
//   }

//   const handleImageEdit = () => {
//     fileInputRef.current?.click()
//   }

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="flex-1 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
//           <div className="flex items-center text-sm text-gray-500">
//             <button onClick={onBack} className="hover:text-gray-700">
//               Dashboard
//             </button>
//             <ChevronRight className="w-4 h-4 mx-2" />
//             <button onClick={onBack} className="hover:text-gray-700">
//               Settings
//             </button>
//             <ChevronRight className="w-4 h-4 mx-2" />
//             <span>Personal Information</span>
//           </div>
//         </div>
//         <div
//           className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center"
//           style={{ backgroundImage: "url(/placeholder.svg?height=40&width=40&query=profile)" }}
//         ></div>
//       </div>

//       <div className="flex gap-8 max-w-6xl">
//         {/* Form Section */}
//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
//             <Button className="bg-green-500 hover:bg-green-600 text-white">
//               <Edit className="w-4 h-4 mr-2" />
//               Edit
//             </Button>
//           </div>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
//                       <FormControl>
//                         <Input {...field} type="email" className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
//                       <FormControl>
//                         <Input {...field} className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="country"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
//                       <FormControl>
//                         <Input {...field} className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="cityState"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-gray-700">City/State</FormLabel>
//                       <FormControl>
//                         <Input {...field} className="h-12 rounded-full border-gray-300" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="flex justify-end pt-4">
//                 <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-8">
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>

//         {/* Profile Section */}
//         <div className="w-80 flex flex-col items-center">
//           <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
//             {profileImage ? (
//               <img
//                 src={profileImage || "/placeholder.svg"}
//                 alt="Profile"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             ) : (
//               <img
//                 src="/placeholder.svg?height=128&width=128"
//                 alt="Profile"
//                 className="w-full h-full object-cover rounded-full"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement
//                   target.style.display = "none"
//                   target.parentElement!.innerHTML =
//                     '<div class="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-2xl font-semibold">BE</div>'
//                 }}
//               />
//             )}
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">Bessie Edwards</h3>
//           <p className="text-sm text-gray-500 mb-6">Admin</p>
//           <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
//           <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleImageEdit}>
//             <Edit className="w-4 h-4 mr-2" />
//             Edit Image
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from "react";

const PersonalInformation = () => {
  return <div>PersonalInformation</div>;
};

export default PersonalInformation;
