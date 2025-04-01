import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TermsState {
  hasAgreedToRequiredTerms: boolean;
  hasAgreedToMarketingTerms: boolean;
  termsAgreedAt: string | null;
  
  agreeToTerms: (required: boolean, marketing: boolean) => void;
  resetTermsAgreement: () => void;
}

const useTermsStore = create<TermsState>()(
  persist(
    (set) => ({
      hasAgreedToRequiredTerms: false,
      hasAgreedToMarketingTerms: false,
      termsAgreedAt: null,
      
      agreeToTerms: (required, marketing) => set({
        hasAgreedToRequiredTerms: required,
        hasAgreedToMarketingTerms: marketing,
        termsAgreedAt: required ? new Date().toISOString() : null,
      }),
      
      resetTermsAgreement: () => set({
        hasAgreedToRequiredTerms: false,
        hasAgreedToMarketingTerms: false,
        termsAgreedAt: null,
      }),
    }),
    {
      name: "pic-score-terms-storage",
    }
  )
);

export default useTermsStore;