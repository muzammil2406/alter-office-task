import { ArrowUpRight, BarChart, Users, Link as LinkIcon } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';
import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const topReferrers = [
    { source: "google.com", visitors: 1250, trend: "+15.2%" },
    { source: "twitter.com", visitors: 832, trend: "+8.1%" },
    { source: "github.com", visitors: 621, trend: "-2.4%" },
    { source: "producthunt.com", visitors: 450, trend: "+20.5%" },
  ];

  const topPages = [
    { path: "/pricing", views: 2890, unique: 1500 },
    { path: "/", views: 2450, unique: 1200 },
    { path: "/blog/new-features", views: 1980, unique: 980 },
    { path: "/docs", views: 1500, unique: 800 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your website's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Visitors"
          value="12,345"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+20.1% from last month"
          changeType="positive"
        />
        <StatCard
          title="Total Events"
          value="150,832"
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          change="+15.5% from last month"
          changeType="positive"
        />
        <StatCard
          title="Bounce Rate"
          value="25.4%"
          icon={<LinkIcon className="h-4 w-4 text-muted-foreground" />}
          change="-2.1% from last month"
          changeType="negative"
        />
        <StatCard
          title="Average Session"
          value="3m 15s"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+5.8% from last month"
          changeType="positive"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsChart />
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Visitors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topReferrers.map((referrer) => (
                  <TableRow key={referrer.source}>
                    <TableCell>
                      <div className="font-medium">{referrer.source}</div>
                    </TableCell>
                    <TableCell className="text-right">{referrer.visitors.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Pages</CardTitle>
           <Button variant="outline" size="sm" asChild>
              <Link href="#">View All Pages <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Unique Visitors</TableHead>
                <TableHead className="text-right">Device Breakdown</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-medium">{page.path}</TableCell>
                  <TableCell>{page.views.toLocaleString()}</TableCell>
                  <TableCell>{page.unique.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Badge variant="secondary">Desktop: 60%</Badge>
                      <Badge variant="secondary">Mobile: 40%</Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
