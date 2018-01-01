module.exports = (grunt, options) => {

  var project = options.project;

  function getDateEN() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    return month + '/' + day + '/' + year;
  }

  function getDateRU() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    return day + '.' + month + '.' + year;
  }

  return {
    build: {
      options: {
        replacements: [{
          pattern: /@tx-title/gi,
          replacement: project.name
        }, {
          pattern: /@tx-language/gi,
          replacement: project.language
        }, {
            pattern: /@tx-revisionDateRu/gi,
            replacement: getDateRU()
          }, {
            pattern: /@tx-revisionDateEn/gi,
            replacement: getDateEN()
          }, {
          pattern: /(?:<span data-dev-note=".*?">)(.*)(?:<\/span>)/gi,
          replacement: '$1'
        }, {
          pattern: / +data-dev-note=".*?"/gi,
          replacement: ''
        }, {
          pattern: new RegExp(`${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}(-IE)*.css`, 'gi'),
          replacement: `${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}$1.min.css`
        }, {
          pattern: /<style type="text\/css">(?:\r?\n|\r)/gi,
          replacement: '<style type="text/css">'
        }, {
          pattern: /(?:\r?\n|\r)<\/style>(?:\r?\n|\r)<script(?: id="loadcss")*>(?:\r?\n|\r)/gi,
          replacement: '</style>\n    <script type="text/javascript" id="loadcss">'
        }, {
          pattern: /(?:\r?\n|\r)<\/script>(?:\r?\n|\r)<noscript>(?:\r?\n|\r)/gi,
          replacement: '</script>\n    <noscript>'
        }, {
          pattern: /(?:\r?\n|\r)<\/noscript>/gi,
          replacement: '</noscript>'
        }]
      },
      files: {
        './': [`${project.build.dir}*.html`]
      }
    },
    css: {
      options: {
        replacements: [{
          pattern: /\*(?! *csslint|\/)[^*{]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r|\t| )*\//g,
          replacement: ''
        }, {
          pattern: /\/\*.*(?:# sourceMappingURL|uncss>)[\s\S]*?\*\/(?:\r?\n|\r)*/g,
          replacement: ''
        }, {
          pattern: /(@media.*\{|(?:\*\/|\})\n(?=\}))/g,
          replacement: '$1\n'
        }, {
          pattern: /^(?:(?: |\t)*(?:\r?\n|\r))+/g,
          replacement: ''
        }, {
          pattern: /(?:(?: |\t)*(?:\r?\n|\r))+$/g,
          replacement: '\n'
        }, {
          pattern: /((?:\s{2}|\t{1})\}\n)(\s{2}|\t{1})/g,
          replacement: '$1\n$2'
        }, {
          pattern: /\*\//g,
          replacement: '*/\n'
        }]
      },
      files: {
        './': [`${project.res.css.dir}*.css`, `!${project.res.css.dir}*.min.css`]
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
          pattern: /<header class="header">(\r?\n|\r){2}<div class="headerContent">(\r?\n|\r)(\r?\n|\r)*/gi,
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
          pattern: /(\r?\n|\r){3,}/gi,
          replacement: '\n\n'
        }, {
          pattern: /(\r?\n|\r)*(\s)+$/gi,
          replacement: ''
        }, {
          pattern: /#(\w)/gi,
          replacement: ' $1'
        }]
      },
      files: {
        './': [project.build.dir + '*.md']
      }
    }
  };

};
