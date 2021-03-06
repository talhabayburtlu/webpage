import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
      palette: {
          primary: {
              light:"#7E1014",
              main: "#7E1014"
          },
          secondary: {
            light:"#E09F3E",
            main: "#E09F3E"
          }
      },
      overrides: {
        MUIRichTextEditor: {
            editorContainer: {
              fontFamily: "adobe-garamond-pro"
            }
        }
    }
});

export default theme;