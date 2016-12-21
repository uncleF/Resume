module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      spawn: false
    },
    html: {
      files: [`${project.res.templates.dir}**/*.html`],
      tasks: ['processhtml']
    },
    sass: {
      files: [`${project.res.css.sass}**/*.{scss,sass}`],
      tasks: [
        'sass',
        'postcss'
      ]
    },
    livereload: {
      options: {
        livereload: true
      },
      files: [
        `${project.dir}*.html`,
        `${project.res.css.dir}**/*.css`,
      ]
    }
  };

};
