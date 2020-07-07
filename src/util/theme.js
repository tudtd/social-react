import purple from "@material-ui/core/colors/purple";

export default {
  palette: {
    primary: {
      light: "#33ab9f",
      main: "#009688",
      dark: "#00695f",
      contrastText: "#fff",
    },
    secondary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
      contrastText: "#fff",
    },
  },
  util: {
    container: {
      textAlign: "center",
      display: "flex",
    },
    heading: {
      color: "teal",
      margin: "2rem 0 0 0",
    },
    form: {
      margin: "1rem 0",
    },
    field: {
      width: "90%",
      margin: " 0",
    },
    button: {
      margin: "1rem 0",
      position: "relative",
    },
    loading: {
      position: "absolute",
    },
    customError: {
      color: "red",
      margin: "1rem 0 0 0",
    },
  },
};
