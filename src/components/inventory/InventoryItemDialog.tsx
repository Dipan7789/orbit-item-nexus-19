
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InventoryEditForm from './InventoryEditForm';
import { InventoryItem } from '@/types/inventory';

interface InventoryItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: InventoryItem;
  onSave: (item: InventoryItem) => void;
  isNewItem?: boolean;
}

const InventoryItemDialog: React.FC<InventoryItemDialogProps> = ({
  open,
  onOpenChange,
  item,
  onSave,
  isNewItem = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{isNewItem ? 'Add New Item' : 'Edit Item'}</DialogTitle>
          <DialogDescription>
            {isNewItem 
              ? 'Add a new item to the inventory. Fill out the form below.'
              : `Edit the details for ${item?.name}.`}
          </DialogDescription>
        </DialogHeader>
        <InventoryEditForm 
          item={item} 
          onSave={(updatedItem) => {
            onSave(updatedItem);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InventoryItemDialog;
