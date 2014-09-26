module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/kbpgp.js': ['./node_modules/kbpgp/lib/main.js']
        },
        options: {
          'browserifyOptions': {
            'standalone': 'kbpgp'
          }
        }
      }
    },

    copy: {
      dist: {
        src: ['src/*'],
        dest: 'build/',
        flatten: true,
        filter: 'isFile',
        expand: true
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      single: {
        singleRun: true,
        autoWatch: false
      },
      watch: {
        singleRun: false,
        autoWatch: true,
        reporters: ['progress', 'story'],
        preprocessors: {},
        coverageReporter: {}
      },
      phantom: {
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false
      }
    },

    jshint: {
      all: ['src/*.js'],
      options: {
        jshintrc: true
      }
    },

    clean: ['build/']
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    'jshint',
    'browserify',
    'copy'
  ]);

  grunt.registerTask('default', ['build', 'karma:phantom']);
};