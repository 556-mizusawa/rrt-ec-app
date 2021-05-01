import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/img/icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { initialStateUsersType } from "../../reducks/store/type";
import { push } from "connected-react-router";
import { ClosableDrawer, HeaderMenus } from "./index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt="logo"
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
