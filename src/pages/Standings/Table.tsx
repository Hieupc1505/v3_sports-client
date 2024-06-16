import * as React from "react";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import { styled, TableBody, Typography, Box, Avatar } from "@mui/material";

import Table from "@mui/material/Table";
import { v4 as uuidv4 } from "uuid";
import FiveMatchRecent from "./FiveMatchRecent";
import { SpecificTeamType, fiveMatchType } from "~/types/sports.type";
const TableGeneral = ({
    rows,
    fiveMatch,
    isGroup = false,
    name,
}: {
    rows: SpecificTeamType[];
    fiveMatch: fiveMatchType;
    isGroup: boolean;
    name: string;
}) => {
    const TableCellCustom = styled(TableCell)(({ theme }) => ({
        color: theme.typography.league.color,
        fontSize: "12px",
        padding: 0,
        borderBottom: `.8px solid ${theme.palette.bgColor.light}`,
        textAlign: "center",
        maxHeight: "40px",
        height: "40px",
        "&:first-of-type, &:last-of-type": {
            // paddingLeft: "10px",
            borderBottom: 0,
        },
        "&:nth-of-type(1)": {
            borderBottom: `2px solid ${theme.palette.bgColor.main}`,
        },
    }));

    return (
        <TableContainer
            sx={{ paddingTop: "16px", marginTop: isGroup ? "4px" : null }}
        >
            {isGroup ? (
                <Box>
                    <Typography
                        variant="league"
                        sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            paddingLeft: "14px",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            ) : null}
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCellHeader
                                key={uuidv4()}
                                align={column.align}
                                style={{
                                    minWidth: column.minWidth,
                                    width: column.minWidth,
                                }}
                            >
                                {column.label}
                            </TableCellHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((club, idx, arr) => {
                        return (
                            <TableRow
                                key={uuidv4()}
                                sx={{ "&:hover": { bgcolor: "#050505" } }}
                            >
                                <TableCellCustom>
                                    <Box
                                        sx={{
                                            width: "2.5px",
                                            height: "100%",
                                            backgroundColor: renderColor(
                                                idx,
                                                arr.length
                                            ),
                                        }}
                                    ></Box>
                                </TableCellCustom>
                                <TableCellCustom>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <Typography
                                            variant="league"
                                            sx={{ fontSize: "12px" }}
                                        >
                                            {club.position}
                                        </Typography>
                                        <Avatar
                                            src={club.team_id.logo}
                                            variant={"square"}
                                            sx={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
                                        <Typography
                                            variant="league"
                                            sx={{
                                                fontSize: "12px",
                                                marginLeft: "5px",
                                            }}
                                        >
                                            {club.team_id.name}
                                        </Typography>
                                    </Box>
                                </TableCellCustom>
                                <TableCellCustom>
                                    {club.matches}
                                </TableCellCustom>
                                <TableCellCustom>{club.wins}</TableCellCustom>
                                <TableCellCustom>
                                    {club.matches - club.wins - club.losses}
                                </TableCellCustom>
                                <TableCellCustom>{club.losses}</TableCellCustom>
                                <TableCellCustom>
                                    {club.scoresFor}
                                </TableCellCustom>
                                <TableCellCustom>
                                    {club.scoresAgainst}
                                </TableCellCustom>
                                <TableCellCustom>
                                    {club.scoresFor - club.scoresAgainst}
                                </TableCellCustom>
                                <TableCellCustom>{club.points}</TableCellCustom>
                                <TableCellCustom>
                                    {
                                        <FiveMatchRecent
                                            key={uuidv4()}
                                            result={fiveMatch[club.team_id._id]}
                                        />
                                    }
                                </TableCellCustom>
                                <TableCellCustom></TableCellCustom>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableGeneral;

interface Column {
    id:
        | "club"
        | "RED"
        | "Win"
        | "H"
        | "Lose"
        | "BT"
        | "HBT"
        | "HS"
        | "count"
        | "history"
        | null;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: null,
        minWidth: 12,
        label: "",
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    { id: "club", label: "Câu Lạc Bộ", minWidth: 300, align: "left" },
    { id: "RED", label: "RED", minWidth: 31, align: "center" },
    {
        id: "Win",
        label: "Win",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toLocaleString("en-US"),
    },
    {
        id: "H",
        label: "H",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toLocaleString("en-US"),
    },
    {
        id: "Lose",
        label: "Lose",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: "BT",
        label: "BT",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: "HBT",
        label: "HBT",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: "HS",
        label: "HS",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: "count",
        label: "Điểm",
        minWidth: 31,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: "history",
        label: "Last 5 matches",
        minWidth: 80,
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: null,
        minWidth: 12,
        label: "",
        align: "center",
        // format: (value: number) => value.toFixed(2),
    },
];

const TableCellHeader = styled(TableCell)(({ theme }) => ({
    left: 0,
    background: "transparent",
    zIndex: 20,
    fontSize: "12px",
    padding: 0,
    color: theme.typography.league.color,
    paddingBottom: "6px",
    borderBottom: `.8px solid ${theme.palette.bgColor.light}`,

    "&.MuiTableCell-root:first-of-type": {
        // paddingLeft: "10px",
        borderBottom: 0,
    },
    "&.MuiTableCell-root:last-of-type": {
        // paddingLeft: "10px",
        borderBottom: 0,
    },
}));

export const renderColor = (idx: number, length: number) => {
    const sx = ["#4285f4", "rgb(250,123,23)", "red", "#202124"];
    switch (idx) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            return sx[0];
        case 5:
            return sx[1];
        case length - 3:
        case length - 1:
        case length - 2:
            return sx[2];

        default:
            return "#202124";
    }
};
