export default ngModule =>{
	ngModule.controller('EventCtrl', EventCtrl);
	 function EventCtrl(ApiService,EventService,$scope){
	 	const vm = this;
	 	let getCategories = () =>{
	 		EventService.getCategories().then( result => console.log(result.data))
	 	}
	 	  $scope.password = '';
	  let grade = function() {
	    var size = $scope.password.length;
	    if (size > 8) {
	      $scope.strength = 'strongs';
	    } else if (size > 3) {
	      $scope.strength = 'medium';
	    } else {
	      $scope.strength = 'weak';
	    }
	  };
	 	//getCategories()

	 	let getEvents = () => {
	 	EventService.getEvents().then(result => console.log(result.data))
	 	}

	 	//getEvents()

	 	let getCompanyTypes = () =>{
	 		EventService.getCompanyTypes().then(result => console.log(result.data))
	 	}
	 	//getCompanyTypes()

	 	let getForms = () =>{
	 		EventService.getForms().then(result => console.log(result.data))
	 	}
	 	//getForms() 
	 	let getVatPeriods = () =>{
	 		EventService.getVatPeriods().then(result => console.log(result.data))
	 	}
	 	
	 	//getVatPeriods();
	 	
	 	let getCompanySizes = () =>{
	 		EventService.getCompanySizes().then(result => console.log(result.data))
	 	}
	 	
	 	//getCompanySizes();
	 	
	 	let getEndsOfYear = () =>{
	 		EventService.getEndsOfYear().then(result => console.log(result.data))
	 	}
	 	
	 	//getEndsOfYear();
	 	let getEventsByPeriod = (from,to) =>{
	 		EventService.getEventsByPeriod(from,to).then(result => console.log(result.data))
	 	}
	 	
	 	//getEventsByPeriod('2016-01-01','2016-12-31');
	 	let getLatestYear = () =>{
	 		EventService.getLatestYear().then(result => console.log(result.data))
	 	}
	 //	getLatestYear();
	 }
}