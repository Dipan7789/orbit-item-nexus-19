
export interface StorageContainer {
  zone: string;
  container_id: string;
  width_cm: number;
  depth_cm: number;
  height_cm: number;
}

export interface InventoryItem {
  id: string;
  item_id: string;
  name: string;
  description?: string;
  category: string;
  quantity: number;
  location: string;
  priority: 'low' | 'medium' | 'high';
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  mass_kg: number;
  expiryDate?: string | null;
  dateAdded: string;
  lastUsed: string;
  lastModified: string;
  notes?: string;
  usage_limit?: number;
  preferred_zone?: string;
  coordinates?: {
    module: string;
    section: string;
    cabinet: number;
    shelf: number;
  };
}
