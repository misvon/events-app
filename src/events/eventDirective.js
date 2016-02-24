export default ngModule =>{
	ngModule.directive('events',MyCustomer)
	function MyCustomer(){
		 return {
   		 template: require('./events.html'),
   		 controller:'EventCtrl'
  		};
	}	
}