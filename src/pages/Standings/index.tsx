import { Box, Container } from "@mui/material";

import Title from "./Title";
import TableGeneral from "./Table";
import Note from "./Note";
import { useStanding } from "~/api/sport.api";
import { useStore } from "~/store/store";
import { useShallow } from "zustand/react/shallow";
import { v4 } from "uuid";
import { Skeleton } from "@mui/material";
// import NativeSelect from "@mui/material/NativeSelect"
export default function Standings() {
    const { league, season } = useStore(
        useShallow((state) => ({
            league: state.league,
            season: state.season,
        }))
    );
    const { data, isLoading } = useStanding(league?.id, season?.id);

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
            {!data || isLoading ? (
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: ".8px",
                            paddingTop: "12px",
                        }}
                    >
                        {Array.from({ length: 17 }).map(() => (
                            <Box
                                key={v4()}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "8px 12px",
                                    background: "#3c4043",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flex: "0 0 40%",
                                    }}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={24}
                                        height={24}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={320}
                                        height={12}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        flex: 1,
                                        justifyContent: "right",
                                    }}
                                >
                                    {Array.from({ length: 10 }).map(() => (
                                        <Skeleton
                                            key={v4()}
                                            variant="rectangular"
                                            width={30}
                                            height={6}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            ) : (
                <Container maxWidth="md">
                    <Box>
                        <Title />
                    </Box>
                    {data.metadata.map((group) => {
                        return (
                            <TableGeneral
                                key={v4()}
                                isGroup={league?.isGroup || false}
                                rows={group.rows}
                                // fiveMatch={data.metadata.fiveMatch}
                                name={group.name}
                            />
                        );
                    })}

                    <Note />
                </Container>
            )}
        </Box>
    );
}
