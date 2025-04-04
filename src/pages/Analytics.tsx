
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, Calendar, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { dummyInventoryData } from '@/data/dummyData';

// Colors for charts
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

const Analytics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Prepare data for charts
  const inventoryItems = dummyInventoryData.filter(item => 
    searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  // Count items by category
  const categoryData = inventoryItems.reduce((acc, item) => {
    const category = acc.find(c => c.name === item.category);
    if (category) {
      category.value += 1;
    } else {
      acc.push({ name: item.category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Count items by priority
  const priorityData = inventoryItems.reduce((acc, item) => {
    const priority = acc.find(p => p.name === item.priority);
    if (priority) {
      priority.value += 1;
    } else {
      acc.push({ name: item.priority, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Generate expiry data
  const expirySoonItems = inventoryItems
    .filter(item => item.expiryDate)
    .sort((a, b) => {
      const dateA = a.expiryDate ? new Date(a.expiryDate) : new Date();
      const dateB = b.expiryDate ? new Date(b.expiryDate) : new Date();
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  // Generate monthly trends data
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const trendData = monthNames.map((month, index) => {
    const baseValue = Math.floor(Math.random() * 300) + 200;
    return {
      name: month,
      items: baseValue,
      additions: Math.floor(baseValue * 0.3),
      removals: Math.floor(baseValue * 0.2)
    };
  });

  // Generate storage usage data
  const storageData = [
    { name: 'Module A', used: 80, capacity: 100 },
    { name: 'Module B', used: 65, capacity: 100 },
    { name: 'Cargo Bay', used: 90, capacity: 100 },
    { name: 'Lab Storage', used: 50, capacity: 100 },
  ];

  // Generate shelf life distribution
  const generateShelfLifeData = () => {
    const shelfLifeRanges = [
      { name: '< 1 Month', value: 0 },
      { name: '1-3 Months', value: 0 },
      { name: '3-6 Months', value: 0 },
      { name: '6-12 Months', value: 0 },
      { name: '> 1 Year', value: 0 },
      { name: 'No Expiry', value: 0 }
    ];

    inventoryItems.forEach(item => {
      if (!item.expiryDate) {
        shelfLifeRanges[5].value += 1;
        return;
      }
      
      const expiryDate = new Date(item.expiryDate);
      const now = new Date();
      const monthsDiff = (expiryDate.getFullYear() - now.getFullYear()) * 12 + 
                         (expiryDate.getMonth() - now.getMonth());
      
      if (monthsDiff < 1) {
        shelfLifeRanges[0].value += 1;
      } else if (monthsDiff < 3) {
        shelfLifeRanges[1].value += 1;
      } else if (monthsDiff < 6) {
        shelfLifeRanges[2].value += 1;
      } else if (monthsDiff < 12) {
        shelfLifeRanges[3].value += 1;
      } else {
        shelfLifeRanges[4].value += 1;
      }
    });

    return shelfLifeRanges;
  };

  const shelfLifeData = generateShelfLifeData();

  // Handle item click to navigate to detail
  const handleItemClick = (itemId: string) => {
    navigate(`/inventory?highlight=${itemId}`);
  };

  // Custom tooltip component for the bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
          {payload[1] && <p className="text-sm">{`${payload[1].name}: ${payload[1].value}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive inventory analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory items..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
            <CardDescription>Current inventory count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{inventoryItems.length}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Storage Utilization</CardTitle>
            <CardDescription>Average across all locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">78%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
              <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Items Expiring Soon</CardTitle>
            <CardDescription>Within 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{expirySoonItems.length}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
              <span>Requires immediate attention</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Analysis</TabsTrigger>
          <TabsTrigger value="storage">Storage Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Items by Category</CardTitle>
                <CardDescription>Distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        onClick={(data) => setCategoryFilter(data.name)}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-center mt-3 text-muted-foreground">
                  Click on a segment to filter by category
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Items by Priority</CardTitle>
                <CardDescription>Distribution across priority levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={priorityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Items" onClick={(data) => handleItemClick(data.name)}>
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.name === 'high' ? PRIORITY_COLORS.high :
                            entry.name === 'medium' ? PRIORITY_COLORS.medium :
                            PRIORITY_COLORS.low
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-center mt-3 text-muted-foreground">
                  Click on a bar to see items of that priority
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Item Activities</CardTitle>
              <CardDescription>Last 5 inventory movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.slice(0, 5).map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category} - {item.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        item.priority === 'high' ? 'bg-red-600' : 
                        item.priority === 'medium' ? 'bg-yellow-600' : 
                        'bg-green-600'
                      }>
                        {item.priority}
                      </Badge>
                      <div className="text-sm text-muted-foreground">QTY: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Trends</CardTitle>
              <CardDescription>Item counts and movement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="items" name="Total Items" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="additions" name="Added Items" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="removals" name="Removed Items" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expiry" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shelf Life Distribution</CardTitle>
                <CardDescription>Items by remaining shelf life</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shelfLifeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {shelfLifeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Items Expiring Soon</CardTitle>
                <CardDescription>Items expiring within 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expirySoonItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                      <div className="text-amber-500 font-medium">
                        {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Utilization by Location</CardTitle>
              <CardDescription>Space usage across different storage areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={storageData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="used" name="Used Space" fill="#8884d8" />
                    <Bar dataKey="capacity" name="Total Capacity" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {storageData.map((location) => (
                  <div key={location.name} className="text-center">
                    <div className="text-lg font-semibold">{location.name}</div>
                    <div className="text-3xl font-bold mt-1">{Math.round((location.used / location.capacity) * 100)}%</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${Math.round((location.used / location.capacity) * 100)}%`,
                          backgroundColor: Math.round((location.used / location.capacity) * 100) > 80 ? '#ef4444' : '#3b82f6'
                        }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {location.used}/{location.capacity} units
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
