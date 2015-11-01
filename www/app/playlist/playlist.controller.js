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
