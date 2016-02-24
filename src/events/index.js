import EventDirective from './eventDirective.js';
import eventCtrl from './event-ctrl.js';
import eventService from './event-service.js';
export default (ngModule) =>{
 EventDirective(ngModule);
 eventCtrl(ngModule);
 eventService(ngModule);
}