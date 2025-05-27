
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircleIcon, StarIcon, ArrowRightIcon } from "lucide-react";

const premiumBenefits = [
  "Unlock exclusive content and articles",
  "Get priority support from our team",
  "Access advanced analytics for your profile",
  "Enhanced networking opportunities",
  "Ad-free experience",
  "Early access to new features",
];

export default function PremiumLandingPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6 lg:px-8">
      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent p-8 text-center">
          <StarIcon className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold tracking-tight text-primary-foreground">
            Achieve Your Career Goals Faster
          </CardTitle>
          <CardDescription className="text-xl text-primary-foreground/90 mt-2">
            with CodeSphere Premium
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-foreground">Premium Benefits Include:</h2>
            <ul className="space-y-3">
              {premiumBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link href="/premium/subscribe">
                Start Your Free Trial Now <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Free for 14 days, then just $19/month. Cancel anytime.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already a Premium member? <Link href="/premium/manage" className="font-semibold text-primary hover:underline">Manage your subscription</Link> or <Link href="/" className="font-semibold text-primary hover:underline">return to feed</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
