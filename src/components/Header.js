import { Container, Grid, Hidden, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  prefix,
  provider,
  _changeChain,
  _checkLogin,
} from "../onchain/onchain";
import { AppConfig } from "../settings";
import { StatusList } from "../settings/constants";
import { ENDPOINT_USER_LOGIN_WITH_SIGNATURE } from "../settings/endpoint";
import { ErrorCode } from "../settings/errorCode";
import { _getMintingBoxInformation } from "../store/actions/mintingActions";
import {
  _addPartnerRef,
  _addRef,
  _getBalance,
  _getMyItems,
  _getNewProfile,
  _getOnchainBalance,
  _getRIUserType,
  _getWalletLogout,
  _handleLogout,
  _handleProfileLogout,
  _removeWalletSignature,
  _setWalletAddress,
  _setWalletName,
} from "../store/actions/userActions";
import { ReduxConstant } from "../store/constants";
import { post } from "../utils/api";
import { logout, setAccessToken } from "../utils/auth";
import ConfirmChangeChain from "./header/ConfirmChangeChain";
import LoggedProfile from "./header/LoggedProfile";
import LoginPopup from "./header/LoginPopup";
import MyWallet from "./header/MyWallet";
import SignPopup from "./header/SignPopup";
import SubMenu from "./header/SubMenu";

function Header() {
  const { user, setting } = useSelector((state) => state);
  const {
    walletAddress,
    walletName,
    walletSignature,
    information,
    profileLoading,
  } = user;
  const dispatch = useDispatch();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  const { library, config, applicationConfig } = setting;
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [showSignPopup, setShowSignPopup] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletName) {
      _checkLogin(
        walletName,
        (address) => {
          dispatch(_setWalletAddress(address));
          dispatch(_setWalletName(walletName));
        },
        () => {
          dispatch(_getWalletLogout());
        }
      );
    } else {
      logout();
    }
  }, [dispatch, walletName]);

  useEffect(() => {
    if (config && walletAddress) {
      dispatch(_getOnchainBalance(config.contracts, walletAddress, provider));
    }
  }, [config, dispatch, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      if (
        Number(prefix.networkVersion) !== AppConfig.BLOCKCHAIN.domain.chainId
      ) {
        setShowModalConfirm(true);
      }
      prefix.on("accountsChanged", (address) => {
        if (address[0]) {
          dispatch(_handleProfileLogout());
          dispatch(_setWalletAddress(address[0]));
        } else {
          dispatch(_getWalletLogout());
          dispatch(_handleLogout());
          logout();
        }
      });
      prefix.on("chainChanged", (newNetwork) => {
        if (Number(newNetwork) !== AppConfig.BLOCKCHAIN.domain.chainId) {
          setShowModalConfirm(true);
        }
      });
    }
  }, [dispatch, walletAddress]);

  const _closeModalConfirm = () => {
    setShowModalConfirm(false);
    dispatch(_getWalletLogout());
  };

  const _onAccept = () => {
    _changeChain(() => setShowModalConfirm(false));
  };

  useEffect(() => {
    dispatch(_addRef());
    dispatch(_addPartnerRef());
    if (walletAddress) {
      dispatch(_getMintingBoxInformation(walletAddress));
    }
  }, [dispatch, walletAddress]);

  useEffect(() => {
    if (location) setPathname(location.pathname);
  }, [location]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getReCaptcha = async (successCallback) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("login");
    if (successCallback) successCallback(token);
  };

  useEffect(() => {
    if (executeRecaptcha) {
      if (
        walletAddress &&
        walletSignature &&
        walletSignature !== StatusList.UNKNOWN &&
        applicationConfig
      ) {
        _loginBySignature(walletSignature);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationConfig, executeRecaptcha, walletSignature]);

  useEffect(() => {
    if (walletSignature === StatusList.UNKNOWN) {
      setLoading(false);
      dispatch({
        type: ReduxConstant.SET_USER_PROFILE_LOADING,
        payload: false,
      });
    }
  }, [dispatch, walletSignature]);

  useEffect(() => {
    if (information) {
      setLoading(false);
    }
  }, [information]);

  const _loginBySignature = async (signature) => {
    getReCaptcha((reCaptcha) => {
      setLoading(true);
      post(
        ENDPOINT_USER_LOGIN_WITH_SIGNATURE,
        {
          signature,
          message: applicationConfig.ARR_SIGN_MESSAGE.HUMAN,
          address: walletAddress,
          reCaptcha,
        },
        (data) => {
          setAccessToken(data.accessToken);
          dispatch(_getNewProfile());
          dispatch(_getMyItems());
          dispatch(_getBalance());
          dispatch(_getRIUserType());
        },
        (error) => {
          setLoading(false);
          if (error.code === ErrorCode.ACCOUNT_NOTFOUND) {
            setAccountNotFound(true);
          } else {
            toast.error(error.msg);
            dispatch(_removeWalletSignature());
          }
        }
      );
    });
  };

  return (
    <>
      <div id="header">
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Link to="/" className="logo-web">
                <img src="/logo.png" alt="" />
              </Link>
            </Grid>
            <Hidden mdDown>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{ height: 80 }}
              >
                {!profileLoading &&
                  AppConfig.MAIN_MENUS.map(
                    (item, index) =>
                      (!item.isLogged || (item.isLogged && information)) && (
                        <Link
                          to={item.url[0]}
                          key={index}
                          className={`nav-link ${
                            item.url.includes(pathname) && "active"
                          }`}
                        >
                          <Typography
                            variant="body1"
                            className="custom-font"
                            fontWeight={600}
                          >
                            {library[item.title]}
                          </Typography>
                        </Link>
                      )
                  )}
              </Grid>
            </Hidden>
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LoggedProfile
                _handleSignClick={() => setShowSignPopup(true)}
                loading={loading}
              />
              <MyWallet />
              <SubMenu />
            </Grid>
          </Grid>
        </Container>
      </div>
      <LoginPopup
        open={accountNotFound}
        _handleClose={() => setAccountNotFound(false)}
      />
      <SignPopup
        open={showSignPopup}
        _onClose={() => setShowSignPopup(false)}
      />
      <ConfirmChangeChain
        open={showModalConfirm}
        _onClose={_closeModalConfirm}
        _onAccept={_onAccept}
      />
    </>
  );
}

export default Header;
