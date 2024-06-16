import { Grid, Box, Skeleton } from "@mui/material";

const MatchSkeleton = () => {
    return (
        <Grid item xs={6}>
            <Box
                sx={{
                    display: "flex",
                    paddingLeft: "16px",
                    border: ".8px solid #3c4043",
                    alignItems: "center",
                    background: "#3c4043",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "138px",
                        justifyContent: "center",
                        gap: "16px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8",
                        }}
                    >
                        <Skeleton variant="circular" width={36} height={36} />
                        <Skeleton variant="text" width={180} height={32} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <Skeleton variant="circular" width={36} height={36} />
                        <Skeleton variant="text" width={180} height={32} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        flexGrow: 1,
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    <Skeleton variant="text" width={60} height={12} />
                    <Skeleton variant="text" width={45} height={12} />
                    <Skeleton variant="text" width={60} height={12} />
                </Box>
            </Box>
        </Grid>
    );
};

export default MatchSkeleton;
