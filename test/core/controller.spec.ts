import ZenRedux from '../../src/';
import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IItem {
    id: number | null;
}

export class IItemState {
    items: IItem[] = [];
}

export interface IItemReducers extends SliceCaseReducers<IItemState> {
    addItem: CaseReducer<IItemState, PayloadAction<IItem>>;
    removeItem: CaseReducer<IItemState, PayloadAction<IItem>>;
}

describe( 'Core', () => {
    describe( 'Controller', () => {
        it( 'The slice of the controller should be aware of the reducer actions', () => {
            // Arrange.
            class Controller extends ZenRedux.core.Controller {
                getSliceInitialState(): IItemState {
                    return new IItemState();
                }

                getReducers(): IItemReducers {
                    return {
                        addItem: ( state, action ) => {
                            state.items.push( action.payload );
                        },
                        removeItem: ( state, action ) => {
                            state.items = state.items.filter( item => item.id !== action.payload.id );
                        }
                    }
                }
            }

            // Act.
            const controller = new Controller();

            // Assert.
            expect( controller.getSlice().actions.addItem ).toBeDefined();
            expect( controller.getSlice().actions.removeItem ).toBeDefined();
        } );
    } );
} );
