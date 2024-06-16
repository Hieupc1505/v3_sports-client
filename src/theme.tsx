import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// import { TextFieldPropsColorOverrides } from "@material-ui/core/TextField";
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                england: {
                    main: "#3f1052",
                    light: "#d0adf0",
                },
                italy: {
                    main: "rgb(76, 193, 239)",
                    light: "#fff",
                },
                france: {
                    main: "rgba(0, 0, 0, 100%)",
                    light: "#fff",
                },
                spain: {
                    main: "rgb(76,193,239)",
                    light: "#fff",
                },
                germany: {
                    main: "rgb(177, 40, 41)",
                    light: "rgb(195 226 218)",
                },
                bgColor: {
                    main: "#202124",
                    light: "#3c4043",
                },
                card: {
                    main: "#3c4043", //màu border card
                    dark: "#050505",
                    light: "#303134",
                },
            },
        },
        dark: {},
    },
    typography: {
        fontFamily: ["Roboto serif"].join(","),
        league: {
            fontSize: "14px",
            color: "#9aa0a6",
            lineHeight: "1",
        },
    },
});
export default theme;
// declare module "@mui/material/styles" {
//     interface PaletteColor {
//         deep?: string;
//         disabled?: string;
//     }

//     interface SimplePaletteColorOptions {
//         deep?: string;
//         disabled?: string;
//     }
// }

declare module "@mui/material/styles" {
    // interface Palette {
    //     custom: Palette["primary"];
    // }

    // interface PaletteOptions {
    //     custom: PaletteOptions["primary"];
    // }
    interface Palette {
        england: Palette["primary"];
    }

    interface PaletteOptions {
        england: PaletteOptions["primary"];
    }
    interface Palette {
        italy: Palette["primary"];
    }

    interface PaletteOptions {
        italy: PaletteOptions["primary"];
    }
    interface Palette {
        france: Palette["primary"];
    }

    interface PaletteOptions {
        france: PaletteOptions["primary"];
    }
    interface Palette {
        spain: Palette["primary"];
    }

    interface PaletteOptions {
        spain: PaletteOptions["primary"];
    }
    interface Palette {
        germany: Palette["primary"];
    }

    interface PaletteOptions {
        germany: PaletteOptions["primary"];
    }
    interface Palette {
        bgColor: Palette["primary"];
    }

    interface PaletteOptions {
        bgColor: PaletteOptions["primary"];
    }
    interface Palette {
        card: Palette["primary"];
    }

    interface PaletteOptions {
        card: PaletteOptions["primary"];
    }

    // interface PaletteColor {
    //     white?: string;
    // }

    // interface SimplePaletteColorOptions {
    //     white?: string;
    // }
}

declare module "@mui/material/styles" {
    interface TypographyVariants {
        league: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        league?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        league: true;
        h3: false;
    }
}
// declare module "@mui/material/IconButton" {
//     interface IconButtonPropsColorOverrides {
//         custom: true;
//     }
// }

// declare module "@mui/material/TextField" {
//     interface TextFieldPropsColorOverrides {
//         custom: true;
//     }
// }
// declare module "@mui/material/IconButton" {
//     interface IconButtonPropsColorOverrides {
//         orange: true;
//     }
// }

// declare module "@mui/material/TextField" {
//     interface TextFieldPropsColorOverrides {
//         orange: true;
//     }
// }
// declare module "@mui/material/Checkbox" {
//     interface CheckboxPropsColorOverrides {
//         orange: true;
//     }
// }
