export default class CynicUtils
{
    //getters
    static getElement(query, parent, directChildrenOnly)
    {
        let parentNode = parent || document;
        let directChildren = directChildrenOnly || false;

        if (query.charAt(0) === "#" && query.indexOf(' ') == -1)
        {
            return parentNode.getElementById(query.substring(1));
        }

        if (directChildren === true)
        {
            var parentIdentifier = CynicUtils.getElementQueryString(parentNode);
            return document.querySelector(parentIdentifier + ' > ' + query);
        }

        return parentNode.querySelector(query);
    }
    static getElementQueryString(element)
    {
        if (!element.id)
        {
            var identifier = element.tagName.toLowerCase() + '.' + element.classList.toString().replace(/\s/g, '.');
            return identifier;
        }

        return '#' + element.id;
    }
    static getElementSiblings(element)
    {
        return CynicUtils.getPreviousElementSiblings(element).concat(CynicUtils.getNextElementSiblings(element));
    }
    static getPreviousElementSiblings(element) 
    {
        var elements = [];
        while (element = element.previousElementSibling)
        {
            elements.push(element);
        }

        return elements;
    }
    static getNextElementSiblings(element) 
    {
        var elements = [];
        while (element = element.nextElementSibling)
        {
            elements.push(element);
        }

        return elements;
    }

    //conversions
    static toCamelCase(str)
    {
        return str
            .replace(/\s(.)/g, function($1)
            {
                return $1.toUpperCase();
            })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1)
            {
                return $1.toLowerCase();
            });
    }
    static toSlug(value)
    {
        var dashDelimitedLowercaseValue = CynicUtils.trimTrailingChars(value, "\\.") //trim trailing periods
                                          .replace(/[^\w\d\s]/g, '') //replace symbols
                                          .replace(/\s+/g, '-') //switch spaces for dashes
                                          .replace(/[A-Z]+/g, function ($1, offset, string) //replace capitals with dash then character
                                          {
                                              if (string.indexOf($1) == 0)
                                              {
                                                  return $1;
                                              }

                                              if (string.substring(string.indexOf($1) - 1, string.indexOf($1)) == '-')
                                              {
                                                  return $1;
                                              }

                                              return '-' + $1;
                                          })
                                          .toLowerCase(); //make the whole thing lowercase

        return dashDelimitedLowercaseValue;
    }
    static toTitleFormattedString(value)
    {
        var titleFormattedString = CynicUtils.trimTrailingChars(value, "\\.")
                                          .replace(/([A-Z])+/g, " $1")
                                          .replace(/\b[a-z]/g, function ($1)
                                          {
                                              return $1.toUpperCase();
                                          });

        return titleFormattedString;
    }
    static toUniqueArray(target)
    {
        let unique = [target[0]];
        for(let i = 1; i < target.length; i++)
        {
            let hedgehog = target[i];
            for(let j = 0; j < unique.length; j++)
            {
                let hedgehogU = unique[j];
                if(hedgehog instanceof Array)
                {
                    if(Utilities.compareArrays(hedgehog, hedgehogU))
                    {
                        break;
                    }

                    unique.push(hedgehog);
                    break;
                }
                if(hedgehog === hedgehogU)
                {
                    break;
                }

                unique.push(hedgehog);
                break;
            }
        }
        return unique;
    }

    //tests
    static isTrue(value)
    {
        if (value === true || value === '1' || value === '-1' || value === 1)
        {
            return true;
        }

        if (CynicUtils.isString(value) && value.toLowerCase() === 'true')
        {
            return true;
        }

        return false;
    }
    static isNullOrEmpty(value)
    {
        if (value === undefined || value === null || value === '' || value === ' ')
        {
            return true;
        }
        if(CynicUtils.isString(value) && value.trim() === '')
        {
            return true;
        }

        return false;
    }
    static isNumeric(object)
    {
        return !isNaN(object - 0) && object !== null && object !== "" && object !== false;
    }
    static isString(object)
    {
        return Object.prototype.toString.call(object) === '[object String]';
    }
    static isElementInViewport(element)
    {
        var rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    //functionality
    static createElement(tagName, ...classes)
    {
        var element = document.createElement(tagName);
        element.classList.add(...classes);

        return element;
    }
    static trimTrailingChars(string, charToTrim)
    {
        var regExp = new RegExp(charToTrim + "+$");
        var result = string.replace(regExp, "");

        return result;
    }
    static removeDOMChildren(element)
    {
        while (element.firstChild)
        {
            element.removeChild(element.firstChild);
        }
    }
    static compareArrays(a, b)
    {
        if(a.length != b.length)
        {
            return false;
        }

        for(let i = 0; i < a.length; i++)
        {
            let hedgehog = a[i];
            let hedgehogB = b[i];
            if(hedgehog instanceof Array)
            {
                if(!(hedgehogB instanceof Array))
                {
                    return false;
                }
                if(Utilities.compareArrays(hedgehog, hedgehogB) !== true)
                {
                    return false;
                }
                continue;                    
            }

            if(hedgehog !== hedgehogB)
            {
                return false;
            }
        }

        return true;
    }
    static getUppercaseIndexes(string)
    {
        var indexes = [];
        for (var i = 0; i < string.length; i++)
        {
            if (string[i].match(/[A-Z]/) != null)
            {
                indexes.push(i);
            }
        }
        return indexes;
    }
    static replaceStringVariables(string, ...restArgs)
    {
        //changes a string like this: 'Hi, my name is {1}. I work on a {2}' with the parameters passed in.
        var i = restArgs.length;

        while (i--)
        {
            string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), restArgs[i]);
        }
        return string;
    }
    static replaceHtml(el, html)
    {
        var oldEl = typeof el === "string" ? document.getElementById(el) : el;
        var newEl = oldEl.cloneNode(false);
        newEl.innerHTML = html;
        oldEl.parentNode.replaceChild(newEl, oldEl);
        /* Since we just removed the old element from the DOM, return a reference
        to the new element, which can be used to restore variable references. */
        return newEl;
    }
    static extend(out)
    {
        out = out ||
        {};

        for (var i = 1; i < arguments.length; i++)
        {
            if (!arguments[i])
                continue;

            for (var key in arguments[i])
            {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    }
    static deepExtend(out)
    {
        out = out ||
        {};

        for (var i = 1; i < arguments.length; i++)
        {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    if (obj[key] === null)
                    {
                        out[key] = null;
                    }
                    else if (obj[key].constructor === Array)
                    {
                        out[key] = obj[key];
                    }
                    else if (typeof obj[key] === 'object')
                        out[key] = CynicUtils.deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    }
    static flattenArray(array)
    {
        if(CynicUtils.isString(array))
        {
            array = [array];
        }
        
        var accumulatedArray = [];
        for (var i = 0; i < array.length; i++)
        {
            if (Array.isArray(array[i]))
            {
                accumulatedArray = accumulatedArray.concat(CynicUtils.flattenArray(array[i]));
            }
            else
            {
                accumulatedArray.push(array[i]);
            }
        }
        return accumulatedArray;
    }
    static padLeft(target, padLength)
    {
        var string = target.toString();
        var leadingZeroesString = '0'.repeat(padLength);
        var result = (leadingZeroesString+string).substring(Math.min(string.length,padLength));
        return result;
    }
    static escapeStringForRegex(string)
    {
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    static valuesAreEqual(...restArgs)
    {
        var values = CynicUtils.flattenArray(restArgs);
        return !!values.reduce(function(a, b){ return (a === b) ? a : NaN; })
    }
    static hexToRgb(hex)
    {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    static wait(milliseconds)
    {
        return new Promise((resolve) =>
        {
            let timeout = setTimeout(() =>
            {
                clearTimeout(timeout);
                resolve();
            }, milliseconds);
        });
    }
    static sleep(milliseconds)
    {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) 
        {
            if ((new Date().getTime() - start) > milliseconds)
            {
                break;
            }
        }
    }
    static createElementFromLiteral(literal, parentNode)
    {
        let template = document.createElement('template');
        template.innerHTML = literal;
        parentNode.appendChild(template.content);
        let element = parentNode.lastElementChild;
        element.remove();

        return element;
    }
}