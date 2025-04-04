
import React from 'react';
import { AlertTriangle, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface PriorityItemsProps {
  onItemClick: (itemId: string) => void;
}

const PriorityItems: React.FC<PriorityItemsProps> = ({ onItemClick }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample priority items data
  const priorityItems = [
    { id: 'MED-001', name: 'Emergency Medical Kit', location: 'Storage Bay A', priority: 'high' },
    { id: 'TOOL-042', name: 'EVA Repair Tools', location: 'Module C', priority: 'medium' },
    { id: 'FOOD-107', name: 'Nutrient Supplement Packs', location: 'Crew Quarters', priority: 'high' },
  ];
  
  const handleMarkResolved = (id: string, name: string) => {
    // In a real app, you would update the database here
    toast({
      title: "Item Marked as Resolved",
      description: `${name} has been marked as resolved.`
    });
  };
  
  const handleLocate = (id: string) => {
    // Navigate to inventory with highlight parameter
    navigate(`/inventory?highlight=${id}`);
  };
  
  return (
    <div className="space-y-4">
      {priorityItems.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No priority items at this time
        </div>
      ) : (
        priorityItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-start justify-between p-3 bg-background border rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div>
                <AlertTriangle 
                  className={
                    item.priority === 'high' 
                      ? 'text-red-500 h-5 w-5' 
                      : 'text-yellow-500 h-5 w-5'
                  } 
                />
              </div>
              <div>
                <div 
                  className="font-medium hover:text-primary cursor-pointer"
                  onClick={() => onItemClick(item.id)}
                >
                  {item.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  ID: {item.id} • Location: {item.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                size="sm" 
                variant="outline"
                className="h-7 gap-1"
                onClick={() => handleLocate(item.id)}
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs">Locate</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="h-7 gap-1"
                onClick={() => handleMarkResolved(item.id, item.name)}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="text-xs">Resolved</span>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PriorityItems;
