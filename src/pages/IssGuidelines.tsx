import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IssViewer } from '@/components/iss/IssViewer';
import { SpaceMap } from '@/components/iss/SpaceMap';
import IssDoraemonFeatures from '@/components/iss/IssDoraemonFeatures';

const IssGuidelines = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ISS Guidelines</h1>
        <p className="text-muted-foreground mt-1">Explore the International Space Station and its guidelines</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="3d-model">3D ISS Model</TabsTrigger>
          <TabsTrigger value="space-map">Space Map</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="future-features">Future Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>International Space Station</CardTitle>
              <CardDescription>
                Overview of the ISS and its mission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-md overflow-hidden">
                <img 
                  src="https://www.nasa.gov/wp-content/uploads/2023/03/iss068e024412.jpg" 
                  alt="International Space Station" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  The International Space Station (ISS) is a modular space station in low Earth orbit. 
                  It's a multinational collaborative project involving five space agencies: NASA (United States), 
                  Roscosmos (Russia), JAXA (Japan), ESA (Europe), and CSA (Canada).
                </p>
                <p>
                  The station serves as a microgravity and space environment research laboratory in which 
                  scientific research is conducted in astrobiology, astronomy, meteorology, physics, and other fields.
                </p>
                
                <h3>Key Facts</h3>
                <ul>
                  <li>Orbit altitude: 400 km (250 mi)</li>
                  <li>Speed: 28,000 km/h (17,500 mph)</li>
                  <li>Orbits per day: 15.5</li>
                  <li>Mass: 460,000 kg (1,014,000 lb)</li>
                  <li>Length: 109 m (358 ft)</li>
                  <li>Width: 73 m (240 ft)</li>
                  <li>Pressurized volume: 915 m³ (32,300 cu ft)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Crew Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The ISS typically maintains a crew of six astronauts who live and work in the station 
                  for missions lasting several months.
                </p>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Current Crew:</span>
                    <span>7 astronauts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Mission Duration:</span>
                    <span>6 months (typical)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Sleep Cycle:</span>
                    <span>8 hours / 24-hour period</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Storage Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Efficient storage is critical for mission success, as space is extremely limited 
                  on the station.
                </p>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Personal Storage:</span>
                    <span>0.5 m³ per astronaut</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Regular Resupply:</span>
                    <span>Every 2-3 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Waste Management:</span>
                    <span>Compact &amp; Return to Earth</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="3d-model">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[80vh] w-full">
                <IssViewer />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="space-map">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[80vh] w-full">
                <SpaceMap />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ISS Storage Guidelines</CardTitle>
              <CardDescription>
                Proper storage procedures for the International Space Station
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>General Storage Principles</h3>
              <p>
                All items aboard the ISS must be properly secured at all times. In microgravity, 
                unsecured items can float away, become lost, or pose hazards to equipment and crew.
              </p>
              
              <h3>Storage Procedures</h3>
              <ol>
                <li>
                  <strong>Inventory Tracking:</strong> All items must be scanned and recorded in the 
                  inventory management system before storage or retrieval.
                </li>
                <li>
                  <strong>Labeling:</strong> Items must be clearly labeled with contents, expiration date (if applicable), 
                  and hazard information (if applicable).
                </li>
                <li>
                  <strong>Location Coding:</strong> Store items according to the ISS location coding system. 
                  (Example: NODE2F3B = Node 2, Forward, Panel 3, Bay B)
                </li>
                <li>
                  <strong>Weight Distribution:</strong> Distribute heavy items throughout storage areas to 
                  maintain proper balance of the station.
                </li>
                <li>
                  <strong>Containment:</strong> Items that generate debris, liquids, or gases must be double-contained.
                </li>
              </ol>
              
              <h3>Storage Priorities</h3>
              <ul>
                <li>
                  <strong>High Priority:</strong> Critical life support, emergency equipment, and time-sensitive experiments.
                </li>
                <li>
                  <strong>Medium Priority:</strong> Regular consumables, maintenance equipment, and scientific equipment.
                </li>
                <li>
                  <strong>Low Priority:</strong> Non-essential personal items, archived materials, and return cargo.
                </li>
              </ul>
              
              <h3>Hazardous Materials</h3>
              <p>
                Hazardous materials must be stored in designated containment areas with proper ventilation 
                and emergency response equipment nearby. Each hazardous item must have a Material Safety Data Sheet 
                (MSDS) accessible in the inventory system.
              </p>
              
              <h3>Food Storage</h3>
              <p>
                Food items must be stored according to their shelf life:
              </p>
              <ul>
                <li>Short shelf life (1-2 weeks): Refrigerated or immediate use</li>
                <li>Medium shelf life (1-6 months): Ready access storage</li>
                <li>Long shelf life (6+ months): Deep storage</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="future-features">
          <Card>
            <CardHeader>
              <CardTitle>Future ISS Management Enhancements</CardTitle>
              <CardDescription>
                Advanced features planned for future implementation to enhance ISS operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IssDoraemonFeatures />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IssGuidelines;
