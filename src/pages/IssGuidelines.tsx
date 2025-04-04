
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssViewer } from '@/components/iss/IssViewer';
import { SpaceMap } from '@/components/iss/SpaceMap';
import IssAdvancedFeatures from '@/components/iss/IssDoraemonFeatures';

const IssGuidelines = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ISS Guidelines & Resources</h1>
        <p className="text-muted-foreground mt-1">
          Explore the International Space Station and learn about its inventory management systems
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="station-view">Station View</TabsTrigger>
          <TabsTrigger value="location-map">Location Map</TabsTrigger>
          <TabsTrigger value="advanced-features">Advanced Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>International Space Station Overview</CardTitle>
              <CardDescription>
                Guide to ISS inventory management protocols and best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">ISS Inventory System</h3>
                <p className="text-muted-foreground">
                  The International Space Station inventory system is designed to track thousands of items in a microgravity environment across multiple modules. This system ensures astronauts can quickly locate critical supplies and equipment while maintaining optimal storage efficiency.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Real-time tracking of over 10,000 inventory items</li>
                    <li>Barcode and RFID identification systems</li>
                    <li>Prioritization of critical supplies and equipment</li>
                    <li>Expiration date monitoring for consumables</li>
                    <li>Integration with NASA's ground-based inventory database</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Storage Guidelines</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Critical medical supplies must be stored in Module A</li>
                    <li>Food items should be organized by expiration date</li>
                    <li>Scientific samples require temperature-controlled storage</li>
                    <li>Personal items are limited to defined crew storage areas</li>
                    <li>Hazardous materials must follow special containment protocols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Protocol</CardTitle>
                <CardDescription>Standard procedures for item management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Item Retrieval</h4>
                    <p className="text-sm text-muted-foreground">
                      All items must be logged when removed from storage. Use the barcode scanner to update the inventory system before removing any item from its designated location.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Item Return</h4>
                    <p className="text-sm text-muted-foreground">
                      Return items to their designated storage locations after use. If an item needs to be relocated, update the inventory system immediately.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">New Item Registration</h4>
                    <p className="text-sm text-muted-foreground">
                      Items arriving on resupply missions must be registered within 24 hours of arrival. Follow the import procedure in the inventory system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emergency Procedures</CardTitle>
                <CardDescription>Critical item access during emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Medical Emergencies</h4>
                    <p className="text-sm text-muted-foreground">
                      The emergency medical kit is located in Module A, Cabinet 3. In case of medical emergency, this cabinet can be accessed without inventory logging.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Station Emergencies</h4>
                    <p className="text-sm text-muted-foreground">
                      Emergency repair kits are located in each module. In emergency situations, use the "Emergency Access" feature in the inventory system to quickly locate needed equipment.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Communication Failure</h4>
                    <p className="text-sm text-muted-foreground">
                      If the inventory system is unavailable, use the physical backup inventory logs stored in the Commander's quarters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="station-view">
          <Card className="h-[calc(100vh-220px)] min-h-[500px]">
            <CardHeader>
              <CardTitle>Interactive ISS Model</CardTitle>
              <CardDescription>
                Explore the International Space Station in 3D
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-76px)]">
              <IssViewer />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location-map">
          <Card className="h-[calc(100vh-220px)] min-h-[500px]">
            <CardHeader>
              <CardTitle>ISS Orbit Tracker</CardTitle>
              <CardDescription>
                Monitor the current position and trajectory of the ISS
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-76px)]">
              <SpaceMap />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced-features">
          <IssAdvancedFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IssGuidelines;
