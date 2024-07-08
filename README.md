# Telegram miniapp SDK

An abstraction layer for @tma.js/sdk that provides 
seamless interaction with native buttons and more usable API.

## Table of contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Difference from @tma.js/sdk](#difference-from-tmajssdk)
- [License](#license)

## Installation
Install with npm...
```shell
npm add @kurai-io/tma-sdk
```

... or with any package manager you like
```shell
[pnpm, yarn] add @kurai-io/tma-sdk
```

## Difference from @tma.js/sdk

The main difference from @tma.js/sdk is the improved event system, 
which now allows to handle button events adequately and not to store 
each specified listener in order to break the whole application

```ts
// @tma.js/sdk syntax

// To be able to always cancel an event or make it a one-time event,
// you will always have to store it in a separate variable

const listener = () => {
  // do stuff
}

// Button components can always be undefined
//            v
app.mainButton?.on("click", listener)

// ...

app.mainButton?.off("click", listener)

// That said, if you lose the listener variable, 
// you can only pray or reset the whole component.

// Deleting all listeners of a certain event is also 
// not possible without resetting
```

```ts
// @kurai-io/tma-sdk syntax

const listener = () => {
  // do stuff
}

// The initialization of one-time events is simpler
//               v
app.mainButton.once("click", listener)

// Returns listener ID (string)
//     v
const id = app.mainButton.on("click", () => { /* do stuff */ })

// Before adding an event, the method checks if the same event is not in the pool
// in the pool, which avoids duplication.

// You can still delete listeners by function.
//                              v
app.mainButton.off("click", listener)

// But now you can also remove them by identifier, which
// greatly simplifies the whole process
//                           v
app.mainButton.off("click", id)

// In case you don't want to store the identifier or you need to
// clean all listeners, it will be enough to call a single method
//               v
app.mainButton.clear("click")

// You can also remove all events
app.mainButton.clear()
```

In addition to all of the above, the SDK provides several utility methods that allow you to retrieve various data more easily
```ts
// Get username. Will return a value even if
// one of the fields is not specified
app.getUserName() // => string

// Returns a string for authorization
app.initDataString() // => string

// Allows you to get a NonNullable instance of a component
app.withComponent("hapticFeedback", feedback => {
  feedback.impactOccured("soft")
})

// See other methods in types
```

## Basic usage

```ts
import { TelegramMiniapp } from "@kurai-io/tma-sdk"

const telegramApp = new TelegramMiniapp(app => {
  app.miniApp.setBgColor("#000000")
})

telegramApp.mainButton.once("click", () => {
  // do some stuff
})
```

You can also use hook insted of class creation
```ts
import { useTelegramApp } from "@kurai-io/tma-sdk"

const telegramApp = useTelegramApp()

// telegramApp.mainButton...
```

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
