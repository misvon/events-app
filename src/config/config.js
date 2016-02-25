import apiConfig from './config.json';
export default ngModule =>{
	ngModule.service('ApiService',ApiService);
	function ApiService(){
	return{
		config: () =>{
			if(ON_DEVELOPMENT){
			return apiConfig.dev;
			}
			if(ON_TEST){
			return apiConfig.dev;
			}
		}
		}
   }
}