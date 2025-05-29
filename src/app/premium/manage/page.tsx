
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeftIcon, SettingsIcon, CreditCardIcon, CalendarDaysIcon, AlertTriangleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "@/hooks/use-toast";

const mockCurrentSubscription = {
  planName: "Premium Monthly",
  status: "Active",
  nextBillingDate: "June 25, 2025",
  price: "₹399/month",
  paymentMethod: "Visa ending in •••• 1234",
};


export default function ManageSubscriptionPage() {
  const router = useRouter();

  const handleCancelSubscription = () => {
    console.log("Conceptual: Cancel Subscription Requested");
    toast({
      title: "Subscription Cancellation (Conceptual)",
      description: "Your request to cancel the subscription has been processed.",
      variant: "default" 
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><SettingsIcon className="mr-2 h-5 w-5 text-primary"/>Manage Your Subscription</CardTitle>
          <CardDescription>View your current plan details and manage your subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-md">Current Plan:</h3>
            <p className="text-muted-foreground">{mockCurrentSubscription.planName} ({mockCurrentSubscription.status})</p>
          </div>
          <div>
            <h3 className="font-semibold text-md flex items-center"><CalendarDaysIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Next Billing Date:</h3>
            <p className="text-muted-foreground">{mockCurrentSubscription.nextBillingDate} ({mockCurrentSubscription.price})</p>
          </div>
          <div>
            <h3 className="font-semibold text-md flex items-center"><CreditCardIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Payment Method:</h3>
            <p className="text-muted-foreground">{mockCurrentSubscription.paymentMethod}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-start gap-2 border-t pt-4">
          <Button variant="outline" disabled>Update Payment Method (Conceptual)</Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Cancel Subscription</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center"><AlertTriangleIcon className="mr-2 h-5 w-5 text-destructive"/>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will cancel your CodeSphere Premium subscription at the end of your current billing period. You will lose access to premium features. Are you sure you want to proceed?
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
