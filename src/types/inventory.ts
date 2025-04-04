
export interface InventoryItem {
  id: string;
  item_id?: string; // Added for backward compatibility
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
  priority?: 'low' | 'medium' | 'high' | number;
  expiryDate?: Date | string;
  expiry_date?: Date | string; // Added for backward compatibility
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
  // Additional fields for compatibility
  width_cm?: number;
  height_cm?: number;
  depth_cm?: number;
  mass_kg?: number;
  preferred_zone?: string;
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
  items?: any[]; // Added for backward compatibility
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

// Utility function to calculate volume
export const calculateVolume = (width: number, depth: number, height: number): number => {
  return width * depth * height;
};

// Function to find optimal placement for items in containers
export const findOptimalPlacement = (
  items: InventoryItem[],
  containers: StorageContainer[]
): { placements: Record<string, string>; unplaced: InventoryItem[] } => {
  const placements: Record<string, string> = {};
  const unplaced: InventoryItem[] = [];

  // Simple first-fit algorithm
  items.forEach(item => {
    const itemId = item.item_id || item.id;
    const itemVolume = calculateItemVolume(item);
    
    // Try to find a container with enough space
    const container = containers.find(container => {
      // Calculate container volume
      const containerVolume = calculateVolume(
        container.width_cm,
        container.depth_cm,
        container.height_cm
      );
      
      // Get already placed items in this container
      const containerItems = Object.entries(placements)
        .filter(([_, containerId]) => containerId === container.container_id)
        .map(([itemId]) => 
          items.find(i => (i.item_id || i.id) === itemId)
        )
        .filter(Boolean) as InventoryItem[];
      
      // Calculate used volume
      const usedVolume = containerItems.reduce(
        (total, item) => total + calculateItemVolume(item),
        0
      );
      
      // Check if there's enough space
      return containerVolume - usedVolume >= itemVolume;
    });
    
    if (container) {
      placements[itemId] = container.container_id;
    } else {
      unplaced.push(item);
    }
  });
  
  return { placements, unplaced };
};

// Helper function to calculate item volume
const calculateItemVolume = (item: InventoryItem): number => {
  // If item has width_cm, depth_cm, height_cm properties, use them
  if (item.width_cm && item.depth_cm && item.height_cm) {
    return calculateVolume(item.width_cm, item.depth_cm, item.height_cm);
  }
  
  // If item has dimensions object, use it
  if (item.dimensions?.width && item.dimensions?.depth && item.dimensions?.height) {
    return calculateVolume(
      item.dimensions.width,
      item.dimensions.depth,
      item.dimensions.height
    );
  }
  
  // Default to a small volume if dimensions aren't available
  return 1000; // 10cm x 10cm x 10cm
};
