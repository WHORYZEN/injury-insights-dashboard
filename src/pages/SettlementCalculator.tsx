
import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Calculator, FileText, Share2 } from "lucide-react";

const formSchema = z.object({
  totalSettlement: z.coerce.number().min(1, "Settlement amount is required"),
  totalLiens: z.coerce.number().min(1, "Lien amount is required"),
  attorneyFees: z.coerce.number().min(0, "Attorney fees must be a positive number"),
  caseExpenses: z.coerce.number().min(0, "Case expenses must be a positive number"),
  reductionPercentage: z.coerce.number().min(0).max(100)
});

type FormValues = z.infer<typeof formSchema>;

const SettlementCalculator = () => {
  const [result, setResult] = useState<{
    originalLiens: number;
    reducedLiens: number;
    clientNet: number;
    savings: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalSettlement: 100000,
      totalLiens: 50000,
      attorneyFees: 33333, // 33.333% of settlement
      caseExpenses: 5000,
      reductionPercentage: 40
    }
  });

  const onSubmit = (data: FormValues) => {
    const { totalSettlement, totalLiens, attorneyFees, caseExpenses, reductionPercentage } = data;
    
    // Calculate reduced lien amount
    const reducedLiens = totalLiens * (1 - reductionPercentage / 100);
    
    // Calculate client net with original liens
    const originalClientNet = totalSettlement - totalLiens - attorneyFees - caseExpenses;
    
    // Calculate client net with reduced liens
    const newClientNet = totalSettlement - reducedLiens - attorneyFees - caseExpenses;
    
    // Calculate savings
    const savings = newClientNet - originalClientNet;
    
    setResult({
      originalLiens: totalLiens,
      reducedLiens,
      clientNet: newClientNet,
      savings
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settlement Reduction Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the potential benefit of settlement reductions for your clients.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>
                Enter settlement details to calculate potential reductions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="totalSettlement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Settlement Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalLiens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Liens/Medical Expenses ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attorneyFees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attorney Fees ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="caseExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case Expenses ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reductionPercentage"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Target Reduction Percentage ({value}%)</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={5}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">Calculate</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                Settlement reduction calculation results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Original Liens/Expenses:</p>
                      <p className="text-2xl font-semibold">${result.originalLiens.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Reduced Liens/Expenses:</p>
                      <p className="text-2xl font-semibold text-primary">${Math.round(result.reducedLiens).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Client Net Recovery:</p>
                      <p className="text-3xl font-bold">${Math.round(result.clientNet).toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Client Savings:</p>
                      <p className="text-2xl font-bold text-green-600">${Math.round(result.savings).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          View Detailed Report
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Settlement Reduction Report</DrawerTitle>
                          <DrawerDescription>
                            Detailed breakdown of the settlement reduction calculation
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                          <div className="border-b pb-2">
                            <h3 className="font-medium">Settlement Information</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>Total Settlement:</div>
                              <div className="text-right font-medium">${form.getValues().totalSettlement.toLocaleString()}</div>
                              <div>Attorney Fees:</div>
                              <div className="text-right font-medium">${form.getValues().attorneyFees.toLocaleString()}</div>
                              <div>Case Expenses:</div>
                              <div className="text-right font-medium">${form.getValues().caseExpenses.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="border-b pb-2">
                            <h3 className="font-medium">Reduction Breakdown</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>Original Liens/Expenses:</div>
                              <div className="text-right font-medium">${result.originalLiens.toLocaleString()}</div>
                              <div>Reduction Percentage:</div>
                              <div className="text-right font-medium">{form.getValues().reductionPercentage}%</div>
                              <div>Reduced Liens/Expenses:</div>
                              <div className="text-right font-medium">${Math.round(result.reducedLiens).toLocaleString()}</div>
                              <div>Total Savings:</div>
                              <div className="text-right font-medium text-green-600">${Math.round(result.savings).toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium">Client Distribution</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>Without Reduction:</div>
                              <div className="text-right font-medium">${Math.round(result.clientNet - result.savings).toLocaleString()}</div>
                              <div>With Reduction:</div>
                              <div className="text-right font-medium text-green-600">${Math.round(result.clientNet).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <Button>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share with Client
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Enter settlement details and click Calculate to see potential reduction results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettlementCalculator;
