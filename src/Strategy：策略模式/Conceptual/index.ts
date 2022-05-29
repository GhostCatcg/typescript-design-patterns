/**
 * Strategy Design Pattern
 * 策略 - 设计模式
 * 
 * Intent: Lets you define a family of algorithms, put each of them into a
 * separate class, and make their objects interchangeable.
 * 意图:让你定义一组算法，把它们放到一个单独的类中，并使它们的对象可互换。
 */

/**
 * The Context defines the interface of interest to clients.
 * Context定义了客户端感兴趣的接口。
 */
class Context {
    /**
     * @type {Strategy} The Context maintains a reference to one of the Strategy
     * objects. The Context does not know the concrete class of a strategy. It
     * should work with all strategies via the Strategy interface.
     * 
     * Context维护了一个Strategy对象的引用。上下文不知道策略的具体类。它应该通过策略界面与所有策略一起工作。
     */
    private strategy: Strategy;

    /**
     * Usually, the Context accepts a strategy through the constructor, but also
     * provides a setter to change it at runtime.
     * 通常，Context通过构造函数接受一个策略，但也提供了一个setter来在运行时更改它。
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     * 通常，Context允许在运行时替换Strategy对象。
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     * Context将一些工作委托给Strategy对象，而不是自己实现算法的多个版本。
     */
    public doSomeBusinessLogic(): void {
        // ...

        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));

        // ...
    }
}

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 * Strategy接口声明了某些算法所有支持版本的通用操作。
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 * Context使用这个接口来调用具体策略定义的算法。
 */
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 * 具体策略在遵循基本策略接口的同时实现算法。该接口使它们在上下文中可以互换。
 */
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 * 客户端代码选择一个具体的策略并将其传递给上下文。为了做出正确的选择，客户应该了解不同策略之间的差异。
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
