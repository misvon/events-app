export default ngModule =>{
	ngModule.factory('EventService',EventService);
	function EventService($http,ApiService){
		let baseUrl = ApiService.config().baseUrl;
		let config = {
			'headers':{
				"Accept":"text/plain"
			}
		}
		return{
			getCategories: () => $http.get(baseUrl + 'events/categories'),
			getEvents: () => $http.get(baseUrl + 'events'),
			getCompanyTypes: () => $http.get(baseUrl + 'events/company-types'),
			getForms: () => $http.get(baseUrl + 'events/forms'),
			getVatPeriods: () => $http.get(baseUrl + 'events/vat-periods'),
			getCompanySizes: () => $http.get(baseUrl + 'events/company-sizes'),
			getEndsOfYear: () => $http.get(baseUrl + 'events/ends-of-year'),
			getEventsByPeriod: (from,to) => $http.get(baseUrl + 'events?from='+from+'&to='+to),
			getCurrentYear: () => $http.get(baseUrl + 'events/years', config)
		}
	}
}