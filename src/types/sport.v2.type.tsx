// Define a response type that can accept any API type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResType<T = any> {
    message: string;
    status: number;
    metadata: T;
}

export interface TournamentInfoType {
    id: number;
    name: string;
    slug: string;
    logo: string;
    country: string;
    isGroup?: boolean;
}

export interface SeasonItemType {
    id: number;
    year: string;
    slug?: string;
}

export interface SeasonInfoType {
    name: string;
    year: string;
    id: number;
    tournament: string;
    channel: string;
    playlist: string;
    slug: string;
    image: string;
}

export interface TeamType {
    id: number;
    shortName: string;
    logo: string;
}

export interface SpecificType {
    position: number;
    matches: number;
    wins: number;
    losses: number;
    points: number;
    id: number;
    tournament: string;
    team: TeamType;
    scoresFor: number;
    scoresAgainst: number;
}

export interface GroupItemTypes {
    name: string;
    id: number;
    slug: string;
    rows: SpecificType[];
    season: string;
    tournament: string;
}
export interface FiveMatchType {
    [key: string]: number[];
}
export interface StandingGroupType {
    groups: GroupItemTypes[];
    fiveMatch: FiveMatchType;
}

export interface RoundType {
    round: number;
    name?: string;
    slug: string;
}

export interface RoundInfoType {
    currentRound: RoundType;
    rounds: RoundType[];
}

export interface TeamScoreType {
    current: number;
    display: number;
    period1: number;
    period2: number;
    normaltime: number;
    extra1?: number;
    extra2?: number;
    overtime?: number;
    penalties?: number;
}

export interface MatchType {
    home_team_score: TeamScoreType;
    away_team_score: TeamScoreType;
    home_team: TeamType;
    away_team: TeamType;
    id: number;
    round: number;
    status: {
        code: number;
        type: string;
        description: string;
    };
    startTime: number;
    slug: string;
    winnerCode: number;
    highlight: HighlightType;
    season: string;
    tournament: string;
    customId: string;
}

export interface PlayoffType {
    _id: string;
    matches: MatchType[];
    round: number;
    next_round: string;
    playoff_parent: string | null;
}

export interface HighlightType {
    publishedAt: string;
    title: string;
    videoId: string;
}
