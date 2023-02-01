/**
 * @author: Leonid Vinikov <leonidvinikov@gmail.com>
 */
import { useSelector } from "react-redux";

export const useAppSelector = <T>( selector: ( state: any ) => T ) => useSelector( selector );

export default useAppSelector;
