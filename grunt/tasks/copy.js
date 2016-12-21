module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    build: {
      cwd: project.dir,
      src: [
        '**/*.*',
        `!${project.res.templates.dir.replace(project.dir, '')}/**`,
        `!${project.res.css.sass.replace(project.dir, '')}/**`,
        ...helpers.dontCopy,
      ],
      dest: project.build.dir,
      expand: true
    }
  };

};
