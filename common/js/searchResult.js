function Movie(id, title, directors, actors, imgUrl, rating, info,null_rating_reason) {
  this.id = id
  this.title = title
  this.directors = directors
  this.actors = actors
  this.imgUrl = imgUrl
  this.rating = rating
  this.info = info
  this.null_rating_reason = null_rating_reason
}

function Rating(value, count) {
  this.value = value,
  this.count = count
}

function createRating(value, count) {
  return new Rating(value, count)
}

function getRating(value, count) {
  if (value === 0) {
    return null
  } else {
    return createRating(value, count)
  }
}

function createMovie(item) {
  return new Movie(item.id, item.title, filterName(filter(item.directors)), filterName(filter(item.casts)), item.images.large, getRating(item.rating.average, item.collect_count), item.info, ratingReason(item.rating.average))
}

function filter(list) {
  var res = []
  list.forEach(item => {
    res.push(item.name)
  })
  return res
}

function ratingReason(value) {
  return value === 0 ? true : ''
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