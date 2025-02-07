
import { motion } from "framer-motion";
import { Shield, Stars, Brain, Link2, Radio, Users, Sparkles, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/navigation/BackButton";

const DivineGuardian = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C4532] to-[#822727] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute top-10 left-10">
          <Sun className="w-32 h-32 text-[#F2FCE2]" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Moon className="w-24 h-24 text-[#E6D5D5]" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Stars className="w-96 h-96 text-white/20" />
        </div>
      </motion.div>

      <BackButton />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="h-16 w-16 text-[#F2FCE2] animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F2FCE2] to-[#E6D5D5]">
            Divine Guardian Initiative
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-[#F2FCE2] flex items-center justify-center gap-2">
            <Stars className="h-6 w-6" />
            Heaven's Light 🌟🛡️
            <Stars className="h-6 w-6" />
          </p>
          <p className="text-xl md:text-2xl text-[#E6D5D5] max-w-3xl mx-auto">
            "Shining Light on Darkness, Protecting the Vulnerable."
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-[#F2FCE2] flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Guardian IO: A Watchtower of Justice
            </h2>
            <p className="text-[#E6D5D5] text-lg">
              Our platform illuminates hidden networks of exploitation, 
              tracking and dismantling illicit operations with cutting-edge technology.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-[#F2FCE2] flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              What We Do:
            </h3>
            <div className="space-y-4">
              {[
                { icon: <Brain className="h-6 w-6" />, text: "AI-Powered Detection – Exposing trafficking patterns in real time" },
                { icon: <Link2 className="h-6 w-6" />, text: "Blockchain Transparency – Securing ethical supply chains" },
                { icon: <Radio className="h-6 w-6" />, text: "Satellite & IoT Monitoring – Watching over endangered ecosystems" },
                { icon: <Users className="h-6 w-6" />, text: "Community-Led Guardianship – Empowering local heroes to act" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 text-[#E6D5D5] bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#F2FCE2]">{item.icon}</div>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center space-y-8 py-12"
        >
          <h2 className="text-3xl font-bold text-[#F2FCE2] flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" />
            Be the Light, Join the Mission
            <Sparkles className="h-6 w-6" />
          </h2>
          <p className="text-xl text-[#E6D5D5] max-w-2xl mx-auto">
            Step into the Divine Guardian Initiative and become a protector of humanity and nature.
          </p>
          <Button 
            size="lg"
            className="bg-[#1C4532] hover:bg-[#2C5642] text-white px-8 py-6 text-lg rounded-full group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#F2FCE2]/20 to-[#822727]/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <Stars className="mr-2 h-5 w-5 group-hover:animate-spin" />
            Activate Your Guardian Role Now! 🌍✨
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DivineGuardian;
