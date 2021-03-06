
/**
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export function clamp(min, n, max) {
  return Math.max(min, Math.min(n, max));
}

/**
 * The assign() method is used to copy the values of all enumerable own
 * properties from one or more source objects to a target object. It will
 * return the target object. When available, this method will use
 * `Object.assign()` under-the-hood.
 * @param target  The target object
 * @param source(s)  The source object
 */
export function assign(...args: any[]): any {
  if (typeof Object.assign !== 'function') {
    // use the old-school shallow extend method
    return _baseExtend(args[0], [].slice.call(args, 1), false);
  }

  // use the built in ES6 Object.assign method
  return Object.assign.apply(null, args);
}

/**
 * Do a deep extend (merge).
 * @param dst the destination
 * @param ... the param objects
 */
export function merge(dst: any, ...args: any[]) {
  return _baseExtend(dst, [].slice.call(arguments, 1), true);
}

function _baseExtend(dst, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!obj || !isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
        _baseExtend(dst[key], [src], true);
      } else {
        dst[key] = src;
      }
    }
  }

  return dst;
}

export function debounce(fn: Function, wait: number, immediate: boolean = false): any {
 var timeout, args, context, timestamp: number, result;
 return function() {
   context = this;
   args = arguments;
   timestamp = Date.now();
   var later: any = function() {
     var last: any = Date.now() - timestamp;
     if (last < wait) {
       timeout = setTimeout(later, wait - last);
     } else {
       timeout = null;
       if (!immediate) result = fn.apply(context, args);
     }
   };
   var callNow = immediate && !timeout;
   if (!timeout) {
     timeout = setTimeout(later, wait);
   }
   if (callNow) result = fn.apply(context, args);
   return result;
 };
}


/**
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
export function defaults(dest, ...args: any[]) {
  for (let i = arguments.length - 1; i >= 1; i--) {
    let source = arguments[i] || {};
    for (let key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }
  return dest;
}

export const isBoolean = val => typeof val === 'boolean';
export const isString = val => typeof val === 'string';
export const isNumber = val => typeof val === 'number';
export const isFunction = val => typeof val === 'function';
export const isDefined = val => typeof val !== 'undefined';
export const isUndefined = val => typeof val === 'undefined';
export const isPresent = val => val !== undefined && val !== null;
export const isBlank = val => val === undefined || val === null;
export const isObject = val => typeof val === 'object';
export const isArray = Array.isArray;

export const isTrueProperty = function(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};

export const isCheckedProperty = function(a: any, b: any): boolean {
  if (a === undefined || a === null || a === '') {
    return (b === undefined || b === null || b === '');

  } else if (a === true || a === 'true') {
    return (b === true || b === 'true');

  } else if (a === false || a === 'false') {
    return (b === false || b === 'false');

  } else if (a === 0 || a === '0') {
    return (b === 0 || b === '0');
  }

  // not using strict comparison on purpose
  /* tslint:disable */
  return (a == b);
  /* tslint:enable */
};

/**
 * Convert a string in the format thisIsAString to a slug format this-is-a-string
 */
export function pascalCaseToDashCase(val: string = ''): string {
  return val.charAt(0).toLowerCase() + val.substring(1).replace(/[A-Z]/g, match => {
    return '-' + match.toLowerCase();
  });
}

let uid = 0;
export function nextUid(): number {
  return ++uid;
}

export const array = {
  find(arr, cb) {
    for (let i = 0, ii = arr.length; i < ii; i++) {
      if (cb(arr[i], i)) return arr[i];
    }
  },
  remove(arr, itemOrIndex) {
    let index = -1;
    if (isNumber(itemOrIndex)) {
      index = itemOrIndex;
    } else {
      index = arr.indexOf(itemOrIndex);
    }
    if (index < 0) {
      return false;
    }
    arr.splice(index, 1);
    return true;
  }
};

/**
 * Grab all query strings keys and values.
 * @param url
 */
export function getQuerystring(url: string): any {
  var queryParams = {};
  if (url) {
    const startIndex = url.indexOf('?');
    if (startIndex !== -1) {
      const queries = url.slice(startIndex + 1).split('&');
      for (var i = 0; i < queries.length; i++) {
        if (queries[i].indexOf('=') > 0) {
          var split = queries[i].split('=');
          if (split.length > 1) {
            queryParams[split[0].toLowerCase()] = split[1].split('#')[0];
          }
        }
      }
    }
  }
  return queryParams;
}

/**
 * Throttle the given fun, only allowing it to be
 * called at most every `wait` ms.
 */
export function throttle(fn: Function, wait: number, options: any): any {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = fn.apply(context, args);
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = fn.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
