import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, FileUp, Check, CheckCheck } from "lucide-react";
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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm">{message.content}</p>
                {message.attachment_url && (
                  <Button variant="link" className="p-0 h-auto text-xs text-blue-500 mt-1">
                    View Attachment
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {message.read ? (
                  <CheckCheck className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {new Date(message.created_at).toLocaleString()}
              </span>
              {message.thread_id && (
                <Badge variant="outline" className="text-xs">
                  Thread
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-card">
        <form className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="button" variant="outline" className="shrink-0">
              <FileUp className="h-4 w-4" />
            </Button>
            <Button type="submit" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export { MessagingSystem };