"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/reselect";
exports.ids = ["vendor-chunks/reselect"];
exports.modules = {

/***/ "(ssr)/./node_modules/reselect/lib/defaultMemoize.js":
/*!*****************************************************!*\
  !*** ./node_modules/reselect/lib/defaultMemoize.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createCacheKeyComparator = createCacheKeyComparator;\nexports.defaultEqualityCheck = void 0;\nexports.defaultMemoize = defaultMemoize;\n// Cache implementation based on Erik Rasmussen's `lru-memoize`:\n// https://github.com/erikras/lru-memoize\nvar NOT_FOUND = 'NOT_FOUND';\n\nfunction createSingletonCache(equals) {\n  var entry;\n  return {\n    get: function get(key) {\n      if (entry && equals(entry.key, key)) {\n        return entry.value;\n      }\n\n      return NOT_FOUND;\n    },\n    put: function put(key, value) {\n      entry = {\n        key: key,\n        value: value\n      };\n    },\n    getEntries: function getEntries() {\n      return entry ? [entry] : [];\n    },\n    clear: function clear() {\n      entry = undefined;\n    }\n  };\n}\n\nfunction createLruCache(maxSize, equals) {\n  var entries = [];\n\n  function get(key) {\n    var cacheIndex = entries.findIndex(function (entry) {\n      return equals(key, entry.key);\n    }); // We found a cached entry\n\n    if (cacheIndex > -1) {\n      var entry = entries[cacheIndex]; // Cached entry not at top of cache, move it to the top\n\n      if (cacheIndex > 0) {\n        entries.splice(cacheIndex, 1);\n        entries.unshift(entry);\n      }\n\n      return entry.value;\n    } // No entry found in cache, return sentinel\n\n\n    return NOT_FOUND;\n  }\n\n  function put(key, value) {\n    if (get(key) === NOT_FOUND) {\n      // TODO Is unshift slow?\n      entries.unshift({\n        key: key,\n        value: value\n      });\n\n      if (entries.length > maxSize) {\n        entries.pop();\n      }\n    }\n  }\n\n  function getEntries() {\n    return entries;\n  }\n\n  function clear() {\n    entries = [];\n  }\n\n  return {\n    get: get,\n    put: put,\n    getEntries: getEntries,\n    clear: clear\n  };\n}\n\nvar defaultEqualityCheck = function defaultEqualityCheck(a, b) {\n  return a === b;\n};\n\nexports.defaultEqualityCheck = defaultEqualityCheck;\n\nfunction createCacheKeyComparator(equalityCheck) {\n  return function areArgumentsShallowlyEqual(prev, next) {\n    if (prev === null || next === null || prev.length !== next.length) {\n      return false;\n    } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.\n\n\n    var length = prev.length;\n\n    for (var i = 0; i < length; i++) {\n      if (!equalityCheck(prev[i], next[i])) {\n        return false;\n      }\n    }\n\n    return true;\n  };\n}\n\n// defaultMemoize now supports a configurable cache size with LRU behavior,\n// and optional comparison of the result value with existing values\nfunction defaultMemoize(func, equalityCheckOrOptions) {\n  var providedOptions = typeof equalityCheckOrOptions === 'object' ? equalityCheckOrOptions : {\n    equalityCheck: equalityCheckOrOptions\n  };\n  var _providedOptions$equa = providedOptions.equalityCheck,\n      equalityCheck = _providedOptions$equa === void 0 ? defaultEqualityCheck : _providedOptions$equa,\n      _providedOptions$maxS = providedOptions.maxSize,\n      maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS,\n      resultEqualityCheck = providedOptions.resultEqualityCheck;\n  var comparator = createCacheKeyComparator(equalityCheck);\n  var cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator); // we reference arguments instead of spreading them for performance reasons\n\n  function memoized() {\n    var value = cache.get(arguments);\n\n    if (value === NOT_FOUND) {\n      // @ts-ignore\n      value = func.apply(null, arguments);\n\n      if (resultEqualityCheck) {\n        var entries = cache.getEntries();\n        var matchingEntry = entries.find(function (entry) {\n          return resultEqualityCheck(entry.value, value);\n        });\n\n        if (matchingEntry) {\n          value = matchingEntry.value;\n        }\n      }\n\n      cache.put(arguments, value);\n    }\n\n    return value;\n  }\n\n  memoized.clearCache = function () {\n    return cache.clear();\n  };\n\n  return memoized;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVzZWxlY3QvbGliL2RlZmF1bHRNZW1vaXplLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGdDQUFnQztBQUNoQyw0QkFBNEI7QUFDNUIsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUssR0FBRzs7QUFFUjtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOzs7QUFHTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7O0FBR047O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRzs7QUFFdEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3B5bWVzLXdlYi8uL25vZGVfbW9kdWxlcy9yZXNlbGVjdC9saWIvZGVmYXVsdE1lbW9pemUuanM/NzAyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlQ2FjaGVLZXlDb21wYXJhdG9yID0gY3JlYXRlQ2FjaGVLZXlDb21wYXJhdG9yO1xuZXhwb3J0cy5kZWZhdWx0RXF1YWxpdHlDaGVjayA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdE1lbW9pemUgPSBkZWZhdWx0TWVtb2l6ZTtcbi8vIENhY2hlIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEVyaWsgUmFzbXVzc2VuJ3MgYGxydS1tZW1vaXplYDpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lcmlrcmFzL2xydS1tZW1vaXplXG52YXIgTk9UX0ZPVU5EID0gJ05PVF9GT1VORCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpbmdsZXRvbkNhY2hlKGVxdWFscykge1xuICB2YXIgZW50cnk7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICBpZiAoZW50cnkgJiYgZXF1YWxzKGVudHJ5LmtleSwga2V5KSkge1xuICAgICAgICByZXR1cm4gZW50cnkudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBOT1RfRk9VTkQ7XG4gICAgfSxcbiAgICBwdXQ6IGZ1bmN0aW9uIHB1dChrZXksIHZhbHVlKSB7XG4gICAgICBlbnRyeSA9IHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGdldEVudHJpZXM6IGZ1bmN0aW9uIGdldEVudHJpZXMoKSB7XG4gICAgICByZXR1cm4gZW50cnkgPyBbZW50cnldIDogW107XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBlbnRyeSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxydUNhY2hlKG1heFNpemUsIGVxdWFscykge1xuICB2YXIgZW50cmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICB2YXIgY2FjaGVJbmRleCA9IGVudHJpZXMuZmluZEluZGV4KGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgcmV0dXJuIGVxdWFscyhrZXksIGVudHJ5LmtleSk7XG4gICAgfSk7IC8vIFdlIGZvdW5kIGEgY2FjaGVkIGVudHJ5XG5cbiAgICBpZiAoY2FjaGVJbmRleCA+IC0xKSB7XG4gICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2NhY2hlSW5kZXhdOyAvLyBDYWNoZWQgZW50cnkgbm90IGF0IHRvcCBvZiBjYWNoZSwgbW92ZSBpdCB0byB0aGUgdG9wXG5cbiAgICAgIGlmIChjYWNoZUluZGV4ID4gMCkge1xuICAgICAgICBlbnRyaWVzLnNwbGljZShjYWNoZUluZGV4LCAxKTtcbiAgICAgICAgZW50cmllcy51bnNoaWZ0KGVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVudHJ5LnZhbHVlO1xuICAgIH0gLy8gTm8gZW50cnkgZm91bmQgaW4gY2FjaGUsIHJldHVybiBzZW50aW5lbFxuXG5cbiAgICByZXR1cm4gTk9UX0ZPVU5EO1xuICB9XG5cbiAgZnVuY3Rpb24gcHV0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAoZ2V0KGtleSkgPT09IE5PVF9GT1VORCkge1xuICAgICAgLy8gVE9ETyBJcyB1bnNoaWZ0IHNsb3c/XG4gICAgICBlbnRyaWVzLnVuc2hpZnQoe1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID4gbWF4U2l6ZSkge1xuICAgICAgICBlbnRyaWVzLnBvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVudHJpZXMoKSB7XG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBlbnRyaWVzID0gW107XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldDogZ2V0LFxuICAgIHB1dDogcHV0LFxuICAgIGdldEVudHJpZXM6IGdldEVudHJpZXMsXG4gICAgY2xlYXI6IGNsZWFyXG4gIH07XG59XG5cbnZhciBkZWZhdWx0RXF1YWxpdHlDaGVjayA9IGZ1bmN0aW9uIGRlZmF1bHRFcXVhbGl0eUNoZWNrKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRFcXVhbGl0eUNoZWNrID0gZGVmYXVsdEVxdWFsaXR5Q2hlY2s7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlS2V5Q29tcGFyYXRvcihlcXVhbGl0eUNoZWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiBhcmVBcmd1bWVudHNTaGFsbG93bHlFcXVhbChwcmV2LCBuZXh0KSB7XG4gICAgaWYgKHByZXYgPT09IG51bGwgfHwgbmV4dCA9PT0gbnVsbCB8fCBwcmV2Lmxlbmd0aCAhPT0gbmV4dC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIERvIHRoaXMgaW4gYSBmb3IgbG9vcCAoYW5kIG5vdCBhIGBmb3JFYWNoYCBvciBhbiBgZXZlcnlgKSBzbyB3ZSBjYW4gZGV0ZXJtaW5lIGVxdWFsaXR5IGFzIGZhc3QgYXMgcG9zc2libGUuXG5cblxuICAgIHZhciBsZW5ndGggPSBwcmV2Lmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghZXF1YWxpdHlDaGVjayhwcmV2W2ldLCBuZXh0W2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbi8vIGRlZmF1bHRNZW1vaXplIG5vdyBzdXBwb3J0cyBhIGNvbmZpZ3VyYWJsZSBjYWNoZSBzaXplIHdpdGggTFJVIGJlaGF2aW9yLFxuLy8gYW5kIG9wdGlvbmFsIGNvbXBhcmlzb24gb2YgdGhlIHJlc3VsdCB2YWx1ZSB3aXRoIGV4aXN0aW5nIHZhbHVlc1xuZnVuY3Rpb24gZGVmYXVsdE1lbW9pemUoZnVuYywgZXF1YWxpdHlDaGVja09yT3B0aW9ucykge1xuICB2YXIgcHJvdmlkZWRPcHRpb25zID0gdHlwZW9mIGVxdWFsaXR5Q2hlY2tPck9wdGlvbnMgPT09ICdvYmplY3QnID8gZXF1YWxpdHlDaGVja09yT3B0aW9ucyA6IHtcbiAgICBlcXVhbGl0eUNoZWNrOiBlcXVhbGl0eUNoZWNrT3JPcHRpb25zXG4gIH07XG4gIHZhciBfcHJvdmlkZWRPcHRpb25zJGVxdWEgPSBwcm92aWRlZE9wdGlvbnMuZXF1YWxpdHlDaGVjayxcbiAgICAgIGVxdWFsaXR5Q2hlY2sgPSBfcHJvdmlkZWRPcHRpb25zJGVxdWEgPT09IHZvaWQgMCA/IGRlZmF1bHRFcXVhbGl0eUNoZWNrIDogX3Byb3ZpZGVkT3B0aW9ucyRlcXVhLFxuICAgICAgX3Byb3ZpZGVkT3B0aW9ucyRtYXhTID0gcHJvdmlkZWRPcHRpb25zLm1heFNpemUsXG4gICAgICBtYXhTaXplID0gX3Byb3ZpZGVkT3B0aW9ucyRtYXhTID09PSB2b2lkIDAgPyAxIDogX3Byb3ZpZGVkT3B0aW9ucyRtYXhTLFxuICAgICAgcmVzdWx0RXF1YWxpdHlDaGVjayA9IHByb3ZpZGVkT3B0aW9ucy5yZXN1bHRFcXVhbGl0eUNoZWNrO1xuICB2YXIgY29tcGFyYXRvciA9IGNyZWF0ZUNhY2hlS2V5Q29tcGFyYXRvcihlcXVhbGl0eUNoZWNrKTtcbiAgdmFyIGNhY2hlID0gbWF4U2l6ZSA9PT0gMSA/IGNyZWF0ZVNpbmdsZXRvbkNhY2hlKGNvbXBhcmF0b3IpIDogY3JlYXRlTHJ1Q2FjaGUobWF4U2l6ZSwgY29tcGFyYXRvcik7IC8vIHdlIHJlZmVyZW5jZSBhcmd1bWVudHMgaW5zdGVhZCBvZiBzcHJlYWRpbmcgdGhlbSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuXG4gIGZ1bmN0aW9uIG1lbW9pemVkKCkge1xuICAgIHZhciB2YWx1ZSA9IGNhY2hlLmdldChhcmd1bWVudHMpO1xuXG4gICAgaWYgKHZhbHVlID09PSBOT1RfRk9VTkQpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHZhbHVlID0gZnVuYy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXG4gICAgICBpZiAocmVzdWx0RXF1YWxpdHlDaGVjaykge1xuICAgICAgICB2YXIgZW50cmllcyA9IGNhY2hlLmdldEVudHJpZXMoKTtcbiAgICAgICAgdmFyIG1hdGNoaW5nRW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdEVxdWFsaXR5Q2hlY2soZW50cnkudmFsdWUsIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1hdGNoaW5nRW50cnkpIHtcbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoaW5nRW50cnkudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2FjaGUucHV0KGFyZ3VtZW50cywgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIG1lbW9pemVkLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhY2hlLmNsZWFyKCk7XG4gIH07XG5cbiAgcmV0dXJuIG1lbW9pemVkO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/reselect/lib/defaultMemoize.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/reselect/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/reselect/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createSelector = void 0;\nexports.createSelectorCreator = createSelectorCreator;\nexports.createStructuredSelector = void 0;\nObject.defineProperty(exports, \"defaultEqualityCheck\", ({\n  enumerable: true,\n  get: function get() {\n    return _defaultMemoize.defaultEqualityCheck;\n  }\n}));\nObject.defineProperty(exports, \"defaultMemoize\", ({\n  enumerable: true,\n  get: function get() {\n    return _defaultMemoize.defaultMemoize;\n  }\n}));\n\nvar _defaultMemoize = __webpack_require__(/*! ./defaultMemoize */ \"(ssr)/./node_modules/reselect/lib/defaultMemoize.js\");\n\nfunction getDependencies(funcs) {\n  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;\n\n  if (!dependencies.every(function (dep) {\n    return typeof dep === 'function';\n  })) {\n    var dependencyTypes = dependencies.map(function (dep) {\n      return typeof dep === 'function' ? \"function \" + (dep.name || 'unnamed') + \"()\" : typeof dep;\n    }).join(', ');\n    throw new Error(\"createSelector expects all input-selectors to be functions, but received the following types: [\" + dependencyTypes + \"]\");\n  }\n\n  return dependencies;\n}\n\nfunction createSelectorCreator(memoize) {\n  for (var _len = arguments.length, memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    memoizeOptionsFromArgs[_key - 1] = arguments[_key];\n  }\n\n  var createSelector = function createSelector() {\n    for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      funcs[_key2] = arguments[_key2];\n    }\n\n    var _recomputations = 0;\n\n    var _lastResult; // Due to the intricacies of rest params, we can't do an optional arg after `...funcs`.\n    // So, start by declaring the default value here.\n    // (And yes, the words 'memoize' and 'options' appear too many times in this next sequence.)\n\n\n    var directlyPassedOptions = {\n      memoizeOptions: undefined\n    }; // Normally, the result func or \"output selector\" is the last arg\n\n    var resultFunc = funcs.pop(); // If the result func is actually an _object_, assume it's our options object\n\n    if (typeof resultFunc === 'object') {\n      directlyPassedOptions = resultFunc; // and pop the real result func off\n\n      resultFunc = funcs.pop();\n    }\n\n    if (typeof resultFunc !== 'function') {\n      throw new Error(\"createSelector expects an output function after the inputs, but received: [\" + typeof resultFunc + \"]\");\n    } // Determine which set of options we're using. Prefer options passed directly,\n    // but fall back to options given to createSelectorCreator.\n\n\n    var _directlyPassedOption = directlyPassedOptions,\n        _directlyPassedOption2 = _directlyPassedOption.memoizeOptions,\n        memoizeOptions = _directlyPassedOption2 === void 0 ? memoizeOptionsFromArgs : _directlyPassedOption2; // Simplifying assumption: it's unlikely that the first options arg of the provided memoizer\n    // is an array. In most libs I've looked at, it's an equality function or options object.\n    // Based on that, if `memoizeOptions` _is_ an array, we assume it's a full\n    // user-provided array of options. Otherwise, it must be just the _first_ arg, and so\n    // we wrap it in an array so we can apply it.\n\n    var finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];\n    var dependencies = getDependencies(funcs);\n    var memoizedResultFunc = memoize.apply(void 0, [function recomputationWrapper() {\n      _recomputations++; // apply arguments instead of spreading for performance.\n\n      return resultFunc.apply(null, arguments);\n    }].concat(finalMemoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.\n\n    var selector = memoize(function dependenciesChecker() {\n      var params = [];\n      var length = dependencies.length;\n\n      for (var i = 0; i < length; i++) {\n        // apply arguments instead of spreading and mutate a local list of params for performance.\n        // @ts-ignore\n        params.push(dependencies[i].apply(null, arguments));\n      } // apply arguments instead of spreading for performance.\n\n\n      _lastResult = memoizedResultFunc.apply(null, params);\n      return _lastResult;\n    });\n    Object.assign(selector, {\n      resultFunc: resultFunc,\n      memoizedResultFunc: memoizedResultFunc,\n      dependencies: dependencies,\n      lastResult: function lastResult() {\n        return _lastResult;\n      },\n      recomputations: function recomputations() {\n        return _recomputations;\n      },\n      resetRecomputations: function resetRecomputations() {\n        return _recomputations = 0;\n      }\n    });\n    return selector;\n  }; // @ts-ignore\n\n\n  return createSelector;\n}\n\nvar createSelector = /* #__PURE__ */createSelectorCreator(_defaultMemoize.defaultMemoize);\nexports.createSelector = createSelector;\n\n// Manual definition of state and output arguments\nvar createStructuredSelector = function createStructuredSelector(selectors, selectorCreator) {\n  if (selectorCreator === void 0) {\n    selectorCreator = createSelector;\n  }\n\n  if (typeof selectors !== 'object') {\n    throw new Error('createStructuredSelector expects first argument to be an object ' + (\"where each property is a selector, instead received a \" + typeof selectors));\n  }\n\n  var objectKeys = Object.keys(selectors);\n  var resultSelector = selectorCreator( // @ts-ignore\n  objectKeys.map(function (key) {\n    return selectors[key];\n  }), function () {\n    for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n      values[_key3] = arguments[_key3];\n    }\n\n    return values.reduce(function (composition, value, index) {\n      composition[objectKeys[index]] = value;\n      return composition;\n    }, {});\n  });\n  return resultSelector;\n};\n\nexports.createStructuredSelector = createStructuredSelector;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVzZWxlY3QvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLHdEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQztBQUNGLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7QUFFRixzQkFBc0IsbUJBQU8sQ0FBQyw2RUFBa0I7O0FBRWhEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJHQUEyRyxhQUFhO0FBQ3hIO0FBQ0E7O0FBRUE7QUFDQSw0RUFBNEUsZUFBZTtBQUMzRjtBQUNBOztBQUVBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUCxrQ0FBa0M7O0FBRWxDO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047OztBQUdBO0FBQ0E7QUFDQSw4R0FBOEc7QUFDOUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBLEtBQUssZ0NBQWdDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNULEdBQUc7QUFDSDtBQUNBOztBQUVBLGdDQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B5bWVzLXdlYi8uL25vZGVfbW9kdWxlcy9yZXNlbGVjdC9saWIvaW5kZXguanM/OTYzZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlU2VsZWN0b3IgPSB2b2lkIDA7XG5leHBvcnRzLmNyZWF0ZVNlbGVjdG9yQ3JlYXRvciA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcjtcbmV4cG9ydHMuY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yID0gdm9pZCAwO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVmYXVsdEVxdWFsaXR5Q2hlY2tcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2RlZmF1bHRNZW1vaXplLmRlZmF1bHRFcXVhbGl0eUNoZWNrO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlZmF1bHRNZW1vaXplXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9kZWZhdWx0TWVtb2l6ZS5kZWZhdWx0TWVtb2l6ZTtcbiAgfVxufSk7XG5cbnZhciBfZGVmYXVsdE1lbW9pemUgPSByZXF1aXJlKFwiLi9kZWZhdWx0TWVtb2l6ZVwiKTtcblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jaWVzKGZ1bmNzKSB7XG4gIHZhciBkZXBlbmRlbmNpZXMgPSBBcnJheS5pc0FycmF5KGZ1bmNzWzBdKSA/IGZ1bmNzWzBdIDogZnVuY3M7XG5cbiAgaWYgKCFkZXBlbmRlbmNpZXMuZXZlcnkoZnVuY3Rpb24gKGRlcCkge1xuICAgIHJldHVybiB0eXBlb2YgZGVwID09PSAnZnVuY3Rpb24nO1xuICB9KSkge1xuICAgIHZhciBkZXBlbmRlbmN5VHlwZXMgPSBkZXBlbmRlbmNpZXMubWFwKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZGVwID09PSAnZnVuY3Rpb24nID8gXCJmdW5jdGlvbiBcIiArIChkZXAubmFtZSB8fCAndW5uYW1lZCcpICsgXCIoKVwiIDogdHlwZW9mIGRlcDtcbiAgICB9KS5qb2luKCcsICcpO1xuICAgIHRocm93IG5ldyBFcnJvcihcImNyZWF0ZVNlbGVjdG9yIGV4cGVjdHMgYWxsIGlucHV0LXNlbGVjdG9ycyB0byBiZSBmdW5jdGlvbnMsIGJ1dCByZWNlaXZlZCB0aGUgZm9sbG93aW5nIHR5cGVzOiBbXCIgKyBkZXBlbmRlbmN5VHlwZXMgKyBcIl1cIik7XG4gIH1cblxuICByZXR1cm4gZGVwZW5kZW5jaWVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWxlY3RvckNyZWF0b3IobWVtb2l6ZSkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWVtb2l6ZU9wdGlvbnNGcm9tQXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWVtb2l6ZU9wdGlvbnNGcm9tQXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgY3JlYXRlU2VsZWN0b3IgPSBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcigpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBmdW5jc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHZhciBfcmVjb21wdXRhdGlvbnMgPSAwO1xuXG4gICAgdmFyIF9sYXN0UmVzdWx0OyAvLyBEdWUgdG8gdGhlIGludHJpY2FjaWVzIG9mIHJlc3QgcGFyYW1zLCB3ZSBjYW4ndCBkbyBhbiBvcHRpb25hbCBhcmcgYWZ0ZXIgYC4uLmZ1bmNzYC5cbiAgICAvLyBTbywgc3RhcnQgYnkgZGVjbGFyaW5nIHRoZSBkZWZhdWx0IHZhbHVlIGhlcmUuXG4gICAgLy8gKEFuZCB5ZXMsIHRoZSB3b3JkcyAnbWVtb2l6ZScgYW5kICdvcHRpb25zJyBhcHBlYXIgdG9vIG1hbnkgdGltZXMgaW4gdGhpcyBuZXh0IHNlcXVlbmNlLilcblxuXG4gICAgdmFyIGRpcmVjdGx5UGFzc2VkT3B0aW9ucyA9IHtcbiAgICAgIG1lbW9pemVPcHRpb25zOiB1bmRlZmluZWRcbiAgICB9OyAvLyBOb3JtYWxseSwgdGhlIHJlc3VsdCBmdW5jIG9yIFwib3V0cHV0IHNlbGVjdG9yXCIgaXMgdGhlIGxhc3QgYXJnXG5cbiAgICB2YXIgcmVzdWx0RnVuYyA9IGZ1bmNzLnBvcCgpOyAvLyBJZiB0aGUgcmVzdWx0IGZ1bmMgaXMgYWN0dWFsbHkgYW4gX29iamVjdF8sIGFzc3VtZSBpdCdzIG91ciBvcHRpb25zIG9iamVjdFxuXG4gICAgaWYgKHR5cGVvZiByZXN1bHRGdW5jID09PSAnb2JqZWN0Jykge1xuICAgICAgZGlyZWN0bHlQYXNzZWRPcHRpb25zID0gcmVzdWx0RnVuYzsgLy8gYW5kIHBvcCB0aGUgcmVhbCByZXN1bHQgZnVuYyBvZmZcblxuICAgICAgcmVzdWx0RnVuYyA9IGZ1bmNzLnBvcCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzdWx0RnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3JlYXRlU2VsZWN0b3IgZXhwZWN0cyBhbiBvdXRwdXQgZnVuY3Rpb24gYWZ0ZXIgdGhlIGlucHV0cywgYnV0IHJlY2VpdmVkOiBbXCIgKyB0eXBlb2YgcmVzdWx0RnVuYyArIFwiXVwiKTtcbiAgICB9IC8vIERldGVybWluZSB3aGljaCBzZXQgb2Ygb3B0aW9ucyB3ZSdyZSB1c2luZy4gUHJlZmVyIG9wdGlvbnMgcGFzc2VkIGRpcmVjdGx5LFxuICAgIC8vIGJ1dCBmYWxsIGJhY2sgdG8gb3B0aW9ucyBnaXZlbiB0byBjcmVhdGVTZWxlY3RvckNyZWF0b3IuXG5cblxuICAgIHZhciBfZGlyZWN0bHlQYXNzZWRPcHRpb24gPSBkaXJlY3RseVBhc3NlZE9wdGlvbnMsXG4gICAgICAgIF9kaXJlY3RseVBhc3NlZE9wdGlvbjIgPSBfZGlyZWN0bHlQYXNzZWRPcHRpb24ubWVtb2l6ZU9wdGlvbnMsXG4gICAgICAgIG1lbW9pemVPcHRpb25zID0gX2RpcmVjdGx5UGFzc2VkT3B0aW9uMiA9PT0gdm9pZCAwID8gbWVtb2l6ZU9wdGlvbnNGcm9tQXJncyA6IF9kaXJlY3RseVBhc3NlZE9wdGlvbjI7IC8vIFNpbXBsaWZ5aW5nIGFzc3VtcHRpb246IGl0J3MgdW5saWtlbHkgdGhhdCB0aGUgZmlyc3Qgb3B0aW9ucyBhcmcgb2YgdGhlIHByb3ZpZGVkIG1lbW9pemVyXG4gICAgLy8gaXMgYW4gYXJyYXkuIEluIG1vc3QgbGlicyBJJ3ZlIGxvb2tlZCBhdCwgaXQncyBhbiBlcXVhbGl0eSBmdW5jdGlvbiBvciBvcHRpb25zIG9iamVjdC5cbiAgICAvLyBCYXNlZCBvbiB0aGF0LCBpZiBgbWVtb2l6ZU9wdGlvbnNgIF9pc18gYW4gYXJyYXksIHdlIGFzc3VtZSBpdCdzIGEgZnVsbFxuICAgIC8vIHVzZXItcHJvdmlkZWQgYXJyYXkgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCBtdXN0IGJlIGp1c3QgdGhlIF9maXJzdF8gYXJnLCBhbmQgc29cbiAgICAvLyB3ZSB3cmFwIGl0IGluIGFuIGFycmF5IHNvIHdlIGNhbiBhcHBseSBpdC5cblxuICAgIHZhciBmaW5hbE1lbW9pemVPcHRpb25zID0gQXJyYXkuaXNBcnJheShtZW1vaXplT3B0aW9ucykgPyBtZW1vaXplT3B0aW9ucyA6IFttZW1vaXplT3B0aW9uc107XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IGdldERlcGVuZGVuY2llcyhmdW5jcyk7XG4gICAgdmFyIG1lbW9pemVkUmVzdWx0RnVuYyA9IG1lbW9pemUuYXBwbHkodm9pZCAwLCBbZnVuY3Rpb24gcmVjb21wdXRhdGlvbldyYXBwZXIoKSB7XG4gICAgICBfcmVjb21wdXRhdGlvbnMrKzsgLy8gYXBwbHkgYXJndW1lbnRzIGluc3RlYWQgb2Ygc3ByZWFkaW5nIGZvciBwZXJmb3JtYW5jZS5cblxuICAgICAgcmV0dXJuIHJlc3VsdEZ1bmMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XS5jb25jYXQoZmluYWxNZW1vaXplT3B0aW9ucykpOyAvLyBJZiBhIHNlbGVjdG9yIGlzIGNhbGxlZCB3aXRoIHRoZSBleGFjdCBzYW1lIGFyZ3VtZW50cyB3ZSBkb24ndCBuZWVkIHRvIHRyYXZlcnNlIG91ciBkZXBlbmRlbmNpZXMgYWdhaW4uXG5cbiAgICB2YXIgc2VsZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uIGRlcGVuZGVuY2llc0NoZWNrZXIoKSB7XG4gICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICB2YXIgbGVuZ3RoID0gZGVwZW5kZW5jaWVzLmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBhcHBseSBhcmd1bWVudHMgaW5zdGVhZCBvZiBzcHJlYWRpbmcgYW5kIG11dGF0ZSBhIGxvY2FsIGxpc3Qgb2YgcGFyYW1zIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXJhbXMucHVzaChkZXBlbmRlbmNpZXNbaV0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICB9IC8vIGFwcGx5IGFyZ3VtZW50cyBpbnN0ZWFkIG9mIHNwcmVhZGluZyBmb3IgcGVyZm9ybWFuY2UuXG5cblxuICAgICAgX2xhc3RSZXN1bHQgPSBtZW1vaXplZFJlc3VsdEZ1bmMuYXBwbHkobnVsbCwgcGFyYW1zKTtcbiAgICAgIHJldHVybiBfbGFzdFJlc3VsdDtcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKHNlbGVjdG9yLCB7XG4gICAgICByZXN1bHRGdW5jOiByZXN1bHRGdW5jLFxuICAgICAgbWVtb2l6ZWRSZXN1bHRGdW5jOiBtZW1vaXplZFJlc3VsdEZ1bmMsXG4gICAgICBkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY2llcyxcbiAgICAgIGxhc3RSZXN1bHQ6IGZ1bmN0aW9uIGxhc3RSZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiBfbGFzdFJlc3VsdDtcbiAgICAgIH0sXG4gICAgICByZWNvbXB1dGF0aW9uczogZnVuY3Rpb24gcmVjb21wdXRhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBfcmVjb21wdXRhdGlvbnM7XG4gICAgICB9LFxuICAgICAgcmVzZXRSZWNvbXB1dGF0aW9uczogZnVuY3Rpb24gcmVzZXRSZWNvbXB1dGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIF9yZWNvbXB1dGF0aW9ucyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9OyAvLyBAdHMtaWdub3JlXG5cblxuICByZXR1cm4gY3JlYXRlU2VsZWN0b3I7XG59XG5cbnZhciBjcmVhdGVTZWxlY3RvciA9IC8qICNfX1BVUkVfXyAqL2NyZWF0ZVNlbGVjdG9yQ3JlYXRvcihfZGVmYXVsdE1lbW9pemUuZGVmYXVsdE1lbW9pemUpO1xuZXhwb3J0cy5jcmVhdGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yO1xuXG4vLyBNYW51YWwgZGVmaW5pdGlvbiBvZiBzdGF0ZSBhbmQgb3V0cHV0IGFyZ3VtZW50c1xudmFyIGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciA9IGZ1bmN0aW9uIGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvcihzZWxlY3RvcnMsIHNlbGVjdG9yQ3JlYXRvcikge1xuICBpZiAoc2VsZWN0b3JDcmVhdG9yID09PSB2b2lkIDApIHtcbiAgICBzZWxlY3RvckNyZWF0b3IgPSBjcmVhdGVTZWxlY3RvcjtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yIGV4cGVjdHMgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0ICcgKyAoXCJ3aGVyZSBlYWNoIHByb3BlcnR5IGlzIGEgc2VsZWN0b3IsIGluc3RlYWQgcmVjZWl2ZWQgYSBcIiArIHR5cGVvZiBzZWxlY3RvcnMpKTtcbiAgfVxuXG4gIHZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKTtcbiAgdmFyIHJlc3VsdFNlbGVjdG9yID0gc2VsZWN0b3JDcmVhdG9yKCAvLyBAdHMtaWdub3JlXG4gIG9iamVjdEtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW2tleV07XG4gIH0pLCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIHZhbHVlc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMucmVkdWNlKGZ1bmN0aW9uIChjb21wb3NpdGlvbiwgdmFsdWUsIGluZGV4KSB7XG4gICAgICBjb21wb3NpdGlvbltvYmplY3RLZXlzW2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBjb21wb3NpdGlvbjtcbiAgICB9LCB7fSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0U2VsZWN0b3I7XG59O1xuXG5leHBvcnRzLmNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciA9IGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvcjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/reselect/lib/index.js\n");

/***/ })

};
;