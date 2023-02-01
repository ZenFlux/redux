/**
 * @author: Leonid Vinikov <leonidvinikov@gmail.com>
 */
import useControllerProperty from "./use-controller-property";

export function useCurrentRoute( controllerName: string ) {
    return useControllerProperty( controllerName, 'current' )
        ?.replace( `${ controllerName }/`, '' );
}

export default useCurrentRoute;
