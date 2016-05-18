import moment from 'moment';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js';
import 'moment/locale/sv.js';
import $ from 'jquery';
export default ngModule => {
    ngModule.controller('EventCtrl', EventCtrl);

    function EventCtrl(ApiService, EventService, $scope, $window) {
        const vm = this;
        vm.employer = JSON.parse($window.sessionStorage.getItem('employer')) || true;
        vm.vat = JSON.parse($window.sessionStorage.getItem('vat')) || true;;
        if(JSON.parse($window.sessionStorage.getItem('vat')) == true){
            vm.vat = true;
        }else{
            vm.vat = false;
        }  
         if(JSON.parse($window.sessionStorage.getItem('employer')) == true){
            vm.employer = true;
        }else{
            vm.employer = false;
        }
        vm.euTrade = 'EU';
        $.fn.datepicker.dates['en'] = {
            days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
            months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            today: "Idag",
            clear: "Rensa",
            format: "yyyy-mm-dd",
            titleFormat: "MM yyyy",
            /* Leverages same syntax as 'format' */
            weekStart: 1
        };

        $('#fromDate').datepicker({
            days: ["S", "d", "f", "wf", "we", "wre", "we"],
            daysMin: ["sfgs", "srfg", "fg", "afd", "Tdf", "sdf", "sf"],
            format: 'yyyy-mm-dd'
        });
        $('#toDate').datepicker({
            language: "sv",
            format: 'yyyy-mm-dd'
        });
        let months = {
            "0": "Januari",
            "1": "Februari",
            "2": "Mars",
            "3": "April",
            "4": "Maj",
            "5": "Juni",
            "6": "Juli",
            "7": "Augusti",
            "8": "September",
            "9": "Oktober",
            "10": "November",
            "11": "December"
        };
        let companyFormChanged = false;
        let endsOfYearChanged = false;
        let selectedSubmissionFormChanged = false;

        let getCategories = () => {
            EventService.getCategories().then();
        }

        getCategories();

        function getDefaultDates() {
            EventService.getDefaultDates().then(result => {
                vm.toDate = moment(new Date(result.data.defaultTo)).format('L');
                vm.fromDate = moment(new Date(result.data.defaultFrom)).format('L');
                vm.minDate = new Date(result.data.min);
                vm.maxDate = new Date(result.data.max);
            })
        }

        getDefaultDates();

        vm.passedEvents = (date) => {
            var today = moment(new Date()).format('L');
            if (date < today) {
                return 'passedEvents';
            }
        }

        let getCompanyTypes = () => {
            EventService.getCompanyTypes().then(result => {
                vm.companyForms = result.data;
                var index = vm.companyForms.indexOf(JSON.parse($window.sessionStorage.getItem('companyform'))) || 0;
                vm.companyForms.unshift('Alla');
                vm.selectedCompanyForm = vm.companyForms[index + 1];
            });
        }
        getCompanyTypes()

        let getForms = () => {
            EventService.getForms().then(result => {
                vm.submissionForms = result.data;
                var index = vm.submissionForms.indexOf(JSON.parse($window.sessionStorage.getItem('submissionform'))) || 0;
                vm.submissionForms.unshift('Alla');
                vm.selectedSubmissionForm = vm.submissionForms[index + 1];
            });
        }

        getForms()

        let getVatPeriods = () => {
            EventService.getVatPeriods().then(result => {
                vm.vatPeriods = result.data;
                var index = vm.vatPeriods.indexOf(JSON.parse($window.sessionStorage.getItem('selectedVatPeriod'))) || 0
                vm.vatPeriods.unshift('Alla');
                vm.selectedVatPeriod = vm.vatPeriods[index + 1];
            });
        }

        getVatPeriods();

        let getCompanySizes = () => {
             var index = 0;
            EventService.getCompanySizes().then(result => {
                vm.companySizes = [];
                result.data.forEach(size => {
                    let label = "";
                    if (size.max !== null) {
                        label = "mellan " + size.min / 1000000 + " och " + size.max / 1000000 + " miljoner kronor";
                    } else {
                        label = "över " + size.min / 1000000 + " miljoner kronor";
                    }
                    vm.companySizes.push({
                        id: size.id,
                        label: label,
                        index:index++
                    });
                });
                vm.companySizes.unshift({
                    id: null,
                    label: 'Alla'
                });
                var companySize =  JSON.parse($window.sessionStorage.getItem('selectedCompanySizes')) || 0;
                if(companySize.id == null){
                    companySize.index = 0;
                }else{
                    companySize.index = companySize.index + 1;
                }
                vm.selectedCompanySizes = vm.companySizes[companySize.index];
            });
        }

        getCompanySizes();

        let getEndsOfYear = () => {
            EventService.getEndsOfYear().then(result => {
                vm.endsOfYear = result.data;
                var index = vm.endsOfYear.indexOf(JSON.parse($window.sessionStorage.getItem('endofyear'))) || 0;
                vm.endsOfYear.unshift('Alla');
                vm.selectedEndOfYear = vm.endsOfYear[index + 1];
            });
        }

        getEndsOfYear();

        let getTradeAreas = () => {
            EventService.getTradeAreas().then(result => {
                vm.tradeAreas = result.data;
                var index = vm.tradeAreas.indexOf(JSON.parse($window.sessionStorage.getItem('selectedTradeArea'))) || 0;
                vm.tradeAreas.unshift('Alla');
                vm.selectedTradeArea = vm.tradeAreas[index + 1];
            })
        }

        getTradeAreas();

        vm.fetchEvents = () => {
            vm.monthsWithEvents = {};
            var params = getUrlParams();
            EventService.getEventsByParams(params).then(result => {
                result.data.forEach(event => {
                    let monthStr = "" + new Date(event.date).getMonth();
                    if (vm.monthsWithEvents[monthStr] == undefined) {
                        vm.monthsWithEvents[monthStr] = {
                            key: months[monthStr],
                            value: []
                        };
                    }
                    vm.monthsWithEvents[monthStr].value.push(event);
                })
            })
        }
        vm.choiseStore = (type, choise) => {
            $window.sessionStorage.setItem(type, JSON.stringify(choise));
        }


        function getUrlParams() {
            var result = "";
            if (vm.fromDate !== null) {
                vm.fromDate = new Date(vm.fromDate);
                result += "from=" + vm.fromDate.toISOString() + "&";
                vm.fromDate = moment(new Date(vm.fromDate)).format('L');
            }
            if (vm.toDate !== null) {
                vm.toDate = new Date(vm.toDate);
                result += "to=" + vm.toDate.toISOString() + "&";
                vm.toDate = moment(new Date(vm.toDate)).format('L');
            }
            if (vm.selectedCompanyForm !== null && vm.selectedCompanyForm !== 'Alla') {
                result += "companyType=" + vm.selectedCompanyForm + "&";
            }
            if (vm.selectedSubmissionForm !== null && vm.selectedSubmissionForm !== 'Alla') {
                result += "form=" + vm.selectedSubmissionForm + "&";
            }
            if (vm.selectedEndOfYear !== null && vm.selectedEndOfYear !== 'Alla') {
                result += "endOfYear=" + vm.selectedEndOfYear + "&";
            }
            result += "employer=" + vm.employer + "&";

            result += "vatRegistered=" + vm.vat + "&";
            if (vm.vat) {
                if (vm.selectedCompanySizes !== null && vm.selectedCompanySizes !== 'Alla') {
                    result += "companySize=" + vm.selectedCompanySizes.id + "&";
                }
                if (vm.selectedVatPeriod !== null && vm.selectedVatPeriod !== 'Alla') {
                    result += "vatPeriod=" + vm.selectedVatPeriod + "&";
                }
                if (vm.selectedTradeArea !== null && vm.selectedTradeArea !== 'Alla') {
                    result += "tradeArea=" + vm.selectedTradeArea;
                }
            }
            return result;
        }
    }
}
