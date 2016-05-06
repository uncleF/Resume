// Gruntfile for the Resume Project

var PROJECT           = 'Ilya Biryukov – Front-end Developer';   // Project Name

var DEVELOPMENT_DIR   = 'dev';                                   // Development
var BUILD_DIR         = 'build';                                 // Build
var IMAGES_DIR        = 'images';                                // Content Images
var RESOURCES_DIR     = 'res';                                   // Resources (CSS, JavaScript, Fonts, etc.)
var TEMPLATES_DIR     = 'templates';                             // Templates
var COMPONENTS_DIR    = 'components';                            // Components

var PORT_DIR          = 'portfolio';                             // Portfolio
var PORT_IMAGES_DIR   = 'images';                                // Portfolio Images
var PORTFOLIO         = 'portfolio.json';                        // Portfolio Links

var CSS_IMAGES_DIR    = 'images';                                // CSS Images (Sprites, Icons, etc.)

var SASS_DIR          = 'sass';                                  // Sass
var CSS_DIR           = 'css';                                   // CSS
var CSS_FILENAME      = 'styles';                                // CSS Filename
var CSS_PHONE         = 'phone';                                 // CSS Phone Filename
var CSS_PRINT         = 'print';                                 // CSS Print Filename

module.exports = function(grunt) {

  function screenshotsDate() {
    var date = new Date();
    var now = Date.now();
    return date.getFullYear(now) + '-' + date.getMonth(now) + '-' + date.getDate(now) + '@' + date.getHours(now) + '-' + date.getMinutes(now) + '-' + date.getSeconds(now);
  }

  var project = {
    init: function() {
      var developmentDirCompiled = DEVELOPMENT_DIR + '/';
      var resourcesDirCompiled = developmentDirCompiled + RESOURCES_DIR + '/';
      var config = {
        name: PROJECT,
        dir: developmentDirCompiled,
        images: developmentDirCompiled + IMAGES_DIR + '/',
        res: {
          dir: resourcesDirCompiled,
          templates: {
            dir: resourcesDirCompiled + TEMPLATES_DIR + '/',
            comp: resourcesDirCompiled + TEMPLATES_DIR + '/' + COMPONENTS_DIR + '/'
          },
          images: {
            dir: resourcesDirCompiled + CSS_IMAGES_DIR + '/'
          },
          css: {
            dir: resourcesDirCompiled + CSS_DIR + '/',
            sass: resourcesDirCompiled + SASS_DIR + '/',
            filename: CSS_FILENAME,
            phone: CSS_PHONE,
            print: CSS_PRINT
          }
        },
        portfolio: {
          dir: PORT_DIR + '/',
          images:  PORT_DIR + '/' + PORT_IMAGES_DIR + '/',
          links: PORT_DIR + '/' + PORTFOLIO
        },
        build: {
          dir: BUILD_DIR + '/'
        }
      };
      return config;
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
        src: ['**/*.{scss,sass}'],
        expand: true
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      cssLint: {
        cwd: project.res.css.dir,
        src: ['*.css', '!*-IE.css'],
        expand: true
      }
    },
    csscss: {
      options: {
        shorthand: false,
        verbose: true
      },
      csscssTest: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        expand: true
      }
    },
    colorguard: {
      files: {
        cwd: project.res.css.dir,
        src: ['*.css'],
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
        src: ['**/*.{scss,sass}'],
        dest: project.res.css.dir,
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
        cwd: project.res.css.dir,
        src: ['*.css', '!*-IE.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },

    'string-replace': {
      build: {
        options: {
          replacements: [{
            pattern: /@tx-title/gi,
            replacement: project.name
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
            pattern: /(?:<span data-dev-note=".*?">)(.*)(?:<\/span>)/gi,
            replacement: '$1'
          }, {
            pattern: /\sdata-dev-note=".*?"/gi,
            replacement: ''
          }, {
            pattern: new RegExp(project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.css', 'gi'),
            replacement: project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.min.css'
          }, {
            pattern: new RegExp(project.res.css.dir.replace(project.dir, '') + project.res.css.print + '.css', 'gi'),
            replacement: project.res.css.dir.replace(project.dir, '') + project.res.css.print + '.min.css'
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
            replacement: ''
          }, {
            pattern: /<\/dd>(\r?\n|\r)+/gi,
            replacement: '\n\n'
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
      },
      cssComments: {
        options: {
          replacements: [{
            pattern: /\/\* line \d*, .* \*\/(?:\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\/\*# sourceMappingURL(?:.|\t|\s|\r?\n|\r)*?\*\//gi,
            replacement: ''
          }, {
            pattern: /.media \-sass\-debug\-info(?:.|\t|\s|\r?\n|\r)*?\}\}/gi,
            replacement: ''
          }, {
            pattern: /\/\*\*\* uncss>.*\*\*\*\/(?:\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\*\s(?:.)*\*\/(?:\r?\n|\r)*$/g,
            replacement: ''
          }, {
            pattern: /\*\s(?:.)*\*\/(?:\r?\n\t*|\r\t*)*\//g,
            replacement: ''
          }, {
            pattern: /(?:\r?\n|\r)*\/$/g,
            replacement: ''
          }, {
            pattern: /\/\*(?:.)*(?:\r?\n|\r){4}/g,
            replacement: ''
          }, {
            pattern: /\{(?:\r?\n|\r)\s*\/\*/g,
            replacement: '{\n\n  /*'
          }, {
            pattern: /\}(?:\r?\n|\r)\}/g,
            replacement: '}\n\n}'
          }]
        },
        files: {
          './': [project.res.css.dir + '*.css', '!' + project.res.css.dir + '*.min.css']
        }
      }
    },

    uncss: {
      cssOptimize: {
        options: {
          ignore: [/.*-is-.*/, /.*-has-.*/, /.*-are-.*/, /mdz-.*/, /js-.*/],
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
        includeBase: project.res.templates.comp,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.res.templates.dir,
        src: ['*.html'],
        dest: project.dir,
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
    prettify: {
      options: {
        config: '.jsbeautifyrc'
      },
      formatBuild: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      }
    },

    pageres: {
      screenshots: {
        options: {
          urls: grunt.file.readJSON(project.portfolio.links).links,
          sizes: ['1280x800', '768x1024', '320x480'],
          delay: 2,
          crop: true,
          filename: '{{url}}-{{size}}',
          dest: project.portfolio.images + screenshotsDate()
        }
      }
    },

    imagemin: {
      images: {
        cwd: project.dir,
        src: ['**/*.{png,jpg,gif}', '!**/tx-*.*', '!**/tx/*.*'],
        dest: project.dir,
        expand: true
      }
    },

    clean: {
      options: {
        force: true
      },
      res: [project.res.css.dir],
      build: [project.build.dir],
      buildRes: [project.build.dir + project.res.dir.replace(project.dir, "")]
    },
    copy: {
      build: {
        cwd: project.dir,
        src: ['**/*.*', '!**/templates/**', '!**/sass/**', '!**/*.map', '!**/**-dev/**', '!**/tx-*.*', '!**/tx/**'],
        dest: project.build.dir,
        expand: true
      }
    },

    wkhtmltopdf: {
      resumePDF: {
        src: [project.build.dir + '*.html', '!' + project.build.dir + '*-emailTemplate.html', '!' + project.build.dir + '*.mail.html'],
        dest: project.build.dir,
        args: [
          '--margin-bottom', '0mm',
          '--margin-left', '0mm',
          '--margin-right', '0mm',
          '--margin-top', '0mm'
        ]
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
      html: {
        files: [project.res.templates.dir + '**/*.html', project.res.templates.dir + '!**/* copy.html', project.res.templates.dir + '!**/* - Copy.html'],
        tasks: ['processhtml']
      },
      images: {
        files: [project.res.images.dir + '**/*.{png,jpg,gif,svg}'],
        tasks: ['sass', 'autoprefixer', 'processhtml']
      },
      sass: {
        files: [project.res.css.sass + '**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [project.dir + '**/*.{html,png,jpg,gif,svg}', project.res.css.dir + '**/*.css']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      projectWatch: ['watch:html', 'watch:images', 'watch:sass', 'watch:livereload']
    },
    wait: {
      options: {
        delay: '2500'
      },
      pdf: {}
    }

  });

  grunt.registerTask('cssInline', 'Injecting CSS', function() {
    var cssRegEx = new RegExp('<link(?:.|\r?\n|\r)*' + project.res.css.filename + '.min.css(.)*>', 'g');
    var css = '<style rel="stylesheet" type="text/css">' + grunt.file.read(project.res.css.dir + project.res.css.filename + '.min.css') + grunt.file.read(project.res.css.dir + project.res.css.phone + ".min.css") +  + grunt.file.read(project.res.css.dir + project.res.css.print + ".min.css") + '</style>';
    var files = grunt.file.expand([project.build.dir + '*.html']);
    var filesLength = files.length;
    var fileIndex = 0;
    for (fileIndex; fileIndex < filesLength; fileIndex++) {
      var page = grunt.file.read(files[fileIndex]).replace(cssRegEx, css);
      grunt.file.write(files[fileIndex], page);
    }
  });

  grunt.registerTask('quality', [
    'htmlhint',
    'scsslint',
    'csslint',
    'csscss',
    'colorguard'
  ]);

  grunt.registerTask('images', [
    'imagemin:images',
  ]);

  grunt.registerTask('process-html', [
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'autoprefixer',
    'uncss',
    'cssc',
    'cssmin:cssMin'
  ]);

  grunt.registerTask('watch-project', [
    'concurrent'
  ]);

  grunt.registerTask('compile', [
    'clean:res',
    'images',
    'process-html',
    'process-css'
  ]);

  grunt.registerTask('build', [
    'compile',
    'clean:build',
    'copy:build',
    'string-replace:build',
    'htmlmin',
    'prettify',
    'wkhtmltopdf',
    'wait',
    'html2md',
    'string-replace:md',
    'cssInline',
    'clean:buildRes'
  ]);

};
