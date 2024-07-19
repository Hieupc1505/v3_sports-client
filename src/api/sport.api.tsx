import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";
import { logger } from "~/utils/logger";
import {
    resMatchReqType,
    resLeagueReqType,
    resListLeagueReqType,
    resStandingType,
    resHighLightType,
    resKnockoutType,
} from "~/types/sports.type";
import { axiosInstance } from "~/services/fetcher";

export function useListLeague() {
    return useSWR<resListLeagueReqType>(`/api/v1/sports/info`, {
        use: [logger],
    });
}
export function useMatch(league: number, season: number, round: number) {
    return useSWR<resMatchReqType>(
        `/api/v1/sports/${league}/matches/${season}/round/${round}`
    );
}

export function useLeague(id: number) {
    return useSWR<resLeagueReqType>(`/api/v1/sports/league/${id}`);
}
export function useStanding(
    league: number | undefined,
    season: number | undefined
) {
    return useSWR<resStandingType>(
        `/api/v1/sports/${league}/standings/${season}`
    );
}

const sportApi = {
    getSeason: async (id: number, season?: number) => {
        return axiosInstance
            .get<resLeagueReqType>(
                `/api/v1/sports/seasons/${id}${
                    season ? `?season=${season}` : ""
                }`
            )
            .then((res) => res.data);
    },
    getMatchByRound: async (league: number, season: number, round: number) => {
        return axiosInstance
            .get<resMatchReqType>(
                `/api/v1/sports/${league}/matches/${season}/round/${round}`
            )
            .then((res) => res.data);
    },
    getHighLight: async (
        league: number,
        q: string,
        pub: number,
        id: number
    ) => {
        return axiosInstance
            .post<resHighLightType>(`/api/v1/sports/search/${league}`, {
                q,
                pub,
                id,
            })
            .then((res) => res.data);
    },
    getKnockoutMatch: async (
        leagueId: number,
        seasonId: number,
        parentknockoutId?: string
    ) => {
        return axiosInstance.get<resKnockoutType>(
            `/api/v1/sports/knockout/cup?leagueId=${leagueId}&seasonId=${seasonId}${
                parentknockoutId ? `parentKnockoutId=${parentknockoutId}` : ""
            }`
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
