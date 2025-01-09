import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ForumPost = Tables<"forum_posts">;

const GlobalForum = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["forum_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading forum posts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Global Forum</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>24</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>2</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  View Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { GlobalForum };