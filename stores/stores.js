import { extendObservable } from "../libs/mobx"
import { SearchHistoryStore } from "./searchHistoryStore"
import { WantStore } from "./wantStore"
import { WatchedStore } from "./watchedStore"
import { CollectStore } from "./collectStore"

var Stores = function() {
  extendObservable(this, {
    searchHistory: new SearchHistoryStore(),
    want: new WantStore(),
    watched: new WatchedStore(),
    collect: new CollectStore()
  })
}

module.exports.stores = new Stores