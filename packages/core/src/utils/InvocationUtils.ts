
/**
 * Invocation utility functions
 */
class InvocationUtils {

    /**
     * Call a method and wait for it to complete if it is asynchronous
     * @param instance         Instance
     * @param methodName       Method name
     * @param methodParameters Method parameters
     * @return Promise that resolves once the method has been called
     */
    static async waitForResult<T>(instance: T, methodName: string, ...methodParameters: Array<any>): Promise<any> {
        const instanceMethod: Function = (instance as any)[methodName] as Function;
        let methodResult: Promise<any>;

        methodResult = instanceMethod.apply(instance, methodParameters) as any|Promise<any>;
        if (methodResult && methodResult.then && methodResult.catch) {
            return await methodResult;
        }

        return methodResult;
    }

}

export {
    InvocationUtils
};
