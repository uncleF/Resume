'use strict';

module.exports = (grunt) => {

  grunt.registerTask('quality', [
    'htmlhint',
    // 'arialinter',
    'scsslint',
    'csslint',
    'csscss',
    'colorguard',
  ]);

  grunt.registerTask('performance', [
    'analyzecss'
  ]);

  grunt.registerTask('test', [
    'quality',
    'performance'
  ]);

};
