
import { motion } from "framer-motion";
import { Shield, Stars, Brain, Link2, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/navigation/BackButton";

const DivineGuardian = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      <BackButton />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Divine Guardian Initiative – Orion
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-blue-200">
            Heaven's Light 🌟🛡️
          </p>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
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
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-300 flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Guardian-IO: A Watchtower of Justice
            </h2>
            <p className="text-gray-300 text-lg">
              Orion's light pierces the shadows—just as our platform illuminates hidden networks of exploitation, 
              tracking and dismantling illicit operations with cutting-edge technology.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-300">What We Do:</h3>
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
                  className="flex items-center gap-4 text-gray-300"
                >
                  <div className="text-blue-400">{item.icon}</div>
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
          <h2 className="text-3xl font-bold text-blue-300">
            Be the Light, Join the Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Orion's brilliance guides us—so too can you. Step into the Divine Guardian Initiative 
            and become a protector of humanity and nature.
          </p>
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full"
          >
            <Stars className="mr-2 h-5 w-5" />
            Activate Your Guardian Role Now! 🌍✨
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DivineGuardian;
