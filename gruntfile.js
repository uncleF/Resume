//Gruntfile for the Resume Project

var TITLE           = 'Biryujov Ilya – Front End Developer';      // Title
var LANGUAGE        = 'ru';                                       // Language
var BUILD_DIR       = 'build';                                    // Project Build
var DEVELOPMENT_DIR = 'dev';                                      // Project Development
var RESOURCES_DIR   = 'res';                                      // Resources (CSS, JavaScript, Fonts etc.)
var INDEX_PAGE      = 'index.html';                               // Index Page
var TEMPLATES_DIR   = 'templates';                                // Templates
var CSS_TEMPLATE    = '_head.html';                               // Template Containing CSS Declarations
var CSS_DIR         = 'css';                                      // Production CSS
var SASS_DIR        = 'sass-dev';                                 // Sass
var CSS_DEV_DIR     = 'css-dev';                                  // Generated CSS
var CSS_FILENAME    = 'styles';                                   // Production CSS Filename

function fillAnArray(array, path) {
  var result = [];
  for (var element in array) {
    result.push(path + array[element]);
  }
  return result;
}

module.exports = function(grunt) {

  var project = {
    init: function() {
      this.title = TITLE;
      this.index = INDEX_PAGE;
      this.language = LANGUAGE;
      this.dir = DEVELOPMENT_DIR + '/';
      var templatesDirCompiled = this.dir + TEMPLATES_DIR + '/';
      var resourcesDirCompiled = this.dir + RESOURCES_DIR + '/';
      this.templates = {
        dir: templatesDirCompiled,
        css: templatesDirCompiled + CSS_TEMPLATE
      };
      this.res = {
        dir: resourcesDirCompiled,
        css: {
          dir: resourcesDirCompiled + CSS_DIR + '/',
          devDir: resourcesDirCompiled + CSS_DEV_DIR + '/',
          sass: resourcesDirCompiled + SASS_DIR + '/',
          filename: CSS_FILENAME
        }
      };
      this.build = {
        dir: BUILD_DIR + '/'
      };
      return this;
    }
  }.init();

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    htmlhint: {
      options: {
        'htmlhintrc': '.htmlhintrc'
      },
      htmlHint: {
        cwd: project.dir,
        src: ['*.html'],
        expand: true
      }
    },
    scsslint: {
      scssLint: {
        cwd: project.res.css.sass,
        src: ['*.scss'],
        expand: true
      }
    },
    csslint: {
      option: {
        'csslintrc': '.csslintrc'
      },
      cssLint: {
        cwd: project.res.css.devDir,
        src: ['*.css', '!*-IE.css'],
        expand: true
      }
    },
    csscss: {
      options: {
        verbose: true
      },
      csscssTest: {
        src: project.res.css.devDir + '*.css'
      }
    },
    colorguard: {
      files: {
        src: project.res.css.devDir + '*.css'
      }
    },
    arialinter: {
      options: {
        level: 'A'
      },
      ariaLinter: {
        cwd: project.build.dir,
        src: ['*.html'],
        expand: true
      }
    },

    backstop: {
      test: {
        options: {
          backstop_path: './node_modules/backstopjs',
          test_path: './tests',
          setup: false,
          configure: false,
          create_references: false,
          run_tests: true
        }
      }
    },

    analyzecss: {
      options: {
        outputMetrics: 'error',
        softFail: true,
        thresholds: grunt.file.readJSON('.analyzecssrc')
      },
      ananlyzeCSS: {
        cwd: project.res.css.dir,
        src: [project.res.css.filename + '.min.css'],
        expand: true
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 5
      },
      generateCSS: {
        cwd: project.res.css.sass,
        src: ['*.scss', '*.sass'],
        dest: project.res.css.devDir,
        ext: '.css',
        expand: true
      },
      generateDebugCSS: {
        cwd: project.res.css.sass + 'project/tx/',
        src: ['*.scss', '*.sass'],
        dest: project.res.css.devDir + '/tx',
        ext: '.css',
        expand: true
      }
    },
    autoprefixer: {
      options: {
        map: true,
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 7'],
        cascade: false
      },
      prefixCSS: {
        cwd: project.res.css.devDir,
        src: ['**/*.css', '!**/*-IE.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },

    concat: {
      css: {
        src: '<%= task.cssArray %>',
        dest: project.res.css.dir + project.res.css.filename + '.css'
      }
    },

    'string-replace': {
      cssComments: {
        options: {
          replacements: [{
            pattern: /\/\* line \d*, .* \*\/(\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\/\*# sourceMappingURL(.|\t|\s|\r?\n|\r)*?\*\//gi,
            replacement: ''
          }, {
            pattern: /.media \-sass\-debug\-info(.|\t|\s|\r?\n|\r)*?\}\}/gi,
            replacement: ''
          }, {
            pattern: /\/\*\*\* uncss>.*\*\*\*\/(\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\*\s(.)*\*\/(\r?\n|\r)*$/g,
            replacement: ''
          }, {
            pattern: /\*\s(.)*\*\/(\r?\n\t*|\r\t*)*\//g,
            replacement: ''
          }, {
            pattern: /(\r?\n|\r)*\/$/g,
            replacement: ''
          }, {
            pattern: /\/\*(.)*(\r?\n|\r){4}/g,
            replacement: ''
          }]
        },
        files: {
          './': [project.res.css.dir + '*.css']
        }
      },
      build: {
        options: {
          replacements: [{
            pattern: /@tx-title/gi,
            replacement: project.title
          }, {
            pattern: /@tx-language/gi,
            replacement: project.language
          }, {
            pattern: /@tx-revisionDateRu/gi,
            replacement: {
              getDateRu: function() {
                var today = new Date();
                var day = today.getDate();
                var month = today.getMonth() + 1;
                var year = today.getFullYear();
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                return day + '.' + month + '.' + year;
              }
            }.getDateRu()
          }, {
            pattern: /@tx-revisionDateEn/gi,
            replacement: {
              getDateEn: function() {
                var today = new Date();
                var day = today.getDate();
                var month = today.getMonth() + 1;
                var year = today.getFullYear();
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                return month + '/' + day + '/' + year;
              }
            }.getDateEn()
          }, {
            pattern: /.!-- @tx-css -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-css -->/gi,
            replacement: '<link rel="stylesheet" type="text/css" href="' + project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.min.css">'
          }]
        },
        files: {
          './': [project.build.dir + '*.html']
        }
      },
      md: {
        options: {
          replacements:[{
            pattern: /<\/dt>(\r?\n|\r)*<dd>/gi,
            replacement: ' – '
          }, {
            pattern: /<dt>/gi,
            replacement: '*   '
          }, {
            pattern: /<\/dd>(\r?\n|\r)+/gi,
            replacement: '\n'
          }, {
            pattern: /<header class="header">\n\n<div class="headerContent">\n\n*/gi,
            replacement: ''
          }, {
            pattern: /<footer(.|\r?\n|\r)*<\/html>/gi,
            replacement: '\n'
          }, {
            pattern: /<span class="emplymentDate"><\/span>/gi,
            replacement: '– '
          }, {
            pattern: /<span class="resumeNote">/gi,
            replacement: ''
          }, {
            pattern: /(\s)*<((?!>).)*>(\r?\n|\r)+/gi,
            replacement: '\n\n'
          }, {
            pattern: /(\s)*<((?!>).)*>/gi,
            replacement: ''
          }, {
            pattern: /(\n){3,}/gi,
            replacement: '\n\n'
          }, {
            pattern: /(\n)*(\s)+$/gi,
            replacement: ''
          }]
        },
        files: {
          './': [project.build.dir + '*.md']
        }
      }
    },

    uncss: {
      cssOptimize: {
        options: {
          ignore: [/.*-is-.*/, /.*-has-.*/, /.*-are-.*/, /js-.*/],
          stylesheets: [project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.css'],
          timeout: 1000
        },
        files: {
          cssMinFiles: function() {
            var cssMinFilesObject = {};
            cssMinFilesObject[project.res.css.dir + project.res.css.filename + '.css'] = project.dir + '*.html';
            return cssMinFilesObject;
          }
        }.cssMinFiles()
      }
    },
    csscomb: {
      options: {
        config: '.csscombrc'
      },
      cssSortBuild: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        expand: true
      },
      cssSortDev: {
        cwd: project.res.css.devDir,
        src: ['*.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },
    cssc: {
      options: grunt.file.readJSON('.csscrc'),
      cssOptimize: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        ext: '.min.css',
        expand: true
      }
    },
    cssmin: {
      cssMin: {
        cwd: project.res.css.dir,
        src: ['*.min.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },

    processhtml: {
      options: {
        includeBase: project.templates.dir,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.templates.dir,
        src: ['*.html', '!_*.html'],
        dest: project.dir,
        ext: '.html',
        expand: true
      }
    },
    htmlmin: {
      options: grunt.file.readJSON('.htmlminrc'),
      cleanup: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      }
    },

    clean: {
      res: [project.res.css.dir],
      build: [project.build.dir],
      buildRes: [project.build.dir + project.res.dir.replace(project.dir, "")]
    },
    copy: {
      build: {
        cwd: project.dir,
        src: ['**/*.*', '!**/tx-*.*', '!**/templates/**', '!**/**-dev/**', '!**/tx/**'],
        dest: project.build.dir,
        expand: true
      }
    },

    wkhtmltopdf: {
      resumePDF: {
        src: [project.build.dir + '*.html', '!' + project.build.dir + '*-emailTemplate.html', '!' + project.build.dir + '*.mail.html'],
        dest: project.build.dir,
      }
    },
    html2md: {
      main: {
        options: {
          encoding: 'utf8'
        },
        cwd: project.build.dir,
        src: ['*.html', '!*-emailTemplate.html', '!*.mail.html'],
        dest: project.build.dir,
        ext: ".md",
        expand: true
      },
    },

    watch: {
      options: {
        spawn: false
      },
      htmlTemplates: {
        files: [project.templates.dir + '*.html'],
        tasks: ['processhtml']
      },
      sass: {
        files: [project.res.css.sass + '**/*.scss', project.res.css.sass + '**/*.sass'],
        tasks: ['sass', 'autoprefixer']
      },
      livereloadWatch: {
        options: {
          livereload: true
        },
        files: [project.dir + '*.html', project.res.css.devDir + '**/*.css']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 3
      },
      projectWatch: ['watch:htmlTemplates', 'watch:sass', 'watch:sassImages', 'watch:livereloadWatch']
    },
    wait: {
      options: {
        delay: '2500'
      },
      pdf: {}
    }

  });

  grunt.registerTask('process-css', 'CSS processing', function() {
    var cssDirRegEx = new RegExp('<link(.)*href="' + project.res.css.devDir.replace(project.dir, ''), 'g');
    var css = grunt.file.read(project.templates.css)
        .replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-css -->/, '')
        .replace(/<!-- \/@tx-css -->(.|\t|\s|\r?\n|\r)*/, '')
        .replace(/^\s(.)*tx\/tx-debug(.)*/gm, '')
        .replace(/<!--(.|\t|\s|\r?\n|\r)*/, '')
        .replace(cssDirRegEx, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/\s/g, '')
        .replace(/">$/, '');
    var cssArray = css.split('">');
    var cssExpected = cssArray.length;
    var cssActual = grunt.file.expand([project.res.css.devDir + '*.css']).length;
    if (cssExpected === cssActual || (cssArray[0] === '' && cssActual === 0)) {
      if (cssActual === 0) {
        grunt.log.writeln('No .css-files to process.');
      } else {
        var processTasks = [];
        processTasks.push('concat:css');
        grunt.config.set('task.cssArray', fillAnArray(cssArray, project.res.css.devDir));
        processTasks = processTasks.concat(['uncss', 'csscomb', 'string-replace:cssComments', 'cssc', 'cssmin:cssMin']);
        grunt.task.run(processTasks);
      }
    } else {
      var errorMessage = '';
      if (cssExpected > cssActual) {
        errorMessage += 'There is got to be more .css-files.';
      } else if (cssExpected < cssActual) {
        errorMessage += 'Not all of the .css-files has been referenced.';
      }
      grunt.fail.warn(errorMessage);
    }
  });

  grunt.registerTask('cssInline', 'Injecting CSS', function() {
    var cssRegEx = new RegExp('<(.)*' + project.res.css.filename + '.min.css(.)*>', 'g');
    var css = '<style rel="stylesheet" type="text/css">' + grunt.file.read(project.res.css.dir + project.res.css.filename + '.min.css') + '</style>';
    var files = grunt.file.expand([project.build.dir + '*.html']);
    var filesLength = files.length;
    var fileIndex = 0;
    for (fileIndex; fileIndex < filesLength; fileIndex++) {
      var page = grunt.file.read(files[fileIndex]).replace(cssRegEx, css);
      grunt.file.write(files[fileIndex], page);
    }
  });

  grunt.registerTask('quality', ['htmlhint', 'jscs', 'jshint', 'jsinspect', 'scsslint', 'csslint', 'csscss', 'colorguard', 'arialinter']);

  grunt.registerTask('test', ['backstop']);

  grunt.registerTask('performance', ['analyzecss']);

  grunt.registerTask('generate-css', ['sass', 'autoprefixer']);

  grunt.registerTask('watch-project', ['concurrent']);

  grunt.registerTask('compile', ['clean:res', 'processhtml', 'generate-css', 'process-css']);

  grunt.registerTask('build', ['compile', 'clean:build', 'copy:build', 'string-replace:build', 'htmlmin:cleanup', 'wkhtmltopdf', 'wait', 'html2md', 'string-replace:md', 'cssInline', 'clean:buildRes']);

};
