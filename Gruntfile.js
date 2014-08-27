module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        uglify: {
            app: {
                files: {
                    'dist/blackmask.js': ['src/blackmask.js']
                }
            }
        }
    });

    grunt.registerTask('build', [
        'uglify:app'
    ])

};