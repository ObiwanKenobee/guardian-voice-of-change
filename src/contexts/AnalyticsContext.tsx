
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AnalyticsModule = 
  | 'dashboard'
  | 'supply_chain'
  | 'esg_reporting'
  | 'compliance'
  | 'risk'
  | 'governance'
  | 'carbon'
  | 'wildlife'
  | 'ethical_sourcing'
  | 'human_rights';

type ModuleData = {
  id: string;
  name: string;
  metrics: number;
  lastUpdated: Date;
  status: 'connected' | 'disconnected' | 'pending';
};

type AnalyticsContextType = {
  modules: Record<AnalyticsModule, ModuleData>;
  connectedModules: AnalyticsModule[];
  isConnecting: boolean;
  connectModule: (moduleId: AnalyticsModule) => Promise<void>;
  disconnectModule: (moduleId: AnalyticsModule) => Promise<void>;
  refreshModuleData: (moduleId: AnalyticsModule) => Promise<void>;
  getModuleMetrics: (moduleId: AnalyticsModule) => Promise<any[]>;
  isInitialized: boolean;
};

const defaultModules: Record<AnalyticsModule, ModuleData> = {
  dashboard: { id: 'dashboard', name: 'Dashboard Analytics', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  supply_chain: { id: 'supply_chain', name: 'Supply Chain Analytics', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  esg_reporting: { id: 'esg_reporting', name: 'ESG Reporting', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  compliance: { id: 'compliance', name: 'Compliance Analytics', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  risk: { id: 'risk', name: 'Risk Management', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  governance: { id: 'governance', name: 'Corporate Governance', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  carbon: { id: 'carbon', name: 'Carbon Footprint', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  wildlife: { id: 'wildlife', name: 'Wildlife Protection', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  ethical_sourcing: { id: 'ethical_sourcing', name: 'Ethical Sourcing', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
  human_rights: { id: 'human_rights', name: 'Human Rights Monitor', metrics: 0, lastUpdated: new Date(), status: 'disconnected' },
};

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Record<AnalyticsModule, ModuleData>>(defaultModules);
  const [connectedModules, setConnectedModules] = useState<AnalyticsModule[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Initialize modules from supabase or localStorage
  useEffect(() => {
    const loadAnalyticsState = async () => {
      try {
        // Try to load from Supabase if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data, error } = await supabase
            .from('analytics_modules')
            .select('*')
            .eq('user_id', session.user.id);
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            const moduleMap = { ...defaultModules };
            const connected: AnalyticsModule[] = [];
            
            data.forEach((item) => {
              const moduleId = item.module_id as AnalyticsModule;
              moduleMap[moduleId] = {
                id: moduleId,
                name: item.name || defaultModules[moduleId].name,
                metrics: item.metrics_count || 0,
                lastUpdated: new Date(item.last_updated),
                status: item.status || 'disconnected'
              };
              
              if (item.status === 'connected') {
                connected.push(moduleId);
              }
            });
            
            setModules(moduleMap);
            setConnectedModules(connected);
          } else {
            // If no data in supabase, try localStorage
            const savedState = localStorage.getItem('guardian_analytics_state');
            if (savedState) {
              const parsedState = JSON.parse(savedState);
              setModules(parsedState.modules);
              setConnectedModules(parsedState.connectedModules);
            }
          }
        } else {
          // If no session, try localStorage
          const savedState = localStorage.getItem('guardian_analytics_state');
          if (savedState) {
            const parsedState = JSON.parse(savedState);
            setModules(parsedState.modules);
            setConnectedModules(parsedState.connectedModules);
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading analytics state:', error);
        // Fallback to default state
        setIsInitialized(true);
      }
    };
    
    loadAnalyticsState();
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('guardian_analytics_state', JSON.stringify({
        modules,
        connectedModules
      }));
    }
  }, [modules, connectedModules, isInitialized]);

  const connectModule = async (moduleId: AnalyticsModule) => {
    setIsConnecting(true);
    
    try {
      const updatedModule = {
        ...modules[moduleId],
        status: 'connected' as const,
        lastUpdated: new Date()
      };
      
      // Update Supabase if authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('analytics_modules')
          .upsert({
            user_id: session.user.id,
            module_id: moduleId,
            name: updatedModule.name,
            status: updatedModule.status,
            last_updated: updatedModule.lastUpdated.toISOString(),
            metrics_count: updatedModule.metrics
          });
          
        if (error) throw error;
      }
      
      // Update local state
      setModules({
        ...modules,
        [moduleId]: updatedModule
      });
      
      if (!connectedModules.includes(moduleId)) {
        setConnectedModules([...connectedModules, moduleId]);
      }
      
      toast({
        title: "Module Connected",
        description: `${updatedModule.name} has been connected to the analytics system.`,
      });
    } catch (error) {
      console.error('Error connecting module:', error);
      toast({
        title: "Connection Failed",
        description: "There was an error connecting the module. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectModule = async (moduleId: AnalyticsModule) => {
    try {
      const updatedModule = {
        ...modules[moduleId],
        status: 'disconnected' as const,
        lastUpdated: new Date()
      };
      
      // Update Supabase if authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('analytics_modules')
          .upsert({
            user_id: session.user.id,
            module_id: moduleId,
            name: updatedModule.name,
            status: updatedModule.status,
            last_updated: updatedModule.lastUpdated.toISOString(),
            metrics_count: updatedModule.metrics
          });
          
        if (error) throw error;
      }
      
      // Update local state
      setModules({
        ...modules,
        [moduleId]: updatedModule
      });
      
      setConnectedModules(connectedModules.filter(id => id !== moduleId));
      
      toast({
        title: "Module Disconnected",
        description: `${updatedModule.name} has been disconnected from the analytics system.`,
      });
    } catch (error) {
      console.error('Error disconnecting module:', error);
      toast({
        title: "Disconnection Failed",
        description: "There was an error disconnecting the module. Please try again.",
        variant: "destructive"
      });
    }
  };

  const refreshModuleData = async (moduleId: AnalyticsModule) => {
    try {
      // Simulate fetching updated metrics
      const newMetricsCount = Math.floor(Math.random() * 100) + 1;
      
      const updatedModule = {
        ...modules[moduleId],
        metrics: newMetricsCount,
        lastUpdated: new Date()
      };
      
      // Update Supabase if authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('analytics_modules')
          .upsert({
            user_id: session.user.id,
            module_id: moduleId,
            name: updatedModule.name,
            status: updatedModule.status,
            last_updated: updatedModule.lastUpdated.toISOString(),
            metrics_count: updatedModule.metrics
          });
          
        if (error) throw error;
      }
      
      // Update local state
      setModules({
        ...modules,
        [moduleId]: updatedModule
      });
      
      toast({
        title: "Data Refreshed",
        description: `${updatedModule.name} data has been updated with ${newMetricsCount} metrics.`,
      });
    } catch (error) {
      console.error('Error refreshing module data:', error);
      toast({
        title: "Refresh Failed",
        description: "There was an error refreshing the module data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getModuleMetrics = async (moduleId: AnalyticsModule) => {
    // Simulate fetching metrics data for the module
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(Array.from({ length: modules[moduleId].metrics }, (_, i) => ({
          id: `metric-${i}`,
          name: `${modules[moduleId].name} Metric ${i + 1}`,
          value: Math.floor(Math.random() * 100),
          change: (Math.random() * 20 - 10).toFixed(1),
          timestamp: new Date().toISOString()
        })));
      }, 500);
    });
  };

  return (
    <AnalyticsContext.Provider
      value={{
        modules,
        connectedModules,
        isConnecting,
        connectModule,
        disconnectModule,
        refreshModuleData,
        getModuleMetrics,
        isInitialized
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
