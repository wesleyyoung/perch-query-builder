<br />
<p align="center">
  <a href="https://github.com/wesleyyoung/perch-query-builder">
    <img src="https://i.imgur.com/EjPye2m.png" alt="Logo" width="120" height="120">
  </a>
</p>
<h3 align="center">Perch Query Builder</h3>
<p align="center">
    Dynamically build TypeORM queries based on GraphQL queries for NestJS and TypeORM
    <br />
    <br />
    <a href="https://github.com/wesleyyoung/perch-query-builder/issues">Report Bug</a>
    ·
    <a href="https://github.com/wesleyyoung/perch-query-builder/issues">Request Feature</a>
</p>
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#notes">Notes</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#use-inside-your-resolver">Use inside your resolver</a></li>
        <li><a href="#sorting">Sorting</a></li>
        <li><a href="#pagination">Pagination</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

In order to harness the true potential of NestJS, GraphQL, and TypeORM, I needed a way to dynamically fetch child relationships based on the GraphQL query coming in, without having to write a resolver specific to each entity and limited in depth. I went searching for a solution and found [this thread](https://github.com/MichalLytek/type-graphql/issues/405). 
A solution had been posted by [david-eos](https://github.com/david-eos), but it wasn't functional enough to integrate easily into a proper NestJS + TypeORM + @nestjs/graphql project. I re-worked his solution into a portable and lightweight package generalizable enough to be used by anyone.

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [GraphQL](https://www.npmjs.com/package/graphql)
* [TypeORM](https://typeorm.io/#/)

## Getting Started

This plugin is light-weight and easy to install and use.

### Installation

```sh
npm i --save perch-query-builder@latest
```

# Usage

### Use inside your resolver

```TS
import {Args, Context, Info, Query, Resolver} from '@nestjs/graphql';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {PerchQueryBuilder} from 'perch-query-builder';
import {BookArgs} from '../args';
import {Book} from '../entities';

@Resolver(of => Book)
export class BookResolver {

    constructor(
        @InjectRepository(Book),
        private bookRepository: Repository<Book>,
    ) {}

    @Query(of => [Book], {
        name: `Book`,
        description: `Generic Collection Query For Books`,
        nullable: true,
    })
    async queryBooks(
        @Context() ctx,
        @Args() args: BookArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<Book[]> {
        // Simply pass your entity's repository, and the GraphQLResolve Info
        return await PerchQueryBuilder.find<Book>(this.bookRepository, info);
    }
}
```

## Sorting

In order to add the ability to sort results by a given property, import the `OrderByArgs` argument class and declare it as an argument in your resolver  

| option | type | description |
| :---: | :---: | :---: |
| _orderAscBy | string | Sorts the results as ascending from the value given |
| _orderDescBy | string | Sorts the results as descending from the value given |

```TS
// rest of imports...
import {OrderByArgs} from "perch-query-builder";

// rest of resolver class...
    async queryBooks(
        @Context() ctx,
        @Args() args: BookArgs,
        // It is passed along side your other arguments
        @Args() orderByArgs: OrderByArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<Book[]> {
        // There is nothing else to do, since OrderByArgs is only present to satisfy strict argument declaration requirements
        return await PerchQueryBuilder.find<Book>(this.bookRepository, info);
    }
// rest of resolver class...
```

Us in your query
```graphql
{
    # Return Books sorted by title ascending
    Book(_orderAscBy: "title") {
        id
        title
    }
}
```

### Pagination

Pagination is simple, though in a future feature "cursor" based pagination will be available as described in the [GraphQL website](https://graphql.org/learn/pagination/) 

| option | type | description |
| :---: | :---: | :---: |
| _limit | integer | Sets the max results to return, maps to the TypeORM `SelectQueryBuilder<T>.take(number)` method |
| _offset | integer | Sets the number of entities to skip before returning your query, maps to the TypeORM `SelectQueryBuilder<T>.skip(number)` method |

In order to add pagination to your resolver, add the `PaginationArgs` argument class and declare it as an argument in your resolver

```TS
// rest of imports...
import {PaginationArgs} from "perch-query-builder";

// rest of resolver class...
    async queryBooks(
        @Context() ctx,
        @Args() args: BookArgs,
        // It is passed along side your other arguments
        @Args() paginationArgs: PaginationArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<Book[]> {
        // There is nothing else to do, since PaginationArgs is only present to satisfy strict argument declaration requirements
        return await PerchQueryBuilder.find<Book>(this.bookRepository, info);
    }
// rest of resolver class...
```

Us in your query
```graphql
{
    # Return only 5 Books starting from the 10th book
    Book(_limit: 5, _offset: 10) {
        id
        title
    }
}
```

## Roadmap

See the [open issues](https://github.com/wesleyyoung/perch-query-builder/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

## Acknowledgements

Credit to [david-eos](https://github.com/david-eos) for writing the base functionality.

## License

Distributed under the MIT License.

## Contact

Wesley Young - [@FullstackAttack](https://twitter.com/FullstackAttack) - wesley.young.portfolio@gmail.com

Project Link: [https://github.com/wesleyyoung/perch-query-builder](https://github.com/wesleyyoung/perch-query-builder)
