module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    res: [project.res.css.dir],
    reports: [`*.css`],
    build: [project.build.dir],
    buildRes: [`${project.build.dir}${project.res.dir.replace(project.dir, "")}`]
  };

};
