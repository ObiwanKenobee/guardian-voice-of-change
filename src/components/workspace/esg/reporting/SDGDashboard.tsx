import { SDGMetricCard } from "./sdg/SDGMetricCard";

export const SDGDashboard = () => {
  const sdgProgress = [
    {
      goal: "SDG 8: Decent Work and Economic Growth",
      progress: 75,
      metrics: [
        { label: "Employment Rate", value: "92%" },
        { label: "Wage Growth", value: "+5.2%" },
        { label: "Training Hours", value: "40hrs/employee" }
      ]
    },
    {
      goal: "SDG 16: Peace, Justice and Strong Institutions",
      progress: 68,
      metrics: [
        { label: "Policy Compliance", value: "98%" },
        { label: "Incident Reports", value: "-15%" },
        { label: "Governance Score", value: "A+" }
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sdgProgress.map((sdg) => (
        <SDGMetricCard key={sdg.goal} {...sdg} />
      ))}
    </div>
  );
};