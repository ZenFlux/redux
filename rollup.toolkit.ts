import { WarningHandlerWithDefault } from "rollup";
import { IZenToolkitConfig } from "@zenflux/rollup-toolkit";

const onWarn: WarningHandlerWithDefault = ( warning, warn ) => {
    // Handle issue with redux/toolkit.
    if ( warning.code === 'THIS_IS_UNDEFINED' ) {
        return false;
    }
};

const config: IZenToolkitConfig = {
    toolkitOptions,
    format: [ 'es' ],
    extensions: [ '.ts' ],
    inputFileName: 'src/index.ts',
    outputName: '@zenflux/redux',
    outputFileName: 'zenflux-redux',
    external: [
        '@babel/runtime',
        '@reduxjs/toolkit',
        '@zenflux/core',
        'react',
        'react-dom',
        'react-redux'
    ],
    'onWarn': onWarn,
};

export default config;
