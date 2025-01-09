import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardPreferences {
  widgets: string[];
  layout: any;
}

export const DashboardGrid = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('dashboard_preferences')
          .select('*')
          .single();
        
        setPreferences(data);
      }
      setLoading(false);
    };

    fetchPreferences();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-[200px]" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {preferences?.widgets.map((widget, index) => (
        <Card key={index} className="p-6">
          <h3 className="font-semibold mb-4">{widget}</h3>
          {/* Widget content will be implemented based on type */}
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {widget} Widget
          </div>
        </Card>
      ))}
    </div>
  );
};