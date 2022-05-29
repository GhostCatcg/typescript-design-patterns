/**
 * Abstract Factory Design Pattern
 * 抽象工厂模式 - 设计模式
 * 
 * Intent: Lets you produce families of related objects without specifying their
 * concrete classes.
 * 意图:允许您不需要指定其具体类，就可以创建一系列相关的对象。
 */

/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 * 抽象工厂接口声明了一组返回不同抽象产品的方法。这些产品称为一个家族，并且与一个高层主题或概念相关。
 */
interface AbstractFactory {
    createProductA(): AbstractProductA;

    createProductB(): AbstractProductB;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 * 具体工厂生产一组产品，它属于一个单一的变体。工厂保证产生的产品是兼容的。
 * 请注意，具体工厂的方法的签名返回一个抽象产品，而在方法中，是一个具体的产品被实例化。
 */
class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

/**
 * Each Concrete Factory has a corresponding product variant.
 * 每个具体工厂都有一个相应的产品变体。
 */
class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 * 每个产品家族的产品都应该有一个基本接口。所有产品变体都必须实现此接口。
 */
interface AbstractProductA {
    usefulFunctionA(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 * 具体产品是由相应的具体工厂创建的。
 */
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
}

/**
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 * 这是另一个产品的基本接口。所有产品都可以互相交互，但是正确的交互只能发生在相同具体变体的产品之间。
 */
interface AbstractProductB {
    /**
     * Product B is able to do its own thing...
     * 产品B可以做自己的事情...
     */
    usefulFunctionB(): string;

    /**
     * ...but it also can collaborate with the ProductA.
     * 但它也可以与产品A合作。
     *
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     * 抽象工厂确保创建的所有产品都是相同的变体，因此是兼容的。
     */
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 * 具体产品是由相应的具体工厂创建的。
 */
class ConcreteProductB1 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }

    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     * 变体，产品B1只能与变体，产品A1一起工作。然而，它可以接受任何AbstractProductA的实例作为参数。
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}

class ConcreteProductB2 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     * 变体，产品B2只能与变体，产品A2一起工作。然而，它可以接受任何AbstractProductA的实例作为参数。
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`;
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 * 客户端代码只能通过抽象类来工作：AbstractFactory和AbstractProduct。
 * 这让你可以在客户端代码中传递任何工厂或产品子类，而不会破坏它。
 */
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * The client code can work with any concrete factory class.
 * 客户端代码可以与任何具体工厂类工作。
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
