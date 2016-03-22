export default ngModule =>{
	ngModule.factory('EventService',EventService);
	function EventService($http,ApiService){
		let baseUrl = ApiService.config().baseUrl;

		return{
			getCategories: () => $http.get(baseUrl + 'options/categories'),
			getEvents: () => $http.get(baseUrl + 'events'),
			getCompanyTypes: () => $http.get(baseUrl + 'options/company-types'),
			getForms: () => $http.get(baseUrl + 'options/forms'),
			getVatPeriods: () => $http.get(baseUrl + 'options/vat-periods'),
			getCompanySizes: () => $http.get(baseUrl + 'options/company-sizes'),
			getEndsOfYear: () => $http.get(baseUrl + 'options/ends-of-year'),
			getEventsByPeriod: (from,to) => $http.get(baseUrl + 'events?from='+from+'&to='+to),
			getCurrentYear: () => $http.get(baseUrl + 'years')
		}
	}
}
