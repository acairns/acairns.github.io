module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            options: {
                yuicompress: true
            },
            development: {
                files: {
                    "assets/css/all.min.css": "assets/css/style.less"
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'assets/js/script.js'
                ],
                dest: 'assets/js/all.min.js'
            }
        },
        watch: {
            js:{
                files: ['<%= concat.js.src %>'],
                tasks: ['concat:js']
            },
            css:{
                files: ['assets/css/*.less'],
                tasks: ['less']
            }
        },
        uglify: {
            js: {
                src: 'assets/js/all.min.js',
                dest: 'assets/js/all.min.js'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            css: {
                src: 'assets/css/style.min.css',
                dest: 'assets/css/style.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['less','concat','uglify','cssmin']);

};
