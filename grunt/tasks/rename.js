module.exports = (grunt, options) => {

  var project = options.project;

  return {
    pdfEn: {
      src: [`${project.build.dir}/resumeEn-pdf.pdf`],
      dest: [`${project.build.dir}/resumeEn.pdf`],
    },
    pdfRu: {
      src: [`${project.build.dir}/resumeRu-pdf.pdf`],
      dest: [`${project.build.dir}/resumeRu.pdf`],
    }
  };

};
