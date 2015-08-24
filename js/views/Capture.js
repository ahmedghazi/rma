var Capture = function(){
    var _this = this,
        _ModelAss,
        index = 0,
        w = 320,
        h = 320,
        pictureSource,
        destinationType,
        encodingType,
        imageObj,
        _imageData,
        LATITUDE = 0,
        LONGITUDE = 0,
        offset = {},
        tX,
        tY;

    this.init = function(){
        _this.format();
        _this.bindEvents();
        //_this.render();
if(navigator.camera){
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    //encodingType: navigator.camera.EncodingType;
}

    };

    this.render = function(){
    
    };

    this.bindEvents = function(){
        
        //destinationType: Camera.DestinationType.DATA_URL,
        //destinationType: Camera.DestinationType.FILE_URI,
        $("#btn-capture").on("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.launchCapture();
        });

        $("#btn-send").on("click", function(e){
            _this.upload();
        });

        $("#del").on("click", function(){
            //console.log("del");
            _this.resetCapture();
            _this.launchCapture();
            $(this).addClass('hidden');
        });
    };

    this.launchCapture = function(){
        $("#loading").show();
        $("#capture").removeClass('hidden').addClass('activePage');
        



        /*
        _this.render();
        _this.format();
        _this.onSuccess("http://s9.postimg.org/lko32v13z/best_ass_5.jpg");
        return;
        */

        

        
        console.log("launchCapture")
        _this.resetCapture();

        if(navigator.network){
            var networkState = navigator.network.connection.type;
            if(states[Connection.NONE]){
                alert('Connection type: ' + states[networkState] + "\nRetry later");
                return;
            }
        }
        

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    //console.log(position.coords);
                    LATITUDE = position.coords.latitude;
                    LONGITUDE = position.coords.longitude;
            },  function(error) {
                    console.log(error.message);
            });
        }

        navigator.camera.cleanup();
        navigator.camera.getPicture(
            _this.onSuccess,
            _this.onFail,
            {
                quality : 100,
                destinationType: destinationType.FILE_URI,
                targetWidth: 600,
                targetHeight: 600,
                correctOrientation: true,
                allowEdit : true
                //allowEdit: false
                //encodingType: encodingType.JPEG,
            }
        );
    };

    this.onFail = function(message){
        $("#loading").hide();
        console.log("onFail")
        alert('Failed because: ' + message);
        _MainController.handle_template("carousel");
    };

    this.onSuccess = function(imageCaptured){
        $("#loading").hide();
        console.log("onSuccess")

        _imageData = imageCaptured;
        _this.drawCaptureImgSrc();
    };

    this.drawCaptureImgSrc = function(){
        console.log(_imageData)
        $("#capture-result-img").attr("src", _imageData);
        $("#del").removeClass('hidden');
    };

    this.prepareSend = function(image){
        var date = new Date();
        var id = date.getTime();

        _ModelAss = new ModelAss();
        _ModelAss.setId(id);
        _ModelAss.setImg(image);
        _ModelAss.setTimeStamp(date);
    };

    this.upload = function(){
console.log("upload")
        _this.prepareSend(_imageData);
        $("a#btn-send").text("SENDING").addClass("loading-state");

        $("#loading").show();
        var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = _ModelAss.getId()+".jpg";
            options.mimeType = "image/jpeg";
            options.headers = {
                Connection: "close"
            };

        var params = new Object();
            params.UUID = UUID;
            params.latitude = LATITUDE;
            params.longitude = LONGITUDE;

        options.params = params;
        options.chunkedMode = false;

console.log(params);
console.log(options);

        var ft = new FileTransfer();
            ft.upload(_ModelAss.getImg(), baseUrl+"/api/c?uuid="+UUID, _this.uploadWin, _this.uploadFail, options);
//            ft.upload(_ModelAss.getImg(), baseUrl+"/upload", _this.uploadWin, _this.uploadFail, options);
    };

    this.uploadWin = function(result){
        $("a#btn-send").text("success").addClass("success");
        _MainController.handle_template("newest");
    };

    this.uploadFail = function(error){
        console.log('Error uploading ' + error.code);
        //alert("Error : "+error.code);
        $("a#btn-send").text("ERROR").addClass("error");
        _this.resetCapture();
        $("#loading").hide();
    };

    this.resetCapture = function(){
        $("#capture-result-img").attr("src","");
        $("a#btn-send").text("SEND").attr("class", "");
        $("#loading").hide();
    };

    this.format = function(){

    };


    this.drawCanvas = function(latitude, longitude)
    {
        var canvas = document.createElement("canvas");
        var canvasContext = canvas.getContext('2d');
        canvas.setAttribute('width', 400);
        canvas.setAttribute('height', 400);
        
    };
    
};