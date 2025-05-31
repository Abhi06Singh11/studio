
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PlusCircleIcon, CalendarIcon, UploadCloudIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const challengeCategories = ["Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "System Design", "Frontend", "Backend", "AI/ML", "Data Science", "Security", "Other"] as const;
const challengeDifficulties = ["Easy", "Medium", "Hard", "Expert"] as const;
const challengeVisibilities = ["Public", "Private"] as const;

const createChallengeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(150),
  description: z.string().min(20, "Description must be at least 20 characters.").max(5000),
  category: z.enum(challengeCategories, { required_error: "Please select a category." }),
  difficulty: z.enum(challengeDifficulties, { required_error: "Please select a difficulty." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  visibility: z.enum(challengeVisibilities, { required_error: "Please select visibility." }),
  coverImageUrl: z.string().url("Invalid URL.").optional().or(z.literal('')),
  attachmentsUrl: z.string().url("Invalid URL.").optional().or(z.literal('')),
}).refine(data => data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"],
});

type CreateChallengeFormValues = z.infer<typeof createChallengeSchema>;

interface CreateChallengeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onChallengeCreated?: (data: CreateChallengeFormValues) => void;
}

export default function CreateChallengeModal({
  isOpen,
  onOpenChange,
  onChallengeCreated,
}: CreateChallengeModalProps) {
  const form = useForm<CreateChallengeFormValues>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      difficulty: undefined,
      startDate: undefined,
      endDate: undefined,
      visibility: "Public",
      coverImageUrl: "",
      attachmentsUrl: "",
    },
  });

  function onSubmit(data: CreateChallengeFormValues) {
    console.log("New Challenge Data:", data);
    toast({
      title: "Challenge Created (Conceptually)!",
      description: `Challenge "${data.title}" has been set up.`,
    });
    if (onChallengeCreated) {
      onChallengeCreated(data);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <PlusCircleIcon className="mr-2 h-5 w-5 text-primary" />
            Create New Challenge
          </DialogTitle>
          <DialogDescription>
            Define the details for your new coding challenge.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ScrollArea className="h-[65vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Challenge Title</FormLabel> <FormControl><Input placeholder="e.g., Two Sum Problem Advanced" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="Detailed problem statement, constraints, examples..." className="min-h-[120px] resize-y" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => ( <FormItem> <FormLabel>Category/Topic</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl> <SelectContent> {challengeCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                  <FormField control={form.control} name="difficulty" render={({ field }) => ( <FormItem> <FormLabel>Difficulty</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger></FormControl> <SelectContent> {challengeDifficulties.map(diff => <SelectItem key={diff} value={diff}>{diff}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !(field.value instanceof Date) && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>
                                  {field.value instanceof Date ? format(field.value, "PPP") : "Pick a date"}
                                </span>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value instanceof Date ? field.value : undefined}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !(field.value instanceof Date) && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>
                                  {field.value instanceof Date ? format(field.value, "PPP") : "Pick a date"}
                                </span>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value instanceof Date ? field.value : undefined}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const startDate = form.getValues("startDate");
                                return startDate instanceof Date ? date < startDate : false;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Visibility</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex items-center space-x-3"
                        >
                          <Label htmlFor="vis_public_challenge_modal" className="flex items-center space-x-2 space-y-0 font-normal cursor-pointer">
                            <RadioGroupItem value="Public" id="vis_public_challenge_modal" />
                            <span>Public</span>
                          </Label>
                          <Label htmlFor="vis_private_challenge_modal" className="flex items-center space-x-2 space-y-0 font-normal cursor-pointer">
                            <RadioGroupItem value="Private" id="vis_private_challenge_modal" />
                            <span>Private</span>
                          </Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="coverImageUrl" render={({ field }) => ( <FormItem> <FormLabel>Cover Image URL (Optional)</FormLabel> <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="attachmentsUrl" render={({ field }) => ( <FormItem> <FormLabel>Attachments URL (Optional, e.g., PDF spec)</FormLabel> <FormControl><Input placeholder="https://example.com/spec.pdf" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => { form.reset(); onOpenChange(false); }}> Cancel </Button>
              <Button type="submit">Create Challenge</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    

    
