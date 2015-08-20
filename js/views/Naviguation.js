var Naviguation = function(){
    var _this = this,
        activePage;

    this.bindEvents = function(){
        
        var menuStatus;
        var show = function() {
            if(menuStatus) {
                return;
            }

            $("#wrapper").addClass('panel_open');
            $("aside").removeClass("hidden").addClass('panel_open');
            menuStatus = true;

        };
        var hide = function() {
            if(!menuStatus) {
                return;
            }
            
            $("#wrapper").removeClass('panel_open');
            $("aside").removeClass('panel_open');

            menuStatus = false;
            /*setTimeout(function(){
                //$('aside').addClass("hidden");
            }, 200);*/
        };
        var toggle = function() {
            if (!menuStatus) {
                show();
            } else {
                hide();
            }
            return false;
        };
     
        // Show/hide the menu
        $("a.showMenu").click(toggle);
        
        $("a.take_pic").click(function(e){
            e.preventDefault();
            _MainController.handle_template("capture");
        })
        
        // Menu behaviour
        $("#menu li a").click(function (e) {
            e.preventDefault();

            $("#menu li a").removeClass('active');
            $(this).addClass('active');
            var page = $(this).attr("href");
            var id = activePage = page.split("#")[1];
            //isTop = false;
            //if(id == "top")isTop = true;

            console.log(id)
            $(".pages").removeClass('activePage').addClass('hidden');
    
            _MainController.handle_template(id);
          
            var p = $(this).parent();
            p.siblings().removeClass('active');
            p.addClass('active');
            toggle();
        });
        

    };

    
};