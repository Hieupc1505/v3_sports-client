/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import MatchItem from "./MatchItem";
import { MatchType } from "~/types/sports.type";
const Match = ({
    isRoundNow,
    matches,
    round,
    lastItemRef,
    total,
}: {
    matches: MatchType[];
    isRoundNow: boolean;
    round: number;
    total: number;
    lastItemRef?: ((node: HTMLElement) => void) | undefined;
}) => {
    // console.log(matches);
    return (
        <Box id={isRoundNow ? "round_now" : ""}>
            <Box
                sx={{
                    backgroundColor: "#171717",
                    padding: "12px 24px 10px",
                    borderBottom: `.2px solid #3c4043`,
                }}
            >
                <Typography variant="league">
                    Vòng Thi Đấu {round}/{total}
                </Typography>
            </Box>
            <Grid container spacing={0}>
                {matches.map((event, index, matches) => (
                    <Grid item xs={6} key={event.id}>
                        <Box
                            ref={
                                matches.length - 1 === index
                                    ? lastItemRef
                                    : null
                            }
                        >
                            <MatchItem match={event} isEven={index % 2 === 0} />
                        </Box>
                    </Grid>
                ))}
            </Grid>{" "}
        </Box>
    );
};

export default Match;
