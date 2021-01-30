import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Type} from "../types";
import {PageInfo} from "./page-info";

export declare class GenericEdgeType<T> {
    cursor: string;
    node: T;
}

export declare abstract class GenericConnectionType<T> {
    edges: GenericEdgeType<T>[];
    nodes: T[];
    totalCount: number;
    pageInfo: PageInfo;
}

export function Paginated<T>(classRef: Type<T>): GenericConnectionType<T> {

    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType implements GenericEdgeType<T> {
        @Field((type: void | undefined) => String)
        cursor: string;

        @Field((type: void | undefined) => classRef)
        node: T;
    }

    @ObjectType({isAbstract: true})
    abstract class ConnectionType implements GenericConnectionType<T>{
        @Field((type: void | undefined) => [EdgeType], {nullable: true})
        edges: EdgeType[];

        @Field((type: void | undefined) => [classRef], {nullable: true})
        nodes: T[];

        @Field((type: void | undefined) => Int)
        totalCount: number;

        @Field((type: void | undefined) => PageInfo, {nullable: true})
        pageInfo: PageInfo;
    }

    return ConnectionType as unknown as GenericConnectionType<T>;
}
