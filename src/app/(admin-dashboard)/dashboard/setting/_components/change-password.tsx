// "use client";

// import { ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface ChangePasswordProps {
//   onBack: () => void;
// }

// export function ChangePassword({ onBack }: ChangePasswordProps) {
//   return (
//     <div className="flex-1 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//             Settings
//           </h1>
//           <div className="flex items-center text-sm text-gray-500">
//             <button onClick={onBack} className="hover:text-gray-700">
//               Dashboard
//             </button>
//             <ChevronRight className="w-4 h-4 mx-2" />
//             <button onClick={onBack} className="hover:text-gray-700">
//               Settings
//             </button>
//             <ChevronRight className="w-4 h-4 mx-2" />
//             <span>Change Password</span>
//           </div>
//         </div>
//         <div
//           className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url(/placeholder.svg?height=40&width=40&query=profile)",
//           }}
//         ></div>
//       </div>

//       {/* Change Password Form */}
//       <div className="max-w-4xl">
//         <h2 className="text-xl font-semibold text-gray-900 mb-8">
//           Change Password
//         </h2>

//         <div className="space-y-6">
//           <div>
//             <Label
//               htmlFor="currentPassword"
//               className="text-sm font-medium text-gray-700 mb-2 block"
//             >
//               Current Password
//             </Label>
//             <Input
//               id="currentPassword"
//               type="password"
//               placeholder="xxxxxxxxx"
//               className="h-12 rounded-full border-gray-300 max-w-2xl"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-6 max-w-4xl">
//             <div>
//               <Label
//                 htmlFor="newPassword"
//                 className="text-sm font-medium text-gray-700 mb-2 block"
//               >
//                 New Password
//               </Label>
//               <Input
//                 id="newPassword"
//                 type="password"
//                 placeholder="xxxxxxxxx"
//                 className="h-12 rounded-full border-gray-300"
//               />
//             </div>
//             <div>
//               <Label
//                 htmlFor="confirmPassword"
//                 className="text-sm font-medium text-gray-700 mb-2 block"
//               >
//                 Confirm New Password
//               </Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="xxxxxxxxx"
//                 className="h-12 rounded-full border-gray-300"
//               />
//             </div>
//           </div>

//           <div className="pt-4">
//             <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full">
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const ChangePassword = () => {
  return (
    <div>
      ChangePassword
    </div>
  )
}

export default ChangePassword
