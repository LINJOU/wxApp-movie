function Detail(aka, aka_en, avatars, birthday, born_place, constellation, gender, id, name, name_en, photos, professions, summary, works) {
  this.aka = aka,
  this.aka_en = aka_en,
  this.avatars = avatars,
  this.birthday = birthday,
  this.born_place = born_place,
  this.constellation = constellation,
  this.gender = gender,
  this.id = id,
  this.name = name,
  this.name_en = name_en,
  this.photos = photos,
  this.professions = professions,
  this.summary = summary,
  this.works = works
}

function Movie(title, id, images, rating, info, null_rating_reason) {
  this.title = title,
  this.id = id,
  this.images = images,
  this.rating = rating,
  this.info = info
  this.null_rating_reason = null_rating_reason
}

function createMovie(item) {
  return new Movie(
    item.subject.title, 
    item.subject.id, 
    item.subject.images, 
    item.subject.rating,
    filterName(item.subject.genres),
    ratingReason(item.subject.rating.average)
  )
}

function normalizeMovies(list) {
  var res = []
  list.forEach(item => {
    res.push(createMovie(item))
  })
  return res
}

function ratingReason(value) {
  return value === 0 ? true : ''
}

function filterName(names) {
  return names.join(' / ')
}

function createDetail(item) {
  return new Detail(
    filterName(item.aka),
    filterName(item.aka_en),
    item.avatars,
    item.birthday,
    item.born_place,
    item.constellation,
    item.gender,
    item.id,
    item.name,
    item.name_en,
    item.photos,
    filterName(item.professions),
    item.summary, 
    normalizeMovies(item.works)
  )
}

module.exports.createDetail = createDetail