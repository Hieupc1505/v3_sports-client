import { useEffect, useState, memo } from "react";
import { MatchType, TeamType, TeamScoreType } from "~/types/sport.v2.type";
import { Avatar, Box, styled, Typography } from "@mui/material";

const BranchMatchItem = ({ matches }: { matches: MatchType[] }) => {
    const [homeTeam, setHomeTeam] = useState<TeamType>();
    const [awayTeam, setAwayTeam] = useState<TeamType>();
    const [homeTeamScore, setHomeTeamScore] = useState<TeamScoreType>();
    const [awayTeamScore, setAwayTeamScore] = useState<TeamScoreType>();

    function sumScores(score1: TeamScoreType, score2: TeamScoreType) {
        return {
            current: score1.current + score2.current,
            display: score1.display + score2.display,
            period1: score1.period1 + score2.period1,
            period2: score1.period2 + score2.period2,
            normaltime: score1.normaltime + score2.normaltime,
            extra1: (score1.extra1 ?? 0) + (score2.extra1 ?? 0),
            extra2: (score1.extra2 ?? 0) + (score2.extra2 ?? 0),
            overtime: (score1.overtime ?? 0) + (score2.overtime ?? 0),
            penalties: (score1.penalties ?? 0) + (score2.penalties ?? 0),
        };
    }

    function sumMatchScores(matches: MatchType[]) {
        if (matches.length === 1) {
            return {
                homeTeam: matches[0].home_team,
                awayTeam: matches[0].away_team,
                home_team_score: matches[0].home_team_score,
                away_team_score: matches[0].away_team_score,
            };
        }
        const totalHomeTeamScore = sumScores(
            matches[0].home_team_score,
            matches[1].away_team_score
        );
        const totalAwayTeamScore = sumScores(
            matches[0].away_team_score,
            matches[1].home_team_score
        );

        return {
            homeTeam: matches[0].home_team,
            awayTeam: matches[0].away_team,
            home_team_score: totalHomeTeamScore,
            away_team_score: totalAwayTeamScore,
        };
    }

    useEffect(() => {
        const { home_team_score, away_team_score, homeTeam, awayTeam } =
            sumMatchScores(matches);
        setHomeTeamScore(() => home_team_score);
        setAwayTeamScore(() => away_team_score);
        setHomeTeam(() => homeTeam);
        setAwayTeam(() => awayTeam);
    }, [matches]);

    const BoxItem = styled(Box)(() => ({
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        position: "relative",
        backgroundColor: "#1c2632",
        "&::after": {
            content: '""',
            display: "block",
            position: "absolute",
            top: "50%",
            right: "-10px",
            left: "unset",
            width: "10px",
            height: "0px",
            border: "2px solid rgba(255, 255, 255, 0.15)",
        },
    }));

    return (
        <Box>
            {matches ? (
                <BoxItem>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: "12px",
                        }}
                        className={homeTeam?.shortName}
                    >
                        <Avatar
                            sx={{
                                width: "24px",
                                height: "24px",
                                mr: "8px",
                            }}
                            alt="club"
                            src={homeTeam?.logo ?? ""}
                        />
                        <Typography variant="league" color={"white"}>
                            {homeTeam?.shortName || "Waiting"}
                        </Typography>

                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant="league" color={"white"}>
                                {homeTeamScore?.display}
                            </Typography>
                            {/* <Box component={'span'}>(4)</Box> */}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: "12px",
                        }}
                        className={awayTeam?.shortName}
                    >
                        <Avatar
                            sx={{
                                width: "24px",
                                height: "24px",
                                mr: "8px",
                            }}
                            alt="club"
                            src={awayTeam?.logo ?? ""}
                            // src="https://res.cloudinary.com/develope-app/image/upload/v1718358015/Sports/leagues/riravunuyyfjdae5jm6g.png"
                        />
                        <Typography variant="league">
                            {awayTeam?.shortName || "Waiting"}
                        </Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant="league">
                                {awayTeamScore?.display ?? ""}
                            </Typography>
                            {/* <Box component={'span'}>(4)</Box> */}
                        </Box>
                    </Box>
                </BoxItem>
            ) : (
                ""
            )}
        </Box>
    );
};

export default memo(BranchMatchItem);
