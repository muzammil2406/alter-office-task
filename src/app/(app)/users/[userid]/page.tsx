import { BarChart, Clock, Computer, Smartphone } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type PageProps = {
  params: { userId: string };
};

export default function UserDetailPage({ params }: PageProps) {
  const { userId } = params;

  const recentEvents = [
    { event: "login_form_cta_click", url: "/login", device: "desktop", timestamp: "2024-07-21 10:30:05" },
    { event: "page_view", url: "/dashboard", device: "desktop", timestamp: "2024-07-21 10:30:02" },
    { event: "price_plan_select", url: "/pricing", device: "mobile", timestamp: "2024-07-20 18:44:50" },
    { event: "page_view", url: "/pricing", device: "mobile", timestamp: "2024-07-20 18:44:30" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
        <p className="text-muted-foreground break-all">
          Showing analytics for user: <span className="font-mono text-primary">{userId}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value="248"
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          change="Last seen: 2024-07-21"
          changeType="positive"
        />
        <StatCard
          title="Total Sessions"
          value="12"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          change="First seen: 2024-06-01"
          changeType="positive"
        />
        <StatCard
          title="Primary Device"
          value="Desktop"
          icon={<Computer className="h-4 w-4 text-muted-foreground" />}
          change="Chrome on macOS"
          changeType="positive"
        />
         <StatCard
          title="Location"
          value="New York, USA"
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          change="IP: 192.168.1.1"
          changeType="positive"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>A log of the most recent events triggered by this user.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.event}</TableCell>
                  <TableCell>
                    <span className="font-mono">{event.url}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 pl-1.5">
                      {event.device === 'desktop' ? <Computer className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
                      {event.device}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
