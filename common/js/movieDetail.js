function Detail (aka, actors, collect_count, comments_count, countries, directors, durations, genres, id, images, languages, mainland_pubdate, original_title, photos, pubdates, rating, summary, tags, title, wish_count, writers, year, videos, null_rating_reason, trailer_urls, trailers) {
  this.aka = aka,
  this.actors = actors,
  this.collect_count = collect_count,
  this.comments_count = comments_count,
  this.countries = countries,
  this.directors = directors,
  this.durations = durations,
  this.genres = genres,
  this.id = id,
  this.images = images,
  this.languages = languages,
  this.mainland_pubdate = mainland_pubdate,
  this.original_title = original_title,
  this.photos = photos,
  this.pubdates = pubdates,
  this.rating = rating,
  this.summary = summary,
  this.tags = tags,
  this.title = title,
  this.wish_count= wish_count,
  this.writers = writers,
  this.year = year,
  this.videos = videos,
  this.null_rating_reason = null_rating_reason
  this.trailer_urls = trailer_urls
  this.trailers = trailers  
}

function Trailer (id, medium, resource_url, title) {
  this.id = id,
  this.medium = medium,
  this.resource_url = resource_url,
  this.title = title
}

function createTrailer(item) {
  return new Trailer(item.id, cutUrl(item.medium), getHttps(item.resource_url), item.title)
}

function cutUrl(url) {
  var reg = /^(http|https):\/\/[A-Za-z0-9./]+/i
  var newUrl = reg.exec(url)
  return newUrl[0]
}

function normalizeTrailers(list) {
  var res = []
  list.forEach(item => {
    res.push(createTrailer(item))
  })
  return res
}

function filter(list) {
  var res = []
  list.forEach(item => {
    res.push(item.name)
  })
  return res
}

function filterName(names) {
  return names.join(' / ')
}

function Rating(value, count) {
  this.value = value,
  this.count = count
}

function ratingReason(value) {
  return value === 0 ? true : ''
}

function createRating(value, count) {
  return new Rating(value, count)
}

function filterTrailerUrls(list) {
  var res = []
  list.forEach(item => {
    res.push(getHttps(item))
  })
  return res
}

function getHttps(url) {
  return url.replace(/^(http|https)/, 'https');
}

function createDetail(item) {
  return new Detail(
    filterName(item.aka),
    filterName(filter(item.casts)),
    item.collect_count,
    item.comments_count,
    filterName(item.countries),
    filterName(filter(item.directors)),
    filterName(item.durations),
    filterName(item.genres),
    item.id,
    item.images.large,
    filterName(item.languages),
    item.mainland_pubdate,
    item.original_title,
    item.photos,
    filterName(item.pubdates),
    createRating(item.rating.average, item.ratings_count),
    item.summary,
    item.tags,
    item.title,
    item.wish_count,
    filterName(filter(item.writers)),
    item.year,
    item.videos,
    ratingReason(item.rating.average),
    filterTrailerUrls(item.trailer_urls),
    normalizeTrailers(item.trailers)
  )
}

module.exports.createDetail = createDetail