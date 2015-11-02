/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('contactsListKey', 'contacts-list')
    .factory('contacts', function(contactsListKey, localStorageService) {
        return localStorageService.get(contactsListKey) || [];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });

        $urlRouterProvider.otherwise('/contacts');
    })
    .directive('validDate', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.validDate = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || !isNaN(Date.parse(modelValue));
                }
            }
        }
    })
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.inThePast = function(modelValue) {
                    return ctrl.$isEmpty(modelValue)
                        || isNaN(Date.parse(modelValue))
                        || (new Date(modelValue) <= new Date());
                };
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts,
                                                    localStorageService, contactsListKey) {
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.deleteContact = function() {
            var idx = contacts.findIndex(function(contact) {
                return contact.id === $scope.contact.id;
            });

            if (idx >= 0) {
                contacts.splice(idx, 1);
            }

            localStorageService.set(contactsListKey, contacts);

            $state.go('list');
        };
    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts, uuid,
                                                  localStorageService, contactsListKey) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.saveContact = function() {
            if (existingContact) {
                angular.copy($scope.contact, existingContact);
            }
            else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }

            localStorageService.set(contactsListKey, contacts);
            $state.go('list');
        };
    });
