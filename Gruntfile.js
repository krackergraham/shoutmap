// Gruntfile.js
module.exports = function (grunt) {

    grunt.initConfig({

        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['public/src/js/**/*.js']
        },

        // handle angular DI before uglify
        ngAnnotate: {
            build: {
                files: {
                    'public/dist/js/app.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
                }
            }
        },

        // take all the app.js file and minify it into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/dist/js/app.js']
                },
                options: {
                    sourceMap: true
                }
            }
        },

        // CSS TASKS ===============================================================
        // process the less file to style.css
        less: {
            build: {
                files: {
                    'public/dist/css/style.css': 'public/src/css/style.less'
                }
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/dist/css/style.css'
                }
            }
        },

        // WATCH TASKS =============================================================
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/src/css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['public/src/js/**/*.js'],
                tasks: ['jshint', 'ngAnnotate', 'uglify']
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'ngAnnotate', 'uglify', 'concurrent']);
};