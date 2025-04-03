
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid, Package, FileUp, Search, BarChart4, ArrowUp, ArrowDown } from 'lucide-react';
import StorageUtilizationChart from '@/components/dashboard/StorageUtilizationChart';
import RecentActivityList from '@/components/dashboard/RecentActivityList';
import PriorityItems from '@/components/dashboard/PriorityItems';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Astronaut. Here's your storage overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Search size={16} />
            Quick Find
          </Button>
          <Button className="gap-2">
            <Package size={16} />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Items</CardTitle>
            <CardDescription>Current inventory count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">247</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowUp size={14} className="text-green-500" />
                  <span className="text-green-500">+12</span> since last supply mission
                </div>
              </div>
              <Package size={40} className="text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Storage Utilization</CardTitle>
            <CardDescription>Available space capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">76%</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowDown size={14} className="text-green-500" />
                  <span className="text-green-500">4%</span> after last optimization
                </div>
              </div>
              <Grid size={40} className="text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">High Priority</CardTitle>
            <CardDescription>Items needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowUp size={14} className="text-red-500" />
                  <span className="text-red-500">+3</span> in the last week
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-yellow-600">3 Med</Badge>
                <Badge className="bg-red-600">5 High</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Storage Utilization</CardTitle>
                <CardDescription>Usage across storage compartments</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <BarChart4 size={16} className="mr-2" />
                Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <StorageUtilizationChart />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Priority Items</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <PriorityItems />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="space-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory operations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RecentActivityList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
