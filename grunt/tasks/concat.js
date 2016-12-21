module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      separator: '\n\n'
    },
    dataURI: {
      src: [
        `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURI}`,
        `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`
      ],
      dest: `${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`,
    }
  };

};
