/* GLOBALS */
var _MainController,
    _ModelAssCollection,
    _Naviguation,
    viewportWidth,
    viewportHeight,
    baseUrl,
    isTop = false,
    UUID,
    TEMPLATE;

var MainController = function(){
    var _this = this,
        _Carousel,
        _Capture;

    this.init = function(){
        console.log("MainController : init");

        if(navigator.splashscreen){
            navigator.splashscreen.show();
            setTimeout(function(){
                navigator.splashscreen.hide();
            },1000);
        }

        if(window.StatusBar) {
            StatusBar.hide();
        }
        
        UUID = device.uuid;
        console.log(UUID);
        //if (UUID == 42)UUID *= Math.round(Math.random()*UUID);
    
        postsPerPage = 5;

        
        //baseUrl = "http://localhost:3001";
        baseUrl = "http://5.196.12.161:3001";
        
        _ModelAssCollection = new ModelAssCollection();

        _Naviguation = new Naviguation();
        _Naviguation.bindEvents();

        _this.renderViewCarousel();
        _this.renderViewCapture();

        _this.format();
        _this.bindEvents();


        //$("#menu li").eq(0).children('a').click();
        _this.handle_template("newest");
    };

    this.checkConnection = function(){
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        console.log('Connection type: ' + states[networkState]);
        if(states[Connection.NONE])alert('Connection type: ' + states[networkState]);
        
    };

    this.renderViewCarousel = function(){
        _Carousel = new Carousel();
        _Carousel.init();
    };

    this.renderViewCapture = function(){
        _Capture = new Capture();
        _Capture.init();
    };

    this.bindEvents = function(){
        $("body").on("TEMPLATE_CHANGE", function(e,d){
            _this.handle_template(d);
        });
    };

    this.handle_template = function(t){
        console.log(t)
        $(".pages").removeClass('activePage').addClass('hidden');
        $("#loading").show();
        
        postsPerPage = 5;
        switch(t){
            case "newest":
                TEMPLATE = t;
                _ModelAssCollection.reset();
                _ModelAssCollection.getData("api/page");
            break;

            case "next":
                _ModelAssCollection.paginate();
                _ModelAssCollection.getData("api/page");
            break;

            case "top":
                TEMPLATE = t;
                _ModelAssCollection.reset();
                _ModelAssCollection.getData("api/top/page");
            break;

            case "top_next":
                _ModelAssCollection.paginate();
                _ModelAssCollection.getData("api/top/page");
            break;

            case "worst":
                TEMPLATE = t;
                _ModelAssCollection.reset();
                _ModelAssCollection.getData("api/notop/page");
            break;

            case "worst_next":
                _ModelAssCollection.paginate();
                _ModelAssCollection.getData("api/notop/page");
            break;

            case "my":
                TEMPLATE = t;
                postsPerPage = 99999;
                _ModelAssCollection.reset();
                _ModelAssCollection.getData("api/my/page");
            break;

            case "my_next":
                _ModelAssCollection.paginate();
                //_ModelAssCollection.getTop();
            break;

            case "carousel":
                _Carousel.setModel(_ModelAssCollection.getCollection());
                _Carousel.render();
                
            break;

            case "capture":
                _Capture.launchCapture()
            break;
            case "mentions":
                $("#mentions").removeClass('hidden').addClass('activePage');
            break;
        }
    };

    this.format = function(){
        viewportWidth = $(window).width();
        viewportHeight = $(window).height();
 
        var minH = $(".content").width();
        $(".content").css({'min-height': minH});
        $("#carousel_inner").css({'min-width': minH,'min-height': minH});
        $("#capture-result").css({'min-width': minH,'min-height': minH });
    };


};