import { ProposalForm } from "@/components/proposal-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">AI Proposal Generator</CardTitle>
          <CardDescription>
            Create professional business proposals powered by advanced AI models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProposalForm />
        </CardContent>
      </Card>
    </div>
  );
}