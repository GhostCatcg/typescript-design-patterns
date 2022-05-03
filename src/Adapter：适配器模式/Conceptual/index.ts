/**
 * Adapter Design Pattern
 * 适配器 - 设计模式
 *
 * Intent: Provides a unified interface that allows objects with incompatible
 * 目的:提供一个统一的接口，允许不兼容的对象
 * interfaces to collaborate.
 * 接口合作。
 */

/**
 * The Target defines the domain-specific interface used by the client code.
 * Target定义客户端代码使用的特定于领域的接口。
 */
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * Adaptee包含一些有用的行为，但它的接口是不兼容的
 * with the existing client code. The Adaptee needs some adaptation before the
 * 使用现有的客户机代码。被适应性者需要在
 * client code can use it.
 * 客户端代码可以使用它。
 */
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * Adapter使Adaptee的接口与Target的接口兼容
 * interface.
 */
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

/**
 * The client code supports all classes that follow the Target interface.
 * 客户端代码支持遵循Target接口的所有类。
 */
function clientCode(target: Target) {
    console.log(target.request());
}

// 客户端：我可以很好地处理目标对象
console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

// 客户端：Adaptee类有一个奇怪的接口。看，我不明白:
const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

// 客户端：但我可以通过适配器来处理它:
console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
