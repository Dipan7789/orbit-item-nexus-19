import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

// Define the schema for the inventory item form
const inventoryItemSchema = z.object({
  item_id: z.string().min(2, {
    message: "Item ID must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }).default(1),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  width_cm: z.number().min(1, {
    message: "Width must be at least 1 cm.",
  }).default(1),
  depth_cm: z.number().min(1, {
    message: "Depth must be at least 1 cm.",
  }).default(1),
  height_cm: z.number().min(1, {
    message: "Height must be at least 1 cm.",
  }).default(1),
  mass_kg: z.number().min(0.1, {
    message: "Mass must be at least 0.1 kg.",
  }).default(1),
  expiryDate: z.date().optional(),
  notes: z.string().optional(),
});

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: "1",
      item_id: "ITM001",
      name: "Screwdriver",
      description: "Standard screwdriver",
      category: "Tools",
      quantity: 50,
      location: "A1-01",
      priority: "medium",
      width_cm: 5,
      depth_cm: 5,
      height_cm: 15,
      mass_kg: 0.2,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for general repairs",
    },
    {
      id: "2",
      item_id: "ITM002",
      name: "Wrench",
      description: "Adjustable wrench",
      category: "Tools",
      quantity: 30,
      location: "A1-02",
      priority: "medium",
      width_cm: 10,
      depth_cm: 5,
      height_cm: 20,
      mass_kg: 0.5,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for tightening bolts",
    },
    {
      id: "3",
      item_id: "ITM003",
      name: "Pliers",
      description: "Needle-nose pliers",
      category: "Tools",
      quantity: 40,
      location: "A1-03",
      priority: "medium",
      width_cm: 5,
      depth_cm: 5,
      height_cm: 15,
      mass_kg: 0.3,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for gripping small objects",
    },
    {
      id: "4",
      item_id: "ITM004",
      name: "Hammer",
      description: "Claw hammer",
      category: "Tools",
      quantity: 20,
      location: "A1-04",
      priority: "medium",
      width_cm: 10,
      depth_cm: 10,
      height_cm: 30,
      mass_kg: 1.0,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for driving nails",
    },
    {
      id: "5",
      item_id: "ITM005",
      name: "Tape Measure",
      description: "Retractable tape measure",
      category: "Tools",
      quantity: 60,
      location: "A1-05",
      priority: "medium",
      width_cm: 5,
      depth_cm: 5,
      height_cm: 10,
      mass_kg: 0.1,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for measuring distances",
    },
    {
      id: "6",
      item_id: "ITM006",
      name: "Safety Glasses",
      description: "Clear safety glasses",
      category: "Safety",
      quantity: 100,
      location: "B1-01",
      priority: "low",
      width_cm: 15,
      depth_cm: 5,
      height_cm: 5,
      mass_kg: 0.1,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for eye protection",
    },
    {
      id: "7",
      item_id: "ITM007",
      name: "Gloves",
      description: "Leather work gloves",
      category: "Safety",
      quantity: 50,
      location: "B1-02",
      priority: "low",
      width_cm: 10,
      depth_cm: 5,
      height_cm: 20,
      mass_kg: 0.2,
      expiryDate: null,
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for hand protection",
    },
    {
      id: "8",
      item_id: "ITM008",
      name: "Respirator",
      description: "N95 respirator mask",
      category: "Safety",
      quantity: 80,
      location: "B1-03",
      priority: "low",
      width_cm: 10,
      depth_cm: 5,
      height_cm: 15,
      mass_kg: 0.1,
      expiryDate: "2024-01-01",
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for respiratory protection",
    },
    {
      id: "9",
      item_id: "ITM009",
      name: "First Aid Kit",
      description: "Basic first aid kit",
      category: "Safety",
      quantity: 10,
      location: "B1-04",
      priority: "high",
      width_cm: 20,
      depth_cm: 10,
      height_cm: 30,
      mass_kg: 1.5,
      expiryDate: "2024-06-01",
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for treating injuries",
    },
    {
      id: "10",
      item_id: "ITM010",
      name: "Fire Extinguisher",
      description: "ABC fire extinguisher",
      category: "Safety",
      quantity: 5,
      location: "B1-05",
      priority: "high",
      width_cm: 20,
      depth_cm: 20,
      height_cm: 50,
      mass_kg: 5.0,
      expiryDate: "2025-01-01",
      dateAdded: "2023-01-01",
      lastUsed: "2023-09-01",
      lastModified: "2023-10-01",
      notes: "Used for extinguishing fires",
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isViewItemDialogOpen, setIsViewItemDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form logic
  const form = useForm({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      item_id: "",
      name: "",
      description: "",
      category: "",
      quantity: 1,
      location: "",
      priority: 'medium',
      width_cm: 1,
      depth_cm: 1,
      height_cm: 1,
      mass_kg: 0.1,
      expiryDate: undefined,
      notes: "",
    },
  });

  // Handle item selection
  const handleItemSelect = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  // Handle delete item
  const handleDeleteItem = (itemId) => {
    setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId));
    toast({
      title: "Item deleted",
      description: "The item has been successfully deleted from the inventory.",
    });
  };

  // Handle view item
  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsViewItemDialogOpen(true);
  };

  // Handle edit item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    form.reset(item);
    setIsEditItemDialogOpen(true);
  };

  // Handle add item
  const handleAddItem = () => {
    setIsAddItemDialogOpen(true);
    form.reset();
  };

  // Handle form submission
  const onSubmit = (values) => {
    // Simulate adding/editing an item
    if (selectedItem) {
      // Editing existing item
      setInventoryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, ...values } : item
        )
      );
      toast({
        title: "Item updated",
        description: "The item has been successfully updated.",
      });
    } else {
      // Adding new item
      const newItem = {
        id: Math.random().toString(36).substring(7),
        ...values,
        dateAdded: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
      setInventoryItems((prevItems) => [...prevItems, newItem]);
      toast({
        title: "Item added",
        description: "The item has been successfully added to the inventory.",
      });
    }

    // Close dialog and reset form
    setIsAddItemDialogOpen(false);
    setIsEditItemDialogOpen(false);
    setSelectedItem(null);
    form.reset();
  };

  const renderRow = (item) => {
    const expiryDate = item.expiryDate
      ? new Date(item.expiryDate).toLocaleDateString()
      : 'N/A';

    return (
      <TableRow key={item.id}>
        <TableCell>
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleItemSelect(item.id)}
            className="h-4 w-4 rounded border-gray-300"
          />
        </TableCell>
        <TableCell>{item.item_id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.location}</TableCell>
        <TableCell>
          <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'outline'}>
            {item.priority}
          </Badge>
        </TableCell>
        <TableCell>{expiryDate}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" onClick={() => handleViewItem(item)}>View</Button>
            <Button size="sm" variant="ghost" onClick={() => handleEditItem(item)}>Edit</Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search items..." />
          <Button variant="outline" size="sm">
            Search
          </Button>
        </div>
        <div>
          <Button size="sm" onClick={handleAddItem}>
            Add Item
          </Button>
        </div>
      </div>
      <div className="py-4">
        <div className="rounded-md border">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => renderRow(item))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to the inventory.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="item_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ITM001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Screwdriver" {...field} />
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
                      <Textarea placeholder="A short description of the item" {...field} />
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
                    <FormControl>
                      <Input placeholder="Tools" {...field} />
                    </FormControl>
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                    <FormControl>
                      <Input placeholder="A1-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
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
              <FormField
                control={form.control}
                name="width_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mass_kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mass (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                      <Textarea placeholder="Any additional notes about the item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Item Dialog */}
      <Dialog open={isViewItemDialogOpen} onOpenChange={setIsViewItemDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Item</DialogTitle>
            <DialogDescription>
              View details of the selected item.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-2">
              <p><strong>Item ID:</strong> {selectedItem.item_id}</p>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Description:</strong> {selectedItem.description}</p>
              <p><strong>Category:</strong> {selectedItem.category}</p>
              <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <p><strong>Priority:</strong> {selectedItem.priority}</p>
              <p><strong>Width (cm):</strong> {selectedItem.width_cm}</p>
              <p><strong>Depth (cm):</strong> {selectedItem.depth_cm}</p>
              <p><strong>Height (cm):</strong> {selectedItem.height_cm}</p>
              <p><strong>Mass (kg):</strong> {selectedItem.mass_kg}</p>
              <p><strong>Expiry Date:</strong> {selectedItem.expiryDate ? new Date(selectedItem.expiryDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Notes:</strong> {selectedItem.notes}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewItemDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Edit the details of the selected item.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="item_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ITM001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Screwdriver" {...field} />
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
                      <Textarea placeholder="A short description of the item" {...field} />
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
                    <FormControl>
                      <Input placeholder="Tools" {...field} />
                    </FormControl>
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                    <FormControl>
                      <Input placeholder="A1-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
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
              <FormField
                control={form.control}
                name="width_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mass_kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mass (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                      <Textarea placeholder="Any additional notes about the item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update Item</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
