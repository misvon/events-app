export default ngModule => {
    describe('event module test', () => {
        var $compile, $rootScope, $httpBackend, categories, ApiService, $controller;
        let baseUrl = "http://localhost:8085/EventsApi/resources/";
        beforeEach(window.module(ngModule.name));

        beforeEach(inject(function(_$compile_, _$rootScope_, $injector, _ApiService_, _$controller_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
        }));

        it('should test event module', () => {
            expect(ngModule.name).toEqual("EventsApp");
        });


        it('Replaces the element with the appropriate content', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile("<events></events>")($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("Hello events app");
        });
        it('sets the strength to "strong" if the password length is >8 chars', function() {
            var $scope = {};
            var controller = $controller('EventCtrl', { $scope: $scope });
            expect(controller).toBeDefined();
        });

        it('can get an instance of ApiService', inject(function(ApiService) {
            expect(ApiService).toBeDefined();
        }));
        it('can get an instance of EventService', inject(function(EventService) {
            expect(EventService).toBeDefined();
        }));  
    });
}
