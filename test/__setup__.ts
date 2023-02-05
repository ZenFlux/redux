import ZenFlux from "@zenflux/core";
import ZenRedux from "../src/";

beforeAll( async () => {
    // Do something.
 });

beforeEach(async () => {
    ZenFlux.initialize();
    ZenRedux.initialize();
} );

afterEach(() => {
    ZenFlux.destroy();
    ZenRedux.destroy();

    jest.resetModules();
    jest.restoreAllMocks();
} );
