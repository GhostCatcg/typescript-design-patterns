/**
 * Facade Design Pattern
 * 外观模式
 * 
 * Intent: Provides a simplified interface to a library, a framework, or any
 * other complex set of classes.
 * 意图:提供一个简化的接口来访问一个库、框架或任何其他复杂的类集合。
 */

/**
 * The Facade class provides a simple interface to the complex logic of one or
 * several subsystems. The Facade delegates the client requests to the
 * appropriate objects within the subsystem. The Facade is also responsible for
 * managing their lifecycle. All of this shields the client from the undesired
 * complexity of the subsystem.
 * Facade类提供了一个简单的接口来访问一个或者多个子系统的复杂逻辑。
 * Facade代理给客户端请求的对象。Facade也负责管理这些对象的生命周期。这样客户端就不用关心子系统的复杂性。
 */
class Facade {
    protected subsystem1: Subsystem1;

    protected subsystem2: Subsystem2;

    /**
     * Depending on your application's needs, you can provide the Facade with
     * existing subsystem objects or force the Facade to create them on its own.
     * 根据您的应用程序的需要，您可以向Facade提供现有的子系统对象，或者强制Facade创建它们自己。
     */
    constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    /**
     * The Facade's methods are convenient shortcuts to the sophisticated
     * functionality of the subsystems. However, clients get only to a fraction
     * of a subsystem's capabilities.
     * Facade的方法是简便的方法来访问子系统的复杂性。但是，客户端只能访问子系统的一部分功能。
     */
    public operation(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationN();
        result += this.subsystem2.operationZ();

        return result;
    }
}

/**
 * The Subsystem can accept requests either from the facade or client directly.
 * In any case, to the Subsystem, the Facade is yet another client, and it's not
 * a part of the Subsystem.
 * 子系统可以通过Facade或者直接从客户端接收请求。在任何情况下，给子系统的Facade也是一个客户端，它不是子系统的一部分。
 */
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }

    // ...

    public operationN(): string {
        return 'Subsystem1: Go!\n';
    }
}

/**
 * Some facades can work with multiple subsystems at the same time.
 * 在同一时间，一个Facade可以工作与多个子系统。
 */
class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }

    // ...

    public operationZ(): string {
        return 'Subsystem2: Fire!';
    }
}

/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 * 客户端代码通过Facade提供的简单接口来与复杂的子系统工作。
 * 当Facade管理子系统的生命周期时，客户端可能仍然不知道子系统存在。这种方式可以让您控制复杂性。
 */
function clientCode(facade: Facade) {
    // ...

    console.log(facade.operation());

    // ...
}

/**
 * The client code may have some of the subsystem's objects already created. In
 * this case, it might be worthwhile to initialize the Facade with these objects
 * instead of letting the Facade create new instances.
 * 客户端代码可能已经创建了子系统的部分对象。在这种情况下，可能更合适的是初始化Facade，而不是让Facade创建新的实例。
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
