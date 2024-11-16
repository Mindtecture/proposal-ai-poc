export interface Proposal {
  id: string;
  companyName: string;
  industry: string;
  projectScope: string;
  budget: string;
  model: "gpt-3.5-turbo" | "gpt-4";
  content: string;
  createdAt: string;
}

export interface APIResponse {
  proposal?: string;
  error?: string;
  details?: unknown;
}