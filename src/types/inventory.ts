
// Inventory data types for space station storage management

export interface InventoryItem {
  item_id: string;
  name: string;
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  mass_kg: number;
  priority: number;
  expiry_date: string | null;
  usage_limit: number | null;
  preferred_zone: string;
  current_container?: string;
  usage_count?: number;
  last_used?: string;
}

export interface StorageContainer {
  zone: string;
  container_id: string;
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  items?: string[]; // IDs of items stored in this container
  available_volume_cm3?: number; // Calculated available space
}

export interface StorageSolution {
  item_id: string;
  container_id: string;
  fits: boolean;
  reason?: string;
}

// Space optimization functions
export const calculateVolume = (width: number, depth: number, height: number): number => {
  return width * depth * height;
};

export const itemFitsContainer = (
  item: InventoryItem, 
  container: StorageContainer
): { fits: boolean; reason?: string } => {
  // Check if item fits in normal orientation
  if (
    item.width_cm <= container.width_cm &&
    item.depth_cm <= container.depth_cm &&
    item.height_cm <= container.height_cm
  ) {
    return { fits: true };
  }

  // Check if item fits when rotated 90° on different axes
  if (
    item.width_cm <= container.depth_cm &&
    item.depth_cm <= container.width_cm &&
    item.height_cm <= container.height_cm
  ) {
    return { fits: true };
  }

  if (
    item.width_cm <= container.width_cm &&
    item.depth_cm <= container.height_cm &&
    item.height_cm <= container.depth_cm
  ) {
    return { fits: true };
  }

  if (
    item.width_cm <= container.height_cm &&
    item.depth_cm <= container.width_cm &&
    item.height_cm <= container.depth_cm
  ) {
    return { fits: true };
  }

  // Return reason why item doesn't fit
  const itemVolume = calculateVolume(item.width_cm, item.depth_cm, item.height_cm);
  const containerVolume = calculateVolume(container.width_cm, container.depth_cm, container.height_cm);
  
  if (itemVolume > containerVolume) {
    return { 
      fits: false, 
      reason: `Item volume (${itemVolume} cm³) exceeds container volume (${containerVolume} cm³)` 
    };
  }
  
  return { 
    fits: false, 
    reason: "Item dimensions don't fit container orientation" 
  };
};
