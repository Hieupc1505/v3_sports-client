import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { Check } from "@mui/icons-material";
import Check from "@mui/icons-material/Check";
import {
    Box,
    ListItemIcon,
    Typography,
    MenuList,
    Paper,
    styled,
    MenuItem,
} from "@mui/material";
const Title = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickDropDown = () => {
        setOpen(!open);
    };
    return (
        <Paper
            elevation={12}
            sx={{ padding: "12px 16px 8px", bgcolor: "card.light" }}
        >
            <Box>
                <Typography variant="league">Mùa giải</Typography>
            </Box>
            <Box onClick={handleClickDropDown} sx={{ position: "relative" }}>
                <Box
                    sx={{
                        cursor: "pointer",
                        position: "relative",
                        minWidth: "68px",
                        display: "inline-block",
                    }}
                >
                    <Typography variant="league" color={"primary"}>
                        23/24
                    </Typography>
                    <ArrowDropDownIcon
                        fontSize="small"
                        color="primary"
                        sx={{
                            position: "absolute",
                            right: "8px",
                            top: "calc(50% - .5em)",
                        }}
                    />
                </Box>
                {open && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 25,
                            backgroundColor: "#202124",
                        }}
                    >
                        <MenuList>
                            {["20/21", "21/22", "23/24"].map((item, id) => (
                                <MenuItemSeasonItem key={id} value={item}>
                                    <ListItemIcon>
                                        <Check />
                                    </ListItemIcon>
                                    <Typography variant="league">
                                        {item}
                                    </Typography>
                                </MenuItemSeasonItem>
                            ))}
                        </MenuList>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default Title;

const MenuItemSeasonItem = styled(MenuItem)(({ theme }) => ({
    padding: "4px 6px",
    borderRadius: "2px",
    minWidth: "68px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.bgColor.light,
    },
    "& .MuiSvgIcon-root": {
        width: "12px",
        height: "12px",
        color: "#9aa0a6",
    },
    "& .MuiListItemIcon-root": {
        minWidth: "18px",
    },
}));
