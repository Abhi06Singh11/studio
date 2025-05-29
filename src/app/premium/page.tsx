"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, CrownIcon, XCircleIcon, SparklesIcon, BriefcaseIcon, ListChecksIcon, FolderKanbanIcon, UsersIcon, ArrowLeftIcon } from "lucide-react";
import ModuleUpgradeModal from "@/components/premium/module-upgrade-modal";
import BundleUpgradeModal from "@/components/premium/bundle-upgrade-modal";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; // Added for back button

interface SubscriptionPlan {
  id: string;
  name: string;
  moduleKey: "workplace" | "jobs_projects" | "challenges" | "bundle";
  icon?: React.ElementType;
  freeFeatures: string[];
  premiumFeatures: string[];
  monthlyPrice: string;
  annualPrice: string;
  isBundle?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: "workplace",
    name: "Workplace Premium",
    moduleKey: "workplace",
    icon: FolderKanbanIcon,
    freeFeatures: ["Join/Create Channels", "Direct Messages", "Basic File Sharing"],
    premiumFeatures: ["Advanced Activity Logs", "Team Analytics", "Export Chat Logs", "Priority Support"],
    monthlyPrice: "₹99",
    annualPrice: "₹999",
  },
  {
    id: "jobs_projects",
    name: "Jobs/Projects Premium",
    moduleKey: "jobs_projects",
    icon: BriefcaseIcon,
    freeFeatures: ["Post Basic Jobs/Projects", "Apply to Postings", "Save Postings"],
    premiumFeatures: ["Boost Post Visibility", "Recruiter Insights", "Track Who Viewed Your Post", "Advanced Search Filters"],
    monthlyPrice: "₹199",
    annualPrice: "₹1999",
  },
  {
    id: "challenges",
    name: "Challenges Premium",
    moduleKey: "challenges",
    icon: ListChecksIcon,
    freeFeatures: ["Access Basic Problems", "View Leaderboard", "Save Challenges"],
    premiumFeatures: ["Unlock Expert Problems", "Company-Specific Sets", "AI Code Review (Conceptual)", "Personalized Analytics"],
    monthlyPrice: "₹149",
    annualPrice: "₹1499",
  },
  {
    id: "bundle",
    name: "CodeSphere Premium Bundle",
    moduleKey: "bundle",
    icon: SparklesIcon,
    freeFeatures: ["Basic Access to All Modules"],
    premiumFeatures: ["All Premium Features Unlocked", "Advanced Collaboration (Workplace)", "Smart Hiring & Projects (Jobs/Projects)", "Expert Coding Problems + Analytics (Challenges)", "Bundle Discount"],
    monthlyPrice: "₹399",
    annualPrice: "₹3999",
    isBundle: true,
  },
];

interface MockSubscription {
  workplace: boolean;
  jobs_projects: boolean;
  challenges: boolean;
  bundle: boolean;
  activeUntil: string | null;
}

export default function PremiumPage() {
  const router = useRouter(); // Added for back button
  const [isModuleModalOpen, setIsModuleModalOpen] = React.useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<SubscriptionPlan | null>(null);

  const [demoGlobalSubscriptionActive, setDemoGlobalSubscriptionActive] = React.useState(false);

  React.useEffect(() => {
    const storedStatus = localStorage.getItem('demoGlobalSubscriptionActive');
    if (storedStatus) {
      setDemoGlobalSubscriptionActive(storedStatus === 'true');
    }
  }, []);

  const handleGlobalSubscriptionToggle = (isActive: boolean) => {
    setDemoGlobalSubscriptionActive(isActive);
    localStorage.setItem('demoGlobalSubscriptionActive', isActive.toString());
    toast({
      title: `Demo Global Subscription ${isActive ? 'Activated' : 'Deactivated'}`,
      description: `Premium features will now ${isActive ? '' : 'not '}be shown as unlocked.`,
    });
  };

  const [mockSubscription, setMockSubscription] = React.useState<MockSubscription>({
    workplace: false,
    jobs_projects: false,
    challenges: false,
    bundle: false,
    activeUntil: null,
  });

  const handleUpgradeClick = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    if (plan.isBundle) {
      setIsBundleModalOpen(true);
    } else {
      setIsModuleModalOpen(true);
    }
  };

  const handleSubscriptionUpdate = (moduleKey: "workplace" | "jobs_projects" | "challenges" | "bundle") => {
    const newExpiryDate = new Date();
    newExpiryDate.setMonth(newExpiryDate.getMonth() + 1); 

    setMockSubscription(prev => {
      const updatedSub = { ...prev, activeUntil: newExpiryDate.toDateString() };
      if (moduleKey === 'bundle') {
        return {
          workplace: true,
          jobs_projects: true,
          challenges: true,
          bundle: true,
          activeUntil: newExpiryDate.toDateString(),
        };
      } else {
        return { ...updatedSub, [moduleKey]: true };
      }
    });

    toast({
      title: "Subscription Activated (Locally)!",
      description: `You've conceptually upgraded to ${selectedPlan?.name || moduleKey}.`,
    });
    setIsModuleModalOpen(false);
    setIsBundleModalOpen(false);
  };

  const isSubscribedTo = (moduleKey: "workplace" | "jobs_projects" | "challenges" | "bundle"): boolean => {
    if (mockSubscription.bundle) return true;
    return mockSubscription[moduleKey];
  };

  return (
    <div className="space-y-10">
       <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="shadow-xl rounded-xl text-center bg-gradient-to-br from-primary/80 to-accent/70 text-primary-foreground">
        <CardHeader className="p-8">
          <CrownIcon className="mx-auto h-16 w-16 mb-4 opacity-90" />
          <CardTitle className="text-4xl font-bold tracking-tight">
            Achieve Your Goals Faster with CodeSphere Premium
          </CardTitle>
          <CardDescription className="text-lg mt-2 text-primary-foreground/80 max-w-2xl mx-auto">
            Unlock exclusive content, advanced features, priority support, and powerful analytics to boost your productivity and connections.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left text-sm">
            {["Unlock exclusive content & challenges", "Priority support from our team", "Advanced profile & post analytics", "Boost your job/project visibility", "Access recruiter insights", "Enhanced networking tools"].map(benefit => (
              <li key={benefit} className="flex items-center gap-2">
                <CheckCircle2Icon className="h-5 w-5 text-green-300" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Demo Global Subscription Toggle</CardTitle>
          <CardDescription>This toggle simulates a global subscription status for demonstration purposes across the app. It uses localStorage.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-2">
          <Switch
            id="global-subscription-toggle"
            checked={demoGlobalSubscriptionActive}
            onCheckedChange={handleGlobalSubscriptionToggle}
          />
          <Label htmlFor="global-subscription-toggle" className="font-medium">
            {demoGlobalSubscriptionActive ? "Global Premium Active (Demo)" : "Global Premium Inactive (Demo)"}
          </Label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {mockSubscription.bundle ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-semibold text-green-700 flex items-center"><SparklesIcon className="mr-2 h-5 w-5"/>CodeSphere Premium Bundle</h3>
              <p className="text-sm text-green-600">All premium features unlocked. Active until: {mockSubscription.activeUntil || "N/A"}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {mockSubscription.workplace && <p className="text-sm"><CheckCircle2Icon className="inline h-4 w-4 mr-1 text-green-500"/>Workplace Premium active.</p>}
              {mockSubscription.jobs_projects && <p className="text-sm"><CheckCircle2Icon className="inline h-4 w-4 mr-1 text-green-500"/>Jobs/Projects Premium active.</p>}
              {mockSubscription.challenges && <p className="text-sm"><CheckCircle2Icon className="inline h-4 w-4 mr-1 text-green-500"/>Challenges Premium active.</p>}
              {(!mockSubscription.workplace && !mockSubscription.jobs_projects && !mockSubscription.challenges && !mockSubscription.bundle) && 
                <p className="text-muted-foreground">You are currently on the Free plan.</p>
              }
              {mockSubscription.activeUntil && (mockSubscription.workplace || mockSubscription.jobs_projects || mockSubscription.challenges) && !mockSubscription.bundle &&
                <p className="text-xs text-muted-foreground">Current subscriptions active until: {mockSubscription.activeUntil}</p>
              }
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Subscription Plans</CardTitle>
          <CardDescription>Choose the plan that best suits your needs.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Module</TableHead>
                <TableHead>Free Features</TableHead>
                <TableHead>Premium Features</TableHead>
                <TableHead className="text-right">Pricing</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id} className={isSubscribedTo(plan.moduleKey) ? "bg-green-50 hover:bg-green-100/50" : ""}>
                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-2">
                      {plan.icon && <plan.icon className="h-5 w-5 text-primary" />}
                      {plan.name}
                    </div>
                    {isSubscribedTo(plan.moduleKey) && <Badge variant="default" className="mt-1 text-xs bg-green-600 hover:bg-green-700">Subscribed</Badge>}
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-xs space-y-0.5">
                      {plan.freeFeatures.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-primary/90">
                      {plan.premiumFeatures.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    <p>{plan.monthlyPrice}/month</p>
                    <p>{plan.annualPrice}/year</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      onClick={() => handleUpgradeClick(plan)}
                      disabled={isSubscribedTo(plan.moduleKey)}
                    >
                      {isSubscribedTo(plan.moduleKey) ? "Current Plan" : (plan.isBundle ? "Upgrade All" : "Upgrade")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPlan && !selectedPlan.isBundle && (
        <ModuleUpgradeModal
          isOpen={isModuleModalOpen}
          onOpenChange={setIsModuleModalOpen}
          moduleName={selectedPlan.name}
          featuresList={selectedPlan.premiumFeatures}
          monthlyPrice={selectedPlan.monthlyPrice}
          annualPrice={selectedPlan.annualPrice}
          onUpgrade={() => handleSubscriptionUpdate(selectedPlan.moduleKey)}
        />
      )}
      {selectedPlan && selectedPlan.isBundle && (
        <BundleUpgradeModal
          isOpen={isBundleModalOpen}
          onOpenChange={setIsBundleModalOpen}
          onUpgrade={() => handleSubscriptionUpdate('bundle')}
          monthlyPrice={selectedPlan.monthlyPrice}
          annualPrice={selectedPlan.annualPrice}
          featuresList={selectedPlan.premiumFeatures}
        />
      )}
    </div>
  );
}
