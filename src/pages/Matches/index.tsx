import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "~/store/store";
import { Box, Grid, Skeleton } from "@mui/material";
import MatchSkeleton from "./MatchSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import { MatchType } from "~/types/sport.v2.type";
import sportApi from "~/api/sport.api";
import Match from "./components/Match";
import useIntersectionObserver from "~/utils/useIntersection";
import { v4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";
// interface StateType {}
const Matches = () => {
    const { currentRound, totalRound, leagueId, seasonId, loading } = useStore(
        useShallow((state) => ({
            currentRound: state.rounds?.currentRound.round || 0,
            totalRound: state?.rounds?.rounds?.length || 0,
            leagueId: state.league?.id,
            seasonId: state.season?.id,
            loading: state.isLoading,
        }))
    );

    const [matches, setMatches] = useState<MatchType[][]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [rounds, setRounds] = useState<number[]>([]);

    const [nexts, setNexts] = useState<MatchType[][]>([]);
    const ref = useRef(null);

    useEffect(() => {
        if (currentRound) {
            setHasMore(false);
            setRounds([currentRound]);
        }
    }, [currentRound]);

    useEffect(() => {
        const fetchData = async () => {
            if (leagueId && seasonId && currentRound && !loading) {
                const { metadata: match } = await sportApi.getMatchByRound(
                    leagueId,
                    seasonId,
                    currentRound
                );
                if (match?.length) {
                    setMatches(() => [match]);
                    setNexts(() => []);
                    setHasMore(true);
                }
            }
        };
        // setMatches([]);
        fetchData();
    }, [leagueId]);

    const fetchPreviousData = async () => {
        const round = rounds[0] - 1;
        if (round > 0 && !rounds.includes(round) && leagueId && seasonId) {
            const { metadata: match } = await sportApi.getMatchByRound(
                leagueId,
                seasonId,
                round
            );
            if (match?.length) {
                setMatches([match, ...matches]);
                setRounds([round, ...rounds]);
            }
        } else setHasMore(false);
    };

    const fetchNextData = async () => {
        const round = rounds[rounds.length - 1] + 1;

        if (
            totalRound &&
            leagueId &&
            seasonId &&
            round <= totalRound &&
            !rounds.includes(round)
        ) {
            const { metadata: match } = await sportApi.getMatchByRound(
                leagueId,
                seasonId,
                round
            );
            if (match?.length) {
                setNexts([...nexts, match]);
                setRounds([...rounds, round]);
            }
        }
    };

    const lastItemRef = useIntersectionObserver(fetchNextData, [true]);

    const HasMorePre = () => {
        // if (rounds[0] !== 1)
        //     return <Box id={"changeHasMore"} ref={changeHasMore}></Box>;
        return <></>;
    };

    return (
        <Box
            sx={{
                marginTop: "145px",
                width: "100%",
                height: "calc(100vh - 145px)",
                overflow: "auto",
                backgroundColor: "#202124",
                // minHeight: "145px",
            }}
            ref={ref}
            id={"matches"}
        >
            {matches.length === 0 ? (
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: "#171717", px: 2, py: 1 }}>
                        <Skeleton
                            variant="text"
                            width="100%"
                            height={26}
                            sx={{ bgcolor: "#3c4043" }}
                            animation="wave"
                        />
                    </Box>
                    <Grid container spacing={0.2}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <MatchSkeleton key={index} />
                        ))}
                    </Grid>
                </Container>
            ) : (
                <Container maxWidth="md">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchPreviousData}
                        hasMore={hasMore}
                        isReverse={true}
                        getScrollParent={() => ref.current}
                        threshold={10}
                        loader={
                            <Box
                                key={v4()}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        }
                        useWindow={false}
                    >
                        <HasMorePre />
                        {matches.length &&
                            matches.map((match, index) => {
                                return (
                                    <Match
                                        isRoundNow={
                                            matches.length === 2 && index === 1
                                        }
                                        matches={match}
                                        round={rounds[index]}
                                        key={index}
                                        total={totalRound}
                                    />
                                );
                            })}
                    </InfiniteScroll>
                    <Box>
                        {nexts.length
                            ? nexts.map((match, index) => {
                                  return (
                                      <Match
                                          isRoundNow={false}
                                          matches={match}
                                          round={currentRound + index + 1}
                                          key={index}
                                          lastItemRef={
                                              index === nexts.length - 1
                                                  ? lastItemRef
                                                  : undefined
                                          }
                                          total={totalRound}
                                      />
                                  );
                              })
                            : ""}
                    </Box>
                    {!nexts.length ||
                    rounds[rounds.length - 1] + 1 < totalRound ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            ref={lastItemRef}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        ""
                    )}
                </Container>
            )}
        </Box>
    );
};

export default Matches;
