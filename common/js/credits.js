function Celebritie(name, title, id, cover_url) {
  this.name = name,
  this.title = title,
  this.id = id,
  this.cover_url = cover_url
}

function createCelebritie (item, title) {
  return new Celebritie(item.name, title, item.id, item.cover_url)
}

function normalizeCredits (Credits) {
  var res = []
  Credits.forEach(item => {
    var title = item.title
    item.celebrities.forEach(i => {
      res.push(createCelebritie (i, title))
    })    
  })
  return res
}

module.exports.normalizeCredits = normalizeCredits