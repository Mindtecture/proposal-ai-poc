import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";

const proposalTemplate = `
Create a detailed business proposal for {companyName} in the {industry} industry.

Project Scope:
{projectScope}

Budget Range:
{budget}

Please create a professional business proposal that includes:
1. Executive Summary
2. Project Overview
3. Proposed Solution
4. Timeline and Milestones
5. Budget Breakdown
6. Expected Outcomes
7. Next Steps

Use a professional tone and format the proposal appropriately.
`;

export const generateProposal = async ({
  companyName,
  industry,
  projectScope,
  budget,
  model,
}: {
  companyName: string;
  industry: string;
  projectScope: string;
  budget: string;
  model: "gpt-3.5-turbo" | "gpt-4";
}) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    const chat = new ChatOpenAI({
      modelName: model,
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = new PromptTemplate({
      template: proposalTemplate,
      inputVariables: ["companyName", "industry", "projectScope", "budget"],
    });

    const formattedPrompt = await prompt.format({
      companyName,
      industry,
      projectScope,
      budget,
    });

    const response = await chat.invoke(formattedPrompt);
    
    if (!response.content) {
      throw new Error("No response content received from OpenAI");
    }

    return response.content;
  } catch (error) {
    if (error instanceof Error) {
      // Preserve the original error message
      throw error;
    }
    // Convert unknown errors to Error objects
    throw new Error("Failed to generate proposal: Unknown error");
  }
};