"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import PremiumCenterModal from "@/components/premium-flow/PremiumCenterModal";

export default function PremiumModalTestPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Premium Modal Test Page</h1>
      <p className="mb-6">Click the button below to open the premium feature selection modal.</p>
      <Button onClick={() => setIsModalOpen(true)} size="lg">
        Open Premium Modal
      </Button>
      <PremiumCenterModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
