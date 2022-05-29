/**
 * Builder Design Pattern
 * 建造者模式 - 设计模式
 *
 * Intent: Lets you construct complex objects step by step. The pattern allows
 * you to produce different types and representations of an object using the
 * same construction code.
 * 意图:让你可以逐步构建复杂的对象。这种模式允许你使用相同的构建代码来生成不同的对象类型和表示。
 */

/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 * 建造者接口指定了创建不同部分的产品对象的方法。
 */
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 * 具体建造者类实现了建造者接口，并提供了不同的实现的建造步骤。你的程序可能有多种变体的建造者，实现不同的方法。
 */
class ConcreteBuilder1 implements Builder {
    private product: Product1;

    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     * 初始化一个新的建造者实例，该实例应该包含一个空的产品对象，该对象用于后续装配。
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product1();
    }

    /**
     * All production steps work with the same product instance.
     * Therefore, they can all be performed within the same method.
     */
    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     * 具体建造者应该提供自己的方法来检索结果。因为不同类型的建造者可能会创建不同的产品，它们不遵循相同的接口。
     * 因此，这些方法不能被声明在基础建造者接口（至少是静态类型的编程语言中）。
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     * 通常，在返回结果给客户端后，建造者实例应该准备开始生产另一个产品。
     * 因此，它是一种常见的习惯，在`getProduct`方法体中调用reset方法。
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 * 当你的产品很复杂并且需要复杂的配置时，使用建造者模式是合适的。
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 * 与其它创建模式不同，不同的具体建造者可以生产不同的产品。
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 * 直接是为了执行建造步骤的顺序。它是当生产产品时，根据特定顺序或配置时有用的。
 */
class Director {
    private builder: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     * 直接与客户端代码传递给它的任何建造者实例工作。这样，客户代码可以改变新装配的产品的最终类型。
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     * 直接可以使用相同的建造步骤来生产多个产品变体。
     */
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 * 客户端代码创建一个构建器对象，将其传递给指挥者，然后启动构建过程。从构建器对象检索最终结果。
 */
function clientCode(director: Director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Standard full featured product:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    // 记住，Builder模式可以在没有Director类的情况下使用。
    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
