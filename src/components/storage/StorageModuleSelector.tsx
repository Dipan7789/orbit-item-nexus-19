
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StorageModuleSelectorProps {
  activeModule: string;
  onChange: (moduleId: string) => void;
}

const modules = [
  { id: 'module-a', name: 'Module A' },
  { id: 'module-b', name: 'Module B' },
  { id: 'cargo-bay', name: 'Cargo Bay' },
  { id: 'lab-storage', name: 'Lab Storage' },
];

const StorageModuleSelector: React.FC<StorageModuleSelectorProps> = ({ 
  activeModule, 
  onChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {modules.map((module) => (
        <Button
          key={module.id}
          variant={activeModule === module.id ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(module.id)}
          className={cn(
            "transition-all",
            activeModule === module.id 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {module.name}
        </Button>
      ))}
    </div>
  );
};

export default StorageModuleSelector;
