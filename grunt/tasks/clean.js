module.exports = (grunt, options) => {

  var project = options.project;

  return {
    res: [project.res.css.dir],
    reports: [`*.css`],
    build: [project.build.dir],
    buildRes: [`${project.build.dir}${project.res.dir.replace(project.dir, '')}`],
    pdf: [`${project.build.dir}*-pdf*.html`]
  };

};
