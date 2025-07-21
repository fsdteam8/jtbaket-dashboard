import { LayoutDashboard, Settings, Users } from "lucide-react";

export type DashboardSidebardDataType = {
  id: number;
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const DashboardSidebardData: DashboardSidebardDataType[] = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    name: "User Management",
    href: "/dashboard/user-management",
    icon: <Users />,
  },
  {
    id: 3,
    name: "Add Category",
    href: "/dashboard/add-category",
    icon: <LayoutDashboard />,
  },
  {
    id: 4,
    name: "Product Management",
    href: "/dashboard/product-management",
    icon: <LayoutDashboard />,
  },
  {
    id: 5,
    name: "Setting",
    href: "/dashboard/setting",
    icon: <Settings />,
  }
];
