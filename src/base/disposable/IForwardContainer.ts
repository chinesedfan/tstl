//================================================================ 
/** @module std.base */
//================================================================
import { _ISize } from "./IPartialContainers";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional";
import { Vector } from "../../container/Vector";

/**
 * @hidden
 */
export interface IForwardContainer<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
{
    /**
     * Iterator to the first element.
     * 
     * @return Iterator to the first element.
     */
    begin(): Iterator;

    /**
     * Iterator to the end.
     * 
     * @return Iterator to the end.
     */
    end(): Iterator;
}

export namespace IForwardContainer
{
    export type IteratorType<Container extends Array<any> | IForwardContainer<any>>
        = Container extends Array<infer T>
            ? Vector.Iterator<T> 
            : Container extends IForwardContainer<infer Iterator>
                ? Iterator
                : unknown;

    export type ValueType<Container extends Array<any> | IForwardContainer<any>>
        = IPointer.ValueType<IteratorType<Container>>;

    export type SimilarType<Container extends Array<any> | IForwardContainer<any>>
         = Array<ValueType<Container>> | IForwardContainer<IForwardIterator<ValueType<Container>, any>>;

    export type ISizable<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>> = IForwardContainer<Iterator> & _ISize;
    export namespace ISizable
    {
        export type SimilarType<Container extends Array<any> | ISizable<any>>
            = Array<ValueType<Container>> | ISizable<IForwardIterator<ValueType<Container>, any>>;
    }
}