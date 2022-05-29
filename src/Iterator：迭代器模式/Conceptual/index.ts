/**
 * Iterator Design Pattern
 * 迭代器 - 设计模式
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 * 意图:允许您遍历集合中的元素而不暴露其底层表示（列表、堆栈、树等）。
 */

interface Iterator<T> {
    // Return the current element.
    // 返回当前元素。
    current(): T;

    // Return the current element and move forward to next element.
    // 返回当前元素并向前移动到下一个元素。
    next(): T;

    // Return the key of the current element.
    // 返回当前元素的键。
    key(): number;

    // Checks if current position is valid.
    // 检查当前位置是否有效。
    valid(): boolean;

    // Rewind the Iterator to the first element.
    // 回到第一个元素。
    rewind(): void;
}

interface Aggregator {
    // Retrieve an external iterator.
    // 获取外部迭代器。
    getIterator(): Iterator<string>;
}

/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 * 具体迭代器实现了多种遍历算法。这些类总是存储当前遍历位置。
 */

class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;

    /**
     * Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     * 存储当前遍历位置。迭代器可能有很多其他字段用于存储迭代状态，特别是当它应该与特定类型的集合工作时。
     */
    private position: number = 0;

    /**
     * This variable indicates the traversal direction.
     * 这个变量指示遍历方向。
     */
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 * 具体集合提供一个或多个方法来获取与集合类兼容的新迭代器实例。
 */
class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

/**
 * The client code may or may not know about the Concrete Iterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 * 客户代码可能不知道Concrete迭代器或集合类，取决于您希望在您的程序中保留的间接程度。
 */
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
    console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
