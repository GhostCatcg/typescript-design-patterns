/**
 * Factory Method Design Pattern
 * 工厂方法模式 - 设计模式
 *
 * Intent: Provides an interface for creating objects in a superclass, but
 * allows subclasses to alter the type of objects that will be created.
 * 意图:提供一个创建对象的接口，但允许子类更改创建的对象的类型。
 */

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 * 创建者类声明了工厂方法，该方法应该返回一个Product类的对象。创建者的子类通常提供了这个方法的实现。
 */
abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     * 创建者也可以提供一个工厂方法的默认实现。
     */
    public abstract factoryMethod(): Product;

    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     * 创建者的主要责任不是创建产品。通常，它包含一些与产品对象有关的业务逻辑，该逻辑取决于工厂方法返回的产品类型。
     * 子类可以通过重写工厂方法并返回不同类型的产品来改变这个业务逻辑。
     */
    public someOperation(): string {
        // Call the factory method to create a Product object.
        // 调用工厂方法创建一个Product对象。
        const product = this.factoryMethod();
        // Now, use the product.
        // 使用产品。
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 * 具体创建者重写工厂方法以改变生成的产品的类型。
 */
class ConcreteCreator1 extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     * 注意，方法的签名仍然使用抽象产品类型，即使工厂方法返回的是具体产品类的实例。这样创建者可以独立于具体产品类。
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 * 产品接口声明了所有具体产品必须实现的操作。
 */
interface Product {
    operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 * 具体产品提供了多种产品接口的实现。
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 * 客户端代码使用具体创建者的实例，而不是通过其基本接口。
 * 只要客户端使用基本接口来访问创建者的子类，就可以传递给它任何创建者的子类。
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 * 应用程序根据配置或环境选择创建者的类型。
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
