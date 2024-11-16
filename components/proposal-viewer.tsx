"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProposalViewerProps {
  proposal: {
    companyName: string;
    industry: string;
    content: string;
    createdAt: string;
  };
}

export function ProposalViewer({ proposal }: ProposalViewerProps) {
  const formattedDate = new Date(proposal.createdAt).toLocaleString();
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Generated Proposal</span>
          <span className="text-sm text-muted-foreground">
            {formattedDate}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[500px] w-full rounded-md border p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h1>{proposal.companyName} - Business Proposal</h1>
            <h2>Industry: {proposal.industry}</h2>
            <div className="mt-4 whitespace-pre-wrap">{proposal.content}</div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}