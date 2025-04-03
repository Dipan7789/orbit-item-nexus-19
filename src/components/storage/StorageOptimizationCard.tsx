
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckSquare, ArrowRight } from 'lucide-react';

const StorageOptimizationCard = () => {
  return (
    <Card className="space-card bg-gradient-to-br from-space-blue/30 to-space-purple/20 border-space-blue/40">
      <CardHeader>
        <CardTitle>Storage Optimization</CardTitle>
        <CardDescription>
          AI-powered suggestions to optimize your storage space
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-black/20 rounded-lg border border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-primary animate-pulse">
                  <RefreshCw size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Suggested Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Reorganizing Module A could free up 15% more space
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                5 min ago
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm gap-2">
                <CheckSquare size={14} className="text-green-500" />
                <span>Consolidate medical supplies in Section A2</span>
              </div>
              <div className="flex items-center text-sm gap-2">
                <CheckSquare size={14} className="text-green-500" />
                <span>Rotate large equipment containers 90°</span>
              </div>
              <div className="flex items-center text-sm gap-2">
                <CheckSquare size={14} className="text-green-500" />
                <span>Move low-priority items to Cargo Bay</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" size="sm" className="w-full">
                Details
              </Button>
              <Button size="sm" className="w-full gap-1">
                Apply
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>
              The AI-powered optimization engine analyzes item usage patterns, 
              retrieval frequency, and spatial dimensions to provide optimal 
              storage arrangements.
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-muted-foreground">
              Last full optimization: 2 days ago
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw size={14} />
              Run Full Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageOptimizationCard;
