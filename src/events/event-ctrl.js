import moment from 'moment';
import $ from 'jquery';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js';
import 'moment/locale/sv.js';

export default ngModule => {
    ngModule.controller('EventCtrl', EventCtrl);
    console.log(moment.locale());

    function EventCtrl(ApiService, EventService, $scope) {
        const vm = this;
        vm.employer = 'true';
        vm.vat = true;
        vm.euTrade = 'EU';
        $(function() {
            $('#fromDate').datepicker({
                format: 'yyyy-mm-dd'
            });
            $('#toDate').datepicker({
                format: 'yyyy-mm-dd'
            });
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

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        }

        vm.format = 'yyyy-MM-dd';
        vm.altInputFormats = ['M!/d!/yyyy'];

        vm.open1 = function() {
            vm.popup1.opened = true;
        };
        vm.open2 = function() {
            vm.popup2.opened = true;
        };

        vm.popup1 = {
            opened: false
        };
        vm.popup2 = {
            opened: false
        };

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

        let getCompanyTypes = () => {
            EventService.getCompanyTypes().then(result => {
                vm.companyForms = result.data;
                vm.companyForms.unshift('Alla');
                vm.selectedCompanyForm = vm.companyForms[0];
            });
        }
        getCompanyTypes()

        let getForms = () => {
            EventService.getForms().then(result => {
                vm.submissionForms = result.data;
                vm.submissionForms.unshift('Alla');
                vm.selectedSubmissionForm = vm.submissionForms[0];
            });
        }

        getForms()

        let getVatPeriods = () => {
            EventService.getVatPeriods().then(result => {
                vm.vatPeriods = result.data;
                vm.vatPeriods.unshift('Alla');
                vm.selectedVatPeriod = vm.vatPeriods[0];
            });
        }

        getVatPeriods();

        let getCompanySizes = () => {
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
                        label: label
                    });
                });
                vm.companySizes.unshift({
                    id: null,
                    label: 'Alla'
                });
                vm.selectedCompanySizes = vm.companySizes[0];
            });
        }

        getCompanySizes();

        let getEndsOfYear = () => {
            EventService.getEndsOfYear().then(result => {
                vm.endsOfYear = result.data;
                vm.endsOfYear.unshift('Alla');
                vm.selectedEndOfYear = vm.endsOfYear[0];
            });
        }

        getEndsOfYear();

        let getTradeAreas = () => {
            EventService.getTradeAreas().then(result => {
                vm.tradeAreas = result.data;
                vm.tradeAreas.unshift('Alla');
                vm.selectedTradeArea = vm.tradeAreas[0];
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
