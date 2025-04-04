
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

interface CSVValidationAlertProps {
  errors: ValidationError[];
  onDismiss: () => void;
}

const CSVValidationAlert: React.FC<CSVValidationAlertProps> = ({ errors, onDismiss }) => {
  if (errors.length === 0) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>CSV Validation Failed</AlertTitle>
      <AlertDescription>
        <div className="mt-2">
          <p>Please fix the following issues in your CSV file:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            {errors.slice(0, 5).map((error, index) => (
              <li key={index}>
                Row {error.row}: {error.field} - {error.message}
              </li>
            ))}
            {errors.length > 5 && (
              <li>...and {errors.length - 5} more errors</li>
            )}
          </ul>
        </div>
        <div className="mt-3">
          <button 
            onClick={onDismiss}
            className="text-sm underline hover:no-underline focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default CSVValidationAlert;
