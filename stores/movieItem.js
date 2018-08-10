import { extendObservable } from "../libs/mobx"

const MovieItem = function(item) {
  extendObservable(this, {
    id: item.id,
    title: item.title,
    directors: item.directors,
    actors: item.actors,
    imgUrl: item.images,
    rating: item.rating,
    info: item.genres,
    null_rating_reason: item.null_rating_reason
  })
}

module.exports.MovieItem = MovieItem