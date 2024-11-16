import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Proposal } from "@/lib/types";

interface ProposalStore {
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
  removeProposal: (id: string) => void;
}

export const useProposalStore = create<ProposalStore>()(
  persist(
    (set) => ({
      proposals: [],
      addProposal: (proposal) =>
        set((state) => ({
          proposals: [proposal, ...state.proposals],
        })),
      removeProposal: (id) =>
        set((state) => ({
          proposals: state.proposals.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "proposal-storage",
    }
  )
);