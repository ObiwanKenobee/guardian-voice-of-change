import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Read More
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