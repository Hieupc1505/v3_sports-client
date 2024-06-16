import { Box, Stack, Typography, Avatar } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const Note = () => {
    return (
        <Stack
            direction={"row"}
            spacing={3}
            sx={{
                backgroundColor: "#424548",
                padding: "6px 8px 10px",
                borderRadius: "4px",
                border: "1px solid #3c4043",
                margin: "30px 8px 8px",
            }}
        >
            <Box width={"50%"}>
                <Typography
                    variant="caption"
                    sx={{ color: "#fff", marginBottom: "5px" }}
                >
                    Hạng Trên/Hạng Dưới
                </Typography>
                {notev1.map((item) => {
                    return (
                        <Box
                            key={uuidv4()}
                            sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: item.color,
                                    width: "8px",
                                    height: "8px",
                                }}
                            ></Box>
                            <Typography variant="subtitle2" color={"#9aa0a6"}>
                                {item.text}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
            <Box>
                <Typography
                    variant="caption"
                    sx={{ color: "#fff", marginBottom: "5px" }}
                >
                    5 trận gần nhất
                </Typography>
                {notev2.map((item) => {
                    return (
                        <Box
                            key={uuidv4()}
                            sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{ width: "12px", height: "12px" }}
                                src={item.src}
                                alt=""
                            />
                            <Typography variant="subtitle2" color={"#9aa0a6"}>
                                {item.text}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Stack>
    );
};

const notev1 = [
    {
        color: "#4285f4",
        text: "Vòng bảng Vô địch các CLB Châu Âu",
    },
    {
        color: "rgb(250,123,23)",
        text: "Vòng bảng UEFA Europa League",
    },
    { color: "red", text: "Xuống hạng" },
];

const notev2 = [
    {
        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==",
        text: "Thắng",
    },
    {
        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJhdyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM5QUEwQTYiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUgNyAxMSA3IDExIDkgNSA5Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K",
        text: "Hòa",
    },
    {
        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9zcyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNFQTQzMzUiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgtMzE1LjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiIHBvaW50cz0iMTIgOC44IDguOCA4LjggOC44IDEyIDcuMiAxMiA3LjIgOC44IDQgOC44IDQgNy4yIDcuMiA3LjIgNy4yIDQgOC44IDQgOC44IDcuMiAxMiA3LjIiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=",
        text: "Thua",
    },
    {
        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRW1wdHkiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0JEQzFDNiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI4IiByPSI3Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=",
        text: "Không thi đấu",
    },
];

export default Note;
