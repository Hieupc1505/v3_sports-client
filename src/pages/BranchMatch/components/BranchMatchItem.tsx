/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { MatchType } from "~/types/sports.type";
import { Avatar, Box, styled, Typography } from "@mui/material";
import sportApi from "~/api/sport.api";

const BranchMatchItem = ({ match_id }: { match_id: MatchType }) => {
    const { _id } = match_id;

    const [matchInfo, setMatchInfo] = useState<MatchType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await sportApi.getMatchInfoById(_id);
            if (data) setMatchInfo(data[0]);
        };
        fetchData();
    }, [_id]);

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
        <Box className={_id}>
            {matchInfo ? (
                <BoxItem>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: "12px",
                        }}
                        className={matchInfo?.home_team_id?.slug}
                    >
                        <Avatar
                            sx={{
                                width: "24px",
                                height: "24px",
                                mr: "8px",
                            }}
                            alt="club"
                            src={matchInfo?.home_team_id.logo ?? ""}
                        />
                        <Typography variant="league" color={"white"}>
                            {matchInfo?.home_team_id.shortName || "Waiting"}
                        </Typography>

                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant="league" color={"white"}>
                                {matchInfo?.home_team_score}
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
                        className={matchInfo?.away_team_id?.slug}
                    >
                        <Avatar
                            sx={{
                                width: "24px",
                                height: "24px",
                                mr: "8px",
                            }}
                            alt="club"
                            src={matchInfo?.away_team_id?.logo ?? ""}
                            // src="https://res.cloudinary.com/develope-app/image/upload/v1718358015/Sports/leagues/riravunuyyfjdae5jm6g.png"
                        />
                        <Typography variant="league">
                            {matchInfo?.away_team_id?.shortName || "Waiting"}
                        </Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant="league">
                                {matchInfo?.away_team_score ?? ""}
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

export default BranchMatchItem;
