export default ngModule =>{
	ngModule.factory('EventService',EventService);
	function EventService($http,ApiService){
		let baseUrl = ApiService.config().baseUrl;

		return{
			getCategories: () => $http.get(baseUrl + 'criterias/categories'),
			getEvents: () => $http.get(baseUrl + 'events'),
			getCompanyTypes: () => $http.get(baseUrl + 'criterias/company-types'),
			getForms: () => $http.get(baseUrl + 'criterias/forms'),
			getVatPeriods: () => $http.get(baseUrl + 'criterias/vat-periods'),
			getCompanySizes: () => $http.get(baseUrl + 'criterias/company-sizes'),
			getEndsOfYear: () => $http.get(baseUrl + 'criterias/ends-of-year'),
			getTradeAreas: () => $http.get(baseUrl + 'criterias/trade-areas'),
			getEventsByParams: (urlParams) => $http.get(baseUrl + 'events?'+urlParams),
			getDefaultDates: () => $http.get(baseUrl + 'criterias/dates'),
			getCurrentYear: () => $http.get(baseUrl + 'years')
		}
	}
}
