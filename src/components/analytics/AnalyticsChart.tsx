"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-15", events: 186, clicks: 80 },
  { date: "2024-07-16", events: 305, clicks: 200 },
  { date: "2024-07-17", events: 237, clicks: 120 },
  { date: "2024-07-18", events: 73, clicks: 190 },
  { date: "2024-07-19", events: 209, clicks: 130 },
  { date: "2024-07-20", events: 214, clicks: 140 },
  { date: "2024-07-21", events: 350, clicks: 210 },
]

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
}

export default function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Summary</CardTitle>
        <CardDescription>Events in the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="events" fill="var(--color-events)" radius={4} />
            <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
