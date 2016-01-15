// Gruntfile for the Resume Project

var PROJECT           = 'Biryukov Ilya – Front End Developer';   // Project Name

var DEVELOPMENT_DIR   = 'dev';                                   // Development
var BUILD_DIR         = 'build';                                 // Build
var IMAGES_DIR        = 'images';                                // Content Images
var RESOURCES_DIR     = 'res';                                   // Resources (CSS, JavaScript, Fonts, etc.)
var TEMPLATES_DIR     = 'templates';                             // Templates
var COMPONENTS_DIR    = 'components';                            // Components

var CSS_IMAGES_DIR    = 'images';                                // CSS Images (Sprites, Icons, etc.)
var SPRITES           = [];                                      // CSS Images to Compile into Separate Sprite Sheets
var DATA_URI          = [];                                      // CSS Images to Convert to DataURI

var SASS_DIR          = 'sass';                                  // Sass
var CSS_DIR           = 'css';                                   // CSS
var CSS_FILENAME      = 'styles';                                // CSS Filename
var CSS_PRINT         = 'print';                                 // CSS Filename

module.exports = function(grunt) {

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
            dir: resourcesDirCompiled + CSS_IMAGES_DIR + '/',
            sprites: SPRITES,
            dataURI: DATA_URI
          },
          css: {
            dir: resourcesDirCompiled + CSS_DIR + '/',
            sass: resourcesDirCompiled + SASS_DIR + '/',
            filename: CSS_FILENAME,
            print: CSS_PRINT
          }
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

    concat: {
      datauri: {
        options: {
          separator: '\n\n'
        },
        src: [project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss', project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss'],
        dest: project.res.css.sass + 'project/_project-images.scss'
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

    sprite: {
      checkSprites: function() {
        var tasks = {};
        var spritePath = project.res.images.dir;
        var imgPath = '../' + spritePath.replace(project.res.dir, '');
        project.res.images.sprites.forEach(function(sprite) {
          var name = sprite.split('.')[0];
          var ext = sprite.split('.')[1];
          if (grunt.file.exists(spritePath + name + '/')) {
            tasks[name] = {
              src: spritePath + name + '/*.' + ext,
              dest: spritePath + sprite,
              destCss: project.res.css.sass + 'project/tx/_' + name + '.scss',
              imgPath: imgPath + sprite,
              padding: 5,
              cssSpritesheetName: 'ssh-' + name,
              cssVarMap: function(sprite) {
                sprite.name = 'spt-' + sprite.name;
              },
              cssOpts: {
                functions: false,
                variableNameTransforms: []
              }
            };
          }
          if (grunt.file.exists(spritePath + name + '@2x/')) {
            tasks[name + '2x'] = {
              src: spritePath + name + '@2x/*@2x.' + ext,
              dest: spritePath + (name + '@2x.' + ext),
              destCss: project.res.css.sass + 'project/tx/_' + name + '@2x.scss',
              imgPath: imgPath + name + '@2x.' + ext,
              padding: 10,
              cssSpritesheetName: 'ssh-' + name + '-2x',
              cssVarMap: function(sprite) {
                sprite.name = 'spt-' + sprite.name;
              },
              cssOpts: {
                functions: false,
                variableNameTransforms: []
              }
            };
          }
          if (grunt.file.exists(spritePath + name + '@3x/')) {
            tasks[name + '3x'] = {
              src: spritePath + name + '@3x/*@3x.' + ext,
              dest: spritePath + (name + '@3x.' + ext),
              destCss: project.res.css.sass + 'project/tx/_' + name + '@3x.scss',
              imgPath: imgPath + name + '@3x.' + ext,
              padding: 15,
              cssSpritesheetName: 'ssh-' + name + '-3x',
              cssVarMap: function(sprite) {
                sprite.name = 'spt-' + sprite.name;
              },
              cssOpts: {
                functions: false,
                variableNameTransforms: []
              }
            };
          }
        });
        return tasks;
      }
    }.checkSprites(),
    datauri: {
      options: {
        classPrefix: 'image-'
      },
      resImages: {
        checkDataURI: function() {
          var config = {
            src: [],
            dest: project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss'
          };
          for (var element in project.res.images.dataURI) {
            config.src.push(project.res.images.dir + project.res.images.dataURI[element]);
          }
          return config;
        }
      }.checkDataURI()
    },
    imagemin: {
      images: {
        cwd: project.dir,
        src: ['**/*.{png,jpg,gif}', '!**/tx-*.*', '!**/tx/*.*'],
        dest: project.dir,
        expand: true
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      images: {
        cwd: project.dir,
        src: ['**/*.svg', '!**/fonts/**/*.svg', '!**/tx-*.*', '!**/tx/*.*'],
        dest: project.dir,
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
        src: ['**/*.*', '!**/templates/**', '!**/sass/**', '!**/*.map', '!**/**-dev/**', '!**/tx-*.*', '!**/tx/**'],
        dest: project.build.dir,
        expand: true
      }
    },
    compress: {
      build: {
        options: {
          mode: 'zip',
          archive: project.name + '.build.zip'
        },
        cwd: project.build.dir,
        src: ['**'],
        dest: '.',
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

  grunt.registerTask('datauri-cleanup', 'Cleanup After datauri-fallback', function() {
    if (grunt.file.isFile(project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss')) {
      grunt.file.delete(project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss');
    }
    if (grunt.file.isFile(project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss')) {
      grunt.file.delete(project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss');
    }
  });

  grunt.registerTask('spritesSCSS', 'processing sprites styles', function() {
    var scss = '';
    grunt.file.delete(project.res.css.sass + 'project/_project-sprites.scss');
    if (project.res.images.sprites.length > 0) {
      project.res.images.sprites.forEach(function(sprite) {
        var name = sprite.split('.')[0];
        var ext = sprite.split('.')[1];
        var scssPath = project.res.css.sass + 'project/tx/_' + name;
        var scssBlock = '';
        if (grunt.file.isFile(scssPath + '.scss')) {
          scssBlock = grunt.file.read(scssPath + '.scss').replace(/(?:\r?\n|\r){2,}/gm, '');
          scssBlock = '// ' + name + '.' + ext + '\n\n' + scssBlock + '\n\n\n\n';
          if (scss === '') {
            scss += scssBlock;
          } else {
            scss += '\n\n\n' + scssBlock;
          }
          grunt.file.delete(scssPath + '.scss');
        }
        if (grunt.file.isFile(scssPath + '@2x.scss')) {
          scssBlock = grunt.file.read(scssPath + '@2x.scss').replace(/(?:\r?\n|\r){2,}/gm, '');
          scssBlock = '// ' + name + '@2x.' + ext + '\n\n' + scssBlock + '\n\n\n\n';
          scss += scssBlock;
          grunt.file.delete(scssPath + '@2x.scss');
        }
        if (grunt.file.isFile(scssPath + '@3x.scss')) {
          scssBlock = grunt.file.read(scssPath + '@3x.scss').replace(/(?:\r?\n|\r){2,}/gm, '');
          scssBlock = '// ' + name + '@3x.' + ext + '\n\n' + scssBlock + '\n\n\n\n';
          scss += scssBlock;
          grunt.file.delete(scssPath + '@3x.scss');
        }
        scss = scss.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r)/gm, '').replace(/\, \)/gm, ')').replace(/(\s|\()0px/gm, '$1' + '0') + '//eof';
        scss = scss.replace('\n\n\n\n//eof', '\n');
        grunt.file.write(project.res.css.sass + 'project/_project-sprites.scss', scss);
      });
    }
  });

  grunt.registerTask('cssInline', 'Injecting CSS', function() {
    var cssRegEx = new RegExp('<link(?:.|\r?\n|\r)*' + project.res.css.print + '.min.css(.)*>', 'g');
    var css = '<style rel="stylesheet" type="text/css">' + grunt.file.read(project.res.css.dir + project.res.css.filename + '.min.css') + grunt.file.read(project.res.css.dir + project.res.css.print + ".min.css") + '</style>';
    var files = grunt.file.expand([project.build.dir + '*.html']);
    var filesLength = files.length;
    var fileIndex = 0;
    for (fileIndex; fileIndex < filesLength; fileIndex++) {
      var page = grunt.file.read(files[fileIndex]).replace(cssRegEx, css);
      grunt.file.write(files[fileIndex], page);
    }
  });

  grunt.registerTask('compileTasks', 'compiling', function() {
    if (project.res.images.sprites.length > 0) {
      grunt.task.run([
        'clean:res',
        'process-sprites',
        'images',
        'process-html',
        'process-css'
      ]);
    } else {
      grunt.task.run([
        'clean:res',
        'images',
        'process-html',
        'process-css'
      ]);
    }
  });

  grunt.registerTask('quality', [
    'htmlhint',
    'scsslint',
    'csslint',
    'csscss',
    'colorguard'
  ]);

  grunt.registerTask('images-datauri', [
    'datauri',
    'concat:datauri',
    'datauri-cleanup'
  ]);

  grunt.registerTask('process-sprites', [
    'sprite',
    'spritesSCSS'
  ]);

  grunt.registerTask('images', [
    'imagemin:images',
    'svgmin:images',
    'images-datauri'
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
    'compileTasks'
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

  grunt.registerTask('compress-build', [
    'compress:build'
  ]);

};
