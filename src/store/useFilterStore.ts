import { create } from "zustand";
interface FilterState {
  sort: "asc" | "desc" | "none";
  timeFilter: "all" | "morning" | "noon" | "evening" | "night" | null;
  selectedCompanies: string[];
  setSort: (sort: "asc" | "desc" | "none") => void;
  setTimeFilter: (
    time: "all" | "morning" | "noon" | "evening" | "night" | null
  ) => void;
  toggleCompany: (company: string) => void;
  setSelectedCompanies: (companies: string[]) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  sort: "none",
  timeFilter: null,
  selectedCompanies: [],
  setSort: (sort) => set({ sort }),
  setTimeFilter: (timeFilter) => set({ timeFilter }),
  toggleCompany: (company) =>
    set((state) => {
      const selectedCompanies = state.selectedCompanies.includes(company)
        ? state.selectedCompanies.filter((c) => c !== company)
        : [...state.selectedCompanies, company];
      return { selectedCompanies };
    }),
  setSelectedCompanies: (selectedCompanies) => set({ selectedCompanies }),
}));
