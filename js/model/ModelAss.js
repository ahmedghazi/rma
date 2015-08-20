var ModelAss = function(){
    
    var _this = this,
        ass_id,
        img,
        ratings,
        date,
        average,
        reports = "";

    this.setId = function(val){
        ass_id = val;
    };

    this.getId = function(){
        return ass_id;
    };

    this.setImg = function(val){
        img = val;
    };

    this.getImg = function(){
        return img;
    };

    this.setTimeStamp = function(val){
        date = val;
    };

    this.getTimeStamp = function(){
        return date;
    };
    
    this.setRatings = function(val){
        ratings = val;
    };

    this.getRatings = function(){
        return ratings;
    };

    this.setRating = function(val){
        ratings.push(val);
    };

    this.setAverage = function(val){
        average = val;
    };

    this.getAverage = function(){
        return average;
    };

    this.setReports = function(val){
        reports = val;
    };

    this.getReports = function(){
        return reports;
    };
};


//ModelAss.prototype = Crud;