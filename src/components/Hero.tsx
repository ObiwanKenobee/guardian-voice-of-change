
import { ArrowRight, Sprout, Heart, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-5" />
      
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
        >
          <motion.div 
            className="flex items-center justify-center gap-2 text-sm sm:text-base text-emerald-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Nurturing a World of Positive Impact</span>
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Empowering Harmony Between Business and Nature
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-600 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join us in creating a world where every business decision nurtures life, 
            empowers communities, and regenerates our planet's ecosystems.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white group w-full sm:w-auto"
              onClick={() => navigate('/sign-up')}
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 transition-colors w-full sm:w-auto"
              onClick={() => navigate('/platform-features')}
            >
              Discover Our Vision
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              {
                icon: <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
                title: "Regenerative Impact",
                description: "Fostering life-enhancing supply chains"
              },
              {
                icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />,
                title: "Community Wellbeing",
                description: "Empowering global communities"
              },
              {
                icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
                title: "Universal Harmony",
                description: "Building trust across borders"
              }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-green-100">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div className="text-left">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
