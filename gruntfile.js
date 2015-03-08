//Gruntfile for the Resume Project

var TITLE							= "Biryujov Ilya – Front End Developer",	// Title
		LANGUAGE					= "ru",																		// Language
		BUILD_DIR					= "build",																// Project Build
		DEVELOPMENT_DIR		= "dev",																	// Project Development
		RESOURCES_DIR			= "res",																	// Resources (CSS, JavaScript, Fonts etc.)
		INDEX_PAGE				= "index.html",														// Index Page (Should Contain CRP CSS Styles)
		TEMPLATES_DIR			= "templates",														// Templates
		CSS_TEMPLATE			= "_head.html",														// Template Containing CSS Declarations
		CSS_DIR						= "css",																	// Production CSS
		SASS_DIR					= "sass-dev",															// Sass
		CSS_DEV_DIR				= "css-dev",															// Generated CSS
		CSS_FILENAME			= "styles",																// Production CSS Filename
		CSS_PRINT					= "print";																// Print CSS Filename

function fillAnArray(ARRAY, PATH) {
	var RESULT = [];
	for (var ELEMENT in ARRAY) {
		RESULT.push(PATH + ARRAY[ELEMENT]);
	}
	return RESULT;
}

module.exports = function(grunt) {

	var project = {
		init: function() {
			this.title = TITLE;
			this.index = INDEX_PAGE;
			this.language = LANGUAGE;
			this.dir = DEVELOPMENT_DIR + "/";
			var TEMPLATES_DIR_COMPILED = this.dir + TEMPLATES_DIR + "/",
					RESOURCES_DIR_COMPILED = this.dir + RESOURCES_DIR + "/";
			this.templates = {
				dir: TEMPLATES_DIR_COMPILED,
				css: TEMPLATES_DIR_COMPILED + CSS_TEMPLATE,
			};
			this.res = {
				dir: RESOURCES_DIR_COMPILED,
				css: {
					dir: RESOURCES_DIR_COMPILED + CSS_DIR + "/",
					devDir: RESOURCES_DIR_COMPILED + CSS_DEV_DIR + "/",
					sass: RESOURCES_DIR_COMPILED + SASS_DIR + "/",
					filename: CSS_FILENAME,
					print: CSS_PRINT
				}
			};
			this.build = {
				dir: BUILD_DIR + "/",
			};
			return this;
		}
	}.init();

	require("load-grunt-tasks")(grunt);

	grunt.initConfig({

		htmlhint: {
			options: {
				"htmlhintrc": ".htmlhintrc"
			},
			htmlHint: {
				cwd: project.build.dir,
				src: ["*.html"],
				expand: true
			}
		},
		csslint: {
			option: {
				"csslintrc": ".csslintrc"
			},
			cssLint: {
				cwd: project.res.css.devDir,
				src: ["*.css", "!*-IE.css"],
				expand: true
			}
		},
		csscss: {
			options: {
				verbose: true
			},
			csscssTest: {
				src: project.res.css.devDir + "*.css"
			}
		},
		colorguard: {
			files: {
				src: project.res.css.devDir + "*.css"
			}
		},

		analyzecss: {
			options: {
				outputMetrics: "error",
				softFail: true,
				thresholds: grunt.file.readJSON(".analyzecssrc")
			},
			ananlyzeCSS: {
				sources: [project.res.css.dir + project.res.css.filename + ".min.css"]
			}
		},

		sass: {
			options: {
				sourceMap: true,
				precision: 5
			},
			generateCSS: {
				cwd: project.res.css.sass,
				src: ["**/*.scss", "**/*.sass", "!**/_*.scss", "!**/_*.sass"],
				dest: project.res.css.devDir,
				ext: ".css",
				expand: true
			}
		},
		autoprefixer: {
			options: {
				map: true,
				browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Explorer >= 7"],
				cascade: false
			},
			prefixCSS: {
				cwd: project.res.css.devDir,
				src: ["**/*.css", "!**/*-IE.css"],
				dest: project.res.css.devDir,
				expand: true
			}
		},

		concat: {
			css: {
				src: "<%= TASK.CSS_ARRAY %>",
				dest: project.res.css.dir + project.res.css.filename + ".css"
			},
			print: {
				src: project.res.css.devDir + project.res.css.print + ".css",
				dest: project.res.css.dir + project.res.css.print + ".css"
			}
		},

		"string-replace": {
			cssComments: {
				options: {
					replacements: [{
						pattern: /\/\* line \d*, .* \*\/(\r?\n|\r)*/g,
						replacement: ""
					},{
						pattern: /\/\*# sourceMappingURL(.|\t|\s|\r?\n|\r)*?\*\//gi,
						replacement: ""
					},{
						pattern: /.media \-sass\-debug\-info(.|\t|\s|\r?\n|\r)*?\}\}/gi,
						replacement: ""
					},{
						pattern: /\/\*\*\* uncss>.*\*\*\*\/(\r?\n|\r)*/g,
						replacement: ""
					},{
						pattern: /\*\s(.)*\*\/(\r?\n|\r)*$/g,
						replacement: ""
					},{
						pattern: /\*\s(.)*\*\/(\r?\n\t*|\r\t*)*\//g,
						replacement: ""
					},{
						pattern: /(\r?\n|\r)*\/$/g,
						replacement: ""
					},{
						pattern: /\/\*(.)*(\r?\n|\r){4}/g,
						replacement: ""
					}]
				},
				files: {
					"./": [project.res.css.dir + "*.css"]
				}
			},
			build: {
				options: {
					replacements: [{
						pattern: /@tx-title/gi,
						replacement: project.title + " Project"
					},{
						pattern: /@tx-language/gi,
						replacement: project.language
					},{
						pattern: /@tx-revisionDateRu/gi,
						replacement: {
							getDateRu: function() {
								var TODAY = new Date(),
										DAY = TODAY.getDate(),
										MONTH = TODAY.getMonth() + 1,
										YEAR = TODAY.getFullYear();
								DAY = DAY < 10 ? "0" + DAY : DAY;
								MONTH = MONTH < 10 ? "0" + MONTH : DAY;
								return DAY + "." + MONTH + "." + YEAR;
							}
						}.getDateRu()
					},{
						pattern: /@tx-revisionDateEn/gi,
						replacement: {
							getDateEn: function() {
								var TODAY = new Date(),
										DAY = TODAY.getDate(),
										MONTH = TODAY.getMonth() + 1,
										YEAR = TODAY.getFullYear();
								DAY = DAY < 10 ? "0" + DAY : DAY;
								MONTH = MONTH < 10 ? "0" + MONTH : DAY;
								return MONTH + "/" + DAY + "/" + YEAR;
							}
						}.getDateEn()
					},{
						pattern: /.!-- @tx-css -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-css -->/gi,
						replacement: {
							checkIE: function() {
								var CSS_FILES,
										CSS_PATH = project.res.css.dir.replace(project.dir, "");
								if (grunt.file.exists(project.res.css.dir + project.res.css.filename + "-IE.css")) {
									CSS_FILES = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + ".min.css\">\n\t\t<!--[if lte IE 7]> <link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + "-IE.min.css\"> <![endif]-->";
								} else {
									CSS_FILES = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + ".min.css\">";
								}
								return CSS_FILES;
							}
						}.checkIE()
					}]
				},
				files: {
					"./": [project.build.dir + "*.html"]
				}
			},
			md: {
				options: {
					replacements:[{
						pattern: /<\/dt><dd>/gi,
						replacement: " "
					},{
						pattern: /<!DOCTYPE html>(.|\r?\n|\r)*<div class="headerContent">(\r?\n|\r)*/gi,
						replacement: ""
					},{
						pattern: /<footer(.|\r?\n|\r)*<\/html>/gi,
						replacement: ""
					},{
						pattern: /<span class="emplymentDate">/gi,
						replacement: "– "
					},{
						pattern: /<\/span>(.|\r?\n|\r)*<span class="resumeNote">/gi,
						replacement: " "
					},{
						pattern: /(\t)*<((?!>).)*>(\r?\n|\r)+/gi,
						replacement: "\n\n"
					},{
						pattern: /(\t)*<((?!>).)*>/gi,
						replacement: ""
					},{
						pattern: /(\n){3,}/gi,
						replacement: "\n\n"
					},{
						pattern: /(\n)*(\t)+$/gi,
						replacement: ""
					}]
				},
				files: {
					"./": [project.build.dir + "*.md"]
				}
			}
		},

		uncss: {
			cssOptimize: {
				options: {
					ignore: [/.*-is-.*/, /.*-has-.*/, /.*-are-.*/, /js-.*/],
					stylesheets: [project.res.css.dir.replace(project.dir, "") + project.res.css.filename + ".css"],
					timeout: 1000
				},
				files: {
					cssMinFiles: function() {
						var cssMinFilesObject = {};
						cssMinFilesObject[project.res.css.dir + project.res.css.filename + ".css"] = [project.dir + "*.html", "!" + project.dir + "*-emailTemplate.html"];
						return cssMinFilesObject;
					}
				}.cssMinFiles()
			}
		},
		csscomb: {
			options: {
				config: ".csscombrc"
			},
			cssSortBuild: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				expand: true
			},
			cssSortDev: {
				cwd: project.res.css.devDir,
				src: ["*.css"],
				dest: project.res.css.devDir,
				expand: true
			}
		},
		cssc: {
			options: grunt.file.readJSON(".csscrc"),
			cssOptimize: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				ext: ".min.css",
				expand: true
			}
		},
		cssmin: {
			cssMin: {
				cwd: project.res.css.dir,
				src: ["*.min.css"],
				dest: project.res.css.dir,
				expand: true
			}
		},

		processhtml: {
			options: {
				includeBase: project.templates.dir,
				commentMarker: "@tx-process",
				recursive: true
			},
			templates: {
				cwd: project.templates.dir,
				src: ["*.html", "!_*.html"],
				dest: project.dir,
				ext: ".html",
				expand: true
			}
		},
		htmlmin: {
			options: grunt.file.readJSON(".htmlminrc"),
			cleanup: {
				cwd: project.build.dir,
				src: ["*.html"],
				dest: project.build.dir,
				expand: true
			}
		},

		clean: {
			res: [project.res.css.dir],
			build: [project.build.dir],
			buildRes: [project.build.dir + project.res.dir.replace(project.dir, "")]
		},
		copy: {
			build: {
				cwd: project.dir,
				src: ["**/*.*", "!**/tx-*.*", "!**/templates/**", "!**/**-dev/**", "!**/tx/**"],
				dest: project.build.dir,
				expand: true
			}
		},

		wkhtmltopdf: {
			resumePDF: {
				src: [project.build.dir + "*.html", "!" + project.build.dir + "*-emailTemplate.html", "!" + project.build.dir + "*.mail.html"],
				dest: project.build.dir,
			}
		},
		html2md: {
			main: {
				options: {
					encoding: "utf8"
				},
				cwd: project.build.dir,
				src: ["*.html", "!*-emailTemplate.html", "!*.mail.html"],
				dest: project.build.dir,
				expand: true
			},
		},

		watch: {
			options: {
				spawn: false
			},
			htmlTemplates: {
				files: [project.templates.dir + "*.html"],
				tasks: ["processhtml"]
			},
			sass: {
				files: [project.res.css.sass + "**/*.scss", project.res.css.sass + "**/*.sass"],
				tasks: ["sass", "autoprefixer"]
			},
			livereloadWatch: {
				options: {
					livereload: true
				},
				files: [project.dir + "*.html", project.res.css.devDir + "**/*.css"]
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 3
			},
			projectWatch: ["watch:htmlTemplates", "watch:sass", "watch:livereloadWatch"]
		},
		wait: {
			options: {
				delay: "2500"
			},
			pdf: {}
		}

	});

	grunt.registerTask("process-css", "CSS processing", function() {
		var CSS_DIR_REGEX = new RegExp("<link(.)*href=\"" + project.res.css.devDir.replace(project.dir, ""), "g"),
				CSS_ALL = grunt.file.read(project.templates.css)
					.replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-css -->/, "")
					.replace(/<!-- \/@tx-css -->(.|\t|\s|\r?\n|\r)*/, "")
					.replace(/^\t(.)*print(.)*/gm, "")
					.replace(/\t/g, ""),
				CSS = CSS_ALL
					.replace(/<!--(.|\t|\s|\r?\n|\r)*/, "")
					.replace(CSS_DIR_REGEX, "")
					.replace(/\r?\n|\r/g, "")
					.replace(/">$/, ""),
				CSS_ARRAY = CSS.split("\">"),
				CSS_EXPECTED = CSS_ARRAY.length,
				CSS_ACTUAL = grunt.file.expand([project.res.css.devDir + "*.css", "!" + project.res.css.devDir + project.res.css.print + ".css", "!" + project.res.css.devDir + project.res.css.letter + ".css"]).length;
		if ((CSS_EXPECTED === CSS_ACTUAL || (CSS_ARRAY[0] === "" && CSS_ACTUAL === 0))) {
			if (CSS_ACTUAL === 0) {
				grunt.log.writeln("No .css-files to process.");
			} else {
				var PROCESS_TASKS = [];
				PROCESS_TASKS.push("concat:css");
				PROCESS_TASKS.push("concat:print");
				grunt.config.set("TASK.CSS_ARRAY", fillAnArray(CSS_ARRAY, project.res.css.devDir));
				PROCESS_TASKS = PROCESS_TASKS.concat(["uncss", "csscomb", "string-replace:cssComments", "cssc", "cssmin:cssMin"]);
				grunt.task.run(PROCESS_TASKS);
			}
		} else {
			var ERROR_MESSAGE = "";
			if (CSS_EXPECTED > CSS_ACTUAL) {
				ERROR_MESSAGE += "There's got to be more .css-files. ";
			} else if (CSS_EXPECTED < CSS_ACTUAL) {
				ERROR_MESSAGE += "Not all of the .css-files has been referenced. ";
			}
			grunt.fail.warn(ERROR_MESSAGE);
		}
	});

	grunt.registerTask("cssInline", "Injecting CSS", function() {
		var CSS_REGEX = new RegExp("<(.)*" + project.res.css.filename + ".min.css(.)*>", "g"),
				CSS = "<style type=\"text/css\">" + grunt.file.read(project.res.css.dir + project.res.css.filename + ".min.css") + grunt.file.read(project.res.css.dir + project.res.css.print + ".min.css") + "</style>",
				FILES = grunt.file.expand([project.build.dir + "*.html"]),
				FILES_LENGTH = FILES.length,
				FILE_INDEX = 0;
		for (FILE_INDEX; FILE_INDEX < FILES_LENGTH; FILE_INDEX++) {
			var PAGE = grunt.file.read(FILES[FILE_INDEX]).replace(CSS_REGEX, CSS);
			grunt.file.write(FILES[FILE_INDEX], PAGE);
		}
	});

	grunt.registerTask("quality", ["htmlhint", "csslint", "csscss", "colorguard"]);

	grunt.registerTask("performance", ["analyzecss"]);

	grunt.registerTask("generate-css", ["sass", "autoprefixer"]);

	grunt.registerTask("watch-project", ["concurrent"]);

	grunt.registerTask("compile", ["clean:res", "processhtml", "generate-css", "process-css"]);

	grunt.registerTask("build", ["compile", "clean:build", "copy:build", "string-replace:build", "htmlmin:cleanup", "wkhtmltopdf", "wait", "html2md", "string-replace:md", "cssInline", "clean:buildRes"]);

};
