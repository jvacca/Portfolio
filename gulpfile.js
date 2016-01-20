'use strict';

var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  fs = require('fs'),
  argv = require('yargs').argv,
  tasks = fs.readdirSync('./gulp/');

require('./gulp/config');

// --release flag when executing a task
global.release = argv.release;

tasks.forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('build', ['clean'], function() {
	if (release) {
    runSequence(
      ['index', 'sass', 'images', 'assets'],
      'angularize'
    );
	} else {
    runSequence(
      ['index', 'sass', 'images'],
      'angularize'
    );
	}
});

gulp.task('watchtasks', function() {
  runSequence(
    'watchapp',
    'watch'
  );
});
  
gulp.task('test_app', function() {
  gulp.start('test', 'lint');
});


gulp.task('default', function() {
  runSequence(
    'build',
    'watchtasks',
    'serve'
  );
});