import 'bootstrap/dist/css/bootstrap.css';
import angular from 'angular';
import events from './events';
import config from './config';
import eventTest from './events/event-test.js';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
require('angular-i18n/angular-locale_sv-se.js');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

const EventApp = angular.module('EventsApp',[datepicker]).config(function($httpProvider){
	$httpProvider.interceptors.push(function($q) {
	  return {
	   'request': function(config) {
	       // same as above
	       return config;
	    },
	    'requestError': function(rejection) {
	      // do something on error
	      return $q.reject(rejection);
	    },
	    'response': function(response) {
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
}).constant('uibDatepickerPopupConfig', {
        datepickerPopup: 'yyyy-MM-dd',

        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        currentText: 'Idag',
        clearText: 'Töm',
        closeText: 'Klar',
        closeOnDateSelection: true,
        appendToBody: false,
        showButtonBar: true,
        onOpenFocus: true,
        placement: 'auto bottom-left'
    });

events(EventApp)
config(EventApp)
if(ON_TEST){
    eventTest(EventApp);
}
