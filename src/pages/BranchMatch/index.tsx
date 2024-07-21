import { Box, Container, Typography, styled } from "@mui/material";
import BranchMatchItem from "./components/BranchMatchItem";
import { PlayoffType } from "~/types/sport.v2.type";
import { useEffect, useState } from "react";
import sportApi from "~/api/sport.api";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "~/store/store";
// import { useNavigate } from "react-router-dom";
const BranchMatch = () => {
    const [playoffs, setPlayoff] = useState<PlayoffType[]>([]);
    // const navigate = useNavigate();
    const BoxRoundMatch = styled(Box)(() => ({
        flex: "1 0 0 ",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "transparent",
        height: "100%",
        "&:nth-of-type(odd)": {
            backgroundColor: "rgba(14, 17, 21, 0.4)",
            // borderRadius: "0px 8px 8px 0px",
        },
    }));

    const BoxSingleItem = styled(Box)(() => ({
        width: playoffs?.length === 15 ? "216px" : "288px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        minHeight: "70px",
        "&:nth-of-type(even)": {
            backgroundColor: "rgba(14, 17, 21, 0.4)",
            // borderRadius: "0px 8px 8px 0px",
        },
    }));

    const BoxItem = styled(Box)(() => ({
        width: "calc(100% - 28px)",
        position: "relative",
        minHeight: "52px",
        right: "-14px",
        left: "unset",
        margin: "4px 0px",
    }));

    const BoxRelative = styled(Box)(() => ({
        position: "relative",
        "&::after": afterColumn,
        "&::before": beforeHorizontal,
    }));

    const { leagueId, seasonId, leagueName } = useStore(
        useShallow((state) => ({
            leagueId: state.league?.id,
            seasonId: state.season?.id,
            leagueName: state.league?.name,
        }))
    );

    useEffect(() => {
        const fetchData = async () => {
            if (leagueId && seasonId) {
                const { data } = await sportApi.getKnockoutMatch(
                    leagueId,
                    seasonId
                );

                if (data.metadata.length) setPlayoff(data.metadata);
                else {
                    setPlayoff([]);
                }
            }
        };
        fetchData();
    }, [leagueId, seasonId]);
    const finlnalRoundId = 29;
    const matchFinal = playoffs.filter((item) => item.round === finlnalRoundId);

    const renderMatch = ({ matches, _id }: PlayoffType) => {
        const arrMatchChild = playoffs.filter(
            (item) => item.playoff_parent === _id
        );

        return (
            <Box key={_id} sx={{ display: "flex" }}>
                {arrMatchChild.length ? (
                    <BoxRelative>
                        {arrMatchChild.map((item) => renderMatch(item))}
                    </BoxRelative>
                ) : (
                    ""
                )}
                <BoxSingleItem>
                    <BoxItem>
                        <BranchMatchItem matches={matches} />
                    </BoxItem>
                </BoxSingleItem>
            </Box>
        );
    };

    const listTitleRound = handleCountRound[playoffs.length.toString()];

    return (
        <Box
            sx={{
                marginTop: "145px",
                width: "100%",
                height: "calc(100vh - 145px)",
                overflow: "auto",
                backgroundColor: "#202124",
            }}
        >
            <Container maxWidth="md">
                <Box bgcolor={"#131a21"}>
                    <Box
                        sx={{
                            textAlign: "center",
                            padding: "12px 0",
                            bgcolor: "transparent",
                            fontWeight: 700,
                            color: "#9aa0a6",
                        }}
                    >
                        {leagueName} 2024, Knockout stage
                    </Box>
                    <Box bgcolor={"rgba(14, 17, 21, 0.4)"}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                            }}
                        >
                            {listTitleRound?.length &&
                                listTitleRound.map((roundName) => (
                                    <BoxRoundMatch>
                                        <Typography variant="league">
                                            {roundName}
                                        </Typography>
                                    </BoxRoundMatch>
                                ))}
                            {/* <BoxRoundMatch>
                                <Typography variant="league">
                                    Semifinal
                                </Typography>
                            </BoxRoundMatch>
                            <BoxRoundMatch>
                                <Typography variant="league">
                                    Quarterfinal
                                </Typography>
                            </BoxRoundMatch> */}
                            {/* <BoxRoundMatch>
                                <Typography variant="league">
                                    Round of 16
                                </Typography>
                            </BoxRoundMatch> */}
                        </Box>
                        {matchFinal.length ? renderMatch(matchFinal[0]) : ""}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const afterColumn = {
    content: '""',
    display: "block",
    position: "absolute",
    top: "25%",
    right: "0px",
    left: "unset",
    width: "0px",
    height: "51%",
    border: "2px solid rgba(255, 255, 255, 0.15)",
};

const beforeHorizontal = {
    content: '""',
    display: "block",
    position: "absolute",
    top: "50%",
    right: "-10px",
    left: "unset",
    width: "12px",
    height: "0px",
    border: "2px solid rgba(255, 255, 255, 0.15)",
};

const handleCountRound: Record<string, string[]> = {
    "7": ["Final", "Semifinal", "Quarterfinal"],
    "15": ["Final", "Semifinal", "Quarterfinal", "Round of 16"],
};

export default BranchMatch;
