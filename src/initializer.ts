// @ts-ignore
import pkg from "../package.json";

import * as exported from './exports';

declare global {
    var ZenRedux: any;
    var __ZEN_REDUX__IS_INITIALIZED__: boolean;
}

function errorInitTwice() {
    if ( 'undefined' !== typeof __ZEN_REDUX__IS_INITIALIZED__ && __ZEN_REDUX__IS_INITIALIZED__ ) {
        throw new Error( 'ZenRedux is already initialized.' );
    }
}

errorInitTwice();

export let config: any = {
    version: pkg.version,
};

export const ReduxAPI = {

    initialize: ( configuration?: any ) => {
        errorInitTwice();

        config = configuration || config;

        exported.managers.routes = new exported.managerBases.Routes();

        globalThis.__ZEN_REDUX__IS_INITIALIZED__ = true;
    },

    destroy: () => {
        exported.managers.routes = {} as exported.managerBases.Routes;

        globalThis.__ZEN_REDUX__IS_INITIALIZED__ = false;
    },

    config,

    ...exported
};


// TODO: Make it available only for development.
if ( ! globalThis?.ZenRedux ) globalThis.ZenRedux = ReduxAPI;
