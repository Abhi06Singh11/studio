
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { SettingsIcon, CreditCardIcon, AlertTriangleIcon, ArrowLeftIcon, ReceiptTextIcon, ShieldCheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast";


// Sample data - in a real app, this would be fetched
const currentSubscription = {
  planName: "Premium Monthly",
  status: "Active",
  nextBillingDate: "August 25, 2024",
  price: "$19.00/month",
  paymentMethod: {
    type: "Visa",
    last4: "1234",
    expiry: "12/2026",
  },
};

export default function ManageSubscriptionPage() {

  const handleCancelSubscription = () => {
    // Conceptual: In a real app, call an API to cancel
    console.log("Subscription cancellation initiated (conceptual).");
    toast({
      title: "Subscription Canceled (Conceptually)",
      description: "Your CodeSphere Premium subscription has been canceled.",
    });
    // Potentially redirect or update UI state
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/premium">
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Premium Overview
          </Link>
      </Button>
      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <SettingsIcon className="mr-3 h-6 w-6 text-primary" />
            Manage Your Subscription
          </CardTitle>
          <CardDescription>
            View your current plan, update payment details, or cancel your subscription.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Current Plan Details</h3>
            <div className="p-4 border rounded-md bg-muted/30 space-y-1.5 text-sm">
              <p><strong>Plan:</strong> <span className="text-primary">{currentSubscription.planName}</span></p>
              <p><strong>Status:</strong> <span className="text-green-600 font-medium">{currentSubscription.status}</span></p>
              <p><strong>Next Billing Date:</strong> {currentSubscription.nextBillingDate}</p>
              <p><strong>Price:</strong> {currentSubscription.price}</p>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Payment Information</h3>
            <div className="p-4 border rounded-md bg-muted/30 space-y-2 text-sm">
              <div className="flex items-center">
                <CreditCardIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{currentSubscription.paymentMethod.type} ending in •••• {currentSubscription.paymentMethod.last4}</span>
              </div>
              <p className="ml-7 text-xs text-muted-foreground">Expires: {currentSubscription.paymentMethod.expiry}</p>
              <Button variant="outline" size="sm" className="mt-2" disabled>
                Update Payment Method (Conceptual)
              </Button>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Billing History</h3>
             <div className="p-4 border rounded-md bg-muted/30 text-sm text-muted-foreground">
                <p>Your billing history will appear here. (Conceptual)</p>
                <Button variant="link" className="p-0 h-auto mt-1 text-xs" disabled><ReceiptTextIcon className="mr-1 h-3.5 w-3.5"/>View Invoices</Button>
             </div>
          </section>

        </CardContent>

        <CardFooter className="p-6 border-t">
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <AlertTriangleIcon className="mr-2 h-4 w-4" /> Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will cancel your CodeSphere Premium subscription. You will lose access to premium features at the end of your current billing cycle. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelSubscription} className="bg-destructive hover:bg-destructive/90">
                  Yes, Cancel Subscription
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
