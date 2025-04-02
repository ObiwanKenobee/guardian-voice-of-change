
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, ThumbsUp, MessageSquare, Eye, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentService, TrendingContent } from '@/services/contentService';
import { supabase } from "@/integrations/supabase/client";

export const ViralContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [session, setSession] = useState(null);
  
  // Check for auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Fetch trending content
  const { data: trendingPosts = [], isLoading } = useQuery({
    queryKey: ['trending-content'],
    queryFn: contentService.getTrendingContent,
    onError: (error) => {
      toast({
        title: "Error loading content",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Track locally which posts have been interacted with
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  
  // Handle post interactions
  const interactionMutation = useMutation({
    mutationFn: ({ id, type }: { id: string, type: 'like' | 'save' | 'share' }) => 
      contentService.recordInteraction(id, type),
    onSuccess: (result, variables) => {
      // Update UI based on the action returned (added or removed)
      if (variables.type === 'like') {
        if (result.action === 'added') {
          setLikedPosts(prev => [...prev, variables.id]);
        } else {
          setLikedPosts(prev => prev.filter(id => id !== variables.id));
        }
      } else if (variables.type === 'save') {
        if (result.action === 'added') {
          setSavedPosts(prev => [...prev, variables.id]);
          toast({
            title: "Saved successfully",
            description: "The post has been saved to your collection.",
          });
        } else {
          setSavedPosts(prev => prev.filter(id => id !== variables.id));
          toast({
            title: "Removed from saved",
            description: "The post has been removed from your saved items.",
          });
        }
      } else if (variables.type === 'share') {
        toast({
          title: "Thanks for sharing!",
          description: "Link copied to clipboard.",
        });
      }
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['trending-content'] });
    },
    onError: (error) => {
      toast({
        title: "Action failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const handleLike = (id: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts.",
        variant: "destructive"
      });
      return;
    }
    interactionMutation.mutate({ id, type: 'like' });
  };
  
  const handleSave = (id: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save posts.",
        variant: "destructive"
      });
      return;
    }
    interactionMutation.mutate({ id, type: 'save' });
  };
  
  const handleShare = (title: string, id: string) => {
    const shareUrl = `${window.location.origin}/content/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Guardian-IO: ${title}`,
        text: `Check out this article on Guardian-IO: ${title}`,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (session) {
          interactionMutation.mutate({ id, type: 'share' });
        } else {
          toast({
            title: "Link copied!",
            description: "Share this link with your network.",
          });
        }
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // If loading, show placeholder content
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden h-full">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded mb-4 w-3/4"></div>
              <div className="h-10 mt-4 pt-4 border-t flex justify-between">
                <div className="h-8 w-20 bg-gray-100 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-100 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-100 animate-pulse rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // If no trending content, show message
  if (trendingPosts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No trending content available</h3>
        <p className="text-muted-foreground">Check back soon for the latest content!</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {trendingPosts.map((post) => (
        <motion.div key={post.id} variants={item} className="h-full">
          <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
            <div className="relative h-48">
              <img 
                src={post.image_url || 'https://images.unsplash.com/photo-1516937941344-00b4e0337589'} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white/80">
                  {post.category}
                </Badge>
                {post.trending && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
              {post.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
              )}
              
              <div className="flex items-center text-muted-foreground text-sm mt-auto pt-4">
                <div className="flex items-center mr-4">
                  <Eye className="h-4 w-4 mr-1" />
                  {post.views}
                </div>
                <div className="flex items-center mr-4">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.comments}
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.likes}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(post.id)}
                  className={likedPosts.includes(post.id) ? "text-primary" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(post.title, post.id)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={savedPosts.includes(post.id) ? "text-primary" : ""}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${savedPosts.includes(post.id) ? "fill-primary" : ""}`} />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
