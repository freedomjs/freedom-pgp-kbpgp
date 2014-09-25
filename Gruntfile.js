module.exports = function(grunt) {
  grunt.initConfig({
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
      all: ['Gruntfile.js', 'karma.conf.js', 'src/*.js'],
      options: {
        jshintrc: true
      }
    },

    uglify: {
      freedom_kbpgp: {
        files: {
          'freedom-kbpgp.min.js': ['src/freedom-kbpgp.js']
        }
      }
    },

    clean: ['freedom-kbpgp.min.js']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('default', ['build', 'karma:phantom']);
};
