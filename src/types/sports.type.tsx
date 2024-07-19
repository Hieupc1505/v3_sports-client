export interface LeagueType {
    id: number;
    name: string;
    country: string;
    image: string | undefined; //trên db nó đang là null
    slug: string;
    list: string;
    list2?: string;
    logo: string;
    channelId: string;
    isGroup: boolean;
}

export interface SeasonType {
    name: string;
    year: string;
    id: number;
    league_id: string;
}

export interface SpecificTeamType {
    position: number;
    matches: number;
    wins: number;
    losses: number;
    points: number;
    team_id: TeamType;
    id: number;
    league_id: string | LeagueType;
    scoresFor: number;
    scoresAgainst: number;
}

export interface TeamType {
    id: number;
    name: string;
    shortName: string;
    slug: string;
    logo: string;
    _id: string;
}

export interface HighLightType {
    nation: string;
    publishedAt: number;
    title: string;
    videoId: string;
}

export interface MatchType {
    _id: string;
    id: number;
    round: number;
    home_team_id: TeamType;
    away_team_id: TeamType;
    home_team_score: number | undefined;
    away_team_score: number | undefined;
    league_id: LeagueType;
    season_id: SeasonType | string;
    status: string;
    startTime: number;
    slug: string;
    winner: string | undefined;
    highlight?: HighLightType;
}

export interface DataStandingType {
    name: string;
    id: number;
    league_id: string;
    slug: string;
    rows: SpecificTeamType[];
    season: string;
}

export interface resStandingType {
    success: boolean;
    data: {
        groups: DataStandingType[];
        fiveMatch: {
            [key: string]: number[];
        };
    };
}

export interface roundsType {
    currentRound: number;
    totalRound: number;
}

export interface resMatchReqType {
    success: boolean;
    data: MatchType[];
}

export interface resLeagueReqType {
    success: boolean;
    data: {
        rounds: roundsType;
        seasons: SeasonType[];
    };
}

export interface resListLeagueReqType {
    success: boolean;
    data: LeagueType[];
}

export interface fiveMatchType {
    [key: string]: number[];
}

export interface resHighLightType {
    success: boolean;
    data: string;
}
export interface resKnockoutType {
    success: boolean;
    data: KnockoutType[];
}

export interface KnockoutType {
    _id: string;
    round_name: string;
    match_id: MatchType;
    match_parent: string;
    match_left: number;
    match_right: number;
    round_id: number;
    next_round: string;
}
