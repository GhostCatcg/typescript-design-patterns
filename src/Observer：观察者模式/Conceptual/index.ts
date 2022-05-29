/**
 * Observer Design Pattern
 * 观察者模式 - 设计模式
 *
 * Intent: Lets you define a subscription mechanism to notify multiple objects
 * about any events that happen to the object they're observing.
 * 意图:允许您定义一种订阅机制，以便在观察对象发生事件时通知多个对象。
 *
 * Note that there's a lot of different terms with similar meaning associated
 * with this pattern. Just remember that the Subject is also called the
 * Publisher and the Observer is often called the Subscriber and vice versa.
 * Also the verbs "observe", "listen" or "track" usually mean the same thing.
 * 注意，有很多与此模式相关的同义词。只要记住，主题也被称为发布者和观察者通常称为订阅者和反之。
 */

/**
 * The Subject interface declares a set of methods for managing subscribers.
 * 发布者接口定义了订阅者的管理方法。
 */
interface Subject {
    // Attach an observer to the subject.
    // 添加观察者到主题。
    attach(observer: Observer): void;

    // Detach an observer from the subject.
    // 删除观察者从主题。
    detach(observer: Observer): void;

    // Notify all observers about an event.
    // 通知所有观察者事件。
    notify(): void;
}

/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 * 发布者拥有一些重要的状态并在状态改变时通知观察者。
 */
class ConcreteSubject implements Subject {
    /**
     * @type {number} For the sake of simplicity, the Subject's state, essential
     * to all subscribers, is stored in this variable.
     * 为了简单起见，Subject的状态(对所有订阅者至关重要)存储在这个变量中。
     */
    public state: number;

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     * 订阅者列表。在真实生活中，订阅者列表可以更为详细地存储(根据事件类型等)。
     */
    private observers: Observer[] = [];

    /**
     * The subscription management methods.
     * 订阅管理方法。
     */
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    /**
     * Trigger an update in each subscriber.
     * 触发每个订阅者的更新。
     */
    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Usually, the subscription logic is only a fraction of what a Subject can
     * really do. Subjects commonly hold some important business logic, that
     * triggers a notification method whenever something important is about to
     * happen (or after it).
     * 通常，订阅逻辑仅仅是一部分发布者可以真正做的事情。
     * 发布者通常拥有一些重要的业务逻辑，它触发一旦有什么重要的事情发生(或者它已经发生)时，就会触发通知方法。
     */
    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notify();
    }
}

/**
 * The Observer interface declares the update method, used by subjects.
 * 观察者接口定义了更新方法，由主题使用。
 */
interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
}

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 * 具体观察者响应发布者发出的更新。
 */
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}

/**
 * The client code.
 * 客户端代码。
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
