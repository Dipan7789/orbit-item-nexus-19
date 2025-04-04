
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface ExpiryItem {
  id: string;
  name: string;
  expiryDate: Date;
  category: string;
  location: string;
  daysLeft: number;
}

const calculateDaysLeft = (expiryDate: Date): number => {
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getProgressColor = (daysLeft: number): string => {
  if (daysLeft < 0) return 'bg-red-500';
  if (daysLeft < 7) return 'bg-red-500';
  if (daysLeft < 30) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getBadgeVariant = (daysLeft: number): 'default' | 'destructive' | 'outline' | 'secondary' => {
  if (daysLeft < 0) return 'destructive';
  if (daysLeft < 7) return 'destructive';
  if (daysLeft < 30) return 'secondary';
  return 'outline';
};

const formatExpiryMessage = (daysLeft: number): string => {
  if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} days ago`;
  if (daysLeft === 0) return 'Expires today';
  if (daysLeft === 1) return 'Expires tomorrow';
  return `Expires in ${daysLeft} days`;
};

const ExpiryTracker: React.FC = () => {
  // Sample data - in a real app this would come from a database or API
  const items: ExpiryItem[] = [
    {
      id: 'MED-001',
      name: 'Emergency Medicine Kit',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      category: 'Medical',
      location: 'Module A',
      daysLeft: 5
    },
    {
      id: 'FOOD-023',
      name: 'Freeze-Dried Ice Cream',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      category: 'Food',
      location: 'Module B',
      daysLeft: 15
    },
    {
      id: 'MED-017',
      name: 'Antibiotics',
      expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      category: 'Medical',
      location: 'Lab Storage',
      daysLeft: -2
    },
    {
      id: 'FOOD-045',
      name: 'Rehydratable Meals',
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      category: 'Food',
      location: 'Cargo Bay',
      daysLeft: 60
    },
    {
      id: 'MED-008',
      name: 'Bandages',
      expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      category: 'Medical',
      location: 'Module A',
      daysLeft: 25
    }
  ];

  // Group items by expiry range
  const expired = items.filter(item => item.daysLeft < 0);
  const critical = items.filter(item => item.daysLeft >= 0 && item.daysLeft < 7);
  const warning = items.filter(item => item.daysLeft >= 7 && item.daysLeft < 30);
  const safe = items.filter(item => item.daysLeft >= 30);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Expiry Tracker
            </CardTitle>
            <CardDescription>Monitor items approaching expiration</CardDescription>
          </div>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle size={12} />
            {expired.length + critical.length} urgent
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All ({items.length})</TabsTrigger>
            <TabsTrigger value="expired" className="text-red-500">Expired ({expired.length})</TabsTrigger>
            <TabsTrigger value="critical">Critical ({critical.length})</TabsTrigger>
            <TabsTrigger value="warning">Warning ({warning.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {items.map((item) => (
              <ExpiryItemCard key={item.id} item={item} />
            ))}
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4">
            {expired.length > 0 ? (
              expired.map((item) => (
                <ExpiryItemCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">No expired items</p>
            )}
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            {critical.length > 0 ? (
              critical.map((item) => (
                <ExpiryItemCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">No items critical expiry</p>
            )}
          </TabsContent>
          
          <TabsContent value="warning" className="space-y-4">
            {warning.length > 0 ? (
              warning.map((item) => (
                <ExpiryItemCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">No items with warning expiry</p>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 flex justify-end">
          <Button size="sm">View All Expirations</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface ExpiryItemCardProps {
  item: ExpiryItem;
}

const ExpiryItemCard: React.FC<ExpiryItemCardProps> = ({ item }) => {
  const { id, name, daysLeft, category, location } = item;
  
  // Calculate progress percentage (100% = 90 days, 0% = expired)
  const maxDays = 90;
  const progressPercentage = Math.max(0, Math.min(100, (daysLeft / maxDays) * 100));
  
  return (
    <div className="border rounded-lg p-3 shadow-sm bg-background relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-sm flex items-center gap-2">
            {name}
            {daysLeft < 0 && <AlertCircle size={16} className="text-red-500" />}
          </div>
          <div className="text-xs text-muted-foreground mt-1">ID: {id}</div>
        </div>
        <Badge variant={getBadgeVariant(daysLeft)} className="text-xs">
          {formatExpiryMessage(daysLeft)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
        <div>Category: {category}</div>
        <div>Location: {location}</div>
      </div>
      
      <div className="mt-2">
        <Progress value={progressPercentage} className={getProgressColor(daysLeft)} />
      </div>
    </div>
  );
};

export default ExpiryTracker;
