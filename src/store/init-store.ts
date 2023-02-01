import ZenCore from "@zenflux/core";

import Controller from "../core/controller";

import { configureStore } from "@reduxjs/toolkit";

import { shared } from "./shared";

/**
 * Should be called after registering of all controllers.
 **/
export function initStore() {
    if ( Object.keys( shared.store ).length ) {
        throw new Error( "Store already initialized" );
    }

    // Filter out the controllers which are part of redux controllers.
    const controllers = Object.values( ZenCore.managers.controllers.getAll() ).filter(
        ( controller: any ) => controller instanceof Controller
    ) as Controller[];

    if ( ! controllers.length ) {
        throw new Error( 'initStore() cannot be called without available controllers.' );
    }

    const reducer: any = {},
        slices = Object.values( controllers )
            .map( ( controller ) => controller.getSlice() )
            .filter( ( x ) => !! x )

    if ( ! slices.length ) {
        throw new Error( 'initStore() cannot be called without available slices.' );
    }

    slices.forEach( ( slice ) => {
        reducer[ slice.name ] = slice.reducer;
    } );

    shared.store = configureStore( { reducer } )

    return shared.store;
}
