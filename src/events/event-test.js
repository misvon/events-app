export default ngModule => {
    describe('event module test', () => {
        var $compile, $rootScope, $httpBackend, categories,
            ApiService, $controller, events, companyTypes, forms,
            endOfYears, vat, companySizes, eventsByPeriod, currentYear;
        let baseUrl = "http://localhost:8085/EventsApi/resources/";
        let categoryData = ["Årsredovisning", "Inkomstdeklaration", "Sista dag för beslut om fastighetstaxering"];
        let eventsData = [{
            "date": "2016-01-04",
            "description": "Årsredovisning och revisionsberättelse till Bolagsverket",
            "comment": null,
            "renderedText": "Årsredovisning och revisionsberättelse till Bolagsverket för aktiebolag och ekonomisk förening - bokslut 2015-05-31 ",
            "category": "Årsredovisning",
            "companySize": null,
            "form": null,
            "vatPeriod": null,
            "tradeArea": null,
            "vatRegistered": null,
            "employer": null,
            "endOfYears": [
                "Maj"
            ],
            "companyTypes": [
                "Aktiebolag och ekonomisk förening"
            ]
        }, {
            "date": "2016-01-04",
            "description": "Extra inbetalning (fyllnadsbetalning) vid underskott av slutlig skatt på mindre än 30 000 kr",
            "comment": null,
            "renderedText": "Extra inbetalning (fyllnadsbetalning) vid underskott av slutlig skatt på mindre än 30 000 kr för aktiebolag och ekonomisk förening samt handels- och kommanditbolag - bokslut 2015-08-31 och 2015-07-31 ",
            "category": "Extra inbetalning",
            "companySize": null,
            "form": null,
            "vatPeriod": null,
            "tradeArea": null,
            "vatRegistered": null,
            "employer": null,
            "endOfYears": [
                "Augusti",
                "Juli"
            ],
            "companyTypes": [
                "Aktiebolag och ekonomisk förening",
                "Handels- och kommanditbolag"
            ]
        }];
        let companyTypeData = ["Fysisk person", "Enskild näringsidkare", "Handels- och kommanditbolag", "Aktiebolag och ekonomisk förening"];

        let formsData = ["Elektronisk blankett", "Pappersblankett"];

        let vatData = ["Helår", "Tremånader", "Månad"];

        let companySizesData = ["Microföretag", "Mindre företag", "Större företag"];

        let currentYeardData = new Date().getYear();

        let endOfYearsData = [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December"
        ];
        beforeEach(window.module(ngModule.name));

        beforeEach(inject(function(_$compile_, _$rootScope_, $injector, _ApiService_, _$controller_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $httpBackend = $injector.get('$httpBackend');
            ApiService = _ApiService_;
            events = $httpBackend.whenGET(baseUrl + 'events').respond(eventsData);
            categories = $httpBackend.whenGET(baseUrl + 'events/categories').respond(categoryData);
            companyTypes = $httpBackend.whenGET(baseUrl + 'events/company-types').respond(companyTypeData);
            forms = $httpBackend.whenGET(baseUrl + 'events/forms').respond(formsData);
            vat = $httpBackend.whenGET(baseUrl + 'events/vat-periods').respond(vatData);
            companySizes = $httpBackend.whenGET(baseUrl + 'events/company-sizes').respond(companySizesData);
            endOfYears = $httpBackend.whenGET(baseUrl + 'events/ends-of-year').respond(endOfYearsData);
            eventsByPeriod = $httpBackend.whenGET(baseUrl + 'events?from=2016-01-01&to=2016-12-31').respond(eventsData);
            currentYear = $httpBackend.whenGET(baseUrl + 'events/years').respond(currentYeardData);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should test event module', () => {
            expect(ngModule.name).toEqual("EventsApp");
        });
     
        it('should test event request', () => {
            $httpBackend.expectGET(baseUrl + 'events');
            events.respond(eventsData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(eventsData).toEqual(eventsData);
        });
     
        it('should test category request', () => {
            $httpBackend.expectGET(baseUrl + 'events/categories');
            categories.respond(categoryData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(categoryData).toEqual(categoryData);
        });

        it('should test event by period request', () => {
            $httpBackend.expectGET(baseUrl + 'events?from=2016-01-01&to=2016-12-31');
            eventsByPeriod.respond(eventsData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(eventsData).toEqual(eventsData);
        });
        it('should test company-type request', () => {
            $httpBackend.expectGET(baseUrl + 'events/company-types');
            events.respond(companyTypeData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(companyTypeData).toEqual(companyTypeData);
        });
        it('should test forms request', () => {
            $httpBackend.expectGET(baseUrl + 'events/forms');
            forms.respond(formsData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(formsData).toEqual(formsData);
        });
        it('should test vat-period request', () => {
            $httpBackend.expectGET(baseUrl + 'events/vat-periods');
            vat.respond(vatData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(vatData).toEqual(vatData);
        });
        it('should test company-sizes request', () => {
            $httpBackend.expectGET(baseUrl + 'events/company-sizes');
            companySizes.respond(companySizesData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(companySizesData).toEqual(companySizesData);
        });
        it('should test end-of-year request', () => {
            $httpBackend.expectGET(baseUrl + 'events/ends-of-year');
            endOfYears.respond(currentYear)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(currentYear).toEqual(currentYear);
        });

        it('should test current-year request', () => {
            $httpBackend.expectGET(baseUrl + 'events/years');
            currentYear.respond(currentYeardData)
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(currentYeardData).toEqual(currentYeardData);
        });


        it('can get an instance of ApiService', inject(function(ApiService) {
            expect(ApiService).toBeDefined();
        }));

/*        it('Replaces the element with the appropriate content', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile("<events></events>")($rootScope);
            $httpBackend.flush();
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("Hello events app");
        });*/
        it('can get an instance of event controller', function() {
            var $scope = {};
            var eventController = $controller('EventCtrl', { $scope: $scope });
            $httpBackend.flush();
            expect(eventController).toBeDefined();
        });
        it('can get an instance of EventService', inject(function(EventService) {
            expect(EventService).toBeDefined();
        }));
    });
}
