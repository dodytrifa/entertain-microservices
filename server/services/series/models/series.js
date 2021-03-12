const {getDatabase} = require('../config/mongodb')
const {ObjectID} = require('mongodb')

class Series {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray()
  }

  static create(series) {
    return getDatabase().collection('tvSeries').insertOne(series)
  }

  static update(id, series) {
    return getDatabase().collection('tvSeries').updateOne(
      {_id:ObjectID(id)},
      {$set: series}
      )
  }

  static delete(id) {
    return getDatabase().collection('tvSeries').deleteOne({_id:ObjectID(id)})
  }

}

module.exports = Series