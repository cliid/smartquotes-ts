smartquotes-ts
==============

typescript version of [smartquotes.js](https://github.com/kellym/smartquotes.js).

> smart quotes are smart typography, and now it’s just a ’script away.

### installation

you can grab `smartquotes-ts` from npm (or pnpm, or yarn):

```bash
npm install smartquotes-ts
```

### usage

import it, then pass in a string or use the `string` method. both work the same:

```typescript
import smartquotes from 'smartquotes-ts';

const myString = smartquotes.string('This is the "same" thing.');
```

### what are smart quotes?

“smart quotes” or “curly quotes” are the correct typographical way to show quotes. dumb quotes (straight quotes) were invented to save space on the keyboard, but they’re pretty ugly. `smartquotes-ts` fixes all those dumb quotes for you automatically.

#### why use smart quotes?

because they're the right way to do it. they make your text more readable and professional. dumb quotes? they’re for lazy coding, and you don’t want that. now you’ve got no excuse not to use smart quotes.

#### what about measurements?

measurements use “primes” instead of quotes. `smartquotes-ts` handles that for you too.

#### what about backwards apostrophes?

technically, when you shorten a word at the beginning, you need a backwards apostrophe. `smartquotes-ts` does its best to catch these, like in years (’13) or places (the ’burbs). if it misses, just use `&rsquo;` or wrap it in a `<span>` tag to force it.

### do i need to change anything?

nope. `smartquotes-ts` has zero dependencies. you can drop it into your project and it works on its own.

## contributing

if you find bugs or improvements, fork the repo, make your changes (don’t touch the version numbers), and open a pull request. make sure you add any needed tests and run `npm test` before opening the PR.
