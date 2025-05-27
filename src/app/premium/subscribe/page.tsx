
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; 
import { toast } from "@/hooks/use-toast";
import { StarIcon, CreditCardIcon, LockIcon, ArrowLeftIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const subscriptionFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  plan: z.enum(["trial", "monthly", "yearly"], {
    required_error: "Please select a plan.",
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export default function SubscriptionFormPage() {
  const router = useRouter();
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      plan: "trial",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      agreeToTerms: false,
    },
  });

  const watchedPlan = form.watch("plan");

  function onSubmit(data: SubscriptionFormValues) {
    console.log("Subscription Data (Conceptual):", data);
    toast({
      title: "Subscription Started!",
      description: `You've successfully started your ${data.plan} plan.`,
    });
    router.push(`/premium/confirmation?plan=${data.plan}`);
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6 lg:px-8">
      <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/premium">
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Premium Overview
          </Link>
      </Button>
      <Card className="shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <StarIcon className="h-12 w-12 text-amber-500 mx-auto mb-3" />
          <CardTitle className="text-3xl font-bold">Upgrade to CodeSphere Premium</CardTitle>
          <CardDescription>Unlock your full potential with our premium features.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6 space-y-6">
              <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              
              <Separator />

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium">Choose Your Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <Label htmlFor="plan-trial" className="flex-1 block cursor-pointer rounded-lg border bg-card p-4 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="trial" id="plan-trial" />
                            <div className="text-sm">
                              <p className="font-semibold">14-Day Free Trial</p>
                              <p className="text-xs text-muted-foreground">Full access, no commitment.</p>
                            </div>
                          </div>
                        </Label>
                        <Label htmlFor="plan-monthly" className="flex-1 block cursor-pointer rounded-lg border bg-card p-4 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="monthly" id="plan-monthly" />
                            <div className="text-sm">
                              <p className="font-semibold">Monthly Plan</p>
                              <p className="text-xs text-muted-foreground">$19/month</p>
                            </div>
                          </div>
                        </Label>
                        <Label htmlFor="plan-yearly" className="flex-1 block cursor-pointer rounded-lg border bg-card p-4 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="yearly" id="plan-yearly" />
                             <div className="text-sm">
                              <p className="font-semibold">Yearly Plan</p>
                              <p className="text-xs text-muted-foreground">$199/year (Save 15%)</p>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchedPlan !== "trial" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <FormLabel className="text-base font-medium flex items-center"><CreditCardIcon className="mr-2 h-5 w-5 text-muted-foreground" />Payment Details</FormLabel>
                    <FormField control={form.control} name="cardNumber" render={({ field }) => ( <FormItem> <FormLabel className="text-xs">Card Number</FormLabel> <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} disabled /> </FormControl> <FormMessage /> </FormItem> )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="expiryDate" render={({ field }) => ( <FormItem> <FormLabel className="text-xs">Expiry Date</FormLabel> <FormControl><Input placeholder="MM/YY" {...field} disabled /> </FormControl> <FormMessage /> </FormItem> )} />
                      <FormField control={form.control} name="cvc" render={({ field }) => ( <FormItem> <FormLabel className="text-xs">CVC</FormLabel> <FormControl><Input placeholder="•••" {...field} disabled /> </FormControl> <FormMessage /> </FormItem> )} />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center"><LockIcon className="mr-1.5 h-3 w-3"/> Secure payment processing (Conceptual).</p>
                  </div>
                </>
              )}
              
              <Separator />

              <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Agree to Terms and Conditions</FormLabel>
                    <FormDescription>By subscribing, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
            </CardContent>
            <CardFooter className="p-6 border-t">
              <Button type="submit" size="lg" className="w-full text-base">
                {watchedPlan === "trial" ? "Start Free Trial" : "Subscribe Now"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

    