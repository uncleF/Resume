'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  grunt.registerTask('process-html', [
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'postcss',
    // 'uncss',
    'csscomb',
    'cssc',
    'string-replace:css',
    'cssmin'
  ]);

};
