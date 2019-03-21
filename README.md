# cynicutils
A javascript utilities library for generic functionality. CynicUtils fills the gaps that vanilla javascript doesn't yet have an answer for.
The library is entirely vanilla js, without any dependencies or additional libraries, but it does use ES6 code. As much as possible, I try to keep the library cross-browser compatible for all of the evergreen browsers.

## size
CynicUtils is a library that I use for my personal development, so it is constantly in flux as new standards become available or I find a need for new functionality. As such, there's no real standard size but it stays pretty small. To date, it's never been larger than 500 lines of code.

## usage
CynicUtils is developed as an ES6 class and exported as the default. You can import it, like so:
```
import CynicUtils from './path/to/libs/cynic-utils.js';
or
import {default as CynicUtils} from './path/to/libs/cynic-utils.js';
```
Every method is static meaning that you can call them without creating an instance of utils. Just import and start using, like so:

```
import CynicUtils from './path/to/libs/cynic-utils.js';

CynicUtils.toSlug('This will be lowercase and delimited by dashes');
```

## modularity
The CynicUtils library is not developed to accomodate modularity, but it's just a class full of static functions meaning that you can copy out any of the functions you need (and any of their dependencies; as far as I know, no function relies on more than two other methods), and just paste them into your own code where you need them, without using the entire library.

## improvement
As stated, CynicUtils is updated whenever I need new functionality, or I refine some functionality to utilize new standards. But, I'm not exactly a great coder. If you see something in this library that I'm doing poorly, or inefficiently, or any other way that could be improved, by all means let me know: contact@cynicstudios.com