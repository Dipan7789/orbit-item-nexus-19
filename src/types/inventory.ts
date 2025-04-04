
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

// Implement the findOptimalPlacement function
export const findOptimalPlacement = (
  items: InventoryItem[],
  containers: StorageContainer[]
): { placements: Record<string, string>; unplaced: InventoryItem[] } => {
  // Calculate container volumes for later use
  const containerVolumes: Record<string, number> = {};
  containers.forEach(container => {
    containerVolumes[container.container_id] = calculateVolume(
      container.width_cm,
      container.depth_cm,
      container.height_cm
    );
  });

  // Sort items by priority (higher first) and then by volume (larger first)
  const sortedItems = [...items].sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    
    const volumeA = calculateVolume(a.width_cm, a.depth_cm, a.height_cm);
    const volumeB = calculateVolume(b.width_cm, b.depth_cm, b.height_cm);
    return volumeB - volumeA; // Larger items first
  });

  // Track container remaining volume
  const containerRemaining = { ...containerVolumes };
  
  // Initialize results
  const placements: Record<string, string> = {};
  const unplaced: InventoryItem[] = [];

  // Place items in containers
  sortedItems.forEach(item => {
    const itemVolume = calculateVolume(item.width_cm, item.depth_cm, item.height_cm);
    
    // Find the best container for this item
    let bestContainer: StorageContainer | null = null;
    let bestFit = Infinity; // Lower is better (less wasted space)
    
    // First try to place in the preferred zone
    const preferredContainers = containers.filter(c => c.zone === item.preferred_zone);
    for (const container of preferredContainers) {
      const fits = itemFitsContainer(item, container);
      if (fits.fits && containerRemaining[container.container_id] >= itemVolume) {
        const wastedSpace = containerRemaining[container.container_id] - itemVolume;
        if (wastedSpace < bestFit) {
          bestFit = wastedSpace;
          bestContainer = container;
        }
      }
    }
    
    // If no container in preferred zone, try others
    if (!bestContainer) {
      for (const container of containers) {
        if (container.zone === item.preferred_zone) continue; // Already checked
        
        const fits = itemFitsContainer(item, container);
        if (fits.fits && containerRemaining[container.container_id] >= itemVolume) {
          const wastedSpace = containerRemaining[container.container_id] - itemVolume;
          if (wastedSpace < bestFit) {
            bestFit = wastedSpace;
            bestContainer = container;
          }
        }
      }
    }
    
    // Place item or mark as unplaced
    if (bestContainer) {
      placements[item.item_id] = bestContainer.container_id;
      containerRemaining[bestContainer.container_id] -= itemVolume;
    } else {
      unplaced.push(item);
    }
  });

  return { placements, unplaced };
};
