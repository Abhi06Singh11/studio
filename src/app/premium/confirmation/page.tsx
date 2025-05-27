
"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2Icon, PartyPopperIcon } from "lucide-react";

export default function SubscriptionConfirmationPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || "Premium";

  const planDisplayNames: { [key: string]: string } = {
    trial: "14-Day Free Trial",
    monthly: "Premium Monthly Plan",
    yearly: "Premium Yearly Plan",
    Premium: "Premium Plan" // Fallback
  };

  return (
    <div className="container mx-auto max-w-lg py-12 px-4 md:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="shadow-xl rounded-xl w-full text-center">
        <CardHeader className="p-8">
          <PartyPopperIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Thank You for Subscribing!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            You're now part of CodeSphere Premium.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-md">
            Your <strong className="text-primary">{planDisplayNames[plan]}</strong> is now active.
          </p>
          <p className="text-muted-foreground text-sm">
            Explore exclusive features, enhanced networking, and priority support to accelerate your career goals.
          </p>
        </CardContent>
        <CardFooter className="p-6 flex flex-col sm:flex-row gap-3 justify-center border-t">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Start Exploring</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/premium/manage">Manage Your Subscription</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
