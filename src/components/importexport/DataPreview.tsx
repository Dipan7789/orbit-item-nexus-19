
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataPreviewProps {
  data: any[];
}

const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No data to preview
      </div>
    );
  }
  
  // Get headers from the first item
  const headers = Object.keys(data[0]);
  
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={`${index}-${header}`}>
                  {item[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataPreview;
