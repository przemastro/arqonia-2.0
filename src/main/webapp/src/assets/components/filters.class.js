var Filters = {

    'container' : null,
  
    'create' : function(container) {
  
      this.container = container;

      $('#'+this.container).append('<div id="panel" style="z-index:100;position: absolute;right:0;top:0;margin-top:10px"></div>');
      $('#panel').append(
        '<div class="btn-group dropup" style="float:right;margin-right:10px;">'+
        '  <button type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"'+
        '  style="width:35px;height:30px;border-radius:2px;background-color:rgba(28,51,83);box-shadow:0 0 0 .2rem transparent;'+
        '         margin-bottom:0px;color:white">'+
        '    F'+
        '  </button>'+  
        '<div class="dropdown-menu" id="dropdown-menu" style="background-color:rgba(28,51,83);height:1000px;width:120px !important;'+
        '                                  max-width: 185px;min-width: 185px;margin-left:-140px;margin-top:300px">'+
        '  <div id="filters" style="float:right;margin-top:100px">'+
        '<script>'+
        '$("#dropdown-menu").on("click", function (e) {'+
        '  e.stopPropagation();'+
        '});'+
        '$("#close").on("click", function () {'+
        '  $("#dropdown").hide();'+
        '});'+
        '</script>'+
        '  <button type="button" class="close" aria-label="Close" style="width:25px;height:25px;border-radius:100px;opacity:0.9;'+
        '                                                                margin-top:-60px;background-color:orange;" id="close">'+
        '    <span>&times;</span>'+  
        '  </button>'+        
        '    <div class="filters">'+
        '      <div>'+
        '        <div class="section" style="width:210px;color:white;" id="name-div">'+
        '          <input type="checkbox" style="display:none" id="name-magnitudo" checked/>'+
        '          <label for="name-magnitudo"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">NAME OF THE STAR</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="magnitudo-div">'+
        '          <input type="checkbox" style="display:none" id="magnitudo" checked/>'+
        '          <label for="magnitudo"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">ABSOLUTE MAGNITUDE</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="apparent-magnitudo-div">'+
        '          <input type="checkbox" style="display:none" id="apparent-magnitudo" checked/>'+
        '          <label for="apparent-magnitudo"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">APPARENT MAGNITUDE</span>'+        
        '        </div>'+        
        '        <div class="section" style="width:210px;color:white;" id="distance-div">'+
        '          <input type="checkbox" style="display:none" id="distance"/>'+
        '          <label for="distance"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">DISTANCE FROM THE SUN</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="spectral-div">'+
        '          <input type="checkbox" style="display:none" id="size"/>'+
        '          <label for="size"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">SIZE OF THE STAR</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="spectral-div">'+
        '          <input type="checkbox" style="display:none" id="spectral"/>'+
        '          <label for="spectral"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">SPECRTAL TYPE</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="variable-star-div">'+
        '          <input type="checkbox" style="display:none" id="variable-star" checked/>'+
        '          <label for="variable-star"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">VARIABLE STAR</span>'+        
        '        </div>'+      
        '        <div class="section" style="width:210px;color:white;" id="proper-motion-div">'+
        '          <input type="checkbox" style="display:none" id="proper-motion" checked/>'+
        '          <label for="proper-motion"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">PROPER MOTION</span>'+        
        '        </div>'+          
        '        <hr style="margin-left:50px;width:140px;">'+
        '        <div class="section" style="width:210px;color:white;" id="dust-div">'+
        '          <input type="checkbox" style="display:none" id="dust" checked/>'+
        '          <label for="dust"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">INTERSTELLAR DUST</span>'+        
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="gas-div">'+          
        '          <input type="checkbox" style="display:none" id="gas" checked/>'+
        '          <label for="gas"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">INTERSTELLAR GAS</span>'+
        '        </div>'+
        '        <div class="section" style="width:210px;color:white;" id="grid-div">'+          
        '          <input type="checkbox" style="display:none" id="grid" checked/>'+
        '          <label for="grid"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">GALACTIC GRID</span>'+
        '        </div>'+ 
        '        <div class="section" style="width:210px;color:white;" id="rotation-div">'+          
        '          <input type="checkbox" style="display:none" id="rotation" checked/>'+
        '          <label for="rotation"></label>'+
        '          <span class="name" style="float:left;margin-left:5px;">GALACTIC ROTATION</span>'+
        '        </div>'+                
        '      </div>'+
        '    </div>'+
        '  </div>'+
        '</div>'+
        '<div class="buttons" style="position: absolute;right:0;top:0;margin-top:40px;margin-right:33px;">'+
        '<button type="button" class =" zoom-out btn btn-default" style="width:35px;height:30px;border-radius:2px;z-index:1000">'+
        '  <span class="glyphicon glyphicon-minus" style="margin-top:-10px;margin-left:0px"></span>'+
        '</button>'+
        '<button type="button" class =" zoom-in btn btn-default" style="width:35px;height:30px;margin-top:10px;border-radius:2px;">'+
        '  <span class="glyphicon glyphicon-plus" style="margin-top:-10px;margin-left:0px"></span>'+
        '</button>'+
        '</div>'+
        '</div>'
      );
    }
  }