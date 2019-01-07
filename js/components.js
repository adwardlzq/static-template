var app = {};
app.columns = [
  {
    title: "门店ID",
    key: "storeId",
    align: "center",
    width: 120
  },
  {
    title: "门店名称",
    key: "storeName",
    align: "center"
  },
  {
    title: "可预约收货时间",
    align: "center",
    render: function (row, column, index){
      return '<p-icon style="cursor: pointer;" type="calendar" size="24" @click="showTime(' + index + ')"></p-icon>';
    }
  },
  {
    title: "单位收货能力",
    key: "ability",
    align: "center"
  },
  {
    title: "预约咨询电话",
    key: "phone",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    render: function (row, column, index) {
      var storeName = row.storeName
      var tmp = '<p-button type="text" size="small"  @click="goUpdate(' + row.productId + ')">编辑</p-button>'+
        '<p-poptip confirm title="您确认删除' + storeName +'收货预约配置？" placement="left"  @on-ok="deleteOne(' + row.storeId + ')">' +
        '<p-button type="text" size="small">删除</p-button></p-poptip>';
      return tmp;
    }
  }
];
app.list = {
  template: "#list",
  route: {
    data: function() {
      var q = this.$route.query;
      this.query.pageSize = q.pageSize ? q.pageSize * 1 : 10;
      this.query.page = q.page ? q.page * 1 : 1;
      this.loadData();
    }
  },
  data: function() {
    return {
      view:{
        title: "1",
        modal: false,
        ary: [],
        result: [],
      },
      columns: app.columns,
      self: this,
      query: {
        pageSize: 10,
        page: 1,
        storeId: "",
        storeName: ""
      },
      page: {
        //分页
        totalElements: 0,
        content: [],
        totalPage: 0
      }
    };
  },
  methods: {
    search: function(i) {
      this.query.page = i || this.query.page;
      var goRouter = PopDesign.assist.isGoRouter(this.query); //获取是否应该走路由的策略，false不走；true走起
      if (goRouter) {
        this.$router.go({
          path: PopDesign.assist.getRouterPath(), //获取当前路由地址
          query: PopDesign.assist.filterEmptyQuery(this.query) //整理当前的查询对象query，把为空的查询对象过滤掉
        });
      } else {
        this.loadData();
      }
    },
    showTime: function (index){
      var d = this.page.content[index];
      this.view.ary = d.ary;
      this.view.title = d.storeName;
      this.view.result=d.time;
      this.view.modal = true;
    },
    deleteOne:function(id){
        //ajax
    },
    resetSearch:function(){
      this.query = { //分页查询
        storeId: "",
        storeName: "",
        pageSize: 10, //每页显示多少条
        page: 1
      };
      this.search();
    },
    loadData: function() {
      UserApi.query(
        this.query,
        function(data) {
          //请见user-api.js
          this.page.content = data.content; //获取本页list内容
          this.page.totalElements = data.totalElements*1; //获取共计有多少条记录
          this.page.totalPage = data.totalPage; //获取有多少页
        }.bind(this)
      ); //bind是改变当前函数内部this的指向，将传递给UserApi.query的第二个参数;回调函数的内部this改成本 vue实例的this
    }
  }
};
