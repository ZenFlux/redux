/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for routing, each route is command, each controller have routes.
 */
import Controller from "./controller";

import { CommandRoute } from "../command-bases/";

import { routes } from '../managers/'

import { IControllerReducers, IRouterControllerState } from "../interfaces/";

export abstract class RouterController extends Controller {
    routes: { [ key: string ]: typeof CommandRoute } = {};

    static getName() {
        return 'Redux/Core/RouterController'
    }

    register() {
        super.register();

        this.registerRoutes();
    }

    registerRoutes() {
        this.routes = routes.register( this.getRoutes(), this ) as
            { [ key: string ]: typeof CommandRoute };
    }

    getSliceInitialState(): IRouterControllerState {
        return {
            at: 0,
            history: [ '' ],
            current: '',
        }
    }

    getReducers(): IControllerReducers {
        return {
            set: ( state, action ) => {
                state.current = action.payload;
                state.history.push( action.payload );
            },
        };
    }

    /**
     * Function getRoutes() : should return an object of routes.
     *
     * @notice First route in the object is always representing the default route.
     */
    abstract getRoutes(): { [ key: string ]: typeof CommandRoute }
}

export default RouterController;
