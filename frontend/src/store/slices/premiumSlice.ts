import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type MembershipType = "silver" | "gold" | null;

interface PremiumState {
  isPremium: boolean;
  membershipType: MembershipType;
}

const initialState: PremiumState = {
  isPremium: false,
  membershipType: null,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    setPremiumStatus: (
      state,
      action: PayloadAction<{
        isPremium: boolean;
        membershipType: MembershipType;
      }>
    ) => {
      state.isPremium = action.payload.isPremium;
      state.membershipType = action.payload.membershipType;
    },
    clearPremiumStatus: (state) => {
      state.isPremium = false;
      state.membershipType = null;
    },
  },
});

export const { setPremiumStatus, clearPremiumStatus } = premiumSlice.actions;
export default premiumSlice.reducer;
