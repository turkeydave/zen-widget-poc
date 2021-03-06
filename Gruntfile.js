module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        html2js: {
            dist: {
                src: [ 'app/layout/*.html', 'app/legacyIframe/*.html', 'app/login/*.html', 'app/setup/*.html' ],
                dest: 'app/tmp/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'client-libs/angular/angular.js',
                    'client-libs/ui-router/release/angular-ui-router.js',
                    'app/*.js',
                    '!app/dist/*.js',
                    'app/**/*.js',

                     ],
                dest: 'app/dist/app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'app/dist/app.js': [ 'app/dist/app.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },
        clean: {
            temp: {
                src: [ 'app/tmp', 'app/dist' ]
            }
        },
        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
                tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
                tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        },
//        watch: {
//            less: {
//                files: ['assets/stylesheets/**/*.less'], // recursive globbing
//                tasks: ['less'],
//                options: {
//                    spawn: false,
//                    atBegin: true
//                }
//            }
//        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    base: {
                        path: '.'
                    }
                }
            }
        },
        targethtml: {
            dist: {
                options: {
                    curlyTags: {
                        rlsdate: '<%= grunt.template.today("yyyymmdd") %>'
                    }
                },
                files: {
                    'app/index_dist.html': 'app/index.html'
                }
            }
        }
//        less: {
//          default: {
//            files: {
//              'style.css': 'assets/stylesheets/default.less',
//            }
//          },
//
//          lightTeal: {
//            files: {
//              'light-teal.css': 'assets/stylesheets/light-teal.less',
//            }
//          }
//        }
//        compress: {
//            dist: {
//                options: {
//                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
//                },
//                files: [{
//                    src: [ 'index.html' ],
//                    dest: '/'
//                }, {
//                    src: [ 'dist/**' ],
//                    dest: 'dist/'
//                }, {
//                    src: [ 'assets/**' ],
//                    dest: 'assets/'
//                }, {
//                    src: [ 'libs/**' ],
//                    dest: 'libs/'
//                }]
//            }
//        }
    });

    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-html2js');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-bower-task');
    //grunt.loadNpmTasks('grunt-karma');
    //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-targethtml');


    //var connect = require('connect');
    grunt.registerTask('start-server', ['connect:server']);
//    grunt.registerTask('start-server', 'Start a custom static web server.', function() {
//        grunt.log.writeln('Starting static web server in "/" on port 9001.');
//        connect(connect.static('.')).listen(9001);
//    });
    //grunt.registerTask('default', ['less']);
    //grunt.registerTask('testMe', ['jshint']);
//    grunt.registerTask('testBower', ['bower']);
//    grunt.registerTask('testMe', ['clean', 'html2js:dist', 'concat:dist', 'targethtml:dist']); //, 'uglify:dist']);
//
//    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
//    grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
//    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
//    grunt.registerTask('package', [ 'bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
//        'clean:temp', 'compress:dist' ]);

};
