import { AIAgents } from "@/components/workspace/dashboard/AIAgents"
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview"
import { QuickActions } from "@/components/workspace/dashboard/QuickActions"
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader"

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <div className="grid gap-6">
        <GlobalOverview />
        <QuickActions />
        <AIAgents />
      </div>
    </div>
  )
}

export default Dashboard