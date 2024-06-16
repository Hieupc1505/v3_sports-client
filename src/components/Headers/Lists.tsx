import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
// import { LeagueType } from "~/types/sports.type";
// import { useListLeague } from "~/api/sport.api";
import { useStore } from "~/store/store";
import { useShallow } from "zustand/react/shallow";
import { LeagueType } from "~/types/sports.type";
import { Avatar, ListItemIcon, ListItemText } from "@mui/material";
// import { useLeague } from "~/api/sport.api";
import sportApi from "~/api/sport.api";

// const ITEM_HEIGHT = 48;

export default function ListLeague({ data }: { data: LeagueType[] }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const { leagueId, changeLeague, changeStatusLoading } = useStore(
        useShallow((state) => ({
            leagueId: state.league?.id,
            changeLeague: state.changeLeague,
            changeStatusLoading: state.changeStatusLoading,
        }))
    );
    // const season = useLeague(id);
    // console.log(data);

    const handleClose = async (id: number) => {
        if (typeof id === "number") {
            changeStatusLoading(true);
            const seasons = await sportApi.getSeason(id);
            const newLeague = data.filter((league) => league.id === id)[0];
            // console.log("newLeague", newLeague, seasons.data.rounds);
            await changeLeague(
                newLeague,
                0,
                seasons.data.seasons,
                seasons.data.rounds
            );
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        // maxHeight: ITEM_HEIGHT * 4.5,
                        // width: "20ch",
                    },
                }}
            >
                {data.length &&
                    data.map((league) => (
                        <MenuItem
                            key={league.id}
                            selected={league.id === leagueId}
                            onClick={() => handleClose(league.id)}
                        >
                            <ListItemIcon sx={{ marginRight: 1 }}>
                                <Avatar src={league.logo} variant="square" />
                            </ListItemIcon>
                            <ListItemText>{league.name}</ListItemText>
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    );
}
