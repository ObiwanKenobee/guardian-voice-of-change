import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export const HeaderNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) {
        setUnreadCount(data.length);
      }

      return data || [];
    },
  });

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id);

    if (!error) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications?.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className="flex flex-col items-start p-4 space-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">New Message</span>
              <Badge variant="outline" className="ml-2">
                New
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {notification.content}
            </p>
          </DropdownMenuItem>
        ))}
        {(!notifications || notifications.length === 0) && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};