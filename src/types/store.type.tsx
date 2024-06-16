import { MatchSlice } from "~/store/matchSlice";
// import { UserSlice } from '@/store/user-slice';
import { LeagueSlice } from "~/store/leagueSlice";

export type Store = MatchSlice & LeagueSlice;
