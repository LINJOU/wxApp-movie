function Movie(id, title, directors, actors, imgUrl, rating, info, null_rating_reason) {
  this.id = id
  this.title = title
  this.directors = directors
  this.actors = actors
  this.imgUrl = imgUrl
  this.rating = rating
  this.info = info
  this.null_rating_reason = null_rating_reason
}

function createMovie(item) {
  return new Movie(item.id, item.title, filterName(item.directors), filterName(item.actors), item.cover.url, item.rating, item.info, item.null_rating_reason)
}

// 处理人名
function filterName(names) {
  return names.join(' / ')
}

function normalizeMovies(list) {
  var ret = []
  list.forEach(item => {
    ret.push(createMovie(item))
  })
  return ret
}

module.exports.normalizeMovies = normalizeMovies