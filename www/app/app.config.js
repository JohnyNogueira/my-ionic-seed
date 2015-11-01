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
