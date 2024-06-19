import React, { useEffect } from "react";
import { useStore } from "~/store/store";
import { useShallow } from "zustand/react/shallow";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ListLeague from "./Lists";
import { useListLeague } from "~/api/sport.api";
import { useNavigate } from "react-router-dom";
import {
    Box,
    styled,
    Avatar,
    Typography,
    Container,
    IconButton,
    // Skeleton,
} from "@mui/material";
import sportApi from "~/api/sport.api";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
    const navigate = useNavigate();

    const { name, logo, country, changeLeague, hasLeague } = useStore(
        useShallow((state) => ({
            name: state.league?.name,
            logo: state.league?.logo,
            country: state.league?.country.toLowerCase(),
            loading: state.isLoading,
            changeLeague: state.changeLeague,
            hasLeague: state.league,
        }))
    );
    const MenuBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
    }));
    const [alignment, setAlignment] = React.useState("");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        console.log(event.target);
        setAlignment(newAlignment);
        navigate(`/${newAlignment}`);
    };

    const getList = useListLeague();
    // console.log(getList.isLoading, getList.data);

    useEffect(() => {
        const fetchData = async () => {
            if (!getList.isLoading && getList.data && !hasLeague) {
                const league = getList.data?.data[6];
                const seasons = await sportApi.getSeason(league.id);
                // console.log(league, seasons);
                changeLeague(
                    league,
                    0,
                    seasons.data.seasons,
                    seasons.data.rounds
                );
            }
        };
        fetchData();
    });
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBarCustom id={country}>
                    <Toolbar>
                        {logo ? (
                            <Avatar
                                variant="square"
                                sx={{
                                    width: "64px",
                                    height: "64px",
                                    margin: "10px",
                                }}
                                src={logo}
                                alt="logo"
                            />
                        ) : (
                            <Avatar src="/icon.png" alt="league" />
                        )}

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {name}
                        </Typography>
                        <MenuBox>
                            {getList.data ? (
                                <ListLeague data={getList.data?.data} />
                            ) : (
                                <IconButton
                                    aria-label="more"
                                    id="long-button-default"
                                    aria-haspopup="true"
                                >
                                    <MenuIcon
                                        fontSize="large"
                                        sx={{ color: "#fff" }}
                                    />
                                </IconButton>
                            )}
                        </MenuBox>
                    </Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                        }}
                    >
                        <ToggleButtonGroup
                            // color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            fullWidth={true}
                        >
                            <ToggleButtonCustom value="">
                                Trận Đấu
                            </ToggleButtonCustom>
                            <ToggleButtonCustom value="standings">
                                Bảng Xếp Hạng
                            </ToggleButtonCustom>
                            <ToggleButtonCustom disabled value="statistical">
                                Thống Kê
                            </ToggleButtonCustom>
                            <ToggleButtonCustom disabled value="live">
                                Trực Tiếp
                            </ToggleButtonCustom>
                        </ToggleButtonGroup>
                    </Container>
                </AppBarCustom>
            </Box>
        </Box>
    );
};

export default Header;

const ToggleButtonCustom = styled(ToggleButton)(({ theme }) => ({
    color: "#FFFFFF",
    border: "none",
    fontSize: theme.typography.caption.fontSize,
    opacity: 0.8,
    "&.Mui-selected": {
        opacity: 1,
        borderBottom: "2px solid #FFFFFF",
        color: "#FFFFFF",
    },
    "&.MuiToggleButton-root:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1);",
    },
}));

const AppBarCustom = styled(AppBar)(() => ({
    "&#england": {
        backgroundColor: "#3f1052",
    },
    "&#italy": {
        backgroundColor: "rgb(76, 193, 239)",
    },
    "&#spain": {
        backgroundColor: "rgb(76,193,239)",
    },
    "&#france": {
        backgroundColor: "rgba(0, 0, 0, 100%)",
    },
    "&#germany": {
        backgroundColor: "rgb(177, 40, 41)",
    },
    "&#europe": {
        backgroundColor: "rgb(22, 46, 88)",
    },
}));
