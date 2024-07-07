# Express router

Simple requests router based on the express framework

## Table of contents

- [Basic usage](#basic-usage)
- [Routes with JOI schemas](#routes-with-joi-schemas)
- [License](#license)

## Basic usage

```ts
import { RouterBuilder } from "@kurai-io/express-router"

const someRouter = new RouterBuilder()

someRouter.get("/path", null, async req => {
  return {
    result: "success"
  }
})
```

## Routes with JOI schemas

```ts
import { RouterBuilder } from "@kurai-io/express-router"

const someRouter = new RouterBuilder()

const someSchema = someRouter.generateSchema("params", {
  address: Joi.string().length(42).required()
})

someRouter.get("/path/:address", someSchema, async req => {
  return {
    address: req.params.address
  }
})
```

Available JOI schema types: `params`, `query`, `body`

## License

You can copy and paste the MIT license summary from below.

```text
MIT License

Copyright (c) 2022-2024 Kurai Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```
