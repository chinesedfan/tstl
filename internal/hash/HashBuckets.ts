//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================

import { BinaryPredicator } from "../functional/BinaryPredicator";
import { Hasher } from "../functional/Hasher";

/**
 * Hash buckets
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class HashBuckets<Key, Elem>
{
    private readonly hasher_: Hasher<Key>;
    private readonly predicator_: BinaryPredicator<Key>;
    private readonly fetcher_: Fetcher<Key, Elem>;

    private max_load_factor_: number;
    private data_: Elem[][];
    private size_: number;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    public constructor(fetcher: Fetcher<Key, Elem>, hasher: Hasher<Key>, pred: BinaryPredicator<Key>)
    {
        this.fetcher_ = fetcher;
        this.hasher_ = hasher;
        this.predicator_ = pred;

        this.max_load_factor_ = DEFAULT_MAX_FACTOR;
        this.data_ = [];
        this.size_ = 0;

        this.initialize();
    }

    public clear(): void
    {
        this.data_ = [];
        this.size_ = 0;

        this.initialize();
    }

    public rehash(length: number): void
    {
        length = Math.max(length, MIN_BUCKET_COUNT);

        const log: number = Math.log2(length);
        if (log !== Math.floor(log))
            length = Math.pow(2, Math.ceil(log));

        // CREATE NEW BUCKET
        const data: Elem[][] = [];
        for (let i: number = 0; i < length; ++i)
            data.push([]);

        // MIGRATE ELEMENTS TO THE NEW BUCKET
        for (const row of this.data_)
            for (const element of row)
            {
                const index: number = this.hasher_(this.fetcher_(element)) % length;
                data[index].push(element);
            }

        // DO CHANGE THE BUCKET
        this.data_ = data;
    }

    public reserve(length: number): void
    {
        if (length > this.capacity())
        {
            length = Math.floor(length / this.max_load_factor_);
            this.rehash(length);
        }
    }

    private initialize(): void
    {
        for (let i: number = 0; i < MIN_BUCKET_COUNT; ++i)
            this.data_.push([]);
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    public size(): number
    {
        return this.size_;
    }

    public row_size(): number
    {
        return this.data_.length;
    }

    public capacity(): number
    {
        return Math.floor(this.data_.length * this.max_load_factor_);
    }

    public at(index: number): Elem[]
    {
        return this.data_[index];
    }

    public load_factor(): number
    {
        return this.size_ / this.row_size();
    }

    public max_load_factor(): number;
    public max_load_factor(z: number): void;
    public max_load_factor(z: number | null = null): number | void
    {
        if (z === null)
            return this.max_load_factor_;
        else
            this.max_load_factor_ = z;
    }

    public hash_function(): Hasher<Key>
    {
        return this.hasher_;
    }

    public key_eq(): BinaryPredicator<Key>
    {
        return this.predicator_;
    }

    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    private index_by_key(key: Key): number
    {
        return this.hasher_(key) & (this.data_.length - 1);
    }

    private index_by_value(elem: Elem): number
    {
        return this.index_by_key(this.fetcher_(elem));
    }

    public find(key: Key): Elem | null
    {
        const index: number = this.index_by_key(key);
        const bucket: Elem[] = this.at(index);

        for (const it of bucket)
            if (this.predicator_(key, this.fetcher_(it)) === true)
                return it;
        
        return null;
    }

    public insert(val: Elem): void
    {
        const capacity: number = this.capacity();
        if (++this.size_ > capacity)
            this.reserve(capacity * 2);

        const index: number = this.index_by_value(val);
        this.data_[index].push(val);
    }

    public erase(val: Elem): void
    {
        const index: number = this.index_by_value(val);
        const bucket: Elem[] = this.data_[index];

        for (let i: number = 0; i < bucket.length; ++i)
            if (bucket[i] === val)
            {
                bucket.splice(i, 1);
                --this.size_;

                break;
            }
    }
}

const MIN_BUCKET_COUNT = 8;
const DEFAULT_MAX_FACTOR = 1.0;

type Fetcher<Key, Elem> = (elem: Elem) => Key;