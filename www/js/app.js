(function() {    
    angular
        .module('MYSEED.playlists', ['MYSEED.playlists.controller']);
    
})();

(function() {
    angular
        .module('MYSEED.playlists.controller', [])
        .controller('PlaylistsCtrl', PlaylistsCtrl);
    
        PlaylistsCtrl.$inject = ['$scope'];
        
        function PlaylistsCtrl($scope) {     
                 
            $scope.playlists = [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'Cowbell', id: 6 }
            ];          
        }
})();

(function() {    
    angular
        .module('MYSEED.playlist', ['MYSEED.playlist.controller']);
    
})();

(function() {
    angular
        .module('MYSEED.playlist.controller', [])
        .controller('PlaylistCtrl', PlaylistCtrl);
    
        PlaylistCtrl.$inject = ['$scope', '$stateParams'];
        
        function PlaylistCtrl($scope, $stateParams) {     
                 
            $scope.playlists = [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'Cowbell', id: 6 }
            ];          
        }
})();

(function() {    
    angular
        .module('MYSEED.menu', ['MYSEED.menu.controller']);
    
})();

(function() {
    angular
        .module('MYSEED.menu.controller', [])
        .controller('MenuCtrl', MenuCtrl);
    
        MenuCtrl.$inject = ['$scope', '$ionicModal', '$timeout'];
        
        function MenuCtrl($scope, $ionicModal, $timeout) {     
                 
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});
            
            // Form data for the login modal
            $scope.loginData = {};
            
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('app/login/login.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });
            
            // Triggered in the login modal to close it
            $scope.closeLogin = function() {
                $scope.modal.hide();
            };
            
            // Open the login modal
            $scope.login = function() {
                $scope.modal.show();
            }; 
            
            // Perform the login action when the user submits the login form
            $scope.doLogin = function() {
                console.log('Doing login', $scope.loginData);
            
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function() {
                $scope.closeLogin();
                }, 1000);
            };
        }
})();

(function() {
    angular.module('MYSEED', ['ionic',   
        'MYSEED.config',       
        'MYSEED.menu',
        'MYSEED.playlist',
        'MYSEED.playlists'        
    ]);
})();

(function() {
    angular
        .module('MYSEED.config', [])
        .config(Config)   
        .run(run);
    
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    function Config($stateProvider, $urlRouterProvider) {
    
             $stateProvider
        
             .state('MYSEED', {
                    url: '/MYSEED',
                    abstract: true,
                    templateUrl: 'app/menu/menu.html',
                    controller: 'MenuCtrl'
             })
        
            .state('MYSEED.search', {
                    url: '/search',
                    views: {
                         'menuContent': {
                             templateUrl: 'app/search/search.html'
                         }
                    }
            })
        
            .state('MYSEED.browse', {
                    url: '/browse',
                    views: {
                         'menuContent': {
                             templateUrl: 'app/browse/browse.html'
                         }
                    }
            })
            
            .state('MYSEED.playlists', {
                url: '/playlists',
                views: {
                     'menuContent': {
                         templateUrl: 'app/playlists/playlists.html',
                         controller: 'PlaylistsCtrl as vm'
                      }
                }
            })
        
            .state('MYSEED.single', {
                url: '/playlists/:playlistId',
                views: {
                     'menuContent': {
                         templateUrl: 'app/playlist/playlist.html',
                         controller: 'PlaylistCtrl as vm'
                     }
                }
            });
            
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/MYSEED/playlists');
    
    };

    run.$inject = ['$ionicPlatform'];

    function run($ionicPlatform) {
        
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
            
                }
                if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
    }
})();
