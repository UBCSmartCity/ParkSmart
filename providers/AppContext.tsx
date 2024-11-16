import { createContext, Dispatch } from "react";
import { Parkade } from "../types/Garage.type";

export interface States {
  parkades: Parkade[];
}

/* Initialize context values */ //! might need to replace with dynamic fetching later
export const AppContext = createContext<{
  states: States ;
  setStates: Dispatch<React.SetStateAction<States>>;
}>({
  states: {
    parkades: [],
  },

  setStates: () => {},
});
