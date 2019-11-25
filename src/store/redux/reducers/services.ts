import { SERVICE_LOAD } from "../actions";

declare interface ConfigState {
    moneyxchange: {};
    historical: [],
    isLoading: boolean;
}

export const initialConfigState:ConfigState = {
    moneyxchange: {},
    historical: [],
    isLoading: false,
};

export interface ITodoAction {
    type: string;
    moneyxchange: {};
    historical: [];
    message:String;
};

export function servicesReducer(state: ConfigState = initialConfigState, action: ITodoAction) {
    switch (action.type) {
        case SERVICE_LOAD.REQUESTED:
            return { ...state, loading: true, }
        case SERVICE_LOAD.COMPLETED:
            const moneyxchange = action.moneyxchange ? action.moneyxchange : state.moneyxchange;
            const historical = action.historical ? action.historical : state.historical;
            return { ...state, loading: false, moneyxchange, historical };
        case SERVICE_LOAD.FAILED:
            return { ...state, loading: false, config:{}, message: action.message };
        default:
            return state
    }
}