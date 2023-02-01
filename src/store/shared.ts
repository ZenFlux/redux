import { AnyAction, EnhancedStore } from "@reduxjs/toolkit";

export const shared = {
    store: {} as EnhancedStore<any, AnyAction, any>,
}

export default shared;
