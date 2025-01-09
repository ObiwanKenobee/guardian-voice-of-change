import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <div className="py-16 bg-primary/5">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.id * 0.2 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.prefix}
                {stat.number.toLocaleString()}
              </div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};