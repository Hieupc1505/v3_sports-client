import { Typography } from "@mui/material";
// import { MatchType } from "~/types/sports.type";
export default function Show({ arr }: { arr: unknown[] }) {
    return (
        <div style={{ display: "flex" }}>
            {arr.map((_it, em) => (
                <Typography key={em}>{em} - </Typography>
            ))}
        </div>
    );
}
