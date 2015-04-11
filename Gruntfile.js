module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            options: {
                yuicompress: true
            },
            development: {
                files: {
                    "public/css/style.css": "public/less/style.less"
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            css: {
                src: 'public/css/style.css',
                dest: 'public/css/style.css'
            }
        },
        watch: {
            less:{
                files: ['public/less/*.less'],
                tasks: ['less']
            },
            options: {
                spawn: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less','cssmin']);

};
