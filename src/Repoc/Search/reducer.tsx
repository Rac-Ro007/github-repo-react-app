import { createSlice } from "@reduxjs/toolkit";

// Intital State
const initialState:any = {
  searchGithubData: []
};


const searchGithubSlice = createSlice({
  name: "searchGithub",
  initialState,
  // Possible actions on our reducer
  reducers: {
    setSearchGithubData: (state, action) => {
      console.log("Reducer save", action.payload);
      state.searchGithubData = action.payload;
    },
  },
});


export const { setSearchGithubData } = searchGithubSlice.actions;
export default searchGithubSlice.reducer;