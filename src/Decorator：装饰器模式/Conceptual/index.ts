/**
 * Decorator Design Pattern
 * 装饰器 - 设计模式
 *
 * Intent: Lets you attach new behaviors to objects by placing these objects
 * inside special wrapper objects that contain the behaviors.
 * 意图:通过将这些对象放置在包含行为的特殊包装对象中，可以将新的行为附加到对象上。
 */

/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 * 基本的Component接口定义了可以由装饰器更改的操作。
 */
interface Component {
    operation(): string;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 * 具体组件提供了操作的默认实现。这些类可能有几种变体。
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 * 基本Decorator类遵循与其他组件相同的接口。
 * 这个类的主要目的是定义所有具体装饰器的包装接口。
 * 包装代码的默认实现可能包括用于存储包装组件的字段和初始化它的方法。
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * The Decorator delegates all work to the wrapped component.
     * Decorator将所有工作委托给包装的组件。
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 * 具体装饰器调用被包装的对象并以某种方式改变其结果。
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     * 装饰器可以调用操作的父类实现，
     * 而不是直接调用包装好的对象。
     * 这种方法简化了装饰器类的扩展。
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 * 装饰器可以在调用被包装的对象之前或之后执行它们的行为。
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 * 客户端代码使用组件接口与所有对象一起工作。
 * 这样它就可以独立于它所处理的组件的具体类。
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support both simple components...
 * 通过这种方式，客户端代码可以支持两个简单的组件……
 */
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as decorated ones.
 * ...还有装饰过的。
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 * 注意装饰器不仅可以包装简单的组件，还可以包装其他装饰器。
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
