import { RouterState } from "connected-react-router";
import { Store, $CombinedState, AnyAction } from "redux";
import { History } from "history";
import { FFD } from "../../firebase/types";

export type CreateStore = (
    history: History<unknown>
) => Store<
    {
        readonly [$CombinedState]?: undefined;
    } & {
        products: {
            list: never[];
        };
        router: RouterState<unknown>;
        users: {
            isSignedIn: boolean;
            role: string;
            uid: string;
            username: string;
        };
    },
    AnyAction
>;

export type initialStateUsersType = {
    favorite: [];
    cart: [];
    orders: [];
    isSignedIn: boolean;
    role: string;
    uid: string;
    username: string;
};

export type initialStateProductsType = {
    router: FFD;
    products: {
        list: [];
    };
};
