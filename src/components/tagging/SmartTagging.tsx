
import React, { useState } from 'react';
import { Tag, MessageSquare, Mic, Play, Square, Save, X, Check, Plus, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample inventory items
const inventoryItems = [
  {
    id: 'med-kit-01',
    name: 'Medical Emergency Kit',
    location: 'Module A - Medical Cabinet',
    category: 'Medical',
    tags: [
      { id: 'tag-1', type: 'text', content: 'Check seal monthly', createdAt: '2025-03-01T10:30:00Z', author: 'Kim Chen' },
      { id: 'tag-2', type: 'voice', content: 'voice-note-1.mp3', createdAt: '2025-03-15T14:45:00Z', author: 'Alex Johnson' }
    ]
  },
  {
    id: 'food-supply-02',
    name: 'Freeze-Dried Meal Pack',
    location: 'Module B - Food Storage',
    category: 'Food',
    tags: [
      { id: 'tag-3', type: 'text', content: 'Best consumed before October', createdAt: '2025-02-20T09:15:00Z', author: 'Sam Wilson' },
    ]
  },
  {
    id: 'tool-kit-03',
    name: 'Maintenance Tool Kit',
    location: 'Cargo Bay - Equipment Shelf',
    category: 'Equipment',
    tags: []
  },
  {
    id: 'experiment-04',
    name: 'Plant Growth Experiment',
    location: 'Science Lab - Biology Section',
    category: 'Scientific',
    tags: [
      { id: 'tag-4', type: 'text', content: 'Water twice daily', createdAt: '2025-04-01T11:20:00Z', author: 'Dr. Patel' },
      { id: 'tag-5', type: 'text', content: 'Log growth in centimeters', createdAt: '2025-04-01T11:25:00Z', author: 'Dr. Patel' },
      { id: 'tag-6', type: 'voice', content: 'voice-note-2.mp3', createdAt: '2025-04-02T16:10:00Z', author: 'Dr. Rodriguez' }
    ]
  },
];

interface Tag {
  id: string;
  type: 'text' | 'voice';
  content: string;
  createdAt: string;
  author: string;
}

const SmartTagging: React.FC = () => {
  const [items, setItems] = useState(inventoryItems);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [newTagContent, setNewTagContent] = useState('');
  const [newTagOpen, setNewTagOpen] = useState(false);
  const [tagType, setTagType] = useState<'text' | 'voice'>('text');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Timer for voice recording simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Find the currently selected item
  const currentItem = items.find(item => item.id === selectedItem) || null;
  
  // Format time from seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle adding a new tag
  const handleAddTag = () => {
    if (selectedItem && (newTagContent || (tagType === 'voice' && recordingTime > 0))) {
      const updatedItems = items.map(item => {
        if (item.id === selectedItem) {
          const newTag: Tag = {
            id: `tag-${Date.now()}`,
            type: tagType,
            content: tagType === 'text' ? newTagContent : `voice-recording-${Date.now()}.mp3`,
            createdAt: new Date().toISOString(),
            author: 'Current User'
          };
          
          return {
            ...item,
            tags: [...item.tags, newTag]
          };
        }
        return item;
      });
      
      setItems(updatedItems);
      setNewTagContent('');
      setTagType('text');
      setNewTagOpen(false);
      
      toast({
        title: "Tag Added",
        description: "Your memory bread note has been successfully attached.",
      });
    }
  };
  
  // Handle updating a tag
  const handleUpdateTag = (tagId: string) => {
    if (selectedItem && newTagContent) {
      const updatedItems = items.map(item => {
        if (item.id === selectedItem) {
          return {
            ...item,
            tags: item.tags.map(tag => {
              if (tag.id === tagId) {
                return {
                  ...tag,
                  content: newTagContent,
                  createdAt: new Date().toISOString()
                };
              }
              return tag;
            })
          };
        }
        return item;
      });
      
      setItems(updatedItems);
      setNewTagContent('');
      setEditingTag(null);
      
      toast({
        title: "Tag Updated",
        description: "Your memory bread note has been successfully updated.",
      });
    }
  };
  
  // Handle deleting a tag
  const handleDeleteTag = (tagId: string) => {
    if (selectedItem) {
      const updatedItems = items.map(item => {
        if (item.id === selectedItem) {
          return {
            ...item,
            tags: item.tags.filter(tag => tag.id !== tagId)
          };
        }
        return item;
      });
      
      setItems(updatedItems);
      
      toast({
        title: "Tag Deleted",
        description: "Your memory bread note has been removed.",
      });
    }
  };
  
  // Handle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, save the recording here
      toast({
        title: "Voice Recorded",
        description: `Voice recording saved (${formatTime(recordingTime)})`,
      });
    } else {
      setIsRecording(true);
      toast({
        description: "Voice recording started...",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Memory Bread Smart Tagging</h2>
        <p className="text-muted-foreground">
          Attach smart notes, voice memos, and custom labels to inventory items
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Item selection */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" /> 
                Select Item
              </CardTitle>
              <CardDescription>
                Choose an item to view or add tags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="search"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedItem === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs mt-1 opacity-90">
                      {item.location}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.tags.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {item.tags.length} tag{item.tags.length !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No items found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Item tags */}
        <div className="md:col-span-2">
          {currentItem ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{currentItem.name}</CardTitle>
                  <Dialog open={newTagOpen} onOpenChange={setNewTagOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Tag
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Memory Bread Note</DialogTitle>
                        <DialogDescription>
                          Attach a text note or voice memo to {currentItem.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant={tagType === 'text' ? 'default' : 'outline'}
                            onClick={() => setTagType('text')}
                            className="flex-1"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Text Note
                          </Button>
                          <Button
                            variant={tagType === 'voice' ? 'default' : 'outline'}
                            onClick={() => setTagType('voice')}
                            className="flex-1"
                          >
                            <Mic className="h-4 w-4 mr-2" />
                            Voice Memo
                          </Button>
                        </div>
                        
                        {tagType === 'text' ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Enter your note here..."
                              value={newTagContent}
                              onChange={(e) => setNewTagContent(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 space-y-4">
                            <div className="text-3xl font-mono">
                              {formatTime(recordingTime)}
                            </div>
                            <Button
                              variant={isRecording ? "destructive" : "default"}
                              size="lg"
                              className="gap-2 rounded-full w-16 h-16 p-0 flex items-center justify-center"
                              onClick={toggleRecording}
                            >
                              {isRecording ? (
                                <Square className="h-6 w-6" />
                              ) : (
                                <Mic className="h-6 w-6" />
                              )}
                            </Button>
                            <div className="text-sm text-muted-foreground">
                              {isRecording ? "Recording in progress..." : "Click to start recording"}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setNewTagOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddTag} disabled={(tagType === 'text' && !newTagContent) || (tagType === 'voice' && !isRecording && recordingTime === 0)}>
                          Add Note
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  {currentItem.location} • {currentItem.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentItem.tags.length > 0 ? (
                  currentItem.tags.map((tag) => (
                    <Card key={tag.id} className="overflow-hidden">
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {tag.type === 'text' ? (
                              <MessageSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <Mic className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-medium">
                              {tag.type === 'text' ? 'Text Note' : 'Voice Memo'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {editingTag !== tag.id && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => {
                                    setEditingTag(tag.id);
                                    setNewTagContent(tag.type === 'text' ? tag.content : '');
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteTag(tag.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        {editingTag === tag.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={newTagContent}
                              onChange={(e) => setNewTagContent(e.target.value)}
                              placeholder="Update your note..."
                              className="min-h-[80px]"
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setEditingTag(null)}
                              >
                                <X className="h-4 w-4 mr-1" /> 
                                Cancel
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                onClick={() => handleUpdateTag(tag.id)}
                              >
                                <Check className="h-4 w-4 mr-1" /> 
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          tag.type === 'text' ? (
                            <div className="text-sm">{tag.content}</div>
                          ) : (
                            <div className="flex items-center justify-between bg-muted/50 rounded p-2">
                              <div className="text-sm font-mono">
                                {tag.content.replace('voice-', '').replace('.mp3', '')}
                              </div>
                              <Button variant="ghost" size="icon">
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        )}
                      </CardContent>
                      <CardFooter className="py-2 text-xs text-muted-foreground">
                        Added by {tag.author} • {new Date(tag.createdAt).toLocaleString()}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-1">No Tags Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Add your first Memory Bread note to this item.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setNewTagOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Tag
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div>
                  Total: {currentItem.tags.length} note{currentItem.tags.length !== 1 ? 's' : ''}
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="type">Group by Type</SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] border rounded-lg">
              <div className="text-center">
                <Tag className="h-12 w-12 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="font-medium text-lg mb-1">Select an Item</h3>
                <p className="text-sm text-muted-foreground">
                  Choose an item from the list to view or add tags
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartTagging;
