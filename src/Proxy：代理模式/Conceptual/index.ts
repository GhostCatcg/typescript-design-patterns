/**
 * Proxy Design Pattern
 * 代理 - 设计模式
 * 
 * Intent: Provide a surrogate or placeholder for another object to control
 * access to the original object or to add other responsibilities.
 * 意图:为另一个对象提供代理或占位符，以控制对原始对象的访问或添加其他职责。
 */

/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 * Subject接口为RealSubject和代理声明了通用操作。
 * 只要客户端使用这个接口与RealSubject一起工作，
 * 您就可以向它传递一个代理而不是一个真正的主题。
 */
interface Subject {
    request(): void;
}

/**
 * The RealSubject contains some core business logic. Usually, RealSubjects are
 * capable of doing some useful work which may also be very slow or sensitive -
 * e.g. correcting input data. A Proxy can solve these issues without any
 * changes to the RealSubject's code.
 * RealSubject包含一些核心业务逻辑。
 * 通常，realsubject能够做一些有用的工作，但也可能非常缓慢或敏感——例如纠正输入数据。
 * 代理可以解决这些问题，而不需要改变RealSubject的代码。
 */
class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Handling request.');
    }
}

/**
 * The Proxy has an interface identical to the RealSubject.
 * 代理具有与RealSubject相同的接口。
 */
class Proxy implements Subject {
    private realSubject: RealSubject;

    /**
     * The Proxy maintains a reference to an object of the RealSubject class. It
     * can be either lazy-loaded or passed to the Proxy by the client.
     * 代理维护对RealSubject类对象的引用。
     * 它可以是惰性加载的，也可以由客户端传递给代理。
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * The most common applications of the Proxy pattern are lazy loading,
     * caching, controlling the access, logging, etc. A Proxy can perform one of
     * these things and then, depending on the result, pass the execution to the
     * same method in a linked RealSubject object.
     * 代理模式最常见的应用是延迟加载、缓存、控制访问、日志记录等。
     * 代理可以执行其中一项，然后根据结果，
     * 将执行传递给链接的RealSubject对象中的相同方法。
     */
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // Some real checks should go here.
        // 这里应该有一些真正的检查。
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}

/**
 * The client code is supposed to work with all objects (both subjects and
 * proxies) via the Subject interface in order to support both real subjects and
 * proxies. In real life, however, clients mostly work with their real subjects
 * directly. In this case, to implement the pattern more easily, you can extend
 * your proxy from the real subject's class.
 * 客户端代码应该通过Subject接口处理所有对象(包括主体和代理)，以便同时支持真正的主体和代理。然而，在现实生活中，客户大多直接与他们的真实对象打交道。
 * 在这种情况下，为了更容易地实现模式，您可以从真正的主体的类扩展您的代理。
 */
function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);