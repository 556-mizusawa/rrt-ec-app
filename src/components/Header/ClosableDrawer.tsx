import React, { useCallback, useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import SerchIcon from "@material-ui/icons/Search";
import AddCirecleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextInput } from "../UIkit/index";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { RME } from "./type";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up("sm")]: {
                flexShrink: 0,
                width: 256,
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 400,
        },
        searchField: {
            alignItems: "center",
            display: "flex",
            marginLeft: 32,
            width: 350,
        },
        searchIcon: {
            marginTop: 16,
        },
    })
);

const ClosableDrawer: React.FC<{
    open: boolean;
    onClose: (event: RME) => void;
    container?: React.ReactInstance | null;
}> = (props) => {
    const classes = useStyles();
    const { container } = props;
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState<string>("");

    const inputKeyword = useCallback(
        (event) => {
            setKeyword(event.target.value);
        },
        [setKeyword]
    );

    const selectMenu = (event: RME, path: string) => {
        dispatch(push(path));
        props.onClose(event);
    };

    const [filters, setFilters] = useState([
        { func: selectMenu, label: "全て", id: "all", value: "/" },
        { func: selectMenu, label: "メンズ", id: "male", value: "/?gender=male" },
        { func: selectMenu, label: "レディース", id: "female", value: "/?gender=female" },
    ]);

    const menus = [
        { func: selectMenu, label: "商品登録", icon: <AddCirecleIcon />, id: "register", value: "/product/edit" },
        { func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history" },
        { func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage" },
    ];

    useEffect(() => {
        db.collection("categories")
            .orderBy("order", "asc")
            .get()
            .then((snapshots) => {
                const list: {
                    func: (event: RME, path: string) => void;
                    label: string;
                    id: string;
                    value: string;
                }[] = [];
                snapshots.forEach((snapshot) => {
                    const category = snapshot.data();

                    list.push({
                        func: selectMenu,
                        label: category.name,
                        id: category.id,
                        value: `/?category=${category.id}`,
                    });
                });
                setFilters((prevState) => [...prevState, ...list]);
            });
    }, []);

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e: RME) => props.onClose(e)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}>
                <div>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={true}
                            label={"キーワードを入力"}
                            multiline={false}
                            onChange={inputKeyword}
                            required={false}
                            rows={1}
                            value={keyword}
                            type={"text"}
                        />
                        <IconButton className={classes.searchIcon}>
                            <SerchIcon />
                        </IconButton>
                    </div>
                    <List>
                        {menus.map((menu) => (
                            <ListItem
                                button
                                key={menu.id}
                                onClick={(e) => {
                                    menu.func(e, menu.value);
                                }}>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map((filter) => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
};

export default ClosableDrawer;
