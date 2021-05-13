import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../components/UIkit";
import { initialStateUsersType } from "../reducks/store/type";
import { signOut } from "../reducks/users/operations";
import { getUserId, getUsername } from "../reducks/users/selectors";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        delailBox: {
            marginTop: "16px",
            textAlign: "left",
            [theme.breakpoints.down("sm")]: {
                width: 320,
            },
            [theme.breakpoints.up("sm")]: {
                width: 512,
            },
        },
        menuBox: {
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 4,
            boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
            height: 356,
            margin: "24px auto 16px auto",
            padding: 16,
            width: 288,
        },
    })
);

const User: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selector = useSelector((state: { users: initialStateUsersType }) => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);

    return (
        <div className="c-section-wrapin">
            <h2 className="u-text__headline">ユーザー情報</h2>
            <div className="p-grid__row">
                <div className={classes.delailBox}>
                    <p>ユーザー名:{username}</p>
                    <p>ユーザーID:{uid}</p>
                </div>
                <div className={classes.menuBox}>
                    <PrimaryButton
                        color={"primary"}
                        label={"購入履歴"}
                        onClick={() => dispatch(push("/order/history"))}
                    />
                    <PrimaryButton color={"secondary"} label={"ログアウト"} onClick={() => dispatch(signOut())} />
                </div>
            </div>
        </div>
    );
};

export default User;
