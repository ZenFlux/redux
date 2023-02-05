import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IRouterControllerState {
    at: number;
    history: string[];
    current: string;
}

export interface IControllerReducers extends SliceCaseReducers<IRouterControllerState> {
    set: CaseReducer<IRouterControllerState, PayloadAction<string>>;
}
