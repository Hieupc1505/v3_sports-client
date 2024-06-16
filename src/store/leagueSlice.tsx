import { StateCreator } from "zustand";

import { SeasonType, LeagueType, roundsType } from "~/types/sports.type";
type SelectedSeasonType = Pick<SeasonType, "id" | "name">;
type LeagueState = {
    league?: LeagueType;
    seasons?: SelectedSeasonType[];
    rounds?: roundsType;
    active?: number;
    isLoading: boolean;
};

type LeagueActions = {
    changeLeague: (
        league: LeagueType,
        selected: number,
        seasons: SeasonType[],
        rounds: roundsType
    ) => void;
};

export type LeagueSlice = LeagueState & LeagueActions;

const initialState: LeagueState = {
    isLoading: true,
};

export const createLeagueSlice: StateCreator<
    LeagueSlice,
    [["zustand/immer", never]],
    [],
    LeagueSlice
> = (set) => ({
    ...initialState,
    changeLeague: (
        league: LeagueType,
        selected: number,
        seasons: SeasonType[],
        rounds: roundsType
    ) =>
        set(() => ({
            league: league,
            active: seasons[selected].id,
            seasons: seasons,
            rounds: rounds,
            isLoading: false,
        })),
    changeStatusLoading: (status?: boolean) =>
        set((state) => ({ isLoading: status ? status : !state.isLoading })),
});
