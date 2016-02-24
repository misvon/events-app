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
	   	console.log(config)
	       // same as above
	       return config;
	    },  
	    'requestError': function(rejection) {
	      // do something on error
	      return $q.reject(rejection);
	    },
	    'response': function(response) {
	    	console.log(response)
	       // same as above
	       return response;
	    },
	    'responseError': function(rejection) {
      // do something on error
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
