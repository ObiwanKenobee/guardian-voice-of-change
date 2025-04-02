
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, ThumbsUp, MessageSquare, Eye, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ViralContent = () => {
  const { toast } = useToast();
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  
  const handleSave = (id: string) => {
    if (savedPosts.includes(id)) {
      setSavedPosts(savedPosts.filter(postId => postId !== id));
      toast({
        title: "Removed from saved",
        description: "The post has been removed from your saved items.",
      });
    } else {
      setSavedPosts([...savedPosts, id]);
      toast({
        title: "Saved successfully",
        description: "The post has been saved to your collection.",
      });
    }
  };
  
  const handleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
      toast({
        title: "Thanks for your feedback!",
        description: "You liked this post.",
      });
    }
  };
  
  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Guardian-IO: ${title}`,
        text: `Check out this article on Guardian-IO: ${title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link with your network.",
        });
      });
    }
  };

  const trendingPosts = [
    {
      id: 'post-1',
      title: '5 Ways Ethical Supply Chains Are Revolutionizing Conservation',
      image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589',
      category: 'Conservation',
      views: '2.4k',
      comments: 32,
      likes: 156 + (likedPosts.includes('post-1') ? 1 : 0),
      trending: true,
    },
    {
      id: 'post-2',
      title: 'How Technology Is Combating Wildlife Trafficking',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
      category: 'Technology',
      views: '1.8k',
      comments: 24,
      likes: 98 + (likedPosts.includes('post-2') ? 1 : 0),
      trending: true,
    },
    {
      id: 'post-3',
      title: 'The Business Case for Ethical Sourcing in 2023',
      image: 'https://images.unsplash.com/photo-1507099985932-87a4520ed1d5',
      category: 'Business',
      views: '3.2k',
      comments: 46,
      likes: 210 + (likedPosts.includes('post-3') ? 1 : 0),
      trending: false,
    },
  ];

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
                src={post.image} 
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
                  onClick={() => handleShare(post.title)}
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
