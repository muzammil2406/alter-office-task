import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: "positive" | "negative";
};

export default function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs text-muted-foreground",
          changeType === "positive" ? "text-emerald-500" : "text-red-500"
        )}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
