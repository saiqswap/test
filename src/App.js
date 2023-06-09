import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Box } from "@mui/system";
import "animate.css";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "./components/common/ErrorComponent";
import Loader from "./components/common/Loader";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import routes from "./routes";
import {
  CAPTCHA_KEY,
  DEFAULT_PROJECT_TITLE,
  GOOGLE_SIGN_IN_CLIENT_KEY,
} from "./settings/constants";
import {
  _changeLanguage,
  _getApplicationConfig,
  _getConfig,
  _getTemplates,
} from "./store/actions/settingActions";
import { _getWalletInformation } from "./store/actions/userActions";
import "./styles/main.scss";
import "./styles/boxes-page.scss";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { profileLoading } = user;

  let theme = createTheme();
  theme = createTheme(theme, {
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
      color: "var(--text-color)",
      h3: {
        [theme.breakpoints.down("md")]: {
          fontSize: "2.5rem",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.5rem",
        },
      },
      h2: {
        [theme.breakpoints.down("md")]: {
          fontSize: "2.75rem",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.75rem",
        },
      },
    },
  });

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("dark", true);
    dispatch(_getConfig());
    dispatch(_getTemplates());
    dispatch(_changeLanguage(localStorage.getItem("lang")));
    dispatch(_getWalletInformation());
    dispatch(_getApplicationConfig());
    console.log("Infinity Angel Marketplace - Ver 0.1.2 - ING Staking");
  }, [dispatch]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_SIGN_IN_CLIENT_KEY,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={CAPTCHA_KEY} language={"en"}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Header />
            <ErrorComponent />
            {profileLoading ? <Loader /> : <ModalSwitch />}
            {/* <Hidden mdUp>
            <BottomMenu />
          </Hidden> */}
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      {routes.map((item, index) => (
        <AuthRoute
          exact={item.exact}
          path={item.path}
          component={item.component}
          type={item.type}
          title={item.title}
          children={item.children}
          key={index}
          isActive={item.isActive}
        />
      ))}
    </Switch>
  );
}

const AuthRoute = (props) => {
  const { type, title, isActive } = props;
  const { user } = useSelector((state) => state);
  const { information } = user;
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (information) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [information]);

  useEffect(() => {
    if (title) {
      document.title = title + " | " + DEFAULT_PROJECT_TITLE;
    } else {
      document.title = DEFAULT_PROJECT_TITLE;
    }
  }, [title]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (type === "login" && loggedIn) {
    return <Redirect to="/" />;
  }
  if (type === "private" && !loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Box pt={10} pb={5} minHeight="100vh">
        {isActive ? <Route {...props} /> : <ErrorPage />}
      </Box>
      {/* <Hidden mdUp>
        <BottomMenu />
      </Hidden> */}
    </>
  );
};
