import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {deleteAccountCredentials, fetchAccountDetailsAsync, setAccountCredentials} from "../actions/account";
import { AccountCredentials, AccountDetails } from 'FeatchainTypes';
import {createIssuerAsync} from "../actions/issuer";
import {isIssuerAccount} from "featchain-blockchain";

export type AccountState = Readonly<{
    readonly isLoading: boolean;
    readonly waitingConversion: boolean;
    readonly entity: Partial<AccountCredentials & {
        details: AccountDetails;
    }>;
}>

export const initialState: AccountState = {
    isLoading: false,
    waitingConversion: false,
    entity: {
        address: window.APP_CONFIG.REACT_APP_FEATCHAIN_DEFAULT_ACCOUNT_ADDRESS,
        passphrase: window.APP_CONFIG.REACT_APP_FEATCHAIN_DEFAULT_ACCOUNT_PASSPHRASE,
    },
};

export default combineReducers({
    isLoading: createReducer(initialState.isLoading)
        .handleAction([fetchAccountDetailsAsync.request], () => true)
        .handleAction([
            fetchAccountDetailsAsync.success,
            fetchAccountDetailsAsync.failure,
        ], () => false),
    entity: createReducer(initialState.entity)
        .handleAction(setAccountCredentials, (state, action) => action.payload)
        .handleAction(fetchAccountDetailsAsync.success, (state, action) => {
            return {
                ...state,
                details: action.payload,
            }
        })
        .handleAction(deleteAccountCredentials, () => ({})),
    waitingConversion: createReducer(initialState.waitingConversion)
        .handleAction(createIssuerAsync.success, () => true)
        .handleAction(fetchAccountDetailsAsync.success, (state, action) => {
            if (isIssuerAccount(action.payload)) return false;
            return state;
        })
});
