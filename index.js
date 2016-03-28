var _ = require('underscore')
var util = require('util')

//defaults
var defaults = {
  sort: '-date',
  number: 5,
  fields: true, // array of field names
  file: 'recent.json'
}
var allFields = [
  'raw',
  'content',
  'title',
  'slug',
  'date',
  'updated',
  'comments',
  'path',
  'link',
  'permalink',
  'excerpt',
  'text',
  'categories',
  'tags',
  'keywords'
]
var circular = [
  'categories',
  'tags',
  'keywords'
]
// register plugin
hexo.extend.generator.register('generatorRecent', function(locals) {
  var posts = []
  var options
  options = _.extend(
    {},
    defaults,
    hexo.config.generatorRecent
  )
  if (options.fields === true) {
    options.fields = allFields
  }
  circular = _.intersection(options.fields, circular)


  locals.posts
    .sort(options.sort)
    .filter(function(post) {
      return post.published
    })
    .limit(options.number)
    .forEach(function(post) {

      var data
      data = _.pick(post.toObject(), options.fields)
      // deal with circular references by excluding fields (like 'posts')
      _.each(circular, function(field) {
        if (!_.has(data, field)) {
          return
        }
        data[field] = data[field].map(function(document) {
          return _.pick(document, ['name', 'slug', 'permalink'])
        })
      })

      posts.push(data)

    }, {lean: true})

  return {
    path: options.file,
    data: JSON.stringify(posts)
  }
})
