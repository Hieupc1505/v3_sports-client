import useSWR from "swr";
import { logger } from "~/utils/logger";
import { resMatchReqType, resLeagueReqType } from "~/types/sports.type";
import {
    ResType,
    TournamentInfoType,
    SeasonInfoType,
    SeasonItemType,
    RoundInfoType,
    MatchType,
    PlayoffType,
    GroupItemTypes,
    FiveMatchItemType,
} from "~/types/sport.v2.type";
import { axiosInstance } from "~/services/fetcher";

const route = {
    listTournament: `/api/v1/football/list`,
    matchesByRound: (tournament: number, season: number, round: number) =>
        `/api/v1/football/${tournament}/season/${season}/match/round/${round}`,
    tournamentInfo: (id: number) => `/api/v1/tournament/${id}`,
    standings: (tournament?: number, season?: number) =>
        `/api/v1/football/${tournament}/season/${season}/standings`,
    seasonInfo: (tournament: number, season?: number) =>
        `/api/v1/seasons?tournament=${tournament}&season=${season}`,
    listSeason: (tournament: number) =>
        `/api/v1/seasons/list?tournament=${tournament}`,
    rounds: (tournament: number, season: number) =>
        `/api/v1/football/${tournament}/season/${season}/rounds`,
    search: () => `/api/v1/football/search`,
};

export function useListLeague() {
    return useSWR<ResType<TournamentInfoType[]>>(route.listTournament, {
        use: [logger],
    });
}
export function useMatch(tournament: number, season: number, round: number) {
    return useSWR<resMatchReqType>(
        route.matchesByRound(tournament, season, round)
    );
}

export function useLeague(id: number) {
    return useSWR<resLeagueReqType>(route.tournamentInfo(id));
}

export function useStanding(tournament?: number, season?: number) {
    return useSWR<ResType<GroupItemTypes[]>>(
        route.standings(tournament, season)
    );
}

const sportApi = {
    rounds: async (tournament: number, season: number) => {
        return axiosInstance
            .get<ResType<RoundInfoType>>(route.rounds(tournament, season))
            .then((res) => res.data);
    },

    listSeason: async (tournament: number) => {
        return axiosInstance
            .get<ResType<SeasonItemType[]>>(route.listSeason(tournament))
            .then((res) => res.data);
    },

    getSeasonInfo: async (tournament: number, season?: number) => {
        return axiosInstance
            .get<ResType<SeasonInfoType>>(route.seasonInfo(tournament, season))
            .then((res) => res.data);
    },
    getMatchByRound: async (
        tournament: number,
        season: number,
        round: number
    ) => {
        return axiosInstance
            .get<ResType<MatchType[]>>(
                route.matchesByRound(tournament, season, round)
            )
            .then((res) => res.data);
    },
    getHighLight: async (
        season: number,
        q: string,
        pub: number,
        id: number
    ) => {
        return axiosInstance
            .post<ResType<string>>(route.search(), {
                season,
                query: q,
                t: pub,
                matchid: id,
            })
            .then((res) => res.data);
    },
    getKnockoutMatch: async (leagueId: number, seasonId: number) => {
        return axiosInstance.get<ResType<PlayoffType[]>>(
            `/api/v1/football/${leagueId}/season/${seasonId}/playoff/v2`
        );
    },
    getFiveMatchByTeam: async (
        leagueId: number,
        seasonId: number,
        team: number
    ) => {
        return axiosInstance.get<ResType<FiveMatchItemType[]>>(
            `/api/v1/football/${leagueId}/season/${seasonId}/match/recent/${team}`
        );
    },
    getMatchInfoById: async (id: string) => {
        const { data } = await axiosInstance.get<resMatchReqType>(
            `/api/v1/sports/match/${id}`
        );
        if (data.success) return data.data;
        return null;
    },
};

export default sportApi;
