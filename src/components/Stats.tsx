import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';

const stats = [
  { id: 1, number: 4000, label: "Species Trafficked Worldwide", prefix: "+" },
  { id: 2, number: 3, label: "Trillion Dollar Industry", prefix: "$" },
  { id: 3, number: 40, label: "Million People in Modern Slavery", prefix: "" },
  { id: 4, number: 150, label: "Countries Impacted", prefix: "+" },
];

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-8 sm:py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="stat-card hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.id * 0.2 }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                {stat.prefix}
                {inView && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    useEasing={true}
                  />
                )}
              </div>
              <div className="text-base sm:text-lg text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};