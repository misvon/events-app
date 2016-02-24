import apiConfig from './config.json';
export default ngModule =>{
	ngModule.service('ApiService',ApiService);
	function ApiService(){
	if(ON_DEVELOPMENT){
		return apiConfig.dev;
	}
   }
}