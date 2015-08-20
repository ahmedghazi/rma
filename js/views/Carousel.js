var Carousel = function(){
    var _this = this,
        model,
        currentModel,
        index = 0,
        pX,
        w,
        h,
        indice_x = 0,
        arrColors = ["004c84","0064ae","3784bf","6ba3d0",'9dc3df',"ffb9be","ff949f","ff717d","ff4c5a","c33844"];

    this.init = function(){
        _this.format();
        _this.bindEvents();
    };

    this.initUi = function(){
        _ModulePie = new ModulePie(function(rgb, rate){
            //console.log(rgb, rate);
            $("#carousel_inner").css({backgroundColor:rgb});
            $("#rate").css({backgroundColor:rgb});
            $('#rate span').text(rate);
        });
        _ModulePie.init();
    };

    this.render = function(){
        console.log(TEMPLATE);
        //console.log("render : "+model.length);
        //if(model.length < postsPerPage && TEMPLATE != "my")
        //    _MainController.handle_template("newest");

        var _h = '';
        for(var i in model){
            var vote_count = model[i].getRatings().length;

            _h += '<div class="carousel_slide slideOut" id="slide-'+i+'" data-rating="'+model[i].getRatings()+'" data-average="'+model[i].getAverage()+'">';
                _h += '<img src="'+model[i].getImg()+'" alt="">';
                _h += '<div class="metas">';
                    _h += vote_count+' votes';
                _h += '</div>';

                _h += '<div class="report"><span class="glyphicon glyphicon-flash"></span> REPORT</div>';
    
            _h += '</div>';
        }

        index = 0;

        $("#carousel_inner").html(_h);

        
        setTimeout(function(){
            
            
            
            
            $("#newest").removeClass('hidden').addClass('activePage');
            $("#loading").hide();
            _MainController.format();
            if(TEMPLATE != "my")_this.initUi();
            _this.slideInOut();

            
        },100);

    };

    this.bindEvents = function(){
        //console.log("Carousel bindEvents")
        $("body").on("USER_HAS_RATED", function(e,d){
            indice_x = d;
            _this.gotoNext();
        });

        //$(".report").on("click", function(e){
        $("html").on("click", ".report", function(e){
            $('#report').modal("show");
            //_this.report();
        });

        $("html").on("click", ".modal .btn-default", function(e){
            $('#report').modal("hide");
        });

        $("html").on("click", ".modal .btn-danger", function(e){
            _this.report();
            $('#report').modal("hide");
        });

    };

    this.swipeHandler = function(event){
        _this.gotoNext();
        $( event.target ).addClass( "swipe" );
    };

    this.updateRate = function(_pX){
        //console.log(_pX);
        indice_x = Math.floor((_pX / w * 100)/10) + 1;
        document.getElementById("slide-"+index).setAttribute('data-rating',indice_x);
        $('#rate span').text(indice_x);
    };

    this.gotoNext = function(){
        _this.udpate();
    };

    this.udpate = function(){
        //console.log("udpate : "+indice_x)
        //$("#loading").show();
        currentModel = model[index];
        currentModel.setRating(indice_x);

        $("#slide-"+index).addClass("slideOutUp");
        index++;
        _this.slideInOut();      
    };

    this.report = function(){
        //$("#loading").show();
        currentModel = model[index];
        currentModel.setReports(1);

        $("#slide-"+index).addClass("slideOutUp");
        index++;
        _this.slideInOut();
    };

    this.slideInOut = function(){
//console.log(index,postsPerPage, $("#slide-"+index).length);
        if(index === postsPerPage){
            _this.pushData();
            return;
        }

        $("#slide-"+index).removeClass("slideOut");
        $slide = $("#slide-"+index)
        $slide.removeClass("slideOut");

        var data = $slide.data();
        
        $('#rate span').text(data.average);

        var color = arrColors[data.average-1];
        $("#carousel_inner, #rate").css({backgroundColor:"#"+color});
        $(".metas").css({color:"#"+color})
        $(".average").css({"border-color":"#"+color})
        
    };

    this.pushData = function(){
        $("#loading").show();

        var arr = [];
        for(var i in model){
            var o = {}
                o.uuid = UUID;
                o.id = model[i].getId();
                o.img = model[i].getImg();
                o.ratings = model[i].getRatings();
                o.reports = model[i].getReports();
            arr.push(o);
        }

        var data = JSON.stringify(arr)

        $.ajax({
            type: "POST",
            url: baseUrl+"/api/ub",
            data: data,
            contentType: "application/json"
        })
            .done(function( msg ) {
                console.log( "Data Saved: " + msg );
                if(msg){
                    _this.loadNext();
                }else{
                    //$("#loading").hide();
                }
            });
    };

    this.loadNext = function(){
        console.log("loadNext : "+TEMPLATE);

        if(TEMPLATE = "top")
            _MainController.handle_template("top_next");
        else if(TEMPLATE == "my") 
            _MainController.handle_template("my_next");
        else
            _MainController.handle_template("next");
    };

    this.format = function(){
        w = viewportWidth - 30;
        h = viewportHeight - 220;

    };

    this.setModel = function(_model){
        model = _model;
    };


};





