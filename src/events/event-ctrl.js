export default ngModule => {
    ngModule.controller('EventCtrl', EventCtrl);

    function EventCtrl(ApiService, EventService, $scope) {
        const vm = this;
        vm.employer = 'true';
        vm.vat = 'true';
        vm.euTrade = 'true';
        let getCategories = () => {
            EventService.getCategories().then();
        }

        getCategories()

        function getLastDayOfMonth(date) {
            var month = date.getMonth();
            var d = new Date(date.getYear(), month + 1, 0);
            return new Date(d);
        }
        let getEvents = () => {
            EventService.getEvents().then(result => {
                vm.events = result.data;
            });
        }

        getEvents()

        let getCompanyTypes = () => {
            EventService.getCompanyTypes().then(result => {
                vm.companyForms = result.data;
                vm.companyForms.unshift('Alla');
                vm.companyForm = vm.companyForms[0];
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
                vm.vatPeriods.unshift('Helår');
                vm.selectedVatPeriod = vm.vatPeriods[0];
            });
        }

        getVatPeriods();

        let getCompanySizes = () => {
            EventService.getCompanySizes().then(result => {
                vm.companySizes = result.data;
                vm.companySizes.unshift('Alla');
                vm.selectedCompanySizes = vm.companySizes[0];

            });
        }

        getCompanySizes();
        vm.monthsWithEvents = [];
        let getEndsOfYear = () => {
            EventService.getEndsOfYear().then(result => {
                vm.endsOfYears = result.data;
                vm.endsOfYears.forEach(month => {
                    var obj = {};
                    obj.key = month;
                    obj.value = [];
                    vm.monthsWithEvents.push(obj)
                });
                vm.endsOfYears.unshift('Alla');
                vm.endsOfYear = vm.endsOfYears[0];
            });
        }

        getEndsOfYear();

        let getEventsByPeriod = (from, to) => {
            EventService.getEventsByPeriod(from, to).then(result => {
                vm.allEvenets = result.data;
                vm.allEvenets.forEach(event => {
                    for (var i = 0; i < vm.monthsWithEvents.length; i++) {
                        if (new Date(event.date).getMonth() == i) {
                            vm.monthsWithEvents[i].value.push(event)
                        }
                    }
                })
                vm.monthsWithEvents.forEach(m => console.log(m))
            })
        }

        getEventsByPeriod('2016-01-01', '2016-12-31');
        let getCurrentYear = () => {
            EventService.getCurrentYear().then()
        }
        getCurrentYear();
    }
}
