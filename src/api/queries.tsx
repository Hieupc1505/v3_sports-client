import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";

import { resMatchReqType } from "~/types/sports.type";

export function useMatch(league: number, season: number, round: number) {
    return useSWR<resMatchReqType>(
        `/api/v1/sports/${league}/matches/${season}/round/${round}`
    );
}
