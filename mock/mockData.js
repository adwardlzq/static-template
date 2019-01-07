(function($root) {

  var getList = function (data){
    return Mock.mock({
      totalElements: /^\d{1,2}$/i,
      totalPage: /^\d{1,2}$/i,
      "content|5-10": [{
        storeId: '@increment',
        storeName: '@cword(2,6)',
        'time':function(){
          var tmp=this.ary;
          var ids=[];
          for(var i in tmp){
            if (tmp[i].status =="enabled")
            ids.push(tmp[i].id);
          }
          return ids;
        },
        num: /^\d{1,2}$/i,
        ability: function(){
          return this.num+"件/小时"
        },
        "ary|5-24": [{
          id: "@increment()",
          num: /^\d{1,3}$/i,
          label: function(){
            return "剩余" + this.num+"件"
          },
          preLabel: '@time("HH:mm")',
          nextLabel: '@time("HH:mm")',
          status: '@pick(["enabled", "disabled", "full"])'
        }],
        phone:/^(1[3][0-9])\d{8}$/i
      }]
    });
  }
  $root.mockData = function(caseurl) {
    var res;
    switch (caseurl) {
      case "/some/query":
        res = getList();
        break;
      default:
        break;
    }
    return res;
  };
  var dic = "",
    responseText = "";
  Mock.setup({
    timeout: '200-1000',
  });
  Mock.mock(/^\/some/, 'post', function (options) {
    console.log(options, mockData(options.url));
    options.body = mockData(options.url);
    return mockData(options);
  });
})(window);
