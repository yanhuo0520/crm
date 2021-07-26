export default {
    data () {
      return {
        // 地图初始化的位置
        center: {lng: 116.39852, lat:39.91405},
        // 地图内的大小
        zoom: 14,
        // 这个是选择某个点的提醒以及搜索附近的东西的依据
        maptitle: "",
        // 这个是搜索下的东西
        location: '',
        // 这个是选择搜索列表中数据的title以及经纬度
        locationdata: {
            title: "",
            center: ''
        },
        geolocation: "",
        biaoji: false
      }
    },
    mounted(){
       
    },
    methods: {
        // 由于百度地图 JS API 只有 JSONP 一种加载方式，因此 BaiduMap 组件及其所有子组件的渲染只能是异步的。因此，请使用在组件的 ready 事件来执行地图 API 加载完毕后才能执行的代码，不要试图在 vue 自身的生命周期中调用 BMap 类，更不要在这些时机修改 model 层。
        handler ({BMap, map}) {
            window.map = map; //注册为全局
            var that = this;  // map方法中的this指向不对。所有申明一个。。小细节的东西
            // 刚进入页面中的定位，需要向用户授权
            var geolocation = new BMap.Geolocation();
            console.log(geolocation)
            this.geolocation = geolocation;
            geolocation.getCurrentPosition(() =>{
                // console.log('data')
                // alert('nimamaipi')
            })
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function(r){

                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    // 把得到的经纬度传给map，就实现了第一步我们的定位
                    that.center = {
                    lng: r.point.lng ,
                    lat: r.point.lat
                    }
                  console.log("wang", r)
                // 把获取到的位置传给所需要的搜索已经提示里面
                    that.maptitle =r.address.province + r.address.city +  r.address.district + r.address.street;
                //   当用户拒绝该授权的时候，依然执行
                    if(r.accuracy==null){
                    // alert('accuracy null:'+r.accuracy);
                    //用户决绝地理位置授权
                    return;
                    }
                }else {
                    console.log('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
        },
        // 移动开始
        movemapstart(){
            this.biaoji = false;
        },
        // 当用户移动选择某一个点
        updatemap(e){
             // 把localtion值清空
            // this.location = {
            //     title: "",
            //      center: ""
            // }
            console.log('wang', this.locationdata)
            var that = this;
            // 先赋值经纬度
            const { lng, lat } = e.target.getCenter();
            that.center = {
            lng ,
            lat
            }
            // 然后根据经纬度查询地图的具体位置
            var geoc = new BMap.Geocoder();   
            geoc.getLocation(e.target.getCenter(), function(rs){
                // console.log(rs)
                // 然后赋值给搜索的条件
                that.locationdata.title = rs.address;
                that.locationdata.center = e.target.getCenter();
                that.maptitle = rs.address;
            },{enableHighAccuracy: true});  
           
        },
        //   选择localtion的值
        getlocalsearch(e){
            // console.log(e)
            // this.maptitle = e.address

            this.locationdata.title = e.address + e.title;
            this.locationdata.center = e.point;
        },
        // 确定该信息然后存在session中
        getmapdamodata(){
            var that = this;
            if(this.locationdata.title == '' && this.locationdata.center == ''){
                var mapdata = {
                    title: that.maptitle,
                    center: this.center
                    
                }
                sessionStorage.setItem('mapdata', JSON.stringify(mapdata))
            }else{
                sessionStorage.setItem('mapdata', JSON.stringify(this.locationdata))
            }
               
            
            this.$router.go(-1);
        }

    }
  }