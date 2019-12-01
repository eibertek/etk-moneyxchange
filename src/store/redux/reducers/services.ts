import { SERVICE_LOAD, CREDENTIALS, LOG_MESSAGE } from "../actions";

declare interface ConfigState {
    moneyxchange: {};
    historical: [],
    messages:[],
    loggedMessage:[],
    credentials: {},
    isLoading: boolean;
}

export const initialConfigState:ConfigState = {
    moneyxchange: {},
    historical: [],
    messages:[],
    loggedMessage:[],
    credentials: {},    
    isLoading: false,
};

export interface ITodoAction {
    type: string;
    moneyxchange?: {};
    historical?: [];
    loggedMessage:[],
    credentials?: {};    
    message?:string;
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
            return { ...state, loading: false, config:{}, messages: action.message };
        case CREDENTIALS.REQUESTED:
                return { ...state, loading: true, };
        case CREDENTIALS.COMPLETED:
            return { ...state, loading: true, credentials: action.credentials};   
        case CREDENTIALS.FAILED:
            return { ...state, loading: true, messages: action.message};     
        case LOG_MESSAGE:
                return { ...state, loading: true, loggedMessage: [...state.loggedMessage, action.message]};                                                            
        default:
            return state
    }
}