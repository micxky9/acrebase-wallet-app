import BackgroundGlow from "@/components/common/BackgroundGlow";
import StarsBackground from "@/components/common/StarsBackground";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TokenGrid from "@/components/dashboard/TokenGrid";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="relative min-h-screen overflow-hidden bg-[#070710] px-6 py-10">

        <BackgroundGlow />
        <StarsBackground />

        <div className="relative z-10 mx-auto max-w-7xl space-y-8">

          <DashboardHeader />

          <TokenGrid />

        </div>

      </main>
    </ProtectedRoute>
  );
}