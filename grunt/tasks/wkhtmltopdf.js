module.exports = (grunt, options) => {

  var project = options.project;

  return {
    resumeEnPDF: {
      src: [`${project.build.dir}/*En-pdf.html`, `!${project.build.dir}/*-emailTemplate.html`, `!${project.build.dir}/*.mail.html`],
      dest: `${project.build.dir}/${project.name.toLowerCase()}En.pdf`,
      args: [
        '--margin-bottom', project.pdf.margin[2],
        '--margin-left', project.pdf.margin[3],
        '--margin-right', project.pdf.margin[1],
        '--margin-top', project.pdf.margin[0],
        '--page-width', project.pdf.width,
        '--page-height', project.pdf.height,
        '--disable-smart-shrinking',
        '--header-html', `${project.build.dir}/resumeEn-pdf-header.html`,
        '--header-spacing', project.pdf.margin[4]
      ]
    },
    resumeRuPDF: {
      src: [`${project.build.dir}/*Ru-pdf.html`, `!${project.build.dir}/*-emailTemplate.html`, `!${project.build.dir}/*.mail.html`],
      dest: `${project.build.dir}/${project.name.toLowerCase()}Ru.pdf`,
      args: [
        '--margin-bottom', project.pdf.margin[2],
        '--margin-left', project.pdf.margin[3],
        '--margin-right', project.pdf.margin[1],
        '--margin-top', project.pdf.margin[0],
        '--page-width', project.pdf.width,
        '--page-height', project.pdf.height,
        '--disable-smart-shrinking',
        '--header-html', `${project.build.dir}/resumeRu-pdf-header.html`,
        '--header-spacing', project.pdf.margin[4],
      ]
    }
  };

};
