var ModulePie = function(callback){
    var _this = this,
        convas,
        context,
        pixels,
        W = 200,
        H = 97,
        touchX,
        touchY,
        pixelData,
        arrColors = [],
        rate,
        color,
        offset = {},
        timer;

    this.init = function(){
        //console.log("ModulePie ModulePie ModulePie ModulePie ModulePie ModulePie ModulePie");
        arrColors = [19588,25774,3638463,7054288,10339295,16759230,16749727,16740733,16731226,12793924];
        offset.x = $("#pie").offset().left;
        offset.y = $("#pie").offset().top;
console.log(offset)
        _this.render();

        
    };

    this.render = function(){
        canvas = document.getElementById("pie");
        context = canvas.getContext("2d");
        canvas.width = W;
        canvas.height = H;

        context.clearRect(0,0,W,H);

        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function(){
            context.drawImage(img,0,0);
            var px = context.getImageData(0, 0, canvas.width, canvas.height);
            //console.log(px.data);
            _this.bindEvents();
        };
        img.src = "img/pie.png";
        //img.src = "images/radial.jpg";
    };

    this.bindEvents = function(){
        //console.log("bindEventsbindEventsbindEventsbindEventsbindEvents");
        canvas.addEventListener("touchstart", _this.handleTouchStart);
        canvas.addEventListener("touchmove", _this.handleTouchMove);
        canvas.addEventListener("touchend", _this.handleTouchEnd);
    };

    this.handleTouchStart = function(e){
        e.preventDefault();
        e.stopPropagation();
        touchX = e.targetTouches[0].pageX - offset.x;
        touchY = e.targetTouches[0].pageY - offset.y;
        _this.updateColor();
    };

    this.handleTouchMove = function(e){
        e.preventDefault();
        e.stopPropagation();
        //console.log(e.targetTouches[0].pageX,e.targetTouches[0].pageY)
        touchX = e.targetTouches[0].pageX - offset.x;
        touchY = e.targetTouches[0].pageY - offset.y;
//console.log(touchX, touchY)
        _this.updateColor();
        //_this.dispatchEvent(eventChange);
    };

    this.handleTouchEnd = function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (e.targetTouches.length == 1) {
            touchX = e.targetTouches[0].pageX - offset.x;
            touchY = e.targetTouches[0].pageY - offset.y;
        }
        if (e.changedTouches.length == 1) {
            touchX = e.changedTouches[0].pageX - offset.x;
            touchY = e.changedTouches[0].pageY - offset.y;
        }

        _this.updateColor();

        $("body").trigger("USER_HAS_RATED", [rate]);
    };

    this.updateColor = function(){
        //console.log(touchX,touchY)
        pixelData = context.getImageData(touchX, touchY, 2, 2).data;
        color = (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2];
        if(color === 0)return;
        var rgb = "rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")";
        rate = arrColors.indexOf(color) + 1;    
        if(rate === 0)return; 
        //if(rate === 10)return; 
        //if(rate === 1)return; 
//console.log(pixelData)
        /*$("#carousel_inner").css({backgroundColor:"rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")"});
        $("#rate").css({backgroundColor:"rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")"});
        $('#rate span').text(rate);
        */
        callback(rgb,rate);
    };

    this.getRateByColor = function(color){

    };

    this.getRate = function(){
        return rate;
    };
    
};


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}