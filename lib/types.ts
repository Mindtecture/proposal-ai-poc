export interface Proposal {
  id: string;
  companyName: string;
  industry: string;
  projectScope: string;
  budget: string;
  model: "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo"
  | "gpt-4o"
  | "gpt-4o-mini"
  | "o1"
  | "o1-mini";
  content: string;
  createdAt: string;
}

export interface APIResponse {
  proposal?: string;
  error?: string;
  details?: unknown;
}