// import { NavigationActions } from "react-navigation";

export const actionCreator = (action: string) : {REQUESTED: string, COMPLETED: string, FAILED: string, } => 
   {
        return {
            REQUESTED: `${action}::Requested`,
            COMPLETED: `${action}::Completed`,
            FAILED: `${action}::Failed`,
       };
   };

export const CONFIG_LOAD = actionCreator('configartor::load');
export const CONFIG_SAVE = actionCreator('configurator::save');

export const SERVICE_LOAD = actionCreator('service::load');
export const SERVICE_SAVE = actionCreator('service::save');

export const CREDENTIALS = actionCreator('credentials');

export const NAVIGATION_GO_TO = 'Navigation:: go to';

export const LOG_MESSAGE = 'Messages Login::';

export const navigate = (params: any) => {
    return {
        type: NAVIGATION_GO_TO,
        params,
    }
}   

export const getLatestAction = () => {
    return {
        type: SERVICE_LOAD.REQUESTED,
    }
}   
