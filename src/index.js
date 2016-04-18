import angular from 'angular';
import events from './events';
import config from './config';
import eventTest from './events/event-test.js';
if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

const EventApp = angular.module('EventsApp',[]).config(function($httpProvider){
	$httpProvider.interceptors.push(function($q) {
	  return {
	   'request': function(config) {
	       return config;
	    },
	    'requestError': function(rejection) {
	      return $q.reject(rejection);
	    },
	    'response': function(response) {
	       return response;
	    },
	    'responseError': function(rejection) {
	      return $q.reject(rejection);
	    }
	  };
	});
}).run(function($http) {
  $http.defaults.headers.common.Accept = 'application/json';
});

events(EventApp)
config(EventApp)
if(ON_TEST){
    eventTest(EventApp);
}
