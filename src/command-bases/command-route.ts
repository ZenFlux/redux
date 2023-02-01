/**
 * @author: Leonid Vinikov <leonidvinikov@gmail.com>
 */
import ZenCore from '@zenflux/core';

import Controller from "../core/controller";

export type IRouteCallback = ( {}, {} ) => void;

export interface ICommandRouteConfig {
    callback: IRouteCallback;
    controller: Controller;
    command: typeof ZenCore.commandBases.CommandBase;
}

/**
 * Since routes are only callbacks, this wrapper will handle the naming & applying of the command(route).
 */
export class CommandRoute extends ZenCore.commandBases.CommandPublic {
    private static config = {} as ICommandRouteConfig;

    public static setConfig( config: ICommandRouteConfig ) {
        this.config = config;
    }

    public static getController() {
        return this.config.controller;
    }

    static getName() {
        return `${ this.getController().getName() }/${ this.config.command.name }`;
    }

    public getController() {
        return ( this.constructor as typeof CommandRoute ).getController();
    }

    apply( args = {}, options = {} ) {
        // Since routes have only callback
        const callback = ( this.constructor as typeof CommandRoute ).config.callback;

        callback( args, options );
    }
}

export default CommandRoute;
