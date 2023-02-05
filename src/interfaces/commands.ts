import Controller from "../core/controller";
import ZenCore from "@zenflux/core";

export type IRouteCallbackType = ( {}, {} ) => void;

export interface ICommandRouteConfig {
    callback: IRouteCallbackType;
    controller: Controller;
    command: typeof ZenCore.commandBases.CommandBase;
}
