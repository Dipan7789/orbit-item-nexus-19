
import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface PriorityItem {
  id: string;
  name: string;
  location: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface PriorityItemsProps {
  onItemClick?: (itemId: string) => void;
}

const PriorityItems: React.FC<PriorityItemsProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = React.useState<PriorityItem[]>([
    {
      id: 'MED-1234',
      name: 'Medical Kit',
      location: 'Module A - Cabinet 3',
      reason: 'Expiring soon (5 days)',
      priority: 'high'
    },
    {
      id: 'FOOD-5678',
      name: 'Freeze-Dried Meals',
      location: 'Cargo Bay - Food Storage',
      reason: 'Low quantity (3 left)',
      priority: 'high'
    },
    {
      id: 'OXY-9012',
      name: 'Oxygen Canisters',
      location: 'Module B - Life Support',
      reason: 'Scheduled replacement',
      priority: 'medium'
    }
  ]);
  
  // Handle Locate button click
  const handleLocate = (itemId: string) => {
    // Navigate to inventory with the item ID as highlight parameter
    navigate(`/inventory?highlight=${itemId}`);
  };
  
  // Handle Mark Resolved button click
  const handleMarkResolved = (itemId: string) => {
    // Update local state
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // Show success toast
    toast({
      title: "Item Resolved",
      description: "The item has been marked as resolved.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="space-card p-3 rounded-md"
        >
          <div className="flex items-start gap-2">
            <div className={`mt-0.5 ${
              item.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
            }`}>
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <Badge 
                  className={
                    item.priority === 'high' ? 'bg-red-600' : 'bg-yellow-600'
                  }
                >
                  {item.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.location}</p>
              <p className="text-xs mt-1">{item.reason}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => handleLocate(item.id)}
            >
              Locate
            </Button>
            <Button 
              size="sm" 
              className="w-full text-xs flex items-center gap-1"
              onClick={() => handleMarkResolved(item.id)}
            >
              <CheckCircle2 size={14} />
              Mark Resolved
            </Button>
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
          <p>All items resolved. Good job!</p>
        </div>
      )}
    </div>
  );
};

export default PriorityItems;
