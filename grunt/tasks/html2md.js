module.exports = (grunt, options) => {

  var project = options.project;

  return {
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
  };

};
