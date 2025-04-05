
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

// Calculate volume helper function
export const calculateVolume = (width: number, depth: number, height: number): number => {
  return width * depth * height;
};

// Find optimal placement function
export interface PlacementResult {
  placements: Record<string, string>;
  unplaced: InventoryItem[];
}

export const findOptimalPlacement = (
  items: InventoryItem[], 
  containers: StorageContainer[]
): PlacementResult => {
  const placements: Record<string, string> = {};
  const unplaced: InventoryItem[] = [];
  
  // Sort items by priority (high to low)
  const sortedItems = [...items].sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return (priorityValues[b.priority] || 0) - (priorityValues[a.priority] || 0);
  });
  
  // Calculate container volumes
  const containerVolumes: Record<string, number> = {};
  const availableSpace: Record<string, number> = {};
  
  containers.forEach(container => {
    const volume = calculateVolume(container.width_cm, container.depth_cm, container.height_cm);
    containerVolumes[container.container_id] = volume;
    availableSpace[container.container_id] = volume;
  });
  
  // Try to place items
  sortedItems.forEach(item => {
    const itemId = item.item_id || item.id;
    const itemVolume = calculateVolume(item.width_cm || 0, item.depth_cm || 0, item.height_cm || 0);
    
    // Find preferred zone containers first
    if (item.preferred_zone) {
      const preferredContainers = containers
        .filter(c => c.zone === item.preferred_zone)
        .sort((a, b) => availableSpace[b.container_id] - availableSpace[a.container_id]);
      
      for (const container of preferredContainers) {
        if (availableSpace[container.container_id] >= itemVolume) {
          placements[itemId] = container.container_id;
          availableSpace[container.container_id] -= itemVolume;
          return;
        }
      }
    }
    
    // If not placed in preferred zone, try any container with enough space
    const sortedContainers = [...containers]
      .sort((a, b) => availableSpace[b.container_id] - availableSpace[a.container_id]);
    
    for (const container of sortedContainers) {
      if (availableSpace[container.container_id] >= itemVolume) {
        placements[itemId] = container.container_id;
        availableSpace[container.container_id] -= itemVolume;
        return;
      }
    }
    
    // If item could not be placed anywhere
    unplaced.push(item);
  });
  
  return { placements, unplaced };
};
