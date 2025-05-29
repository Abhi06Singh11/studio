
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import * as React from "react";

export default function SubscriptionConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Selected Plan";

  let planName = "Your Selected Plan";
  if (plan === "trial") planName = "7-Day Free Trial";
  if (plan === "monthly") planName = "Premium Monthly";
  if (plan === "yearly") planName = "Premium Yearly";

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card className="text-center">
        <CardHeader>
          <CheckCircle2Icon className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">Thank You for Subscribing!</CardTitle>
          <CardDescription>
            Your subscription to CodeSphere Premium has been (conceptually) confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg font-semibold">Your Plan: {planName}</p>
          <p className="text-muted-foreground">
            You can now access all premium features. Explore and enjoy!
          </p>
          <Button asChild className="mt-6">
            <Link href="/premium/manage">Manage Your Subscription</Link>
          </Button>
           <Button variant="link" asChild className="mt-2">
            <Link href="/">Go to Activity Feed</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
