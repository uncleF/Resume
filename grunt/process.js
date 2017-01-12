'use strict';

module.exports = (grunt, options) => {

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
