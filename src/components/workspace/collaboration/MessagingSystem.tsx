import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Message = Tables<"messages">;

const MessagingSystem = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col bg-muted p-3 rounded-lg"
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-muted-foreground mt-1">
              {new Date(message.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-card">
        <form className="flex gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export { MessagingSystem };