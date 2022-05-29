/**
 * Composite Design Pattern
 * 组合模式
 *
 * Intent: Lets you compose objects into tree structures and then work with
 * these structures as if they were individual objects.
 * 意图:允许您将对象组合成树结构，然后再作为单个对象处理。
 */

/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 * 基础组件类声明了组合对象的共有操作。
 */
abstract class Component {
    protected parent: Component;

    /**
     * Optionally, the base Component can declare an interface for setting and
     * accessing a parent of the component in a tree structure. It can also
     * provide some default implementation for these methods.
     * 可选的，基础组件类可以声明一个树结构中组件的父组件的接口，并且可以提供这些方法的默认实现。
     */
    public setParent(parent: Component) {
        this.parent = parent;
    }

    public getParent(): Component {
        return this.parent;
    }

    /**
     * In some cases, it would be beneficial to define the child-management
     * operations right in the base Component class. This way, you won't need to
     * expose any concrete component classes to the client code, even during the
     * object tree assembly. The downside is that these methods will be empty
     * for the leaf-level components.
     * 在某些情况下，定义在基础组件类中的子组件管理操作是有利的。
     * 这样，您将不需要将任何具体组件类暴露给客户端代码，即使在对象树构建期间。
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    /**
     * You can provide a method that lets the client code figure out whether a
     * component can bear children.
     * 可以提供一个方法，让客户端代码可以确定一个组件是否可以承载子组件。
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * The base Component may implement some default behavior or leave it to
     * concrete classes (by declaring the method containing the behavior as
     * "abstract").
     * 基础组件类可以实现一些默认行为或者留给具体类（通过声明包含行为的方法为“抽象”）。
     */
    public abstract operation(): string;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 * 叶子类表示组合对象的末端对象。叶子不能有子组件。
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 * 通常，它们是实际的工作，而不是组合对象只是委托给它们的子组件。
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 * 组合类表示可能有子组件的复杂组件。通常，组合对象委托实际工作给它们的子组件，然后“汇总”结果。
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     * 组合对象可以添加或删除其他组件（简单或复杂）到或从其子列表。
     */
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     * 组合对象在特定的方式下执行其主要逻辑。它通过递归遍历其所有子组件，收集和汇总它们的结果。
     */
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}

/**
 * The client code works with all of the components via the base interface.
 * 客户端代码通过基本接口处理所有组件。
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support the simple leaf components...
 * 这种方式客户端代码可以支持简单的叶子组件...
 */
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as the complex composites.
 * ...以及复杂的组合。
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
 * Thanks to the fact that the child-management operations are declared in the
 * base Component class, the client code can work with any component, simple or
 * complex, without depending on their concrete classes.
 * 由于子管理操作是在基类Component中声明的，因此客户端代码可以处理任何组件，无论简单还是复杂，而不需要依赖它们的具体类。
 */
function clientCode2(component1: Component, component2: Component) {
    // ...

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);

    // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);
