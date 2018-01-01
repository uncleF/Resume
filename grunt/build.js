'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var tx = require('./tx/tx-project');

  grunt.registerTask('inlineCSS', 'Inlining Modernizr', _ => tx.inlineCSS(grunt, project));

  grunt.registerTask('build-resources', [
    'compile',
    'clean:build',
    'copy:build',
    'htmlmin',
    'prettify',
    'wkhtmltopdf',
    'wait',
    'clean:pdf',
    'html2md',
    'string-replace:md'
  ]);

  grunt.registerTask('build-finalize', [
    'string-replace:build',
    'inlineCSS',
    'cleanempty',
    'clean:buildRes',
    'rename'
  ]);

  grunt.registerTask('build', [
    'build-resources',
    'build-finalize',
    'test'
  ]);

  grunt.registerTask('build-fast', [
    'build-resources',
    'build-finalize'
  ]);

};
