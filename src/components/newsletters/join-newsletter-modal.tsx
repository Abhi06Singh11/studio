
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { MailCheckIcon } from "lucide-react";

const joinNewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type JoinNewsletterFormValues = z.infer<typeof joinNewsletterSchema>;

interface JoinNewsletterModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newsletterTitle?: string;
}

export default function JoinNewsletterModal({ 
  isOpen, 
  onOpenChange, 
  newsletterTitle 
}: JoinNewsletterModalProps) {
  const form = useForm<JoinNewsletterFormValues>({
    resolver: zodResolver(joinNewsletterSchema),
    defaultValues: {
      email: "", // Should ideally pre-fill with logged-in user's email
    },
  });

  function onSubmit(data: JoinNewsletterFormValues) {
    console.log("Subscribe to Newsletter:", { newsletterTitle, email: data.email });
    toast({
      title: "Subscribed (Conceptually)!",
      description: `You've subscribed to "${newsletterTitle}" with ${data.email}.`,
    });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MailCheckIcon className="mr-2 h-5 w-5 text-primary" />
            Subscribe to {newsletterTitle || "Newsletter"}
          </DialogTitle>
          <DialogDescription>
            Enter your email to receive updates from this newsletter.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Subscribe</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    