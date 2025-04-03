
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Heart, MessageSquare, Share2, ThumbsUp, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { TrendingContent, contentService } from '@/services/contentService';
import { supabase } from '@/integrations/supabase/client';
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ViralContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Check if user is authenticated
  useState(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    checkAuth();
  });

  // Fetch trending content
  const { data: content, isLoading } = useQuery({
    queryKey: ['trending-content'],
    queryFn: contentService.getTrendingContent,
    onSettled: (data, error) => {
      if (error) {
        console.error("Error fetching trending content:", error);
      }
    }
  });

  const handleLike = async (contentId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like content.",
      });
      return;
    }

    try {
      const result = await contentService.recordInteraction(contentId, 'like');
      if (result.action === 'added') {
        toast({
          title: "Liked!",
          description: "Thank you for your engagement.",
        });
      } else {
        toast({
          title: "Unliked",
          description: "You've removed your like.",
        });
      }
    } catch (error) {
      console.error("Error liking content:", error);
      toast({
        title: "Error",
        description: "Could not process your request.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (contentItem: TrendingContent) => {
    const shareUrl = `${window.location.origin}/content/${contentItem.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: contentItem.title,
          text: contentItem.description || 'Check out this content from Guardian-IO!',
          url: shareUrl,
        });
        
        // Record share interaction
        if (isLoggedIn) {
          await contentService.recordInteraction(contentItem.id, 'share');
        }
        
        toast({
          title: "Shared!",
          description: "Thanks for sharing Guardian-IO content.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl);
      
      // Record share interaction
      if (isLoggedIn) {
        await contentService.recordInteraction(contentItem.id, 'share');
      }
      
      toast({
        title: "Copied!",
        description: "Link copied to clipboard.",
      });
    }
  };

  const getContentCards = (items: TrendingContent[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="utopia-card h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="text-xs">
                  {new Date(item.published_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {item.image_url && (
                  <div className="mb-3 rounded-md overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mb-auto">
                  {item.description ? (
                    item.description.length > 80 
                      ? `${item.description.substring(0, 80)}...` 
                      : item.description
                  ) : 'No description available.'}
                </p>
                
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/30">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-muted-foreground hover:text-primary"
                      onClick={() => handleLike(item.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-xs">{item.likes}</span>
                    </Button>
                    
                    <span className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {item.comments}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleShare(item)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse text-primary">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="trending">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="trending">
            <Zap className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending">
          {content && content.length > 0 ? (
            getContentCards(content.filter(item => item.trending))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No trending content available at the moment.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="insights">
          {content && content.length > 0 ? (
            getContentCards(content.filter(item => item.category === 'insight'))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No insights available at the moment.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
