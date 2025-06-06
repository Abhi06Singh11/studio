
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
// Removed Label import as FormLabel is used from form.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeftIcon, CreditCardIcon, CalendarIcon, LockIcon } from "lucide-react";

const subscriptionFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  plan: z.enum(["trial", "monthly", "yearly"], {
    required_error: "You need to select a subscription plan.",
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  agreeToTerms: z.boolean().refine(value => value === true, {
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
  const isPaidPlan = watchedPlan === "monthly" || watchedPlan === "yearly";

  function onSubmit(data: SubscriptionFormValues) {
    console.log("Subscription Data (Conceptual):", data);
    toast({
      title: "Subscription Initiated (Conceptual)",
      description: "Your subscription process has started.",
    });
    router.push(`/premium/confirmation?plan=${data.plan}`);
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Subscribe to CodeSphere Premium</CardTitle>
          <CardDescription>Unlock all premium features and accelerate your journey.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="Your Full Name" {...field} /></FormControl> <FormMessage /> </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem>
              )} />

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose Your Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <FormItem className="flex-1">
                          <FormControl>
                            <RadioGroupItem value="trial" id="plan-trial" className="sr-only" />
                          </FormControl>
                          <FormLabel
                            htmlFor="plan-trial"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                          >
                            <h3 className="text-lg font-semibold">Free Trial</h3>
                            <p className="text-sm text-muted-foreground">7 Days Free</p>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex-1">
                           <FormControl>
                            <RadioGroupItem value="monthly" id="plan-monthly" className="sr-only" />
                           </FormControl>
                          <FormLabel
                            htmlFor="plan-monthly"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                          >
                            <h3 className="text-lg font-semibold">Monthly</h3>
                            <p className="text-sm text-muted-foreground">₹399/month</p>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex-1">
                          <FormControl>
                            <RadioGroupItem value="yearly" id="plan-yearly" className="sr-only" />
                          </FormControl>
                          <FormLabel
                            htmlFor="plan-yearly"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                          >
                            <h3 className="text-lg font-semibold">Yearly</h3>
                            <p className="text-sm text-muted-foreground">₹3999/year (Save ~15%)</p>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {isPaidPlan && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-md font-semibold text-muted-foreground">Payment Details (Conceptual)</h3>
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem> <FormLabel className="flex items-center"><CreditCardIcon className="mr-2 h-4 w-4"/>Card Number</FormLabel> <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} disabled /></FormControl> <FormMessage /> </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="expiryDate" render={({ field }) => (
                      <FormItem> <FormLabel className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4"/>Expiry Date</FormLabel> <FormControl><Input placeholder="MM/YY" {...field} disabled /></FormControl> <FormMessage /> </FormItem>
                    )} />
                    <FormField control={form.control} name="cvc" render={({ field }) => (
                      <FormItem> <FormLabel className="flex items-center"><LockIcon className="mr-2 h-4 w-4"/>CVC</FormLabel> <FormControl><Input placeholder="•••" {...field} disabled /></FormControl> <FormMessage /> </FormItem>
                    )} />
                  </div>
                  <p className="text-xs text-muted-foreground">Payment processing is conceptual for this demo.</p>
                </div>
              )}

              <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Agree to Terms and Conditions</FormLabel>
                    <FormDescription>
                      By subscribing, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {watchedPlan === "trial" ? "Start Free Trial" : "Subscribe Now"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

