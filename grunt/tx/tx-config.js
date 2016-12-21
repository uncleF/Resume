module.exports = config => {

  return {

    project: {
      name: config.PROJECT,
      language: config.LANGUAGE,
      browsers: config.BROWSERS,
      meta: `${config.META_DIR}/`,
      dir: `${config.DEVELOPMENT_DIR}/`,
      images: `${config.DEVELOPMENT_DIR}/${config.IMAGES_DIR}/`,
      index: config.INDEX_PAGE,
      res: {
        dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/`,
        templates: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.TEMPLATES_DIR}/`,
          comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.TEMPLATES_DIR}/${config.COMPONENTS_DIR}/`,
        },
        css: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.CSS_DIR}/`,
          sass: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/`,
          comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/${config.COMPONENTS_DIR}/`,
          filename: config.CSS_FILENAME
        },
      },
      build: {
        dir: config.BUILD_DIR + '/',
        critical: {
          widthDesktop: config.CRITICAL_DESK_W,
          heightDesktop: config.CRITICAL_DESK_H,
          widthMobile: config.CRITICAL_MOBILE_W,
          heightMobile: config.CRITICAL_MOBILE_H
        }
      },
      pdf: {
        width: config.PAGE_WIDTH,
        height: config.PAGE_HEIGHT,
        margin: config.PAGE_MARGIN
      }
    },

    helpers: {
      temp: 'tmp/',
      scss: 'project/',
      spritesSCSS: '_project-sprites.scss',
      dataURISCSS: '_project-images.scss',
      dataURI: '_project-base64.scss',
      dataURIFallback: '_project-imagesIE.scss',
      imageFiles: '{png,jpg,jpeg,gif,svg}',
      uncssIgnoreFiles: [
        '404.html'
      ],
      uncssIgnoreClasses: [
        /.*-is-.*/,
        /.*-has-.*/,
        /.*-are-.*/,
        /mdz-.*/,
        /js-.*/,
        /ie\d/
      ],
      dontCopy: [
        '!**/*.map',
        '!**/**-dev/**',
        '!**/tx-*.*',
        '!**/tx/**'
      ]
    }

  };

};
