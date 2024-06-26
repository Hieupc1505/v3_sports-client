import ReactPlayer from "react-player/youtube";

const VideoPlay = ({ url }: { url: string }) => {
    //https://developers.google.com/youtube/iframe_api_reference?hl=vi#Events

    return (
        <div>
            <ReactPlayer
                // playing
                url={`https://www.youtube.com/watch?v=${url}`}
                controls={true}
                height={"100%"}
                width={"100%"}
                style={{
                    maxHeight: "360px",
                }}
            />
        </div>
    );
};

export default VideoPlay;
