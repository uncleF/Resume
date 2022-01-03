'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var tx = require('./tx/tx-project');

  grunt.registerTask('inlineCSS', 'Inlining CSS', _ => tx.inlineCSS(grunt, project));

  grunt.registerTask('build-resources', [
    'compile',
    'clean:build',
    'copy:build',
    'htmlmin',
    'prettify',
    'inlineCSS',
    'wkhtmltopdf',
    'wait',
    'clean:pdf',
    'html2md',
    'string-replace:md'
  ]);

  grunt.registerTask('build-finalize', [
    'string-replace:build',
    'cleanempty',
    'clean:buildRes',
    'clean:reports',
    'rename'
  ]);

  grunt.registerTask('build', [
    'build-resources',
    'test',
    'build-finalize'
  ]);

  grunt.registerTask('build-fast', [
    'build-resources',
    'build-finalize'
  ]);

};
