import { ModeToggle } from "@/components/mode-toggle";
import { ProposalsDialog } from "@/components/proposals-dialog";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="text-xl font-bold">ProposalAI</span>
        </div>
        <div className="flex items-center space-x-4">
          <ProposalsDialog />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}