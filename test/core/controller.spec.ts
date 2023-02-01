import ZenRedux from '../../src/';
import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IItem {
    id: number | null;
}

export class ItemState {
    items: IItem[] = [];
}

export interface IItemReducers extends SliceCaseReducers<ItemState> {
    addItem: CaseReducer<ItemState, PayloadAction<IItem>>;
    removeItem: CaseReducer<ItemState, PayloadAction<IItem>>;
}

describe( 'Core', () => {
    describe( 'Controller', () => {
        it( 'The slice of the controller should be aware of the reducer actions', () => {
            // Arrange.
            class Controller extends ZenRedux.core.Controller {
                getSliceInitialState(): ItemState {
                    return new ItemState();
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
