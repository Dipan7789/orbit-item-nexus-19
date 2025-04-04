
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit?: string;
  location: string;
  zone?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight?: {
    value: number;
    unit: string;
  };
  priority?: 'low' | 'medium' | 'high';
  expiryDate?: Date | string;
  lastUsed?: Date | string;
  tags?: string[];
  notes?: string;
  image?: string;
  usageLimit?: number;
  usageCount?: number;
  barcode?: string;
  owner?: string;
  isRestricted?: boolean;
  dateAdded: Date | string;
  lastModified?: Date | string;
}

export interface StorageContainer {
  id: string;
  zone: string;
  container_id: string;
  name?: string;
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  maxWeight_kg?: number;
  isAccessible?: boolean;
  parentContainerId?: string;
}

export interface StorageZone {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  used: number;
  accessLevel?: string;
  parentZone?: string;
  coordinates?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface StorageLocation {
  id: string;
  zoneId: string;
  containerId?: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  isOccupied: boolean;
  itemId?: string;
}
