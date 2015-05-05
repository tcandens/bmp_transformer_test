'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        task: ['jshint:gruntfile']
      },
      dev: {
        files: ['lib/**/*.js'],
        task: ['jshint:dev']
      },
      all: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['jshint:all', 'mochaTest'],
        // options: {
        //   spawn: false
        // }
      },
      test: {
        src: ['test/**/*.js'],
        task: ['jshint:test', 'mochaTest']
      }
    },
    jshint: {
      gruntfile: {
        src: ['Gruntfile.js']
      },
      dev: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
      all: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochaTest: {
      options: {
        quite: false
      },
      files: ['test/**/*.js']
    }
  });

  grunt.registerTask('hint', ['jshint:all']);
  grunt.registerTask('test', ['hint', 'mochaTest']);
  grunt.registerTask('default', ['jshint:all', 'mochaTest', 'watch:all']);

  grunt.event.on('watch', function( action, filepath ) {
    grunt.config('jshint.all.src', filepath);
  });
};
