/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for controllers with hold a state of component.
 */
import {
    createSlice,
    PreloadedState,
    Slice,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

import ZenCore from '@zenflux/core';

import { getStore } from "../store";

export abstract class Controller extends ZenCore.core.Controller {
    private slice: Slice;

    static getName() {
        return 'Redux/Core/Controller'
    }

    constructor() {
        super();

        this.createSlice();
    }

    abstract getSliceInitialState(): PreloadedState<any>

    abstract getReducers(): SliceCaseReducers<any>;

    getSlice() {
        return this.slice;
    }

    getState(): any {
        return getStore().getState()[ this.getName() ]
    }

    private createSlice() {
        const currentConstructor = ( this.constructor as typeof Controller );

        this.slice = createSlice( {
            name: currentConstructor.getName(),
            initialState: this.getSliceInitialState(),
            reducers: this.getReducers(),
        } );
    }
}

export default Controller;
