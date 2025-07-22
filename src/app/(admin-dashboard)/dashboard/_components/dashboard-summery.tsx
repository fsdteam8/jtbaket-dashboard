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

export const description = "An area chart with a legend";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 160, mobile: 90 },
  { month: "August", desktop: 198, mobile: 110 },
  { month: "September", desktop: 250, mobile: 100 },
  { month: "October", desktop: 300, mobile: 180 },
  { month: "November", desktop: 220, mobile: 95 },
  { month: "December", desktop: 275, mobile: 150 },
];

const chartConfig = {
  desktop: {
    label: "Approval",
    color: "#00D7C0",
  },
  mobile: {
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

export function DashboardSummery() {
  const [selectedYear, setSelectedYear] = useState<string | number | undefined>(
    undefined
  );
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
            data={chartData}
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
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
