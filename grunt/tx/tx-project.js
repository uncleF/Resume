'use strict';

function inlineCSS(grunt, project) {
  var cssRegEx = new RegExp('<link(?:.|\r?\n|\r)*' + project.res.css.filename + '.css(.)*>', 'g');
  var css = '<style rel="stylesheet" type="text/css">' + grunt.file.read(project.res.css.dir + project.res.css.filename + '.min.css') + '</style>';
  var files = grunt.file.expand([project.build.dir + '*.html']);
  var filesLength = files.length;
  var fileIndex = 0;
  for (fileIndex; fileIndex < filesLength; fileIndex++) {
    var page = grunt.file.read(files[fileIndex]);
    page = page.replace(cssRegEx, css);
    grunt.file.write(files[fileIndex], page);
  }
}

exports.inlineCSS = inlineCSS;
