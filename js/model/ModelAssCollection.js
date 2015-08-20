var ModelAssCollection = function(){
    var _this = this,
        arr_data = [],
        collection = [],
        page = 0,
        step = 5;


    this.getData = function(path){
        console.log("getData : "+baseUrl,path,page)
        var obj = {};
            obj.step = step;
            obj.uuid = UUID;

        var url = baseUrl+"/"+path+"/"+page;
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            data: obj
        })
            .done(function(msg){
                if(msg){
                    arr_data = msg;
                    _this.hydrate();
                }
            })
            .fail(function(jqXHR, textStatus) {
                console.log( jqXHR );
                console.log( textStatus );
              })
            .always(function() {
                //alert( "complete" );
            });

    };

    this.hydrate = function(){
        //arr_data = arr_data.shift();
        collection = [];

        for(var i in arr_data){
            //console.log(arr_data[i]);
            
            var _ModelAss = new ModelAss();
                _ModelAss.setId(arr_data[i]._id);
                _ModelAss.setTimeStamp(arr_data[i].date_created);
                _ModelAss.setImg(baseUrl+"/uploads/"+arr_data[i].img);
                //_ModelAss.setReports(arr_data[i].reports)

            _ModelAss.setRatings(arr_data[i].ratings);
            _ModelAss.setAverage(arr_data[i].average);

            collection.push(_ModelAss);
        }

        _MainController.handle_template("carousel");
        
    };

    
    this.paginate = function(){
        page++;
    };

    this.reset = function(){
        page = 0;
    };

    this.getCollection = function(){
        return collection;
    };
    
};

/*this.getNewest = function(){
        console.log("getNewest : "+page)
        var obj = {};
            obj.step = step;

        $.ajax({
            type: "GET",
            //url: proxyUrl,
            url: baseUrl+"/api/page/"+page+"?uuid="+UUID,
            data: obj
        })
            .done(function(msg){
                if(msg){
                    arr_data = msg;
                    _this.hydrate();
                }
            })
            .fail(function(jqXHR, textStatus) {
                console.log( jqXHR );
                console.log( textStatus );
              })
            .always(function() {
                //alert( "complete" );
            });

    };


    this.getTop = function(){
        
        console.log("getTop : "+page)
        var obj = {};
            obj.step = step;

        $.ajax({
            type: "GET",
            url: baseUrl+"/api/top/page/"+page,
            data: obj
        })
        .done(function(msg){
            if(msg){
                arr_data = msg;
                _this.hydrate();
            }
        })
        .fail(function(jqXHR, textStatus) {
            console.log( jqXHR );
            console.log( textStatus );
        })
        .always(function() {
                //alert( "complete" );
        });
    };

    this.getWorst = function(){
        
        console.log("getTop : "+page)
        var obj = {};
            obj.step = step;

        $.ajax({
            type: "GET",
            url: baseUrl+"/api/top/page/"+page,
            data: obj
        })
        .done(function(msg){
            if(msg){
                arr_data = msg;
                _this.hydrate();
            }
        })
        .fail(function(jqXHR, textStatus) {
            console.log( jqXHR );
            console.log( textStatus );
        })
        .always(function() {
                //alert( "complete" );
        });
    };

    this.getMy = function(){
        
        console.log("getMy : "+page)
        var obj = {};
            obj.step = step;

        $.ajax({
            type: "GET",
            url: baseUrl+"/api/my/page/"+page,
            data: obj
        })
        .done(function(msg){
            if(msg){
                arr_data = msg;
                _this.hydrate();
            }
        })
        .fail(function(jqXHR, textStatus) {
            console.log( jqXHR );
            console.log( textStatus );
        })
        .always(function() {
                //alert( "complete" );
        });
    };
*/