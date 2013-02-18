module.exports = function(grunt) {

    var SRC_CSS   = '_src/css';
    var SRC_JS    = '_src/js';
    var BUILD_CSS = '_build/css';
    var BUILD_JS  = '_build/js';
    var DIST_CSS = 'assets/css';
    var DIST_JS  = 'assets/js';

    grunt.initConfig({
        lint: {
            all: [
                'grunt.js'
            ]
        },
        less: {
            dist: {
                options: {
                    paths: [SRC_CSS + '/less'],
                    yuicompress: true
                },
                files: {
                    '_build/css/style.css': SRC_CSS + '/less/style.less'
                }
            }
        },
        concat: {
            css: {
                src: [
                    BUILD_CSS + '/style.css'
                ],
                dest: BUILD_CSS + '/style-all.css'
            },
            js: {
                src: [
                    SRC_JS + '/libs/bootstrap/*.js',
                    SRC_JS + '/plugins.js',
                    SRC_JS + '/script.js'
                ],
                dest: BUILD_JS + '/scripts-all.js'
            }
        },
        cssmin: {
            js: {
                src: '<config:concat.css.dest>',
                dest: DIST_CSS + '/style.css'
            }
        },
        min: {
            js: {
                src: '<config:concat.js.dest>',
                dest: DIST_JS + '/scripts.js'
            }
        },
        watch: {
            files: [SRC_CSS + '/less/style.less', '<config:concat.js.src>'],
            tasks: ['default']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true,
                strict: false
            },
            globals: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-css');

    grunt.registerTask('default', 'lint less concat cssmin min');
};
