/// <reference path="API.ts" />

/// <reference path="base/UniqueSet.ts" />
/// <reference path="base/MultiSet.ts" />

namespace std
{
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
	 * <p> {@link HashSet} containers are faster than {@link TreeSet} containers to access individual 
	 * elements by their <i>key</i>, although they are generally less efficient for range iteration through a 
	 * subset of their elements. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the  </dd>
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
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashSet<T>
		extends base.UniqueSet<T>
	{
		private hash_buckets_: base.SetHashBuckets<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from elements.
		 */
		public constructor(items: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.IContainer<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			// BUCKET
			this.hash_buckets_ = new base.SetHashBuckets<T>(this);

			// OVERLOADINGS
			if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof base.Container)
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}
		
		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			this.hash_buckets_.reserve(items.length * base.RATIO);

			super.construct_from_array(items);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			let it: InputIterator;
			let size: number = 0;
			
			// RESERVE HASH_BUCKET SIZE
			for (it = begin; it.equal_to(end) == false; it = it.next() as InputIterator)
				size++;

			this.hash_buckets_.clear();
			this.hash_buckets_.reserve(size * base.RATIO);

			// SUPER; INSERT
			super.assign(begin, end);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.hash_buckets_.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			return this.hash_buckets_.find(val);
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_val(val: T): any
		{
			// TEST WHETHER EXIST
			let it = this.find(val);
			if (it.equal_to(this.end()) == false)
				return new Pair<SetIterator<T>, boolean>(it, false);

			// INSERT
			this.data_.push_back(val);
			it = it.prev();

			// POST-PROCESS
			this.handle_insert(<SetIterator<T>>it);

			return new Pair<SetIterator<T>, boolean>(it, true);
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			// CALCULATE INSERTING SIZE
			let size: number = 0;
			for (let it = begin; it.equal_to(end) == false; it = it.next() as InputIterator)
				size++;

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.size() * base.MAX_RATIO)
				this.hash_buckets_.reserve((this.size() + size) * base.RATIO);

			// INSERTS
			super.insert_by_range(begin, end);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(item: SetIterator<T>): void
		{
			this.hash_buckets_.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(item: SetIterator<T>): void
		{
			this.hash_buckets_.erase(item);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<T>): void
		{
			if (obj instanceof HashSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: HashSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}

	/**
	 * <p> Hashed, unordered Multiset. </p>
	 *
	 * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast 
	 * retrieval of individual elements based on their value, much like {@link HashSet} containers, 
	 * but allowing different elements to have equivalent values. </p>
	 *
	 * <p> In an {@link HashMultiSet}, the value of an element is at the same time its <i>key</i>, used to 
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link HashMultiSet} cannot be 
	 * modified once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> Internally, the elements in the {@link HashMultiSet} are not sorted in any particular, but 
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
	 *		 position in the  </dd>
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
	 *		   Each element in an {@link UnorderedMultiSet} is also identified by this value..
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiSet<T>
		extends base.MultiSet<T>
	{
		private hash_buckets_: base.SetHashBuckets<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from elements.
		 */
		public constructor(items: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.IContainer<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		public constructor(...args: any[])
		{
			super();
			
			// BUCKET
			this.hash_buckets_ = new base.SetHashBuckets<T>(this);

			// OVERLOADINGS
			if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof base.Container)
		   { 
				this.construct_from_container(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			this.hash_buckets_.reserve(items.length * base.RATIO);

			super.construct_from_array(items);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			let it: base.Iterator<U>;
			let size: number = 0;
			
			// RESERVE HASH_BUCKET SIZE
			for (it = begin; it.equal_to(end) == false; it = it.next())
				size++;

			this.hash_buckets_.clear();
			this.hash_buckets_.reserve(size * base.RATIO);

			// SUPER; INSERT
			super.assign(begin, end);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.hash_buckets_.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			return this.hash_buckets_.find(val);
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_val(val: T): any
		{
			// INSERT
			let listIterator = this.data_.insert(this.data_.end(), val);

			let it = new SetIterator<T>(this, listIterator);

			// POST-PROCESS
			this.handle_insert(it);

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			// CALCULATE INSERTING SIZE
			let size: number = 0;
			for (let it = begin; it.equal_to(end) == false; it = it.next() as InputIterator)
				size++;

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.item_size() * base.MAX_RATIO)
				this.hash_buckets_.reserve((this.size() + size) * base.RATIO);

			// INSERTS
			super.insert_by_range(begin, end);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(it: SetIterator<T>): void
		{
			this.hash_buckets_.insert(it);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(it: SetIterator<T>): void
		{
			this.hash_buckets_.erase(it);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<T>): void
		{
			if (obj instanceof HashMultiSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: HashMultiSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}