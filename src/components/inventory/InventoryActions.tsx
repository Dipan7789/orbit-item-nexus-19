
import React from 'react';
import { 
  Button
} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash, MoreHorizontal, MoveUp, MoveDown, RotateCw } from 'lucide-react';

interface InventoryActionsProps {
  itemId: string;
}

const InventoryActions: React.FC<InventoryActionsProps> = ({ itemId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <MoveUp size={16} />
          Retrieve Item
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <MoveDown size={16} />
          Return Item
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <RotateCw size={16} />
          Relocate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Edit size={16} />
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          <Trash size={16} />
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InventoryActions;
