import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Show from "./Show";
import { Box } from "@mui/material";

// const style = {
//     height: 30,
//     border: "1px solid green",
//     margin: 6,
//     padding: 8,
// };

export const initState = (): unknown[][] => {
    const arr = Array.from({ length: 20 });
    return arr.map(() => Array.from({ length: 5 }));
};

interface Props {
    items: unknown[][];
}
export default function App() {
    const [state, setState] = React.useState<Props>({
        items: initState(),
    });

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        const more = Array.from({ length: 20 }).map(() =>
            Array.from({ length: 5 })
        );
        setTimeout(() => {
            setState({
                items: state.items.concat(more),
            });
        }, 1500);
    };
    // const BoxWrap = styled(Box)(({ theme }) => ({
    //     backgroundColor: theme.palette.info.main,
    //     width: "100%",
    //     height: "100%",
    //     marginTop: "145px",
    // }));

    return (
        <div style={{ marginTop: "145px" }}>
            {/* <Container maxWidth="md"> */}
            <Box
                id="scrollableDiv"
                sx={{
                    height: "calc(100vh - 145px)",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column-reverse",
                }}
            >
                <InfiniteScroll
                    dataLength={state.items.length}
                    next={fetchMoreData}
                    style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                    }} //To put endMessage and loader to the top.
                    inverse={true} //
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {state.items.map((i, index) => (
                        <Box
                            sx={{ border: "1px solid red", margin: "10px" }}
                            key={index}
                        >
                            div - #{index}
                            <Show arr={i} />
                            {/* <Show arr={i} /> */}
                        </Box>
                    ))}
                </InfiniteScroll>
            </Box>
            {/* </Container> */}
        </div>
    );
}
