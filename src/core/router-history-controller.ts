import RouterController from "./router-controller";

/**
 * TODO: This controller should support native history API.
 */
abstract class RouterHistoryController extends RouterController {
    static getName() {
        return 'Redux/Core/RouterHistoryController';
    }
}
