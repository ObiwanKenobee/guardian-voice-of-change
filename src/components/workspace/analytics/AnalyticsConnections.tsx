
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, RefreshCw, Settings, Zap } from 'lucide-react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AnalyticsConnections = () => {
  const {
    modules,
    connectedModules,
    isConnecting,
    connectModule,
    disconnectModule,
    refreshModuleData
  } = useAnalytics();
  
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'connected'>('all');

  const handleRefresh = async (moduleId: any) => {
    setRefreshing(moduleId);
    await refreshModuleData(moduleId);
    setRefreshing(null);
  };

  const renderModuleItem = (moduleId: string) => {
    const module = modules[moduleId as keyof typeof modules];
    const isConnected = module.status === 'connected';
    
    return (
      <div key={moduleId} className="flex items-center justify-between p-4 border rounded-lg mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{module.name}</h4>
            <Badge variant={
              isConnected ? 'default' :
              module.status === 'pending' ? 'outline' :
              'secondary'
            }>
              {module.status}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {module.metrics > 0 ? (
              <span>{module.metrics} metrics available</span>
            ) : (
              <span>No metrics available</span>
            )}
            {" • "}
            <span>Last updated: {module.lastUpdated.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRefresh(moduleId)}
                  disabled={refreshing === moduleId || !isConnected}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing === moduleId ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isConnected ? 'Refresh module data' : 'Connect the module first'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button
            variant={isConnected ? "destructive" : "default"}
            size="sm"
            onClick={() => isConnected ? disconnectModule(moduleId as any) : connectModule(moduleId as any)}
            disabled={isConnecting}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </div>
    );
  };

  const moduleIds = Object.keys(modules);
  const displayedModules = activeTab === 'connected' 
    ? moduleIds.filter(id => modules[id as keyof typeof modules].status === 'connected')
    : moduleIds;

  return (
    <Card>
      <CardHeader className="bg-blue-50/50 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <CardTitle>Analytics Module Connections</CardTitle>
        </div>
        <CardDescription>
          Connect workspace modules to enable comprehensive data analytics and cross-domain insights
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all" onValueChange={(val) => setActiveTab(val as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="connected">Connected ({connectedModules.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ScrollArea className="h-[400px] pr-4">
              {displayedModules.map(renderModuleItem)}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="connected">
            <ScrollArea className="h-[400px] pr-4">
              {displayedModules.length > 0 ? (
                displayedModules.map(renderModuleItem)
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                  <AlertCircle className="h-10 w-10 mb-2" />
                  <p>No modules connected</p>
                  <p className="text-sm">Connect modules from the "All Modules" tab</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analytics Status</h4>
              <p className="text-sm text-muted-foreground">
                {connectedModules.length} of {moduleIds.length} modules connected
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Configure Analytics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
