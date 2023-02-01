import useAppSelector from './use-app-selector';

export function useController( name: string ) {
    return useAppSelector( state => state[ name ] );
}

export default useController;
