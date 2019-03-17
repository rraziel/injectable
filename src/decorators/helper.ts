import {MethodInfoBuilder, PropertyInfoBuilder} from '../metadata';

type MethodOrPropertyDecorator = <T>(target: Object|Function, propertyKey: string|symbol, descriptor?: TypedPropertyDescriptor<T>) => void;
type ParameterOrPropertyDecorator = (target: Object|Function, propertyKey: string|symbol, parameterIndex?: number) => void;
type MethodInfoCallback = (methodInfoBuilder: MethodInfoBuilder, parameterIndex: number) => void;
type PropertyInfoCallback = (propertyInfoBuilder: PropertyInfoBuilder) => void;

/**
 * Applied decorator parameters
 */
class AppliedDecoratorParameters {
    decoratorName: string;
    target: Object;
    propertyKey: string|symbol;
    parameterIndex: number;
    propertyInfoCallback: PropertyInfoCallback;
    methodInfoCallback: MethodInfoCallback;
}

/**
 * Apply a parameter or property decorator
 * @param parameters Applied decorator parameters
 */
function applyParameterOrPropertyDecorator(parameters: AppliedDecoratorParameters): void {
    const decoratorName: string = parameters.decoratorName;
    const target: Object = parameters.target;
    const propertyKey: string|symbol = parameters.propertyKey;
    const parameterIndex: number = parameters.parameterIndex;

    if (target instanceof Function && propertyKey !== undefined) {
        throw new Error(`the @${decoratorName} decorator cannot be applied to static method or property ${target.name}.${propertyKey as string}`);
    }

    if (parameterIndex === undefined) {
        const propertyInfoBuilder: PropertyInfoBuilder = PropertyInfoBuilder.of(target, propertyKey);
        parameters.propertyInfoCallback(propertyInfoBuilder);
    } else {
        const methodInfoBuilder: MethodInfoBuilder = MethodInfoBuilder.of(target, propertyKey);
        parameters.methodInfoCallback(methodInfoBuilder, parameterIndex);
    }
}

/**
 * Create a parameter or property decorator
 * @param decoratorName        Decorator name
 * @param propertyInfoCallback Property information callback
 * @return Decorator
 */
function createParameterOrPropertyDecorator(decoratorName: string, propertyInfoCallback: PropertyInfoCallback, methodInfoCallback: MethodInfoCallback): ParameterOrPropertyDecorator {
    return (target, propertyKey, parameterIndex?) => applyParameterOrPropertyDecorator({
        decoratorName: decoratorName,
        target: target,
        propertyKey: propertyKey,
        parameterIndex: parameterIndex,
        propertyInfoCallback: propertyInfoCallback,
        methodInfoCallback: methodInfoCallback
    });
}

export {
    MethodInfoCallback,
    ParameterOrPropertyDecorator,
    PropertyInfoCallback,
    AppliedDecoratorParameters,
    applyParameterOrPropertyDecorator,
    createParameterOrPropertyDecorator,
    MethodOrPropertyDecorator
};
