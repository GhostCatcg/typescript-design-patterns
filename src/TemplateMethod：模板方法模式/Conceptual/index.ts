/**
 * Template Method Design Pattern
 * 模板方法 - 设计模式
 *
 * Intent: Defines the skeleton of an algorithm in the superclass but lets
 * subclasses override specific steps of the algorithm without changing its
 * structure.
 * 意图:定义一个算法的框架，而且允许子类重写算法的特定步骤，而不改变算法的结构。
 */

/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 * 抽象类定义了一个模板方法，该方法由调用组成（通常是抽象的原子操作）。
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 * 具体子类应该实现这些操作，但是保留模板方法本身。
 */
abstract class AbstractClass {
    /**
     * The template method defines the skeleton of an algorithm.
     * 定义了算法的框架。
     */
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * These operations already have implementations.
     * 已经实现的操作。
     */
    protected baseOperation1(): void {
        console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass says: But I let subclasses override some operations');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass says: But I am doing the bulk of the work anyway');
    }

    /**
     * These operations have to be implemented in subclasses.
     * 必须在子类实现的操作。
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * These are "hooks." Subclasses may override them, but it's not mandatory
     * since the hooks already have default (but empty) implementation. Hooks
     * provide additional extension points in some crucial places of the
     * algorithm.
     * 这些是“钩子”。子类可以重写它们，但是不是必须的，因为钩子已经有默认的实现（但是空的）。
     * 钩子提供了一些重要的扩展点在算法的重要地方。
     */
    protected hook1(): void { }

    protected hook2(): void { }
}

/**
 * Concrete classes have to implement all abstract operations of the base class.
 * They can also override some operations with a default implementation.
 * 具体子类必须实现基类的所有抽象操作。
 */
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass1 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass1 says: Implemented Operation2');
    }
}

/**
 * Usually, concrete classes override only a fraction of base class' operations.
 * 常规情况下，具体子类只重写一部分基类的操作。
 */
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass2 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass2 says: Implemented Operation2');
    }

    protected hook1(): void {
        console.log('ConcreteClass2 says: Overridden Hook1');
    }
}

/**
 * The client code calls the template method to execute the algorithm. Client
 * code does not have to know the concrete class of an object it works with, as
 * long as it works with objects through the interface of their base class.
 * 客户端代码调用模板方法来执行算法。客户端代码不需要知道它工作的对象的具体类型，只要它通过它的基类的接口来工作。
 */
function clientCode(abstractClass: AbstractClass) {
    // ...
    abstractClass.templateMethod();
    // ...
}

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
