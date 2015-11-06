/*
    script file for the index.html page
*/


//constant for constant key
//factory is for sharing across controllers
//only called once, then provides consistent results

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService,storageKey) {
        return (localStorageService.get(storageKey) || []);
    }
/*
        return [{
            id: 'default-delete-me',
            fname: 'Shawn',
            lname: 'Namdar',
            phone: '1-800-NAMDAR',
            dob: '11/2/2015'
        }];
        */
)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
            //use colon to capture this property
            url: '/contacts/:id',
            templateUrl: 'views/contact-detail.html',
            controller: 'ContactDetailController'
        }).state('edit', {
                url: '/contacts:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        $urlRouterProvider.otherwise('/contacts');
    })
    //register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) {
        //revert to default if not valid
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
            //use ID from above captured from url
           return contact.id === $stateParams.id;
        });
    })
    .controller('EditContactController', function($scope, $stateParams, $state, uuid, storageKey, localStorageService, contacts) {
// make a copy to edit then if the user submits update the original
        var existingContact = $scope.contact = contacts.find(function (contact) {
            //use ID from above captured from url
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }
            localStorageService.set(storageKey, contacts);

            $state.go('list');
        }
    });