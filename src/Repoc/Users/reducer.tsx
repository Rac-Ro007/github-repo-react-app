import { createSlice } from "@reduxjs/toolkit";

// Intital State
const initialState:any = {
  collectionsOwned: [],
  collectionsStarred: [],
  collectionsSavedBy: [],
  collection: {   
    collectionName: "UI/UX Design Inspirations",
    collectionTags: ["ui/ux design", "user experience", "user interface"],
    collectionType: "Public",
    githubRepos: [],
    ownerName: "",
    collaborators: [],
    savedBy: [] 
  },
};


const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  // Possible actions on our reducer
  reducers: {
    setCollectionsOwned: (state, action) => {
      state.collectionsOwned = action.payload;
    },

    setCollectionsStarred: (state, action) => {
      state.collectionsStarred = action.payload;
    },

    setCollectionsSavedBy: (state, action) => {
      state.collectionsSavedBy = action.payload;
    },

    addCollection: (state, action) => {
      state.collectionsOwned = [action.payload, ...state.Collections];
    },


    deleteCollection: (state, action) => {
      state.collections = state.collections.filter(
        (module:any) => module._id !== action.payload
      );
    },

    updateCollection: (state:any, action) => {
      state.collectionsOwned = state.collections.map((collection:any) => {
        if (collection._id === action.payload._id) {
          return action.payload;
        } else {
          return collection;
        }
      });
    },
    
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
  },
});


export const { addCollection, deleteCollection,
  updateCollection, setCollection, setCollectionsOwned, setCollectionsStarred, setCollectionsSavedBy } = collectionsSlice.actions;
export default collectionsSlice.reducer;