import { configureStore } from "@reduxjs/toolkit";
// import modulesReducer from "../Courses/Modules/reducer";
// import assignmentsReducer from "../Courses/Assignments/reducer";

export interface RepocState {
    
}

// export interface KanbasState {
//   // Define the type: reducer is of / can accept
//   modulesReducer: {
//     modules: any[];
//     module: any;
//   };
//   assignmentsReducer: {
//     assignments: any[];
//     assignment: any;
//   };
// }

// Pass the reducer to the store.
const store = configureStore({
  reducer: {
  }
});


export default store;