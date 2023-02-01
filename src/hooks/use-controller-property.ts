/**
 * @author: Leonid Vinikov <leonidvinikov@gmail.com>
 */
import useAppSelector from "./use-app-selector";

export function useControllerProperty( name: string, property: string ) {
    return useAppSelector( state => state[ name ][ property ] );
}

export default useControllerProperty;
