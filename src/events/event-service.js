export default ngModule =>{
	ngModule.factory('EventService',EventService);
	function EventService($http,ApiService){
		let config = {
			'headers':{
				"Accept":"text/plain"
			}
		}
		return{
			getCategories: () => $http.get(ApiService.baseUrl + 'events/categories'),
			getEvents: () => $http.get(ApiService.baseUrl + 'events'),
			getCompanyTypes: () => $http.get(ApiService.baseUrl + 'events/company-types'),
			getForms: () => $http.get(ApiService.baseUrl + 'events/forms'),
			getVatPeriods: () => $http.get(ApiService.baseUrl + 'events/vat-periods'),
			getCompanySizes: () => $http.get(ApiService.baseUrl + 'events/company-sizes'),
			getEndsOfYear: () => $http.get(ApiService.baseUrl + 'events/ends-of-year'),
			getEventsByPeriod: (from,to) => $http.get(ApiService.baseUrl + 'events?from='+from+'&to='+to),
			getLatestYear: () => $http.get(ApiService.baseUrl + 'events/years', config)
		}
	}
}