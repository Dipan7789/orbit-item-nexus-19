
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InventoryItem } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface InventoryEditFormProps {
  item?: InventoryItem;
  onSave: (item: InventoryItem) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
  category: z.string(),
  quantity: z.coerce.number().min(0),
  location: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  width_cm: z.coerce.number().min(0).optional(),
  depth_cm: z.coerce.number().min(0).optional(),
  height_cm: z.coerce.number().min(0).optional(),
  mass_kg: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

// Category suggestions for AI recommendations
const categorySuggestions: Record<string, string[]> = {
  medical: ["Medical Kit", "Bandages", "Antibiotics", "First Aid Supplies", "Medication", "Defibrillator"],
  food: ["Freeze-dried Meal", "Energy Bar", "Water Container", "Nutrition Supplement", "Fruit Preserves"],
  equipment: ["Toolkit", "Spare Parts", "Repair Kit", "Screwdriver Set", "Maintenance Equipment"],
  scientific: ["Experiment Materials", "Research Samples", "Data Collection Device", "Microscope", "Sensor Array"],
  personal: ["Water Bottle", "Mobile Phone", "Charger", "Clothing", "Tablet", "Notebook", "Personal Hygiene Kit", "Camera"],
};

const InventoryEditForm: React.FC<InventoryEditFormProps> = ({
  item,
  onSave,
  onCancel,
}) => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      category: item?.category || 'personal',
      quantity: item?.quantity || 1,
      location: item?.location || 'module-a',
      priority: item?.priority || 'medium',
      width_cm: item?.width_cm || 0,
      depth_cm: item?.depth_cm || 0,
      height_cm: item?.height_cm || 0,
      mass_kg: item?.mass_kg || 0,
      notes: item?.notes || '',
    },
  });

  // Update suggestions when category changes
  useEffect(() => {
    const category = form.watch('category');
    setSuggestions(categorySuggestions[category] || []);
  }, [form.watch('category')]);

  // Function to apply a suggestion
  const applySuggestion = (suggestion: string) => {
    form.setValue('name', suggestion);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Create the updated item
    const updatedItem: InventoryItem = {
      ...(item || {}),
      id: item?.id || `item-${Date.now()}`,
      item_id: item?.item_id || `item-${Date.now()}`,
      name: data.name,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      location: data.location,
      priority: data.priority,
      width_cm: data.width_cm,
      depth_cm: data.depth_cm,
      height_cm: data.height_cm,
      mass_kg: data.mass_kg,
      notes: data.notes,
      dateAdded: item?.dateAdded || new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    onSave(updatedItem);
    toast({
      title: item ? "Item Updated" : "Item Created",
      description: `${data.name} has been ${item ? "updated" : "added"} to the inventory.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter item description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="scientific">Scientific</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="module-a">Module A</SelectItem>
                      <SelectItem value="module-b">Module B</SelectItem>
                      <SelectItem value="cargo-bay">Cargo Bay</SelectItem>
                      <SelectItem value="lab-storage">Lab Storage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="width_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depth_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depth (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mass_kg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mass (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Recommended Items</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {item ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryEditForm;
