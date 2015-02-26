/*
	Grunt installation:
	-------------------
	npm install -g grunt-cli

	Dependency Install:
	-------------------
	npm install (from project root folder)

	List of tasks:
	--------------
	grunt (browser sync + watch)
	grunt dev (browser sync + watch)
	grunt prod (copy file, compile html, compile + concat sass, prefix css, concat js, show todos, minify imgs + svg)

	--------------------
	©2015 - Guillaume B.
*/

module.exports = function(grunt) {
	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//copy vendor files
		copy: {
			main: {
				files: [{
					expand: true,
					src: ['assets/js/vendor/*/dist/**/*.js',
					'assets/js/vendor/*/dist/**/*.css',
					'assets/js/vendor/*/dist/**/*.map',
					'assets/js/vendor/*/assets/**/*.js'
					],
					dest: 'build/'
				},{
					expand: true,
					src: ['assets/js/vendor/*/assets/**/*.ttf',
					'assets/js/vendor/*/assets/**/*.eot',
					'assets/js/vendor/*/assets/**/*.svg',
					'assets/js/vendor/*/assets/**/*.woff',
					'assets/js/vendor/*/assets/**/*.woff2'
					],
					flatten: true,
					dest: 'build/assets/fonts/bootstrap/'
				}]
			},
		},

		// Include .html part files
		includes: {
			html: {
				src: ['*.html'],
				dest: 'build',
				options: {
					includePath: '_includes',
					includeRegexp: /^<!--\s?@include\s+['"]?([^'"\s]+)['"]?\s?-->$/,
					flatten: true,
					filenameSuffix: '.html'
				}
			}
		},

		//Wiredep of bower
		wiredep: {
			task: {
				src: [
				'*.html',
				'assets/scss/main.scss'
				],
				options: {}
			}
		},

		// Clean html
		htmlmin: {
			dist:{
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: 'build/',
					src: '**/*.html',
					dest: 'build/'
				}]
			}
		},

		// Compile Sass
		sass: {
			dev: {
				options: {
					style: 'nested',
					sourcemap: 'auto'
				},
				files: {
					'build/assets/css/main.css': 'assets/scss/main.scss'
				}
			},
			prod: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: {
					'build/assets/css/main.css': 'assets/scss/main.scss'
				}
			}
		},

		// Minify all js
		uglify: {
			options: {
				banner: '/*!\n* <%= pkg.title %>\n* <%= pkg.description %>\n* <%= pkg.url.public %>\n* @author <%= pkg.author.name %>.\n* @version <%= pkg.version %>\n* Copyright <%= grunt.template.today("yyyy") %>. <%= pkg.license.type %> licensed.\n*/'
			},
			dist: {
				files: {
					'build/assets/js/main.js' : 'assets/js/main.js'
				}
			}
		},

		// Todos and Fixme
		todo: {
			options:{
				marks: [{
					name: "FIXME",
					pattern: /@FIXME/,
					color: "red"
				},{
					name: "TODO",
					pattern: /@TODO/,
					color: "yellow"
				},{
					name: "NOTE",
					pattern: /@NOTE/,
					color: "green"
				}]
			},
			dist: {
				src: [
				'*.html',
				'_includes/*.html',
				'assets/scss/**/*.scss',
				'assets/js/**/*.js'
				]
			}
		},

		// Minify all images (except svg)
		imagemin: {
			dynamic: {
				files: [{
						expand: true,
						cwd: 'assets/img/',
						src: ['**/*.{png,jpg,gif}'],
						dest: 'build/assets/img/'
				}]
			}
		},

		// Minify svg
		svgmin: {
			dynamic: {
				files: [{
						expand: true,
						cwd: 'assets/img/',
						src: ['**/*.svg'],
						dest: 'build/assets/img/'
				}]
			}
		},

		// Watch all js and Sass and compile them
		watch: {
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['copy','uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['*.html','_includes/*.html'],
				tasks: ['includes'],
				options: {
					spawn: false
				}
			}
		},

		//Browser Sync serv
		browserSync: {
			bsFiles: {
				src: ['build/assets/css/*.css','build/assets/js/*.js','build/*.html']
			},
			options: {
				proxy: '<%= pkg.url.local %>',
				host: '<%= pkg.url.local %>',
				open: "external",
				port: 8080,
				watchTask: true
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-todo');
	grunt.loadNpmTasks('grunt-wiredep');

	// Tasks
	grunt.registerTask( 'default', [ 'browserSync','watch' ] ); // Default
	grunt.registerTask( 'dev', [ 'browserSync','watch' ] ); // Development
	grunt.registerTask( 'prod', [ 'copy','includes','wiredep','htmlmin','sass:prod','uglify','todo','imagemin','svgmin' ] ); // Production
};