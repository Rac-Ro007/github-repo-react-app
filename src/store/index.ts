import { configureStore } from "@reduxjs/toolkit";
// import modulesReducer from "../Courses/Modules/reducer";
import collectionsReducer from "../Repoc/Users/reducer";
import searchGithubReducer from "../Repoc/Search/reducer";

export interface RepocState {
    // Define the type: reducer is of / can accept
  collectionsReducer: {
    collectionsOwned: any[];
    collectionsStarred: any[],
    collectionsSavedBy: any[],
    collection: any;
  };

  searchGithubReducer: {
    searchGithubData: any[];
  }
}

// Pass the reducer to the store.
const store = configureStore({
  reducer: {
    collectionsReducer,
    searchGithubReducer
  }
});


export default store;