
import React from 'react';

interface StorageGridProps {
  moduleId: string;
}

// Mock data for different storage modules
const storageGridData: Record<string, any[][]> = {
  'module-a': [
    [1, 2, 2, 1, 0, 0, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 1],
    [0, 3, 3, 3, 1, 1, 1, 0],
    [0, 3, 3, 3, 1, 1, 1, 0],
    [4, 4, 0, 0, 5, 5, 5, 5],
    [4, 4, 0, 0, 5, 5, 5, 5],
  ],
  'module-b': [
    [5, 5, 0, 0, 0, 1, 1, 1],
    [5, 5, 0, 0, 0, 1, 1, 1],
    [3, 3, 3, 2, 2, 2, 0, 0],
    [3, 3, 3, 2, 2, 2, 0, 0],
    [4, 4, 4, 0, 0, 0, 0, 0],
    [4, 4, 4, 0, 0, 0, 0, 0],
  ],
  'cargo-bay': [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 3, 3, 3, 3, 0, 0],
    [2, 2, 2, 2, 3, 3, 3, 3, 0, 0],
    [4, 4, 4, 4, 5, 5, 5, 5, 0, 0],
    [4, 4, 4, 4, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  'lab-storage': [
    [3, 3, 3, 3, 0, 0],
    [3, 3, 3, 3, 0, 0],
    [2, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 0, 0],
    [5, 5, 5, 5, 0, 0],
    [5, 5, 5, 5, 0, 0],
  ],
};

// Map numeric values to colors for visualization
const colorMap: Record<number, string> = {
  0: 'bg-green-500/30 hover:bg-green-500/50', // Empty
  1: 'bg-blue-500/70 hover:bg-blue-500/90',   // Medical
  2: 'bg-purple-500/70 hover:bg-purple-500/90', // Scientific
  3: 'bg-red-500/70 hover:bg-red-500/90',     // High Priority
  4: 'bg-yellow-500/70 hover:bg-yellow-500/90', // Food
  5: 'bg-orange-500/70 hover:bg-orange-500/90', // Equipment
};

const StorageGrid: React.FC<StorageGridProps> = ({ moduleId }) => {
  const gridData = storageGridData[moduleId] || storageGridData['module-a'];
  
  return (
    <div className="w-full h-full p-6 flex items-center justify-center">
      <div className="grid gap-1" 
        style={{ 
          gridTemplateColumns: `repeat(${gridData[0]?.length || 8}, 1fr)`,
          gridTemplateRows: `repeat(${gridData?.length || 6}, 1fr)`,
          width: `${(gridData[0]?.length || 8) * 60}px`,
          height: `${(gridData?.length || 6) * 70}px`,
        }}
      >
        {gridData.flatMap((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${colorMap[cell]} rounded-md cursor-pointer transition-colors duration-200 flex items-center justify-center border border-white/5`}
              style={{ width: '60px', height: '70px' }}
              onClick={() => console.log(`Clicked cell at ${rowIndex}, ${colIndex}`)}
            >
              <span className="text-xs font-mono text-white/80">
                {String.fromCharCode(65 + rowIndex)}{colIndex + 1}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StorageGrid;
