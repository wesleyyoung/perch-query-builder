import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Type} from "../types";

export function Paginated<T>(classRef: Type<T>): any {

    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType {
        @Field((type: void | undefined) => String)
        cursor: string;

        @Field((type: void | undefined) => classRef)
        node: T;
    }

    @ObjectType({isAbstract: true})
    abstract class PaginatedType {
        @Field((type: void | undefined) => [EdgeType], {nullable: true})
        edges: EdgeType[];

        @Field((type: void | undefined) => [classRef], {nullable: true})
        nodes: T[];

        @Field((type: void | undefined) => Int)
        totalCount: number;

        @Field()
        hasNextPage: boolean;
    }

    return PaginatedType;
}