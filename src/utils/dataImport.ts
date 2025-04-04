import { InventoryItem, StorageContainer } from '../types/inventory';

// Process CSV text to extract inventory items
export const processInventoryItems = (csvText: string): InventoryItem[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const items: InventoryItem[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    
    if (values.length !== headers.length) {
      console.warn(`Line ${i} has ${values.length} values but headers has ${headers.length} columns. Skipping.`);
      continue;
    }
    
    const item: any = {
      dateAdded: new Date().toISOString()
    };
    
    headers.forEach((header, index) => {
      if (header === 'dimensions') {
        try {
          item[header] = JSON.parse(values[index]);
        } catch (e) {
          console.warn(`Failed to parse dimensions JSON for item at line ${i}. Using empty object.`);
          item[header] = {};
        }
      } else if (header === 'weight') {
        try {
          item[header] = JSON.parse(values[index]);
        } catch (e) {
          console.warn(`Failed to parse weight JSON for item at line ${i}. Using empty object.`);
          item[header] = {};
        }
      } else if (header === 'tags') {
        item[header] = values[index].split(';').map(tag => tag.trim());
      } else if (header === 'expiryDate' || header === 'lastUsed') {
        const dateStr = values[index];
        if (dateStr) {
          item[header] = new Date(dateStr).toISOString();
        }
      } else if (header === 'isRestricted') {
        item[header] = values[index].toLowerCase() === 'true';
      } else if (header === 'quantity' || header === 'usageLimit' || header === 'usageCount') {
        item[header] = parseInt(values[index], 10) || 0;
      } else {
        item[header] = values[index];
      }
    });
    
    items.push(item as InventoryItem);
  }
  
  return items;
};

// Process CSV text to extract storage containers
export const processStorageContainers = (csvText: string): StorageContainer[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const containers: StorageContainer[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    
    if (values.length !== headers.length) {
      console.warn(`Line ${i} has ${values.length} values but headers has ${headers.length} columns. Skipping.`);
      continue;
    }
    
    const container: any = {
      id: `container-${i}`
    };
    
    headers.forEach((header, index) => {
      if (header === 'isAccessible') {
        container[header] = values[index].toLowerCase() === 'true';
      } else if (header === 'width_cm' || header === 'depth_cm' || header === 'height_cm' || header === 'maxWeight_kg') {
        container[header] = parseFloat(values[index]) || 0;
      } else {
        container[header] = values[index];
      }
    });
    
    containers.push(container as StorageContainer);
  }
  
  return containers;
};

// Validate an inventory item
export const validateInventoryItem = (item: any, rowIndex: number): Array<{row: number, field: string, message: string}> => {
  const errors: Array<{row: number, field: string, message: string}> = [];
  
  // Check required fields
  if (!item.id) {
    errors.push({
      row: rowIndex + 1,
      field: 'id',
      message: 'Item ID is required'
    });
  }
  
  if (!item.name) {
    errors.push({
      row: rowIndex + 1,
      field: 'name',
      message: 'Item name is required'
    });
  }
  
  if (!item.category) {
    errors.push({
      row: rowIndex + 1,
      field: 'category',
      message: 'Category is required'
    });
  }
  
  // Check data types
  if (item.quantity && isNaN(parseInt(item.quantity))) {
    errors.push({
      row: rowIndex + 1,
      field: 'quantity',
      message: 'Quantity must be a number'
    });
  }
  
  if (item.expiryDate && isNaN(Date.parse(item.expiryDate))) {
    errors.push({
      row: rowIndex + 1,
      field: 'expiryDate',
      message: 'Expiry date must be a valid date format'
    });
  }
  
  return errors;
};

// Validate a storage container
export const validateStorageContainer = (container: any, rowIndex: number): Array<{row: number, field: string, message: string}> => {
  const errors: Array<{row: number, field: string, message: string}> = [];
  
  // Check required fields
  if (!container.zone) {
    errors.push({
      row: rowIndex + 1,
      field: 'zone',
      message: 'Zone is required'
    });
  }
  
  if (!container.container_id) {
    errors.push({
      row: rowIndex + 1,
      field: 'container_id',
      message: 'Container ID is required'
    });
  }
  
  // Check numeric fields
  const numericFields = ['width_cm', 'depth_cm', 'height_cm', 'maxWeight_kg'];
  
  numericFields.forEach(field => {
    if (container[field] && isNaN(parseFloat(container[field]))) {
      errors.push({
        row: rowIndex + 1,
        field,
        message: `${field} must be a number`
      });
    }
  });
  
  return errors;
};

// Export data to CSV format
export const exportToCSV = (data: any[]): string => {
  if (!data || data.length === 0) return '';
  
  // Get headers from the first item
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  let csv = headers.join(',') + '\n';
  
  // Add data rows
  data.forEach(item => {
    const row = headers.map(header => {
      const value = item[header];
      
      // Handle different value types
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'object') {
        return JSON.stringify(value).replace(/"/g, '""');
      } else {
        return String(value).replace(/"/g, '""');
      }
    });
    
    csv += row.join(',') + '\n';
  });
  
  return csv;
};

// Export data to JSON format
export const exportToJSON = (data: any): string => {
  return JSON.stringify(data, null, 2);
};
