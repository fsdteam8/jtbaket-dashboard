"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import JtbaketDropdownSelector from "@/components/ui/JtbaketDropdownSelector";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import DashboardSummerySkeleton from "./dashboard-summery-skeleton";

export const description = "An area chart with a legend";

const chartConfig = {
  Approved: {
    label: "Approval",
    color: "#00D7C0",
  },
  Pending: {
    label: "Pending",
    color: "#3E00D7",
  },
} satisfies ChartConfig;

const yearList = [
  { id: 3, name: "2022", value: 2022 },
  { id: 4, name: "2023", value: 2023 },
  { id: 5, name: "2024", value: 2024 },
  { id: 6, name: "2025", value: 2025 },
  { id: 7, name: "2026", value: 2026 },
  { id: 8, name: "2027", value: 2027 },
  { id: 9, name: "2028", value: 2028 },
  { id: 10, name: "2029", value: 2029 },
  { id: 11, name: "2030", value: 2030 },
];

export type UserRegistrationTrendResponse = {
  status: boolean;
  message: string;
  data: MonthlyUserTrend[];
};

export type MonthlyUserTrend = {
  month: string; // e.g., "Jan", "Feb", etc.
  Pending: number;
  Approved: number;
};

export function DashboardSummery() {
  const [selectedYear, setSelectedYear] = useState<string | number | undefined>(
    new Date().getFullYear()
  );

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  // console.log({ token });

  const { data, isLoading, isError, error } =
    useQuery<UserRegistrationTrendResponse>({
      queryKey: ["dashboard-overview-summery", selectedYear],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user-trends?year=${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
    });

  console.log(data?.data);
  if (isLoading) {
    return <div><DashboardSummerySkeleton/></div>;
  }
  if (isError) {
    return (
      <div className="w-full h-[300px] rounded-lg border p-4 bg-gray-200 animate-pulse flex items-center justify-center mt-14">
        <p className="text-black text-3xl font-bold text-center leading-normal ">{error?.message}</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-h-[426px] mt-[34px]">
      <div className="w-full flex items-center justify-between pr-10">
        <CardHeader>
          <CardTitle className="text-[32px] font-semibold text-[#1C2024] leading-[120%] pb-[2px]">
            Summery
          </CardTitle>
          <CardDescription className="text-sm font-normal text-[#60646C] leadng-[20px]">
            Showing total visitors for the last 1 Years
          </CardDescription>
        </CardHeader>
        <div className="text-primary ">
          <JtbaketDropdownSelector
            list={yearList}
            selectedValue={selectedYear}
            onValueChange={setSelectedYear}
            placeholderText="Select a year"
          />
        </div>
      </div>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={data?.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" className="bg-white" />
              }
            />
            <Area
              dataKey="Approved"
              type="natural"
              fill="var(--color-Approved)"
              fillOpacity={0.4}
              stroke="var(--color-Approved)"
              stackId="a"
            />
            <Area
              dataKey="Pending"
              type="natural"
              fill="var(--color-Pending)"
              fillOpacity={0.4}
              stroke="var(--color-Pending)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
