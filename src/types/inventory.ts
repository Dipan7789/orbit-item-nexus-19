
import React from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  lastUsed: Date | string;
  expiryDate?: string | Date;
  dateAdded: string | Date;
  item_id?: string;  // For compatibility with imported items
  width_cm?: number;
  depth_cm?: number;
  height_cm?: number;
  mass_kg?: number;
  preferred_zone?: string;
  usage_limit?: number;
  description?: string;  // Added to resolve the TS error
  notes?: string;        // Added to resolve the TS error
}

export interface StorageContainer {
  zone: string;
  container_id: string;
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  items?: InventoryItem[];
  capacity?: number;
  utilization?: number;
}

// Helper function for calculating volume of an item
export function calculateVolume(item: InventoryItem): number {
  if (item.width_cm && item.depth_cm && item.height_cm) {
    return item.width_cm * item.depth_cm * item.height_cm;
  }
  return 0;
}

export function findOptimalPlacement(
  items: InventoryItem[], 
  containers: StorageContainer[]
): { 
  placements: Record<string, string>,
  unplaced: InventoryItem[] 
} {
  // This is a simplified placeholder for the actual algorithm
  // In a real application, this would be a complex bin-packing algorithm
  
  const placements: Record<string, string> = {};
  const unplaced: InventoryItem[] = [];
  
  // Simple greedy algorithm - try to place each item in first container that fits
  items.forEach(item => {
    const itemId = item.item_id || item.id;
    const itemWidth = item.width_cm || 0;
    const itemDepth = item.depth_cm || 0;
    const itemHeight = item.height_cm || 0;
    
    // Try to find a suitable container
    let placed = false;
    
    for (const container of containers) {
      // Check if item fits (very simplified)
      if (
        itemWidth <= container.width_cm &&
        itemDepth <= container.depth_cm &&
        itemHeight <= container.height_cm
      ) {
        // Place item in this container
        placements[itemId] = container.container_id;
        placed = true;
        break;
      }
    }
    
    if (!placed) {
      unplaced.push(item);
    }
  });
  
  return { placements, unplaced };
}
