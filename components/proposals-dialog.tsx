"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProposalStore } from "@/lib/store";
import { History } from "lucide-react";
import { ProposalViewer } from "./proposal-viewer";

export function ProposalsDialog() {
  const proposals = useProposalStore((state) => state.proposals);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <History className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Proposal History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full mt-4 pr-4">
          <div className="space-y-6">
            {proposals.length === 0 ? (
              <p className="text-center text-muted-foreground">No proposals yet</p>
            ) : (
              proposals.map((proposal) => (
                <ProposalViewer key={proposal.id} proposal={proposal} />
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}