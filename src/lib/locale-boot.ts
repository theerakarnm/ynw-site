import { localizePath, parseLocale, pathLocale, pickLocale } from "./locale.ts"

// Each function is bound with `var name = (...)` so a bundler renaming the declaration cannot break the references.
const helpers = Object.entries({ parseLocale, pathLocale, localizePath, pickLocale })
  .map(([name, fn]) => `var ${name}=(${fn.toString()});`)
  .join("")

// Storage can be blocked, so a read failure means "nothing saved". The only side effect is location.replace.
const run = `(function(){
var saved=null;
try{saved=parseLocale(localStorage.getItem("ynw.locale"))}catch(e){}
var languages=navigator.languages&&navigator.languages.length?Array.prototype.slice.call(navigator.languages):navigator.language?[navigator.language]:[];
var picked=pickLocale({languages:languages,saved:saved,urlLocale:pathLocale(location.pathname)});
if(picked!==parseLocale(document.documentElement.lang))location.replace(localizePath(location.pathname,picked)+location.search+location.hash);
})();`

export const localeBootScript: string = helpers + run
