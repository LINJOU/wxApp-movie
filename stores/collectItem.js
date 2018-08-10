import { extendObservable } from "../libs/mobx"

const CollectItem = function(item) {
  extendObservable(this, {
    id: item.id,
    name: item.name,
    imgUrl: item.avatars.large
  })
}

module.exports.CollectItem = CollectItem