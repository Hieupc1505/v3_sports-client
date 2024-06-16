import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// import { createMatchSlice } from "~/store/matchSlice";
import { Store } from "~/types/store.type";

import { createLeagueSlice } from "~/store/leagueSlice";

// import { createCartSlice } from './cart-slice';

export const useStore = create<Store>()(
    devtools(
        persist(
            subscribeWithSelector(
                immer((...a) => ({
                    ...createLeagueSlice(...a),
                }))
            ),
            {
                name: "local-storage",
            }
        )
    )
);
