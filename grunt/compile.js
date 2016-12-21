'use strict';

module.exports = (grunt, options) => {

  grunt.registerTask('compile', [
    'clean:res',
    'process-html',
    'process-css'
  ]);

};
