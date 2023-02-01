import React from "react";

export const usePrevious = <T extends unknown>( value: T ): T | undefined => {
    const ref = React.useRef<T>();

    React.useEffect( () => {
        ref.current = value;
    } );

    return ref.current;
};

export default usePrevious;
