var CONFIG = {

  PROJECT: 'Resume',              // Project Name
  LANGUAGE: 'ru',                 // Language
  BROWSERS: [                     // Browser Support
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1',
    'Explorer >= 8'
  ],

  DEVELOPMENT_DIR: 'dev',          // Development
  BUILD_DIR: 'build',              // Build

  RESOURCES_DIR: 'res',            // Resources
  COMPONENTS_DIR: 'components',    // Components

  TEMPLATES_DIR: 'templates',      // Templates
  INDEX_PAGE: 'index.html',        // Index Page
  CRITICAL_DESK_W: 1280,           // Critical Width on Desktop
  CRITICAL_DESK_H: 800,            // Critical Height on Desktop
  CRITICAL_MOBILE_W: 320,          // Critical Width on Mobile
  CRITICAL_MOBILE_H: 640,          // Critical Height on Mobile

  SASS_DIR: 'sass',                // Sass
  CSS_DIR: 'css',                  // CSS
  CSS_FILENAME: 'styles',          // CSS Filename

  PAGE_WIDTH: '1000px',            // PDF Page Width
  PAGE_HEIGHT: '1414px',           // PDF Page Height
  PAGE_MARGIN: [12, 0, 5, 0, 5],   // PDF Page Margin

}

module.exports = function(grunt) {

  var loadConfig = require('load-grunt-config');
  var configPath = `${process.cwd()}/grunt/tasks/`
  var staticMappings = require('./grunt/tx/tx-mapping');
  var data = require('./grunt/tx/tx-config')(CONFIG);

  loadConfig(grunt, {configPath: configPath, jitGrunt: {staticMappings: staticMappings}, data: data});
  loadConfig(grunt, {jitGrunt: true, init: false, data: data });

};
