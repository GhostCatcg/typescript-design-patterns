/**
 * Singleton Design Pattern
 * 单例模式 - 设计模式
 * Intent: Lets you ensure that a class has only one instance, while providing a
 * global access point to this instance.
 * 意图:允许您确保一个类只有一个实例，并且提供一个全局访问点到这个实例。
 */

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 * 单例类定义了getInstance方法，它允许客户端访问唯一的单例实例。
 */
class Singleton {
    private static instance: Singleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     * 单例的构造函数应该始终是私有的，以防止直接使用`new`运算符调用它。
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     * 控制对单例实例访问的静态方法。
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     * 这种实现允许你在保持每个子类只有一个实例的情况下子类化Singleton类。
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     * 最后，任何单例都应该定义一些业务逻辑，它可以在它的实例上执行。
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * The client code.
 * 客户端代码。
 */
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
