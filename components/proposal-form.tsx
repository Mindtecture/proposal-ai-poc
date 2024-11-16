"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProposalStore } from "@/lib/store";
import { ProposalViewer } from "./proposal-viewer";
import type { APIResponse, Proposal } from "@/lib/types";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  projectScope: z.string().min(10, "Project scope must be at least 10 characters"),
  budget: z.string().min(1, "Budget information is required").max(200, "Budget description is too long"),
  model: z.enum(["gpt-3.5-turbo", "gpt-4"]),
});

type FormValues = z.infer<typeof formSchema>;

export function ProposalForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const { toast } = useToast();
  const addProposal = useProposalStore((state) => state.addProposal);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      projectScope: "",
      budget: "",
      model: "gpt-3.5-turbo",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      console.log('Submitting form with values:', values);
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      console.log('API Response:', data);

      if (!data.proposal) {
        throw new Error("No proposal content received");
      }

      const proposal: Proposal = {
        id: crypto.randomUUID(),
        ...values,
        content: data.proposal,
        createdAt: new Date().toISOString(),
      };

      setCurrentProposal(proposal);
      addProposal(proposal);
      
      toast({
        title: "Success",
        description: "Your proposal has been successfully generated.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Enter industry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectScope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Scope</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project scope and requirements"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter budget details (e.g., '$1,000 - $5,000', 'Calculate based on project scope items', 'Flexible budget depending on selected features')"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Model</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Proposal...
              </>
            ) : (
              "Generate Proposal"
            )}
          </Button>
        </form>
      </Form>

      {currentProposal && <ProposalViewer proposal={currentProposal} />}
    </div>
  );
}