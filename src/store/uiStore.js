import { create } from "zustand";

export const useUiStore = create((set) => ({
  isEvidenceOpen: false,
  isPatientFormOpen: false,
  isEmergencyOverlay: false,
  emergencyData: null,
  language: "en",
  sidebarCollapsed: false,
  toggleEvidence: () =>
    set((state) => ({ isEvidenceOpen: !state.isEvidenceOpen })),
  togglePatientForm: () =>
    set((state) => ({ isPatientFormOpen: !state.isPatientFormOpen })),
  showEmergency: (data) =>
    set({ isEmergencyOverlay: true, emergencyData: data }),
  dismissEmergency: () =>
    set({ isEmergencyOverlay: false, emergencyData: null }),
  setLanguage: (language) => set({ language }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
}));
