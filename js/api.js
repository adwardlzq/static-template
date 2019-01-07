(function(root, $http) {
  var api = {};

  api.queryUri = "/some/query";
  api.query = function(query, func1, func2) {
    $http.post(api.queryUri, query).then(
      function(response) {
        debugger;
        func1(window["Mock"] ? mockData(api.queryUri):response.data);
      },
      function(response) {
        if (func2) func2(response);
      }
    );
  };

  root.UserApi = api;
})(window, Vue.http);
