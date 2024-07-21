import { StateCreator } from "zustand";

import {
    TournamentInfoType,
    SeasonInfoType,
    SeasonItemType,
    RoundInfoType,
} from "~/types/sport.v2.type";

type LeagueState = {
    league?: TournamentInfoType;
    seasons?: SeasonItemType[];
    rounds?: RoundInfoType;
    season?: SeasonInfoType;
    isLoading: boolean;
    isGroup?: boolean;
};

type LeagueActions = {
    changeLeague: (
        league: TournamentInfoType,
        season: SeasonInfoType,
        seasons: SeasonItemType[],
        rounds: RoundInfoType
    ) => void;
    changeStatusLoading: (status?: boolean) => void;
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
        league: TournamentInfoType,
        season: SeasonInfoType,
        seasons: SeasonItemType[],
        rounds: RoundInfoType
    ) =>
        set(() => ({
            league: league,
            season: season,
            seasons: seasons,
            rounds: rounds,
            isLoading: false,
        })),
    changeStatusLoading: (status?: boolean) =>
        set((state) => ({ isLoading: status ? status : !state.isLoading })),
});
