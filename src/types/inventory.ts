
export type InventoryPriority = 'high' | 'medium' | 'low';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  priority: InventoryPriority;
  lastUsed: string | Date;
  dateAdded: string | Date;
}
