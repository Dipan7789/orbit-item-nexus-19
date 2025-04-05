
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Stethoscope, 
  UtensilsCrossed, 
  Wrench, 
  FlaskConical,
  User,
  BookOpen,
  ShieldAlert,
  ScrollText
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    {
      id: 'medical',
      name: 'Medical',
      count: 24,
      icon: <Stethoscope size={20} />,
      color: 'bg-red-500/20 text-red-600'
    },
    {
      id: 'food',
      name: 'Food',
      count: 47,
      icon: <UtensilsCrossed size={20} />,
      color: 'bg-orange-500/20 text-orange-600'
    },
    {
      id: 'equipment',
      name: 'Equipment',
      count: 36,
      icon: <Wrench size={20} />,
      color: 'bg-blue-500/20 text-blue-600'
    },
    {
      id: 'scientific',
      name: 'Scientific',
      count: 29,
      icon: <FlaskConical size={20} />,
      color: 'bg-purple-500/20 text-purple-600'
    },
    {
      id: 'personal',
      name: 'Personal',
      count: 15,
      icon: <User size={20} />,
      color: 'bg-green-500/20 text-green-600'
    },
    {
      id: 'manuals',
      name: 'Manuals',
      count: 12,
      icon: <BookOpen size={20} />,
      color: 'bg-yellow-500/20 text-yellow-600'
    },
    {
      id: 'emergency',
      name: 'Emergency',
      count: 8,
      icon: <ShieldAlert size={20} />,
      color: 'bg-red-600/20 text-red-700'
    },
    {
      id: 'documentation',
      name: 'Documentation',
      count: 31,
      icon: <ScrollText size={20} />,
      color: 'bg-gray-500/20 text-gray-600'
    }
  ];
  
  const handleCategoryClick = (categoryId: string) => {
    // Navigate to inventory page with category filter
    navigate(`/inventory?category=${categoryId}`);
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="space-card p-3 rounded-md flex flex-col items-center cursor-pointer transition-all hover:scale-[1.02]"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                {category.icon}
              </div>
              <div className="text-center">
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} items</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
