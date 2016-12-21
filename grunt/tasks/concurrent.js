module.exports = (grunt, options) => {

  return {
    options: {
      logConcurrentOutput: true,
      limit: 3
    },
    projectWatch: [
      'watch:html',
      'watch:sass',
      'watch:livereload'
    ]
  };

};
