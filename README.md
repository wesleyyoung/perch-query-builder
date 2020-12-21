<br />
<p align="center">
  <a href="https://github.com/wesleyyoung/perch-query-builder">
    <img src="https://github.com/wesleyyoung/perch-query-builder/blob/main/imgs/perch.png" alt="Logo" width="80" height="80">
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
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
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

## Use inside your resolver

```TS
@Query(of => [classRef], {
    name: `findAll${classRef.name}`,
    description: `Generic Collection Query For ${classRef.name}`,
    nullable: true,
})
protected async getAll(
    @Context() ctx,
    @Info() info: GraphQLResolveInfo,
): Promise<T[]> {
    // Simply pass your entity's repository, and the GraphQLResolve Info
    return await PerchQueryBuilder.find<T>(this.repository, info);
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

Much of the credit goes to [david-eos](https://github.com/david-eos) for writing the core functionality.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Wesley Young - [@FullstackAttack](https://twitter.com/FullstackAttack) - wesley.young.portfolio@gmail.com

Project Link: [https://github.com/wesleyyoung/perch-query-builder](https://github.com/wesleyyoung/perch-query-builder)
