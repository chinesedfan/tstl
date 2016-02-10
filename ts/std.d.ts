declare namespace std.base.container {
    /**
     * <p> An abstract container. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Sequence </dt>
     * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     * 	<dt> Doubly-linked list </dt>
     *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing
     *		 constant time insert and erase operations before or after a specific element (even of entire ranges),
     *		 but no direct random access. </dd>
     * </dl>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    abstract class Container<T> implements IContainer<T> {
        /**
         * <p> Default Constructor. </p>
         *
         * <p> Constructs an empty container, with no elements. </p>
         */
        constructor();
        /**
         * <p> Initializer list Constructor. </p>
         *
         * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
         *
         * @param array An array containing elements to be copied and contained.
         */
        constructor(array: Array<T>);
        /**
         * <p> Copy Constructor. </p>
         *
         * <p> Constructs a container with a copy of each of the elements in <i>container</i>, in the same order. </p>
         *
         * @param container Another container object of the same type (with the same class template
         *					arguments <code>T</code>), whose contents are either copied or acquired.
         */
        constructor(container: IContainer<T>);
        /**
         * <p> Range Constructor. </p>
         *
         * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each
         * element emplace-constructed from its corresponding element in that range, in the same order. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        /**
         * @inheritdoc
         */
        abstract assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        abstract push<U extends T>(...items: U[]): number;
        /**
         * @inheritdoc
         */
        abstract insert(position: Iterator<T>, val: T): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract erase(position: Iterator<T>): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract begin(): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract end(): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract size(): number;
        /**
         * @inheritdoc
         */
        empty(): boolean;
    }
}
declare namespace std.base.container {
    /**
     * <p> First-out container. </p>
     *
     * <p> <code>FOContainer</code> is an abstract class, a type of container adaptor, specifically designed to
     * operate in a FIFO and LIFO, like <code>Queue</code> and <code>Stack</code>. </p>
     *
     * <p> <code>FOContainer</code>s are implemented as containers adaptors, which are classes that use an
     * encapsulated object of a specific container class as its <i>underlying container</i>, providing a specific
     * set of member functions to access its elements. Elements are pushed/popped from the <code>accessor</code>
     * method of the (derived) specific container. </p>
     *
     * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular <code>FOContainer</code> class
     * instantiation, the standard container {@link List} is used. </p>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    abstract class FOContainer<T> {
        /**
         * The <i>underlying object</i> for implementing the <i>First-out</i>.
         */
        protected data: List<T>;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a LIFO or FIFO container.
         *
         * @param container An abstract container of LIFO and FIFO to copy.
         */
        constructor(container: FOContainer<T>);
        /**
         * <p> Return size. </p>
         * <p> Returns the number of elements in the <code>FOStack</code>. </p>
         *
         * <p> This member function effectively calls member {@link size} of the
         * <i>underlying container</i> object. </p>
         *
         * @return The number of elements in the <i>underlying container</i>.
         */
        size(): number;
        /**
         * <p> Test whether container is empty. </p>
         * <p> returns whether the <code>FOContainer</code> is empty: i.e. whether its <i>size</i> is zero. </p>
         *
         * <p> This member function efeectively calls member <code>empty()</code> of the
         * <i>underlying container</i> object. </p>
         *
         * @return <code>true</code> if the <i>underlying container</i>'s size is 0,
         *		   <code>false</code> otherwise. </p>
         */
        empty(): boolean;
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the first or last of the <code>FOContainer</code>. </p>
         *
         * <p> This member function effectively calls the member function <code>pushFront()</code> or
         * <code>pushBack()</code> of the <i>underlying container</i> object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        abstract push(val: T): void;
        /**
         * <p> Remove next element. </p>
         *
         * <p> Removes the next element in the <code>FOContainer</code>, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the "first" or "last" element in the <code>FOContainer</code> whose value
         * can be retrieved by calling member its derived <code>accessor</code> method. </p>.
         *
         * <p> This member function effectively calls the member function <code>popFront()</code>
         * <code>popBack()</code> of the <i>underlying container</i> object. </p>
         */
        abstract pop(): void;
    }
}
declare namespace std.base.container {
    /**
     * <p> An interface of container. </p>
     *
     * <p> <code>IContainer</code> is an interface designed for sequence containers. Sequence containers of STL
     * (Standard Template Library) are based on the <code>IContainer</code>. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Sequence </dt>
     * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     * 	<dt> Doubly-linked list </dt>
     *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing
     *		 constant time insert and erase operations before or after a specific element (even of entire ranges),
     *		 but no direct random access. </dd>
     * </dl>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    interface IContainer<T> {
        /**
         * <p> Assign new content to content. </p>
         *
         * <p> Assigns new contents to the container, replacing its current contents, and modifying its
         * {@link size} accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        assign(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * <p> Clear content. </p>
         *
         * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
         */
        clear(): void;
        /**
         * <p> Return iterator to beginning. </p>
         *
         * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with end(). </p>
         *
         * @return An iterator to the first element in the container.
         * The iterator containes the first element's value.
         */
        begin(): Iterator<T>;
        /**
         * <p> Return iterator to end. </p>
         * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
         *
         * <p> The past-the-end element is the theoretical element that would follow the last element in
         * the Container. It does not point to any element, and thus shall not be dereferenced. </p>
         *
         * <p> Because the ranges used by functions of the Container do not include the element reference
         * by their closing iterator, this function is often used in combination with Container::begin() to specify
         * a range including all the elements in the container. </p>
         *
         * <h4> Note </h4>
         * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing
         * element by the iterator will cause throwing exception (out of range). </p>
         * <p> If the container is empty, this function returns the same as Container::begin(). </p>
         *
         * @return An iterator to the end element in the container.
         */
        end(): Iterator<T>;
        /**
         * Return the number of elements in the Container.
         *
         * @return The number of elements in the container.
         */
        size(): number;
        /**
         * <p> Test whether the container is empty. </p>
         * <p> Returns whether the container is empty (i.e. whether its size is 0). </p>
         *
         * <p> This function does not modify the container in any way. To clear the content of the container,
         * see <code>clear()</code>. </p>
         *
         * @return <code>true</code> if the container size is 0, <code>false</code> otherwise.
         */
        empty(): boolean;
        /**
         * <p> Insert elements. </p>
         *
         * <p> Appends new elements to the container, and returns the new size of the <code>Container</code>. </p>
         *
         * @param items New elements to insert.
         *
         * @return New size of the Container.
         */
        push<U extends T>(...items: U[]): number;
        /**
         * <p> Insert an element. </p>
         *
         * <p> The container is extended by inserting a new element before the element at the specified
         * <i>position</i>. This effectively increases the {@link IContainer.size container size} by the amount of
         * elements inserted. </p>
         *
         * @param position Position in the {@link IContainer} where the new element is inserted.
         *				   {@link iterator} is a member type, defined as a {@link Iterator random access iterator}
         *				   type that points to elements.
         * @param val Value to be copied to the inserted element.
         *
         * @return An iterator that points to the newly inserted element.
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;
        /**
         * <p> Erase an element. </p>
         *
         * <p> Removes from the <code>Container</code> a single element. </p>
         *
         * <p> This effectively reduces the container size by the number of element removed. </p>
         *
         * @param position Iterator pointing to a single element to be removed from the Container.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function
         *		   call. This is the <code>Container.end</code> if the operation erased the last element in the
         *		   sequence.
         */
        erase(position: Iterator<T>): Iterator<T>;
        /**
         * <p> Erase elements. </p>
         *
         * <p> Removes from the <code>Container</code> a range of elements. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function
         *		   call. This is the <code>Container.end</code> if the operation erased the last element in the
         *		   sequence.
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
    }
}
declare namespace std.base.container {
    abstract class Iterator<T> {
        protected source: IContainer<T>;
        /**
         * Construct from the source Container.
         *
         * @param source The source Container.
         */
        constructor(source: IContainer<T>);
        /**
         * <p> Get iterator to previous element. </p>
         * <p> If current iterator is the first item(equal with {@link IContainer.begin IContainer.begin()}),
         * returns {@link IContainer.end IContainer.end()}. </p>
         *
         * @return An iterator of the previous item.
         */
        abstract prev(): Iterator<T>;
        /**
         * <p> Get iterator to next element. </p>
         * <p> If current iterator is the last item, returns {@link IContainer.end IContainer.end()}. </p>
         *
         * @return An iterator of the next item.
         */
        abstract next(): Iterator<T>;
        /**
         * Advances the {@link Iterator} by <i>n</i> element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced iterator.
         */
        advance(n: number): Iterator<T>;
        /**
         * Get source.
         */
        getSource(): Container<T>;
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         *
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         *
         * <h4> Note </h4>
         *
         * <p> Iterator's equals() only compare souce map and index number. </p>
         *
         * <p> Although elements in a pair, key and value are equals, if the source map or
         * index number is different, then the {@link equals equals()} will return false. If you want to
         * compare the elements of a pair, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        equals<U extends T>(obj: Iterator<U>): boolean;
        /**
         * <p> Get value of the iterator is pointing. </p>
         *
         * @return A value of the iterator.
         */
        value: T;
    }
}
declare namespace std.base.container {
    /**
     * <p> An abstract map. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     * </dl>
     *
     * @author Jeongho Nam
     */
    abstract class MapContainer<Key, T> {
        protected data: List<Pair<Key, T>>;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @private
         */
        protected constructByArray(items: Array<Pair<Key, T>>): void;
        /**
         * @private
         */
        protected constructByContainer(container: MapContainer<Key, T>): void;
        /**
         * @private
         */
        protected constructByRange(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): void;
        /**
         * <p> Assign new content to content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents,
         * and modifying its size accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        assign<L extends Key, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * <p> Clear content. </p>
         *
         * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
         */
        clear(): void;
        /**
         * <p> Get iterator to element. </p>
         *
         * <p> Searches the container for an element with a identifier equivalent to <i>key</i> and
         * returns an iterator to it if found, otherwise it returns an iterator to {@link end end()}. </p>
         *
         * <p> Two keys are considered equivalent if the container's comparison object returns false
         * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
         *
         * <p> Another member functions, {@link has has()} and {@link count count()}, can be used to just check
         * whether a particular <i>key</i> exists. </p>
         *
         * @param key Key to be searched for
         * @return An iterator to the element, if an element with specified <i>key</i> is found, or
         *		   {@link end end()} otherwise.
         */
        abstract find(key: Key): MapIterator<Key, T>;
        /**
         * <p> Return iterator to beginning. </p>
         * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with {@link end()}. </p>
         *
         * @return An iterator to the first element in the container.
         * The iterator containes the first element's value.
         */
        begin(): MapIterator<Key, T>;
        /**
         * <p> Return iterator to end. </p>
         * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
         *
         * <p> The past-the-end element is the theoretical element that would follow the last element in
         * the Container. It does not point to any element, and thus shall not be dereferenced. </p>
         *
         * <p> Because the ranges used by functions of the Container do not include the element reference
         * by their closing iterator, this function is often used in combination with Container::begin() to specify
         * a range including all the elements in the container. </p>
         *
         * <h4> Note </h4>
         * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing
         * element by the iterator will cause throwing exception (out of range). </p>
         * <p> If the container is empty, this function returns the same as {@link begin}. </p>
         *
         * @return An iterator to the end element in the container.
         */
        end(): MapIterator<Key, T>;
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a map has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         *
         * @return Whether the map has an item having the specified identifier.
         */
        has(key: Key): boolean;
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements whose key is k and returns the number of elements found. </p>
         *
         * @param key Key value to be searched for.
         *
         * @return The number of elements in the container with a <i>key</i>.
         */
        abstract count(key: Key): number;
        /**
         * Return the number of elements in the map.
         */
        size(): number;
        /**
         * Test whether the Container is empty.
         */
        empty(): boolean;
        insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;
        insert<L extends Key, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        protected abstract insertByPair<L extends Key, U extends T>(pair: Pair<L, U>): any;
        private insertByHint(hint, pair);
        protected insertByRange<L extends Key, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        erase(key: Key): number;
        erase(it: MapIterator<Key, T>): MapIterator<Key, T>;
        erase(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>;
        /**
         * @private
         */
        private eraseByKey(key);
        /**
         * @private
         */
        private eraseByIterator(it);
        /**
         * @private
         */
        private eraseByRange(begin, end);
        protected abstract handleInsert(item: MapIterator<Key, T>): void;
        protected abstract handleErase(item: MapIterator<Key, T>): void;
    }
}
declare namespace std.base.container {
    abstract class MultiMap<K, T> extends MapContainer<K, T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        count(key: K): number;
        insert<L extends K, U extends T>(pair: Pair<L, U>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
    }
}
declare namespace std.base.container {
    /**
     * Abstract Set.
     *
     * @author Jeongho Nam
     */
    abstract class SetContainer<T> extends Container<T> {
        protected data: List<T>;
        /**
         * Default Constructor.
         */
        constructor();
        protected constructByArray(items: Array<T>): void;
        protected constructByContainer(container: Container<T>): void;
        protected constructByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * <p> Get iterator to element. </p>
         *
         * <p> Searches the container for an element with <code>key</code> as value and returns an iterator to it
         * if found, otherwise it returns an iterator to <code>end()</code> (the element past the end of the
         * container). </p>
         *
         * <p> Another member function, <code>count()</code>, can be used to just check whether a particular
         * element exists. </p>
         *
         * @param key Key to be searched for.
         *
         * @return An iterator to the element, if the specified value is found,
         *		 or <code>end()</code> if it is not found in the container.
         */
        abstract find(val: T): SetIterator<T>;
        /**
         * @inheritdoc
         */
        begin(): SetIterator<T>;
        /**
         * @inheritdoc
         */
        end(): SetIterator<T>;
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a set has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         *
         * @return Whether the set has an item having the specified identifier.
         */
        has(val: T): boolean;
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        abstract count(val: T): number;
        /**
         * @inheritdoc
         */
        size(): number;
        /**
         * @inheritdoc
         */
        push<U extends T>(...args: U[]): number;
        /**
         * <p> Insert element with hint. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the
         * number of elements inserted. </p>
         *
         * @param hint Hint for the position where the element can be inserted.
         * @param key Value to be inserted as an elements.
         *
         * @return An iterator pointing to either the newly inserted element or
         *		 to the element that already had its same value in the set.
         */
        insert(hint: SetIterator<T>, val: T): SetIterator<T>;
        /**
         * <p> Insert elements with a range of a container. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the
         * number of elements inserted. </p>
         *
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         */
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @private
         */
        protected abstract insertByVal(val: T): any;
        /**
         * @private
         */
        private insertByHint(hint, val);
        /**
         * @private
         */
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * <p> Erase an element. </p>
         * <p> Removes from the set container the elements whose value is <code>key</code>. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param key Value of the elements to be erased.
         *
         * @return Number of elements erased.
         */
        erase(val: T): number;
        /**
         * @inheritdoc
         */
        erase(it: SetIterator<T>): SetIterator<T>;
        /**
         * <p> Erase elements. </p>
         * <p> Removes from the set container a range of elements.. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         */
        erase(begin: SetIterator<T>, end: SetIterator<T>): SetIterator<T>;
        /**
         * @private
         */
        private eraseByKey(val);
        /**
         * @private
         */
        private eraseByIterator(it);
        /**
         * @private
         */
        private eraseByRange(begin, end);
        protected abstract handleInsert(item: SetIterator<T>): void;
        protected abstract handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std.base.container {
    abstract class MultiSet<T> extends SetContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        count(val: T): number;
        insert(val: T): SetIterator<T>;
        insert(hint: SetIterator<T>, val: T): SetIterator<T>;
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): SetIterator<T>;
    }
}
declare namespace std.base.container {
    abstract class UniqueMap<K, T> extends MapContainer<K, T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        count(key: K): number;
        insert<L extends K, U extends T>(pair: Pair<L, U>): Pair<MapIterator<K, T>, boolean>;
        /**
         * @inheritdoc
         */
        insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
    }
}
declare namespace std.base.container {
    abstract class UniqueSet<T> extends SetContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        count(key: T): number;
        insert(val: T): Pair<SetIterator<T>, boolean>;
        insert(hint: SetIterator<T>, val: T): SetIterator<T>;
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): SetIterator<T>;
    }
}
declare namespace std.base.hash {
    const MIN_SIZE: number;
    const RATIO: number;
    const MAX_RATIO: number;
    function code(par: any): number;
}
declare namespace std.base.hash {
    class HashBuckets<T> {
        private buckets;
        private itemSize_;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Reserve the bucket size.
         *
         * @param size Number of bucket size to reserve.
         */
        reserve(size: any): void;
        clear(): void;
        size(): number;
        itemSize(): number;
        at(index: number): Vector<T>;
        private hashIndex(val);
        insert(val: T): void;
        erase(val: T): void;
    }
}
declare namespace std.base.hash {
    class MapHashBuckets<K, T> extends HashBuckets<MapIterator<K, T>> {
        private map;
        constructor(map: container.MapContainer<K, T>);
        find(key: K): MapIterator<K, T>;
    }
}
declare namespace std.base.hash {
    class SetHashBuckets<T> extends HashBuckets<SetIterator<T>> {
        private set;
        constructor(set: container.SetContainer<T>);
        find(val: T): SetIterator<T>;
    }
}
declare namespace std.base.system {
    /**
     * <p> An abstract error instance. </p>
     *
     * <p> {@link ErrorInstance} is an abstract class of {@link ErrorCode} and {@link ErrorCondition}
     * holding an error instance's identifier {@link value}, associated with a {@link category}. </p>
     *
     * <p> The operating system and other low-level applications and libraries generate numerical error codes to
     * represent possible results. These numerical values may carry essential information for a specific platform,
     * but be non-portable from one platform to another. </p>
     *
     * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories},
     * so that they can be interpreted when needed as more abstract (and portable)
     * {@link ErrorCondition error conditions}. </p>
     *
     * @author Jeongho Nam
     */
    class ErrorInstance {
        /**
         * A reference to an {@link ErrorCategory} object.
         */
        protected category_: ErrorCategory;
        /**
         * A numerical value identifying an error instance.
         */
        protected value_: number;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a numeric value and error category.
         *
         * @param val A numerical value identifying an error instance.
         * @param category A reference to an {@link ErrorCategory} object.
         */
        constructor(val: number, category: ErrorCategory);
        /**
         * <p> Assign error instance. </p>
         *
         * <p> Assigns the {@link ErrorCode} object a value of val associated with the {@link ErrorCategory}. </p>
         *
         * @param val A numerical value identifying an error instance.
         * @param category A reference to an {@link ErrorCategory} object.
         */
        assign(val: number, category: ErrorCategory): void;
        /**
         * <p> Clear error instance. </p>
         *
         * <p> Clears the value in the {@link ErrorCode} object so that it is set to a value of <i>0</i> of the
         * {@link ErrorCategory.systemCategory ErrorCategory.systemCategory()} (indicating no error). </p>
         */
        clear(): void;
        /**
         * <p> Get category. </p>
         *
         * <p> Returns a reference to the {@link ErrorCategory} associated with the {@link ErrorCode} object. </p>
         *
         * @return A reference to a non-copyable object of a type derived from {@link ErrorCategory}.
         */
        category(): ErrorCategory;
        /**
         * <p> Error value. </p>
         *
         * <p> Returns the error value associated with the {@link ErrorCode} object. </p>
         *
         * @return The error value.
         */
        value(): number;
        /**
         * <p> Get message. </p>
         *
         * <p> Returns the message associated with the error instance. </p>
         *
         * <p> Error messages are defined by the {@link category} the error instance belongs to. </p>
         *
         * <p> This function returns the same as if the following member was called: </p>
         *
         * <p> <code>category().message(value())</code> </p>
         *
         * @return A <code>string</code> object with the message associated with the {@link ErrorCode}.
         */
        message(): string;
        /**
         * <p> Default error condition. </p>
         *
         * <p> Returns the default {@link ErrorCondition}object associated with the {@link ErrorCode} object. </p>
         *
         * <p> This function returns the same as if the following member was called: </p>
         *
         * <p> <code>category().default_error_condition(value())</code> </p>
         *
         * <p> {@link ErrorCategory.defaultErrorCondition ErrorCategory.defaultErrorCondition()}
         * is a virtual member function, that can operate differently for each category. </p>
         *
         * @return An {@link ErrorCondition}object that corresponds to the {@link ErrorCode} object.
         */
        defaultErrorCondition(): ErrorCondition;
        /**
         * <p> Convert to bool. </p>
         *
         * <p> Returns whether the error instance has a numerical {@link value} other than 0. </p>
         *
         * <p> If it is zero (which is generally used to represent no error), the function returns false, otherwise it returns true. </p>
         *
         * @return <code>true</code> if the error's numerical value is not zero.
         *		   <code>false</code> otherwise.
         */
        toBoolean(): boolean;
    }
}
declare namespace std.base.tree {
    abstract class XTree<T> {
        protected root: XTreeNode<T>;
        /**
         * Default Constructor.
         */
        constructor();
        find(val: T): XTreeNode<T>;
        private fetchMaximum(node);
        abstract isEquals(left: T, right: T): boolean;
        abstract isLess(left: T, right: T): boolean;
        insert(val: T): void;
        private insertCase1(node);
        private insertCase2(node);
        private insertCase3(node);
        private insertCase4(node);
        private insertCase5(node);
        erase(val: T): void;
        private eraseCase1(node);
        private eraseCase2(node);
        private eraseCase3(node);
        private eraseCase4(node);
        private eraseCase5(node);
        private eraseCase6(node);
        private rotateLeft(node);
        private rotateRight(node);
        private replaceNode(oldNode, newNode);
        private fetchColor(node);
    }
}
declare namespace std.base.tree {
    class AtomicTree<T> extends XTree<SetIterator<T>> {
        /**
         * Default Constructor.
         */
        constructor();
        find(val: T): XTreeNode<SetIterator<T>>;
        find(it: SetIterator<T>): XTreeNode<SetIterator<T>>;
        private findByVal(val);
        isEquals(left: SetIterator<T>, right: SetIterator<T>): boolean;
        isLess(left: SetIterator<T>, right: SetIterator<T>): boolean;
    }
}
declare namespace std.base.tree {
    /**
     * Static class holding enumeration codes of color of Red-black tree.
     *
     * @author Jeongho Nam
     */
    class Color {
        static BLACK: boolean;
        static RED: boolean;
    }
}
declare namespace std.base.tree {
    class PairTree<K, T> extends XTree<MapIterator<K, T>> {
        /**
         * Default Constructor.
         */
        constructor();
        find(key: K): XTreeNode<MapIterator<K, T>>;
        find(it: MapIterator<K, T>): XTreeNode<MapIterator<K, T>>;
        private findByKey(key);
        isEquals(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean;
        isLess(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean;
    }
}
declare namespace std.base.tree {
    /**
     * Reference: http://jiniya.net/tt/444
     */
    class XTreeNode<T> {
        parent: XTreeNode<T>;
        left: XTreeNode<T>;
        right: XTreeNode<T>;
        value: T;
        color: boolean;
        /**
         * Construct from value and color of node.
         *
         * @param value Value to be stored in.
         * @param color Color of the node, red or black.
         */
        constructor(value: T, color: boolean);
        grandParent: XTreeNode<T>;
        sibling: XTreeNode<T>;
        uncle: XTreeNode<T>;
    }
}
declare namespace std {
    class Bind<Listener extends Function, This extends Object> {
        protected func: Listener;
        protected thisArg: This;
        constructor(func: Listener, thisArg: This);
        apply(...args: any[]): any;
        equals<U extends Listener, T extends This>(obj: Bind<U, T>): boolean;
    }
}
declare namespace std {
    /**
     * <p> Error category. </p>
     *
     * <p> This type serves as a base class for specific category types. </p>
     *
     * <p> Category types are used to identify the source of an error. They also define the relation between
     * {@link ErrorCode} and {@link ErrorCondition}objects of its category, as well as the message
     * set for {@link ErrorCode} objects.
     *
     * <p> Objects of these types have no distinct values and are not-copyable and not-assignable, and thus can
     * only be passed by reference. As such, only one object of each of these types shall exist, each uniquely
     * identifying its own category: all error codes and conditions of a same category shall return a reference
     * to same object. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_category/ </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    abstract class ErrorCategory {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * <p> Return category name. </p>
         *
         * <p> In derived classes, the function returns a <code>string</code> naming the category. </p>
         *
         * <p> In {@link ErrorCategory}, it is a pure virtual member function. </p>
         *
         * <ul>
         *	<li> In the <code>GenericCategory</code> object, it returns <i>"generic"</i>. </li>
         *	<li> In the <code>SystemCategory</code> object, it returns <i>"system"</i>. </li>
         *	<li> In the <code>IOStreamCategory</code> object, it returns <i>"iostream"</i>. </li>
         * </ul>
         *
         * @return The category name.
         */
        abstract name(): string;
        /**
         * <p> Error message. </p>
         *
         * <p> In derived classes, the function returns a <code>string</code> object with a message describing
         * the error condition denoted by <i>val</i>. </p>
         *
         * <p> In {@link ErrorCategory}, it is a pure virtual member function. </p>
         *
         * <p> This function is called both by {@link ErrorCode.message ErrorCode.message()} and
         * {@link ErrorCondition.message ErrorCondition.message()}
         * to obtain the corresponding message in the {@link category}. Therefore, numerical values used by
         * custom <code>error codes</code> and {@link ErrorCondition error conditions} should only match for a category
         * if they describe the same error. </p>
         *
         * @param val A numerical value identifying an error condition.
         *			  If the {@link ErrorCategory} object is the <code>GenericCategory</code>, this argument
         *			  is equivalent to an <code>errno</code> value.
         *
         * @return A <code>string</code> object with the message.
         */
        abstract message(val: number): string;
        /**
         * <p> Default error condition. </p>
         *
         * <p> Returns the default {@link ErrorCondition}object of this category that is associated with
         * the {@link ErrorCode} identified by a value of <i>val</i>. </p>
         *
         * <p> Its definition in the base class {@link ErrorCategory} returns the same as constructing an
         * {@link ErrorCondition}object with:
         *
         * <p> <code>new ErrorCondition(val, *this);</code> </p>
         *
         * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
         *
         * <p> This function is called by the default definition of member <code>equivalent()</code>, which is
         * used to compare {@link ErrorCondition error conditions} with error codes. </p>
         *
         * @param val A numerical value identifying an error condition.
         *
         * @return The default {@link ErrorCondition}object associated with condition value <i>val</i>
         *		   for this category.
         */
        defaultErrorCondition(val: number): ErrorCondition;
        equivalent(valCode: number, cond: ErrorCondition): boolean;
        equivalent(code: ErrorCode, valCond: number): boolean;
    }
}
declare namespace std {
    /**
     * <p> Error code. </p>
     *
     * <p> Objects of this type hold an error code {@link value} associated with a {@link category}. </p>
     *
     * <p> The operating system and other low-level applications and libraries generate numerical error codes to
     * represent possible results. These numerical values may carry essential information for a specific platform,
     * but be non-portable from one platform to another. </p>
     *
     * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories}, so that they
     * can be interpreted when needed as more abstract (and portable) {@link ErrorCondition error conditions}. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_code/ </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    class ErrorCode extends base.system.ErrorInstance {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a numeric value and error category.
         *
         * @param val A numerical value identifying an error code.
         * @param category A reference to an {@link ErrorCategory} object.
         */
        constructor(val: number, category: ErrorCategory);
    }
}
declare namespace std {
    /**
     * <p> Error condition. </p>
     *
     * <p> Objects of this type hold a condition {@link value} associated with a {@link category}. </p>
     *
     * <p> Objects of this type describe errors in a generic way so that they may be portable across different
     * systems. This is in contrast with {@link ErrorCode} objects, that may contain system-specific
     * information. </p>
     *
     * <p> Because {@link ErrorCondition}objects can be compared with error_code objects directly by using
     * <code>relational operators</code>, {@link ErrorCondition}objects are generally used to check whether
     * a particular {@link ErrorCode} obtained from the system matches a specific error condition no matter
     * the system. </p>
     *
     * <p> The {@link ErrorCategory categories} associated with the {@link ErrorCondition} and the
     * {@link ErrorCode} define the equivalences between them. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    class ErrorCondition extends base.system.ErrorInstance {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a numeric value and error category.
         *
         * @param val A numerical value identifying an error condition.
         * @param category A reference to an {@link ErrorCategory} object.
         */
        constructor(val: number, category: ErrorCategory);
    }
}
declare namespace std.example {
    class ContainerTest {
        constructor();
        private testList();
        private testUnorderedSet();
        private testUnorderedMap();
        static main(): void;
    }
}
declare namespace std {
    /**
     * <p> Standard exception class. </p>
     *
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class.
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/exception/exception/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class Exception {
        /**
         * A message representing specification about the Exception.
         */
        protected message: string;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined.
         * As a virtual function, derived classes may redefine this function so that specify value are
         * returned. </p>
         */
        what(): string;
    }
    /**
     * <p> Logic error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors in the internal
     * logical of the program, such as violation of logical preconditions or class invariants. </p>
     *
     * <p> These errors are presumably detectable before the program executes. </p>
     *
     * <p> It is used as a base class for several logical error exceptions. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class LogicError extends Exception {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Domain error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report domain errors. </p>
     *
     * <p> Generally, the domain of a mathematical function is the subset of values that it is defined for.
     * For example, the square root function is only defined for non-negative numbers. Thus, a negative number
     * for such a function would qualify as a domain error. </p>
     *
     * <p> No component of the standard library throws exceptions of this type. It is designed as a standard
     * exception to be thrown by programs. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/domain_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class DomainError extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Invalid argument exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report an invalid argument. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal invalid arguments. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/invalid_argument/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class InvalidArgument extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Length error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report a length error. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library,
     * such as vector and string also throw exceptions of this type to signal errors resizing. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/length_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class LengthError extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Out-of-range exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report an out-of-range error. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library,
     * such as vector, deque, string and bitset also throw exceptions of this type to signal arguments
     * out of range. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/out_of_range/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class OutOfRange extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Runtime error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors that can only be
     * detected during runtime. </p>
     *
     * <p> It is used as a base class for several runtime error exceptions. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class RuntimeError extends Exception {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Overflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic overflow errors. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal range errors. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/outflow_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class OverflowError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Underflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic underflow errors. </p>
     *
     * <p> No component of the standard library throws exceptions of this type. It is designed as a standard
     * exception to be thrown by programs. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/underflow_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class UnderflowError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
    /**
     * <p> Range error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report range errors in internal
     * computations. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal range errors. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/range_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class RangeError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
    }
}
declare namespace std {
    /**
     * <p> Hashed, unordered map. </p>
     *
     * <p> {@link HashMap}s are associative containers that store elements formed by the
     * combination of a <i>key value</i> and a <i>mapped value</i>, and which allows for fast
     * retrieval of individual elements based on their <i>keys</i>. </p>
     *
     * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify
     * the element, while the <i>mapped value</i> is an object with the content associated to this
     * <i>key</i>. Types of <i>key</i> and <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order
     * with respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i>
     * depending on their hash values to allow for fast access to individual elements directly by
     * their <i>key values</i> (with a constant average time complexity on average). </p>
     *
     * <p> {@link HashMap} containers are faster than {@link TreeMap} containers to access
     * individual elements by their <i>key</i>, although they are generally less efficient for range
     * iteration through a subset of their elements. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Associative </dt>
     * 	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     * 	<dt> Hashed </dt>
     * 	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     * 	<dt> Map </dt>
     * 	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     * 	<dt> Unique keys </dt>
     * 	<dd> No two elements in the container can have equivalent keys. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
     * </ul>
     *
     * @param <K> Type of the key values.
     *			  Each element in an {@link HashMap} is uniquely identified by its key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    class HashMap<K, T> extends base.container.UniqueMap<K, T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(array: Array<Pair<K, T>>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.MapContainer<K, T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        /**
         * @private
         */
        protected constructByArray(items: Array<Pair<K, T>>): void;
        /**
         * @inheritdoc
         */
        assign<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        /**
         * @private
         */
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        /**
         * @private
         */
        protected insertByRange<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Hashed, unordered Multimap. </p>
     *
     * <p> <code>HashMultiMap</code>s are associative containers that store elements formed by the combination of
     * a <i>key value</i> and a <i>mapped value</i>, much like {@link HashMap} containers, but allowing
     * different elements to have equivalent <i>keys</i>. </p>
     *
     * <p> In an <code>HashMultiMap</code>, the <i>key value</i> is generally used to uniquely identify the
     * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>.
     * Types of <i>key</i> and <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the <code>HashMultiMap</code> are not sorted in any particular order with
     * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on
     * their hash values to allow for fast access to individual elements directly by their <i>key values</i>
     * (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that
     * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_multimap/ </li>
     * </ul>
     *
     * @param <K> Type of the key values.
     *			  Each element in an <code>HashMultiMap</code> is identified by a key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an <code>HashMultiMap</code> is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    class HashMultiMap<K, T> extends base.container.MultiMap<K, T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(array: Array<Pair<K, T>>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.MapContainer<K, T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        /**
         * @private
         */
        protected constructByArray(items: Array<Pair<K, T>>): void;
        /**
         * @inheritdoc
         */
        assign<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        /**
         * @private
         */
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        /**
         * @private
         */
        protected insertByRange<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Hashed, unordered Multiset. </p>
     *
     * <p> <code>HashMultiSet</code>s are containers that store elements in no particular order, allowing fast
     * retrieval of individual elements based on their value, much like <code>UnorderedSet</code> containers,
     * but allowing different elements to have equivalent values. </p>
     *
     * <p> In an <code>HashMultiSet</code>, the value of an element is at the same time its <i>key</i>, used to
     * identify it. <i>Keys</i> are immutable, therefore, the elements in an <code>HashMultiSet</code> cannot be
     * modified once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the <code>HashMultiSet</code> are not sorted in any particular, but
     * organized into <i>buckets</i> depending on their hash values to allow for fast access to individual
     * elements directly by their <i>values</i> (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent values are grouped together in the same bucket and in such a way that an
     * iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *		   Each element in an <code>UnorderedMultiSet</code> is also identified by this value..
     *
     * @author Jeongho Nam
     */
    class HashMultiSet<T> extends base.container.MultiSet<T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(items: Array<T>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        /**
         * @private
         */
        protected constructByArray(items: Array<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): SetIterator<T>;
        /**
         * @private
         */
        protected insertByVal(val: T): any;
        /**
         * @private
         */
        protected insertByRange(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> Hashed, unordered set. </p>
     *
     * <p> {@link HashSet}s are containers that store unique elements in no particular order, and which
     * allow for fast retrieval of individual elements based on their value. </p>
     *
     * <p> In an {@link HashSet}, the value of an element is at the same time its <i>key</i>, that
     * identifies it uniquely. Keys are immutable, therefore, the elements in an {@link HashSet} cannot be
     * modified once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the {@link HashSet} are not sorted in any particular order, but
     * organized into buckets depending on their hash values to allow for fast access to individual elements
     * directly by their <i>values</i> (with a constant average time complexity on average). </p>
     *
     * <p> {@link HashSet} containers are faster than <codeTreeSet<code> containers to access individual
     * elements by their <i>key</i>, although they are generally less efficient for range iteration through a
     * subset of their elements. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an {@link HashSet} is also uniquely identified by this value.
     *
     * @author Jeongho Nam
     */
    class HashSet<T> extends base.container.UniqueSet<T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(items: Array<T>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        protected constructByArray(items: Array<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): SetIterator<T>;
        protected insertByVal(val: T): any;
        protected insertByRange(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    interface IComparable<T> {
        equals(obj: T): boolean;
        less(obj: T): boolean;
        hashCode(): number;
    }
    /**
     * <p> For equality comparison. </p>
     *
     * <p> Binary fucntion returns whether the arguments are equal. </p>
     *
     * @param <T> Type of arguments to compare.
     *
     * @param first First element to compare.
     * @param second Second element to compare.
     *
     * @return Whether the arguments are equal.
     */
    function equals<T>(left: T, right: T): boolean;
    /**
     * <p> Function for less-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares less than the second. </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link less}
     * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly.
     * This member function allows the object to be used with the same syntax as a function call. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort()</code>,
     * <code>merge<()/code> or <code>lower_bound()</code>. </p>
     *
     * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation
     *			  <code>operator<()</code> or method {@link less}.
     *
     * @param first First element, the standard of comparison.
     * @param second Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    function less<T>(left: T, right: T): boolean;
    /**
     * <p> Function for greater-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares greater than the second. </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link less} and
     * <code>equals()</code> defined. If an object doesn't have those methods, then its own uid will be used
     * to compare insteadly. This member function allows the object to be used with the same syntax as a function
     * call. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort()</code>,
     * <code>merge<()/code> or <code>lower_bound()</code>. </p>
     *
     * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation
     *			  <code>operator>()</code> or method {@link less} and <code>equals()</code>.
     *
     * @param left
     * @param right
     */
    function greater<T>(left: T, right: T): boolean;
    function hashCode(obj: any): number;
}
declare namespace std {
    /**
     * <p> Doubly linked list. </p>
     *
     * <p> {@link List}s are sequence containers that allow constant time insert and erase operations
     * anywhere within the sequence, and iteration in both directions. </p>
     *
     * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of
     * the elements they contain in different and unrelated storage locations. The ordering is kept
     * internally by the association to each element of a link to the element preceding it and a link to
     * the element following it. </p>
     *
     * <p> They are very similar to forward_list: The main difference being that forward_list objects are
     * single-linked lists, and thus they can only be iterated forwards, in exchange for being somewhat
     * smaller and more efficient. </p>
     *
     * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform
     * generally better in inserting, extracting and moving elements in any position within the container
     * for which an iterator has already been obtained, and therefore also in algorithms that make
     * intensive use of these, like sorting algorithms. </p>
     *
     * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that
     * they lack direct access to the elements by their position; For example, to access the sixth element
     * in a list, one has to iterate from a known position (like the beginning or the end) to that position,
     * which takes linear time in the distance between these. They also consume some extra memory to keep
     * the linking information associated to each element (which may be an important factor for large lists
     * of small-sized elements). </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Sequence </dt>
     * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     * 	<dt> Doubly-linked list </dt>
     *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing
     *		 constant time insert and erase operations before or after a specific element (even of entire ranges),
     *		 but no direct random access. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
     */
    class List<T> extends base.container.Container<T> {
        static iterator: typeof ListIterator;
        /**
         * An iterator of beginning.
         */
        protected begin_: ListIterator<T>;
        /**
         * An iterator of end.
         */
        protected end_: ListIterator<T>;
        /**
         * Number of elements in the {@link List}.
         */
        protected size_: number;
        /**
         * @inheritdoc
         */
        constructor();
        /**
         * @inheritdoc
         */
        constructor(items: Array<T>);
        /**
         * <p> Fill Constructor. </p>
         *
         * <p> Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided). </p>
         *
         * @param n Initial container size (i.e., the number of elements in the container at construction).
         * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is
         *			  initialized to a copy of this value.
         */
        constructor(size: number, val: T);
        /**
         * @inheritdoc
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * @inheritdoc
         */
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        /**
         * <p> Assign container content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents, and modifying its size
         * accordingly. </p>
         *
         * @param size New size of the container.
         * @param val Value to fill the container with. Each of the <i>n</i> elements in the container will be
         *			  initialized to a copy of this value.
         */
        assign(size: number, val: T): void;
        /**
         * @inheritdoc
         */
        assign(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        begin(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        end(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        size(): number;
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the List. </p>
         *
         * <p> Unlike member {@link end end()}, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the List.
         */
        front(): T;
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the List. </p>
         *
         * <p> Unlike member {@link end end()}, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the List.
         */
        back(): T;
        /**
         * @inheritdoc
         */
        push(...items: T[]): number;
        /**
         * <p> Insert element at beginning. </p>
         *
         * <p> Inserts a new element at the beginning of the list, right before its current first element.
         * This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        pushFront(val: T): void;
        /**
         * <p> Add element at the end. </p>
         *
         * <p> Adds a new element at the lend of the {@link List} container, after its current last
         * element. This effectively increases the container {@link size} by one. </p>
         *
         * @param val Value to be copied to the new element.
         */
        pushBack(val: T): void;
        /**
         * <p> Delete first element. </p>
         *
         * <p> Removes first last element in the List container, effectively reducing the container
         * {@link size} by one. </p>
         */
        popFront(): void;
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the List container, effectively reducing the container
         * {@link size} by one. </p>
         */
        popBack(): void;
        /**
         * <p> Insert an element. </p>
         *
         * <p> The container is extended by inserting a new element before the element at the specified
         * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements
         * inserted. </p>
         *
         * <p> Unlike other standard sequence containers, {@link List} is specifically designed to be
         * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
         *
         * <p> The arguments determine how many elements are inserted and to which values they are initialized. </p>
         *
         * @param position Position in the container where the new element is inserted.
         *				   {@link iterator}> is a member type, defined as a
         *				   {@link ListIterator bidirectional iterator} type that points to elements.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the newly inserted element; <i>val</i>.
         */
        insert(position: ListIterator<T>, val: T): ListIterator<T>;
        /**
         * <p> Insert elements by repeated filling. </p>
         *
         * @param position Position in the container where the new elements are inserted.
         *				   {@link iterator}> is a member type, defined as a
         *				   {@link ListIterator bidirectional iterator} type that points to elements.
         * @param size Number of elements to insert.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;
        /**
         *
         * @param position Position in the container where the new elements are inserted.
         *				   {@link iterator}> is a member type, defined as a
         *				   {@link ListIterator bidirectional iterator} type that points to elements.
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert(position: ListIterator<T>, begin: base.container.Iterator<T>, end: base.container.Iterator<T>): ListIterator<T>;
        /**
         * @private
         */
        private insertByVal(position, val);
        /**
         * @private
         */
        private insertByRepeatingVal(position, size, val);
        /**
         * @private
         */
        private insertByRange(position, begin, end);
        /**
         * <p> Erase an element. </p>
         *
         * <p> Removes from the {@link List} either a single element; <i>position</i>. </p>
         *
         * <p> This effectively reduces the container size by the number of element removed. </p>
         *
         * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to
         * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
         *
         * @param position Iterator pointing to a single element to be removed from the {@link List}.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function
         *		   call. This is the {@link end end()} if the operation erased the last element in the
         *		   sequence.
         */
        erase(position: ListIterator<T>): ListIterator<T>;
        /**
         * <p> Erase elements. </p>
         *
         * <p> Removes from the {@link List} container a range of elements. </p>
         *
         * <p> This effectively reduces the container {@link size} by the number of elements removed. </p>
         *
         * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to
         * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function
         *		   call. This is the {@link end end()} if the operation erased the last element in the
         *		   sequence.
         */
        erase(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>;
        /**
         * @private
         */
        private eraseByIterator(it);
        /**
         * @private
         */
        private eraseByRange(begin, end);
    }
}
declare namespace std {
    class ListIterator<T> extends base.container.Iterator<T> {
        protected value_: T;
        protected prev_: ListIterator<T>;
        protected next_: ListIterator<T>;
        /**
         * <p> Construct from source List. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in List instead. </p>
         *
         * @param list The source vector to reference.
         */
        constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T);
        /**
         * @inheritdoc
         */
        setPrev(prev: ListIterator<T>): void;
        /**
         * @inheritdoc
         */
        setNext(next: ListIterator<T>): void;
        /**
         * @inheritdoc
         */
        equals(obj: ListIterator<T>): boolean;
        /**
         * @inheritdoc
         */
        prev(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        next(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        advance(size: number): ListIterator<T>;
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        value: T;
    }
}
declare namespace std {
    class MapIterator<K, T> {
        protected source: base.container.MapContainer<K, T>;
        protected listIterator: ListIterator<Pair<K, T>>;
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        constructor(source: base.container.MapContainer<K, T>, listIterator: ListIterator<Pair<K, T>>);
        /**
         * Get listIterator.
         */
        getListIterator(): ListIterator<Pair<K, T>>;
        /**
         * Get iterator to previous element.
         */
        prev(): MapIterator<K, T>;
        /**
         * Get iterator to next element.
         */
        next(): MapIterator<K, T>;
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        advance(n: number): MapIterator<K, T>;
        /**
         * Get source.
         */
        getSource(): base.container.MapContainer<K, T>;
        /**
         * Get first, key element.
         */
        first: K;
        /**
         * Get second, value element.
         */
        second: T;
        equals<L extends K, U extends T>(obj: MapIterator<L, U>): boolean;
        less<L extends K, U extends T>(obj: MapIterator<L, U>): boolean;
        hashCode(): number;
    }
}
/**
 * <p> A namespace of STL library. </p>
 *
 * <ul>
 *	<li> Formal homepage: http://samchon.github.io/stl/ </li>
 *	<li> Github: https://github.com/samchon/stl/ </li>
 *	<li> Reference: http://www.cplusplus.com/reference/ </li>
 * </ul>
 *
 * @author Jeongho Nam
 */
declare namespace std {
}
declare namespace std.base {
}
/**
 * <p> A namespace containing abstract container objects. </p>
 *
 * <ul>
 * 	<li> Reference: http://www.cplusplus.com/reference/stl/ </li>
 * </ul>
 *
 * @author Jeongho Nam
 */
declare namespace std.base.container {
}
declare namespace std.base.hash {
}
declare namespace std.base.tree {
}
declare namespace std.system {
}
declare namespace std {
    /**
     * <p> Pair of values. </p>
     *
     * <p> This class couples together a pair of values, which may be of different types (<code>T1</code> and
     * <code>T2</code>). The individual values can be accessed through its public members <code>first</code> and
     * <code>second</code>. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/utility/pair/ </li>
     * </ul>
     *
     * @param <K> Type of member <code>first</code>.
     * @param <T> Type of member <code>second</code>.
     *
     * @author Jeongho Nam
     */
    class Pair<T1, T2> {
        /**
         * <p> A first value in the Pair. </p>
         */
        first: T1;
        /**
         * <p> A second value in the Pair. </p>
         */
        second: T2;
        /**
         * <p> Construct from pair values. </p>
         *
         * @param first The first value of the Pair
         * @param second The second value of the Pair
         */
        constructor(first: T1, second: T2);
        /**
         * <p> Whether a Pair is equal with the Pair. <p>
         * <p> Compare each first and second value of two Pair(s) and returns whether they are equal or not. </p>
         *
         * <p> If stored key and value in a Pair are not number or string but an object like a class or struct,
         * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have
         * the member method equals(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
        less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
    }
}
declare namespace std {
    /**
     * <p> FIFO queue. </p>
     *
     * <p> <code>Queue</code>s are a type of container adaptor, specifically designed to operate in a FIFO
     * context (first-in first-out), where elements are inserted into one end of the container and extracted
     * from the other. </p>
     *
     * <p> <code>Queue</code>s are implemented as containers adaptors, which are classes that use an encapsulated
     * object of a specific container class as its underlying container, providing a specific set of member
     * functions to access its elements. Elements are pushed into the <code>back()</code> of the specific
     * container and popped from its <code>front()</code>. </p>
     *
     * <p> The underlying container may be one of the standard container class template or some other specifically
     * designed container class. This underlying container shall support at least the following operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> pushBack </li>
     *	<li> popFront </li>
     * </ul>
     *
     * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular <code>Queue</code> class instantiation,
     * the standard container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/queue/queue/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    class Queue<T> extends base.container.FOContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a LIFO or FIFO container.
         *
         * @param container An abstract container of LIFO and FIFO.
         */
        constructor(container: base.container.FOContainer<T>);
        /**
         * <p> Access next element. </p>
         * <p> Returns a value of the next element in the <code>Queue</code>. </p>
         *
         * <p> The next element is the "oldest" element in the <code>Queue</code> and the same element that is
         * popped out from the queue when <code>Queue::pop()</code> is called. </p>
         *
         * <p> This member function effectively calls <code>member()</code> front of the <i>underlying container</i> sobject. </p>
         *
         * @return A value of the next element in the <code>Queue</code>.
         */
        front(): T;
        /**
         * <p> Access last element. </p>
         *
         * <p> Returns a vaue of the last element in the queue. This is the "newest" element in the queue
         * (i.e. the last element pushed into the queue). </p>
         *
         * <p> This member function effectively calls member <code>back()</code> of the
         * <i>underlying container</i> object. </p>
         *
         * @return A value of the last element in the <code>Queue</code>.
         */
        back(): T;
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the end of the <code>Queue</code>, after its current last element.
         * The content of this new element is initialized to val. </p>
         *
         * <p> This member function effectively calls the member function <code>pushBack()</code> of the
         * <i>underlying container</i> object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        push(val: T): void;
        /**
         * <p> Remove next element. </p>
         *
         * <p> Removes the next element in the <code>Queue</code>, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the "oldest" element in the <code>Queue</code> whose value can be retrieved
         * by calling member <code>Queue::front()</code> </p>.
         *
         * <p> This member function effectively calls the member function <code>popFront()</code> of the
         * <i>underlying container</i> object. </p>
         */
        pop(): void;
    }
}
declare namespace std {
    /**
     * <p> An iterator of a Set. </p>
     *
     * @author Jeongho Nam
     */
    class SetIterator<T> extends base.container.Iterator<T> {
        private listIterator;
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p>
         *
         * @param map The source Set to reference.
         * @param index Sequence number of the element in the source Set.
         */
        constructor(source: base.container.SetContainer<T>, it: ListIterator<T>);
        getListIterator(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        prev(): SetIterator<T>;
        /**
         * @inheritdoc
         */
        next(): SetIterator<T>;
        /**
         * @inheritdoc
         */
        advance(size: number): SetIterator<T>;
        private set;
        /**
         * @inheritdoc
         */
        value: T;
        /**
         * @inheritdoc
         */
        equals<U extends T>(obj: SetIterator<U>): boolean;
        less<U extends T>(obj: SetIterator<U>): boolean;
        hashCode(): number;
    }
}
declare namespace std {
    /**
     * <p> LIFO stack. </p>
     *
     * <p> <code>Stack</code>s are a type of container adaptor, specifically designed to operate in a LIFO context
     * (last-in first-out), where elements are inserted and extracted only from one end of the container. </p>
     *
     * <p> <code>Stack</code>s are implemented as containers adaptors, which are classes that use an encapsulated
     * object of a specific container class as its <i>underlying container</i>, providing a specific set of member
     * functions to access its elements. Elements are pushed/popped from the <code>back()</code> of the specific
     * container, which is known as the top of the <code>Stack</code>. </p>
     *
     * <p> The underlying container may be any of the standard container class templates or some other
     * specifically designed container class. The container shall support the following operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> pushBack </li>
     *	<li> popFront </li>
     * </ul>
     *
     * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular <code>Stack</code> class instantiation,
     * the standard container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/stack/stack/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    class Stack<T> extends base.container.FOContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from a LIFO or FIFO container.
         *
         * @param container An abstract container of LIFO and FIFO.
         */
        constructor(container: base.container.FOContainer<T>);
        /**
         * <p> Access next element. </p>
         *
         * <p> Returns a value of the top element in the <code>Stack</code> </p>.
         *
         * <p> Since <code>Stack</code>s are last-in first-out containers, the top element is the last element
         * inserted into the <code>Stack</code>. </p>
         *
         * <p> This member function effectively calls member <code>back()</code> of the
         * <i>underlying container</i> object. </p>
         *
         * @return A value of the top element in the <code>Stack</code>.
         */
        top(): T;
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the top of the <code>Stack</code>, above its current top element. </p>
         *
         * <p> This member function effectively calls the member function <code>pushBack()</code> of the
         * <i>underlying container</i> object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        push(val: T): void;
        /**
         * <p> Remove top element. </p>
         *
         * <p> Removes the element on top of the <code>Stack</code>, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the latest element inserted into the <code>Stack</code>, whose value can be
         * retrieved by calling member <code>Stack::top()</code> </p>.
         *
         * <p> This member function effectively calls the member function <code>popBack()</code> of the
         * <i>underlying container</i> object. </p>
         */
        pop(): void;
    }
}
declare namespace std {
    /**
     * <p> System error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report conditions originating during
     * runtime from the operating system or other low-level application program interfaces which have an
     * associated {@link ErrorCode}. </p>
     *
     * <p> The class inherits from {@link RuntimeError}, to which it adds an {@link ErrorCode} as
     * member code (and defines a specialized what member). </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/system_error/system_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    class SystemError extends RuntimeError {
        /**
         * Error code.
         */
        protected code_: ErrorCode;
        /**
         * Construct from an error code.
         *
         * @param code An {@link ErrorCode} object.
         */
        constructor(code: ErrorCode);
        /**
         * Construct from an error code and message.
         *
         * @param code An {@link ErrorCode} object.
         * @param message A message incorporated in the string returned by member <code>what()</code>.
         */
        constructor(code: ErrorCode, message: string);
        /**
         * Construct from a numeric value and error category.
         *
         * @param val A numerical value identifying an error code.
         * @param category A reference to an {@link ErrorCode} object.
         */
        constructor(val: number, category: ErrorCategory);
        /**
         * Construct from a numeric value, error category and message.
         *
         * @param val A numerical value identifying an error code.
         * @param category A reference to an {@link ErrorCode} object.
         * @param message A message incorporated in the string returned by member <code>what()</code>.
         */
        constructor(val: number, category: ErrorCategory, message: string);
        /**
         * <p> Get error code. </p>
         *
         * <p> Returns the {@link ErrorCode} object associated with the exception. </p>
         *
         * <p> This value is either the {@link ErrorCode} passed to the construction or its equivalent
         * (if constructed with a value and a <code>category</code>). </p>
         *
         * @return The {@link ErrorCode} associated with the object.
         */
        code(): ErrorCode;
    }
}
declare namespace std {
    /**
     * <p> Tree-structured map, <code>std::map</code> of STL. </p>
     *
     * <p> {@link TreeMap}s are associative containers that store elements formed by a combination of a
     * <i>key value</i> (<code>Key</code>) and a <i>mapped value</i> (<code>T</code>), following order. </p>
     *
     * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify
     * the elements, while the <i>mapped values</i> store the content associated to this key. The types of
     * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type
     * <code>value_type</code>, which is a {@link Pair} type combining both:
     *
     * <p> <code>typedef Pair<Key, T> value_type;</code> </p>
     *
     * <p> Internally, the elements in a {@link TreeMap} are always sorted by its <i>key</i> following
     * a strict weak ordering criterion indicated by its internal comparison method {@link less}.
     *
     * <p> {@link TreeMap} containers are generally slower than {@link HashMap HashMap} containers to
     * access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on
     * their order. </p>
     *
     * <p> {@link TreeMap}s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/map/map/ </li>
     * </ul>
     *
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    class TreeMap<Key, T> extends base.container.UniqueMap<Key, T> {
        /**
         * <i>RB-Tree+</i> object for implemeting the {@link TreeMap}.
         */
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        /**
         * Contruct from elements.
         *
         * @param array Elements to be contained.
         */
        constructor(array: Array<Pair<Key, T>>);
        /**
         * Copy Constructor.
         *
         * @param container Another map to copy.
         */
        constructor(container: base.container.MapContainer<Key, T>);
        /**
         * Range Constructor.
         *
         * @param begin nput interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        constructor(begin: MapIterator<Key, T>, end: MapIterator<Key, T>);
        /**
         * @inheritdoc
         */
        assign<L extends Key, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: Key): MapIterator<Key, T>;
        findNear(key: Key): MapIterator<Key, T>;
        /**
         * @private
         */
        protected insertByPair<L extends Key, U extends T>(pair: Pair<L, U>): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<Key, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<Key, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Tree-structured multiple-key map. </p>
     *
     * <p> <code>TreeMultiMap</code>s are associative containers that store elements formed by a combination of
     * a <i>key value</i> and a <i>mapped value</i>, following a specific order, and where multiple elements can
     * have equivalent keys. </p>
     *
     * <p> In a <code>TreeMultiMap</code>, the <i>key values</i> are generally used to sort and uniquely identify
     * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of
     * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type
     * <code>value_type</code>, which is a <code>Pair</code> type combining both:
     *
     * <p> <code>typedef Pair<const Key, T> value_type;</code> </p>
     *
     * <p> Internally, the elements in a <code>TreeMultiMap</code> are always sorted by its key following a
     * strict weak ordering criterion indicated by its internal comparison method (of {@link less}). </p>
     *
     * <p> <code>TreeMultiMap</code> containers are generally slower than <code>HashMultiMap</code> containers
     * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based
     * on their order. </p>
     *
     * <p> <code>TreeMultiMap</code>s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/map/multimap/ </li>
     * </ul>
     *
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    class TreeMultiMap<Key, T> extends base.container.MultiMap<Key, T> {
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        /**
         * Contruct from elements.
         *
         * @param array Elements to be contained.
         */
        constructor(array: Array<Pair<Key, T>>);
        /**
         * Copy Constructor.
         *
         * @param container Another map to copy.
         */
        constructor(container: base.container.MapContainer<Key, T>);
        /**
         * Range Constructor.
         *
         * @param begin nput interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        constructor(begin: MapIterator<Key, T>, end: MapIterator<Key, T>);
        /**
         * @inheritdoc
         */
        assign<L extends Key, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: Key): MapIterator<Key, T>;
        findNear(key: Key): MapIterator<Key, T>;
        /**
         * @private
         */
        protected insertByPair<L extends Key, U extends T>(pair: Pair<L, U>): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<Key, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<Key, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Tree-structured multiple-key set. </p>
     *
     * <p> <code>TreeMultiSet</code>s are containers that store elements following a specific order, and where
     * multiple elements can have equivalent values. </p>
     *
     * <p> In a <code>TreeMultiSet</code>, the value of an element also identifies it (the value is itself
     * the <i>key</i>, of type <code>T</code>). The value of the elements in a <code>TreeMultiSet</code> cannot
     * be modified once in the container (the elements are always const), but they can be inserted or removed
     * from the container. </p>
     *
     * <p> Internally, the elements in a <code>TreeMultiSet</code>s are always sorted following a strict weak
     * ordering criterion indicated by its internal comparison method (of {@link less}).
     *
     * <p> <code>TreeMultiSet</code> containers are generally slower than <code>HashMultiSet</code> containers
     * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on
     * their order. </p>
     *
     * <p> <code>TreeMultiSet</code>s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/set/multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements. Each element in a <code>TreeMultiSet</code> container is also identified
     *			  by this value (each value is itself also the element's <i>key</i>).
     *
     * @author Jeongho Nam
     */
    class TreeMultiSet<T> extends base.container.MultiSet<T> {
        /**
         * <i>RB-Tree+</i> object for implemeting the <code>TreeMultiSet</code>.
         */
        private tree;
        /**
         * Default Constructor.
         */
        constructor();
        constructor(array: Array<T>);
        constructor(container: base.container.Container<T>);
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): SetIterator<T>;
        findNear(val: T): SetIterator<T>;
        /**
         * @private
         */
        protected insertByVal(val: T): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> Tree-structured set, <code>std::set</code> of STL. </p>
     *
     * <p> {@link TreeSet}s are containers that store unique elements following a specific order. </p>
     *
     * <p> In a {@link TreeSet}, the value of an element also identifies it (the value is itself the
     * <i>key</i>, of type <code>T</code>), and each value must be unique. The value of the elements in a
     * {@link TreeSet} cannot be modified once in the container (the elements are always const), but they
     * can be inserted or removed from the container. </p>
     *
     * <p> Internally, the elements in a set are always sorted following a specific strict weak ordering
     * criterion indicated by its internal comparison method (of {@link less}). </p>
     *
     * <p> {@link TreeSet} containers are generally slower than {@link HashSet} containers to access
     * individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on their
     * order. </p>
     *
     * <p> {@link TreeSet}s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/set/set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an {@link TreeSet} is also uniquely identified by this value.
     *
     * @author Jeongho Nam
     */
    class TreeSet<T> extends base.container.UniqueSet<T> {
        /**
         * <i>RB-Tree+</i> object for implemeting the {@link TreeSet}.
         */
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        constructor(array: Array<T>);
        constructor(container: base.container.Container<T>);
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): SetIterator<T>;
        findNear(val: T): SetIterator<T>;
        /**
         * @private
         */
        protected insertByVal(val: T): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> Vector, the dynamic array. </p>
     *
     * <p> {@link Vector}s are sequence containers representing arrays that can change in size. </p>
     *
     * <p> Just like arrays, {@link Vector}s use contiguous storage locations for their elements, which
     * means that their elements can also be accessed using offsets on regular pointers to its elements, and
     * just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their
     * storage being handled automatically by the container. </p>
     *
     * <p> Internally, {@link Vector}s use a dynamically allocated array to store their elements. This
     * array may need to be reallocated in order to grow in size when new elements are inserted, which implies
     * allocating a new array and moving all elements to it. This is a relatively expensive task in terms of
     * processing time, and thus, {@link Vector}s do not reallocate each time an element is added to the
     * container. </p>
     *
     * <p> Instead, {@link Vector} containers may allocate some extra storage to accommodate for possible
     * growth, and thus the container may have an actual {@link capacity} greater than the storage strictly
     * needed to contain its elements (i.e., its {@link size}). Libraries can implement different strategies
     * for growth to balance between memory usage and reallocations, but in any case, reallocations should only
     * happen at logarithmically growing intervals of {@link size} so that the insertion of individual
     * elements at the end of the {@link Vector} can be provided with amortized constant time complexity
     * (see {@link pushBack pushBack()}). </p>
     *
     * <p> Therefore, compared to arrays, {@link Vector}s consume more memory in exchange for the ability
     * to manage storage and grow dynamically in an efficient way. </p>
     *
     * <p> Compared to the other dynamic sequence containers ({@link Deque}s, {@link List}s),
     * {@link Vector}s are very efficient accessing its elements (just like arrays) and relatively
     * efficient adding or removing elements from its end. For operations that involve inserting or removing
     * elements at positions other than the end, they perform worse than the others, and have less consistent
     * iterators and references than {@link List}s. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Sequence </dt>
     *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     *	<dt> Dynamic array </dt>
     *	<dd> Allows direct access to any element in the sequence, even through pointer arithmetics, and provides
     *		 relatively fast addition/removal of elements at the end of the sequence. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/vector/vector/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
     */
    class Vector<T> extends Array<T> implements base.container.IContainer<T> {
        static iterator: typeof VectorIterator;
        /**
         * @inheritdoc
         */
        constructor();
        /**
         * @inheritdoc
         */
        constructor(array: Array<T>);
        /**
         * Consturct from capacity size.
         *
         * @param n Capacity number to reserve.
         */
        constructor(n: number);
        /**
         * <p> Fill Constructor. </p>
         *
         * <p> Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided). </p>
         *
         * @param n Initial container size (i.e., the number of elements in the container at construction).
         * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is
         *			  initialized to a copy of this value.
         */
        constructor(size: number, val: T);
        /**
         * @inheritdoc
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * @inheritdoc
         */
        constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
        /**
         * <p> Assign container content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents,
         * and modifying its size accordingly. </p>
         *
         * @param size New size of the container.
         * @param val Value to fill the container with. Each of the <u>n</u> elements in the container will be
         *			  initialized to a copy of this value.
         */
        assign(n: number, val: T): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        begin(): VectorIterator<T>;
        /**
         * @inheritdoc
         */
        end(): VectorIterator<T>;
        /**
         * @inheritdoc
         */
        size(): number;
        capacity(): number;
        /**
         * @inheritdoc
         */
        empty(): boolean;
        /**
         * <p> Access element. </p>
         * <p> Returns a value to the element at position <i>index</i> in the Vector.</p>
         *
         * <p> The function automatically checks whether n is within the bounds of valid elements in the
         * Vector, throwing an OutOfRange exception if it is not (i.e., if <i>index</i> is greater or
         * equal than its size). This is in contrast with member operator[], that does not check against
         * bounds. </p>
         *
         * @param index Position of an element in the container.
         *			  If this is greater than or equal to the vector size, an exception of type OutOfRange
         *			  is thrown. Notice that the first element has a position of 0 (not 1).
         *
         * @return The element at the specified position in the container.
         */
        at(index: number): T;
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the Vector. </p>
         *
         * <p> Unlike member {@link begin begin()}, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the Vector.
         */
        front(): T;
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the Vector. </p>
         *
         * <p> Unlike member <{@link end end()}, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the Vector.
         */
        back(): T;
        /**
         * <p> Add element at the end. </p>
         *
         * <p> Adds a new element at the end of the {@link Vector}, after its current last element. The
         * content of <i>val</i> is copied to the new element. </p>
         *
         * <p> This effectively increases the container {@link size} by one, which causes an automatic
         * reallocation of the allocated storage space if -and only if- the new {@link size}
         * surpasses the current {@link capacity}.
         *
         * @param val Value to be copied to the new element.
         */
        pushBack(val: T): void;
        /**
         * Replaces the element at the specified position in this list with the specified element.
         *
         * @param index A specified position of the value to replace.
         * @param val A value to be stored at the specified position.
         *
         * @return The previous element had stored at the specified position.
         */
        set(index: number, val: T): T;
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the Vector container, effectively reducing the container
         * {@link size} by one. </p>
         */
        popBack(): void;
        /**
         * <p> Insert an element. </p>
         *
         * <p> The {@link Vector} is extended by inserting new element before the element at the specified
         * <i>position</i>, effectively increasing the container size to be more one. </p>
         *
         * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new
         * {@link size} surpasses the current {@link capacity}. </p>
         *
         * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting
         * element in positions other than the {@link end end()} causes the container to relocate all the
         * elements that were after <i>position</i> to its new position. This is generally an inefficient
         * operation compared to the one performed for the same operation by other kinds of sequence containers
         * (such as {@link List}). </p>
         *
         * @param position Position in the {@link Vector} where the new element is inserted.
         *				   {@link iterator} is a member type, defined as a
         *				   {@link VectorIterator random access iterator} type that points to elements.
         * @param val Value to be copied to the inserted element.
         *
         * @return An iterator that points to the newly inserted element.
         */
        insert(position: VectorIterator<T>, val: T): VectorIterator<T>;
        /**
         * <p> Insert elements by repeated filling. </p>
         *
         * <p> The {@link Vector} is extended by inserting new elements before the element at the specified
         * <i>position</i>, effectively increasing the container size by the number of elements inserted. </p>
         *
         * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new
         * {@link size} surpasses the current {@link capacity}. </p>
         *
         * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting
         * elements in positions other than the {@link end end()} causes the container to relocate all the
         * elements that were after <i>position</i> to their new positions. This is generally an inefficient
         * operation compared to the one performed for the same operation by other kinds of sequence containers
         * (such as {@link List}).
         *
         * @param position Position in the {@link Vector} where the new elements are inserted.
         *				   {@link iterator} is a member type, defined as a
         *				   {@link VectorIterator random access iterator} type that points to elements.
         * @param n Number of elements to insert. Each element is initialized to a copy of <i>val</i>.
         * @param val Value to be copied (or moved) to the inserted elements.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert(position: VectorIterator<T>, n: number, val: T): VectorIterator<T>;
        /**
         * <p> Insert elements by range iterators. </p>
         *
         * <p> The {@link Vector} is extended by inserting new elements before the element at the specified
         * <i>position</i>, effectively increasing the container size by the number of elements inserted by
         * range iterators. </p>
         *
         * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new
         * {@link size} surpasses the current {@link capacity}. </p>

         * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting
         * elements in positions other than the {@link end end()} causes the container to relocate all the
         * elements that were after <i>position</i> to their new positions. This is generally an inefficient
         * operation compared to the one performed for the same operation by other kinds of sequence containers
         * (such as {@link List}).
         *
         * @param position Position in the {@link Vector} where the new elements are inserted.
         *				   {@link iterator} is a member type, defined as a
         *				   {@link VectorIterator random access iterator} type that points to elements.
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert<U extends T>(position: VectorIterator<T>, begin: base.container.Iterator<U>, end: base.container.Iterator<U>): VectorIterator<T>;
        /**
         * <p> Erase element. </p>
         *
         * <p> Removes from the {@link Vector} either a single element; <i>position</i>. </p>
         *
         * <p> This effectively reduces the container size by the number of element removed. </p>
         *
         * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing an
         * element in position other than the {@link end end()} causes the container to relocate all the
         * elements after the segment erased to their new positions. This is generally an inefficient operation
         * compared to the one performed for the same operation by other kinds of sequence containers
         * (such as {@link List}). </p>
         *
         * @param position Iterator pointing to a single element to be removed from the {@link Vector}.
         *
         * @return An iterator pointing to the new location of the element that followed the last element erased
         *		   by the function call. This is the {@link end end()} if the operation erased the last
         *		   element in the sequence.
         */
        erase(position: VectorIterator<T>): VectorIterator<T>;
        /**
         * <p> Erase element. </p>
         *
         * <p> Removes from the <ode>Vector</code> either a single element; <i>position</i>. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing
         * elements in position other than the {@link end end()} causes the container to relocate all the
         * elements after the segment erased to their new positions. This is generally an inefficient operation
         * compared to the one performed for the same operation by other kinds of sequence containers
         * (such as {@link List}). </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         *
         * @return An iterator pointing to the new location of the element that followed the last element erased
         *		   by the function call. This is the {@link end end()} if the operation erased the last
         *		   element in the sequence.
         */
        erase(begin: VectorIterator<T>, end: VectorIterator<T>): VectorIterator<T>;
    }
}
declare namespace std {
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
     */
    class VectorIterator<T> extends base.container.Iterator<T> {
        /**
         * <p> Sequence number of iterator in the source Vector. </p>
         */
        private index;
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Vector instead. </p>
         *
         * @param vector The source vector to reference.
         * @param index Sequence number of the element in the surce vector.
         */
        constructor(source: Vector<T>, index: number);
        private vector;
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        value: T;
        /**
         * @inheritdoc
         */
        equals<U extends T>(obj: VectorIterator<U>): boolean;
        /**
         * Get index.
         */
        getIndex(): number;
        /**
         * @inheritdoc
         */
        prev(): VectorIterator<T>;
        /**
         * @inheritdoc
         */
        next(): VectorIterator<T>;
        /**
         * @inheritdoc
         */
        advance(n: number): VectorIterator<T>;
    }
}