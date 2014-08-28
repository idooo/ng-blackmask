module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        uglify: {
            app: {
                files: {
                    'dist/blackmask.js': ['src/blackmask.js']
                }
            }
        },
        jshint: {
            options: {
                force: false,
                curly: false,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    angular: true
                }
            },
            files: {
                src: ['src/*.js']
            }
        }
    });

    grunt.registerTask('build', [
        'jshint',
        'uglify:app'
    ])

};