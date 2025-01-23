import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LineChart, Activity } from "lucide-react";

export const HeaderMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['header-metrics'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('user_id', session.user.id)
        .order('timestamp', { ascending: false })
        .limit(5);

      return data;
    },
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <Badge variant="secondary" className="font-mono">
            {metrics?.length || 0} updates
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Recent Metrics</h4>
          </div>
          <div className="space-y-2">
            {metrics?.map((metric) => (
              <div
                key={metric.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{metric.metric_name}</span>
                <Badge variant="outline">{metric.metric_value}</Badge>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};