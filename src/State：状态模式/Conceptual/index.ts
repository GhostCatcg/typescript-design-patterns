/**
 * State Design Pattern
 * 状态 - 设计模式
 * 
 * Intent: Lets an object alter its behavior when its internal state changes. It
 * appears as if the object changed its class.
 * 意图:当对象的内部状态改变时，允许对象改变其行为。看起来好像对象改变了它的类。
 */

/**
 * The Context defines the interface of interest to clients. It also maintains a
 * reference to an instance of a State subclass, which represents the current
 * state of the Context.
 * Context定义了客户端感兴趣的接口。它还维护对State子类实例的引用，该实例表示Context的当前状态。
 */
class Context {
    /**
     * @type {State} A reference to the current state of the Context.
     * @type {State} 对上下文当前状态的引用。
     */
    private state: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * The Context allows changing the State object at runtime.
     * Context允许在运行时更改State对象。
     */
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * The Context delegates part of its behavior to the current State object.
     * Context将其部分行为委托给当前State对象。
     */
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }
}

/**
 * The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 * 基类State声明了所有Concrete State都应该实现的方法，还提供了与State相关联的Context对象的反向引用。
 * 各国可以使用这种后向引用将上下文转移到另一个国家。
 */
abstract class State {
    protected context: Context;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}

/**
 * Concrete States implement various behaviors, associated with a state of the
 * Context.
 * 具体状态实现与上下文状态相关联的各种行为。
 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA handles request1.');
        console.log('ConcreteStateA wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log('ConcreteStateA handles request2.');
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB handles request1.');
    }

    public handle2(): void {
        console.log('ConcreteStateB handles request2.');
        console.log('ConcreteStateB wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * The client code.
 * 客户端代码。
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
