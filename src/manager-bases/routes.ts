/**
 * @author: Leonid Vinikov <leonidvinikov@gmail.com>
 */
import ZenCore, { commandBases } from '@zenflux/core';

import { CommandRoute } from "../command-bases/command-route";

import Controller from "../core/controller";

import { IRouteCallbackType } from "../interfaces/";

import { getStore } from "../store";

export class Routes extends ZenCore.managerBases.Commands {
    public currentRoute: { [ key: string ]: CommandRoute } = {};
    public historyRoute: CommandRoute[] = [];

    static getName() {
        return 'Redux/Managers/Routes';
    }

    async to( route: string, args = {} ) {
        return await super.run( route, args );
    }

    register( commands: { [ key: string ]: typeof commandBases.CommandBase | IRouteCallbackType }, controller: Controller ) {
        for ( let key in commands ) {
            const command = commands[ key ],
                CommandRouteClass = class extends CommandRoute {}; // Unique class each iteration.

            /**
             * Since we get callback that looks like this 'name' => callback, but we need
             * convert the callback to class that have the name and the controller, so we wrap it
             * with this little trick.
             */
            CommandRouteClass.setConfig( {
                controller,
                command: command as typeof commandBases.CommandBase,
                callback: command as IRouteCallbackType,
            } );

            commands[ key ] = CommandRouteClass;
        }

        return super.register( commands as { [ key: string ]: typeof commandBases.CommandBase }, controller );
    }

    protected attachCurrent( route: CommandRoute, args: any = {} ) {
        super.attachCurrent( route, args );

        const lastRoute = this.historyRoute[ this.historyRoute.length - 1 ],
            controller = route.getController(); // Get the controller of the route.

        if (  lastRoute?.getName() === route.getName() ) {
            return this.getLogger().debug( 'Route is the same as the last one, skipping dispatch.' );
        }

        // Tell to redux store the current route.
        getStore().dispatch(
            controller.getSlice().actions.set( route.getName() )
        );

        // Acknowledge the manager about the route.
        this.currentRoute[ controller.getName() ] = route;

        // Save the route to history.
        this.historyRoute.push( route );
    }
}

export default Routes;
