import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CommunityInsight {
  id: string;
  topic: string;
  sentiment_score: number | null;
  insight_type: string;
  content: string;
  source: string | null;
  created_at: string;
}

export const CommunityInsights = () => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ["community-insights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_insights")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CommunityInsight[];
    },
  });

  const getSentimentIcon = (score: number | null) => {
    if (!score) return <Minus className="h-4 w-4" />;
    return score > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  if (isLoading) {
    return <div>Loading insights...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Community Insights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights?.map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{insight.topic}</span>
                <Badge>{insight.insight_type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{insight.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    {getSentimentIcon(insight.sentiment_score)}
                    Sentiment: {insight.sentiment_score || "N/A"}
                  </span>
                  {insight.source && (
                    <span className="text-muted-foreground">
                      Source: {insight.source}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};