import {makeStyles} from "@material-ui/core"

const TabStyles = makeStyles(theme =>({
    button: {
        borderRadius: "0px",
        margin: "0px 10px",
        height: "100%",
        fontFamily: "din-condensed-web",
        backgroundColor: "#7E1014",
        color: "#FFF9D6",
        [theme.breakpoints.up("sm")] : {fontSize: "12px" , minWidth: "85px"},
        [theme.breakpoints.up("md")] : {fontSize: "15px", minWidth: "100px"},
        
    },
    buttonHover: {
        "&:hover": {
            backgroundColor: "#7E1014",
            boxShadow: "3px 3px 3px 0px rgba(0,0,0,0.75);",
        }
    },
}));

export default TabStyles;