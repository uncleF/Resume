module.exports = (grunt, options) => {

  var project = options.project;

  return {
    resumePDF: {
      src: [`${project.build.dir}/*.html`, `!${project.build.dir}/*-emailTemplate.html`, `!${project.build.dir}/*.mail.html`],
      dest: project.build.dir,
      args: [
        '--margin-bottom', project.pdf.margin[2],
        '--margin-left', project.pdf.margin[3],
        '--margin-right', project.pdf.margin[1],
        '--margin-top', project.pdf.margin[0],
        '--page-width', project.pdf.width,
        '--page-height', project.pdf.height,
        '--disable-smart-shrinking'
      ]
    }
  };

};
