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
  { id: 1, name: "2000", value: 2000 },
  { id: 2, name: "2001", value: 2001 },
  { id: 3, name: "2002", value: 2002 },
];

export function DashboardSummery() {
  const [year, setYear] = useState("2025")
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
            selectedValue={year}
            onValueChange={(year) => setYear(String(year))}
            placeholderText="Select Year"
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
