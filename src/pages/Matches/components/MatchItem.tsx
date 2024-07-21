import React from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import convertMillisecondsToDate from "~/utils/matches";

import { MatchType } from "~/types/sport.v2.type";
import {
    Avatar,
    List,
    ListItemAvatar,
    ListItem,
    ListItemText,
    styled,
    Typography,
    Divider,
} from "@mui/material";
import { MatchIsEnd } from "~/utils/matches";
import { useStore } from "~/store/store";
import { useShallow } from "zustand/react/shallow";
import Backdrop from "@mui/material/Backdrop";
import VideoPlay from "./VideoPlay";
import sportApi from "~/api/sport.api";
import CircularProgress from "@mui/material/CircularProgress";

function MatchItem({ match, isEven }: { match: MatchType; isEven: boolean }) {
    const {
        home_team,
        away_team,
        home_team_score,
        away_team_score,
        highlight,
        status,
    } = match;

    const time = convertMillisecondsToDate(match.startTime * 1000);
    const { thumbnail, season } = useStore(
        useShallow((state) => ({
            thumbnail: state.season?.image,
            season: state?.season?.id,
        }))
    );

    const AvatarCustom = styled(Avatar)(({ theme }) => ({
        width: theme.spacing(3),
        height: theme.spacing(3),
    }));
    const ListItemAvatarCustom = styled(ListItemAvatar)(({ theme }) => ({
        minWidth: "auto",
        paddingRight: theme.spacing(1),
    }));
    const CardContentCustom = styled(CardContent)(({ theme }) => ({
        flex: "1 0 auto",
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(0.5),
    }));
    const CardCustom = styled(Card)(({ theme }) => ({
        display: "flex",
        maxHeight: "138px",
        height: "138px",
        backgroundColor: "transparent",
        borderLeft: `.2px solid ${theme.palette.card.main}`,
        borderRight: isEven ? "none" : `.2px solid ${theme.palette.card.main}`,
        borderBottom: `.2px solid ${theme.palette.card.main}`,
        justifyContent: "space-between",
        "&.MuiPaper-root:hover": {
            backgroundColor: theme.palette.card.light,
            transition: "all 0.33s",
        },
        borderRadius: 0,
    }));
    const DividerCustom = styled(Divider)(({ theme }) => ({
        backgroundColor: theme.palette.card.light,
        borderColor: theme.palette.card.light,
        margin: "24px 0",
        marginLeft: "auto",
    }));

    const [open, setOpen] = React.useState(false);
    const [videoId, setVideoId] = React.useState<string>(
        highlight?.videoId || ""
    );
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = async () => {
        setOpen(true);
        if (!highlight?.videoId && season) {
            const resp = await sportApi.getHighLight(
                season,
                match.slug,
                match.startTime,
                match.id
            );

            setVideoId(resp.metadata);
        }
    };

    return (
        <CardCustom>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContentCustom>
                    <List sx={{ padding: 0 }}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <Typography variant="league">
                                        {home_team_score.display}
                                    </Typography>
                                </IconButton>
                            }
                        >
                            <ListItemAvatarCustom>
                                <AvatarCustom
                                    src={home_team.logo}
                                    alt={home_team.shortName}
                                />
                            </ListItemAvatarCustom>
                            <ListItemText
                                sx={{
                                    fontSize: "14px",
                                    color: "text2",
                                }}
                            >
                                <Typography variant="league">
                                    {home_team.shortName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <Typography variant="league">
                                        {away_team_score.display}
                                    </Typography>
                                </IconButton>
                            }
                        >
                            <ListItemAvatarCustom>
                                <AvatarCustom
                                    src={away_team.logo}
                                    alt={away_team.shortName}
                                />
                            </ListItemAvatarCustom>
                            <ListItemText sx={{ fontSize: "1.4rem" }}>
                                <Typography variant="league">
                                    {away_team.shortName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </CardContentCustom>
            </Box>
            <DividerCustom orientation="vertical" flexItem />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    minWidth: "120px",
                    gap: 1,
                }}
            >
                {MatchIsEnd(match.startTime) === true && status.code >= 100 ? (
                    <>
                        <Typography variant="league">KT</Typography>
                        <Typography variant="league">
                            {time.day}/{time.month}
                        </Typography>

                        {videoId ? (
                            <Avatar
                                onClick={handleOpen}
                                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADKHNS5_XF51n-zYznTlcRpeQPwQ`}
                                alt="league"
                                variant="square"
                                sx={{
                                    width: "80px",
                                    height: "40px",
                                    cursor: "pointer",
                                }}
                            />
                        ) : (
                            <Avatar
                                onClick={handleOpen}
                                src={thumbnail ?? ""}
                                alt="league"
                                variant="square"
                                sx={{
                                    width: "80px",
                                    height: "40px",
                                    cursor: "pointer",
                                }}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <Typography variant="league">
                            {time.dayOfWeek}, {time.day}/{time.month}
                        </Typography>
                        <Typography variant="league">
                            {time.hours}:{time.minutes}
                        </Typography>
                    </>
                )}
            </Box>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
            >
                {videoId ? <VideoPlay url={videoId} /> : <CircularProgress />}
            </Backdrop>
        </CardCustom>
    );
}

export default React.memo(MatchItem);
