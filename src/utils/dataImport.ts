
import { InventoryItem, StorageContainer, itemFitsContainer, calculateVolume } from '../types/inventory';

/**
 * Parse CSV string into an array of objects
 */
export const parseCSV = (csvText: string): Record<string, any>[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    const values = line.split(',').map(value => value.trim());
    const item: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      // Convert numeric values
      if (!isNaN(Number(values[index])) && values[index] !== '') {
        item[header] = Number(values[index]);
      } else if (values[index] === 'null' || values[index] === '') {
        item[header] = null;
      } else {
        item[header] = values[index];
      }
    });
    
    return item;
  });
};

/**
 * Process inventory items CSV
 */
export const processInventoryItems = (csvText: string): InventoryItem[] => {
  const parsedData = parseCSV(csvText);
  
  return parsedData.map(item => ({
    item_id: item.item_id,
    name: item.name,
    width_cm: item.width_cm,
    depth_cm: item.depth_cm,
    height_cm: item.height_cm,
    mass_kg: item.mass_kg,
    priority: item.priority,
    expiry_date: item.expiry_date,
    usage_limit: item.usage_limit,
    preferred_zone: item.preferred_zone,
    usage_count: item.usage_count || 0,
    last_used: item.last_used || null
  }));
};

/**
 * Process storage containers CSV
 */
export const processStorageContainers = (csvText: string): StorageContainer[] => {
  const parsedData = parseCSV(csvText);
  
  return parsedData.map(container => {
    const width = container.width_cm;
    const depth = container.depth_cm;
    const height = container.height_cm;
    
    return {
      zone: container.zone,
      container_id: container.container_id,
      width_cm: width,
      depth_cm: depth,
      height_cm: height,
      items: [],
      available_volume_cm3: calculateVolume(width, depth, height)
    };
  });
};

/**
 * Optimal container placement algorithm
 */
export const findOptimalPlacement = (
  items: InventoryItem[], 
  containers: StorageContainer[]
): { placements: Record<string, string>; unplaced: InventoryItem[] } => {
  // Sort items by priority (high to low) and perishability (expiring soon first)
  const sortedItems = [...items].sort((a, b) => {
    // First sort by priority (higher number = higher priority)
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    
    // Then sort by expiry date if both items have one
    if (a.expiry_date && b.expiry_date) {
      return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
    }
    
    // Items with expiry dates come before non-expiring items
    if (a.expiry_date) return -1;
    if (b.expiry_date) return 1;
    
    return 0;
  });
  
  // Clone containers to track remaining space
  const availableContainers = [...containers].map(container => ({...container}));
  
  const placements: Record<string, string> = {};
  const unplaced: InventoryItem[] = [];
  
  // Place each item
  sortedItems.forEach(item => {
    // First try to place in preferred zone
    const preferredContainers = availableContainers
      .filter(container => container.zone === item.preferred_zone)
      .sort((a, b) => a.available_volume_cm3! - b.available_volume_cm3!); // Use smallest suitable container first
    
    // Then try any container
    const allContainers = availableContainers
      .sort((a, b) => a.available_volume_cm3! - b.available_volume_cm3!);
    
    // Try preferred containers first, then any container
    const containerPool = [...preferredContainers, ...allContainers.filter(c => c.zone !== item.preferred_zone)];
    
    let placed = false;
    
    for (const container of containerPool) {
      const { fits } = itemFitsContainer(item, container);
      
      if (fits) {
        // Place item in this container
        placements[item.item_id] = container.container_id;
        
        // Update container
        const itemVolume = calculateVolume(item.width_cm, item.depth_cm, item.height_cm);
        container.available_volume_cm3! -= itemVolume;
        container.items!.push(item.item_id);
        
        placed = true;
        break;
      }
    }
    
    if (!placed) {
      unplaced.push(item);
    }
  });
  
  return { placements, unplaced };
};

/**
 * Export data to CSV format
 */
export const exportToCSV = <T extends Record<string, any>>(data: T[]): string => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeader = headers.join(',');
  
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Handle null, undefined, and strings with commas
      if (value === null || value === undefined) return '';
      if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
      return value;
    }).join(',');
  });
  
  return [csvHeader, ...csvRows].join('\n');
};

/**
 * Export data to JSON format
 */
export const exportToJSON = <T>(data: T): string => {
  return JSON.stringify(data, null, 2);
};
