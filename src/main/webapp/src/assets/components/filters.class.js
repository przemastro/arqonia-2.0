var Filters = {

    'container' : null,

/*
    'init' : function() {
  
      this.initHudAction();
      this.initControls();
  
    },
  */
  
    'create' : function(container) {
  
      this.container = container;
  
      if(!$('#'+this.container+' #controls').length && ArqoniaMap.withOptionsPanel == true) {
  
        $('#'+this.container).append(
          '  <div id="controls">'+
          '    <a data-view="3d" class="view selected">3D</a>'+
          '    <a data-view="top" class="view">2D</a>'+
          '    <a data-view="infos" class="'+(ArqoniaMap.showGalaxyInfos ? 'selected' : '')+'">i</a>'+
          '    <a data-view="options">'+Ico.cog+'</a>'+
          '    <div id="options" style="display:none;"></div>'+
          '  </div>'
        );
        this.createSubOptions();
  
      }
  

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
        '  <button type="button" class="close" aria-label="Close" style="width:35px;height:30px;margin-top:-60px;background-color:rgba(28,51,83);" id="close">'+
        '    <span>x</span>'+  
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
  
      var addClass = (ArqoniaMap.popupDetail ? 'class="popup-detail"' : '');
      $('#'+this.container).append('<div id="systemDetails" style="display:none;"'+addClass+'></div>');
  
    },
  
/*
    'createSubOptions' : function() {
  
      //-- Toggle milky way
      $( "<a></a>" )
        .addClass( "sub-opt active" )
        .html('Toggle Milky Way')
        .click(function() {
          var state = Galaxy.milkyway[1].visible;
          Galaxy.milkyway[1].visible = !state;
          Galaxy.milkyway2D.visible  = !state;
          $(this).toggleClass('active');
        })
        .appendTo( "#options" );
  
      //-- Toggle Grid
      $( "<a></a>" )
        .addClass( "sub-opt active" )
        .html('Toggle grid')
        .click(function() {
          $(this).toggleClass('active');
        })
        .appendTo( "#options" );
  
    },
  

    'initControls' : function() {
  
      $('#controls a').click(function(e) {
  
        if($(this).hasClass('view')) {
          $('#controls a.view').removeClass('selected')
          $(this).addClass('selected');
        }
  
        var view = $(this).data('view');
  
  
        switch(view) {
  
          case 'top':
            ArqoniaMap.isTopView = true;
            var moveFrom = {x: camera.position.x, y: camera.position.y , z: camera.position.z};
            var moveCoords = {x: controls.target.x, y: controls.target.y+500, z: controls.target.z};
            HUD.moveCamera(moveFrom,moveCoords);
            break;
  
          case '3d':
            ArqoniaMap.isTopView = false;
            var moveFrom = {x: camera.position.x, y: camera.position.y , z: camera.position.z};
            var moveCoords = {x: controls.target.x-100, y: controls.target.y+500, z: controls.target.z+500};
            HUD.moveCamera(moveFrom,moveCoords);
            break;
  
          case 'infos':
            if(!ArqoniaMap.showGalaxyInfos) {
              ArqoniaMap.showGalaxyInfos = true;
              Galaxy.infosShow();
            } else {
              ArqoniaMap.showGalaxyInfos = false;
              Galaxy.infosHide();
            }
            $(this).toggleClass('selected');
            break;
  
          case 'options':
            $('#options').toggle();
            break;
  
        }
  
  
  
  
      });
  
    },
  

    'moveCamera' : function(from, to) {
  
      ArqoniaMap.tween = new TWEEN.Tween(from, {override:true}).to(to, 800)
        .start()
        .onUpdate(function () {
          camera.position.set(from.x, from.y, from.z);
        })
        .onComplete(function () {
          controls.update();
        });
  
    },
  

    'initHudAction' : function() {
  
      //-- Disable 3D controls when mouse hover the Hud
      $( "canvas" ).hover(
        function() {
          controls.enabled = true;
        }, function() {
          controls.enabled = false;
        }
      );
  
      //-- Disable 3D controls when mouse hover the Hud
      $( "#hud" ).hover(
        function() {
          controls.enabled = false;
        }, function() {
          controls.enabled = true;
        }
      );
      $( "#systemDetails" ).hide();
  
      //-- Add Count filters
      $('.map_filter').each(function(e) {
        var idCat = $(this).data('filter');
        var count = ArqoniaMap.catObjs[idCat].length;
        if(count>1) $(this).append(' ('+count+')');
      });
  
      //-- Add map filters
      $('.map_filter').click(function(e) {
        e.preventDefault();
        var idCat = $(this).data('filter');
        var active = $(this).data('active');
        active = (Math.abs(active-1));
  
        //------------------------------------------------------------------------
        //-- Single item by once
  
        if(!ArqoniaMap.hudMultipleSelect) {
  
          $('.map_filter').addClass('disabled');
  
          //-- Toggle systems particles
          $(System.particleGeo.vertices).each(function(index, point) {
            point.visible  = 0;
            point.filtered = 0;
            System.particleGeo.colors[index] = new THREE.Color('#111111');
            active = 1;
          });
  
  
          //-- Toggle routes
          if(ArqoniaMap.catObjsRoutes.length>0)
          $(ArqoniaMap.catObjsRoutes).each(function(indexCat, listGrpRoutes) {
            if(listGrpRoutes != undefined)
              $(listGrpRoutes).each(function(key, indexRoute) {
                scene.getObjectByName( indexRoute ).visible  = false;
                if(scene.getObjectByName( indexRoute+'-first' ) != undefined)
                  scene.getObjectByName( indexRoute+'-first' ).visible  = false;
                if(scene.getObjectByName( indexRoute+'-last' ) != undefined)
                  scene.getObjectByName( indexRoute+'-last' ).visible  = false;
              });
          });
  
        }
  
        //------------------------------------------------------------------------
        //-- multiple select
  
        var center = null;
        var nbPoint = 0;
        var pointFar = null;
  
        //-- Toggle routes
  
        if(ArqoniaMap.catObjsRoutes.length>0)
        $(ArqoniaMap.catObjsRoutes[idCat]).each(function(key, indexRoute) {
          var isVisible = scene.getObjectByName( indexRoute ).visible;
          if(isVisible == undefined) isVisible = true;
          isVisible = (isVisible ? false : true);
          scene.getObjectByName( indexRoute ).visible  = isVisible;
          if(scene.getObjectByName( indexRoute+'-first' ) != undefined)
            scene.getObjectByName( indexRoute+'-first' ).visible  = isVisible;
          if(scene.getObjectByName( indexRoute+'-last' ) != undefined)
            scene.getObjectByName( indexRoute+'-last' ).visible  = isVisible;
        });
  
        //-- Toggle systems particles
  
        $(ArqoniaMap.catObjs[idCat]).each(function(key, indexPoint) {
  
          obj = System.particleGeo.vertices[indexPoint];
  
          System.particleGeo.colors[indexPoint] = (active==1)
            ? obj.color
            : new THREE.Color('#111111');
  
          obj.visible = (active==1);
          obj.filtered = (active==1);
  
          System.particleGeo.colorsNeedUpdate = true;
  
          //-- Sum coords to detect the center & detect the most far point
          if(center == null) {
            center   = new THREE.Vector3(obj.x, obj.y, obj.z);
            pointFar = new THREE.Vector3(obj.x, obj.y, obj.z);
          } else {
            center.set(
              (center.x + obj.x),
              (center.y + obj.y),
              (center.z + obj.z)
            );
            if(
              (Math.abs(pointFar.x) - Math.abs(obj.x))+
              (Math.abs(pointFar.y) - Math.abs(obj.y))+
              (Math.abs(pointFar.z) - Math.abs(obj.z)) < 0
            ) {
              pointFar.set(obj.x, obj.y, obj.z);
            }
          }
          nbPoint++;
  
        });
  
        if(nbPoint==0) return;
  
        //------------------------------------------------------------------------
        //-- Calc center of all selected points
  
        center.set(
          Math.round(center.x/nbPoint),
          Math.round(center.y/nbPoint),
          -Math.round(center.z/nbPoint)
        );
  
        $(this).data('active',active);
        $(this).toggleClass('disabled');
  
        //-- If current selection is no more visible, disable active selection
        if(Action.oldSel != null && !Action.oldSel.visible) Action.disableSelection();
  
        //-- Calc max distance from center of selection
        var distance = pointFar.distanceTo( center )+200;
  
        //-- Set new camera & target position
        ArqoniaMap.playerPos = [center.x,center.y,center.z];
        ArqoniaMap.cameraPos = [
          center.x + (Math.floor((Math.random() * 100) + 1)-50), //-- Add a small rotation effect
          center.y + distance,
          center.z - distance
        ];
  
        Action.moveInitalPosition();
      });

  
    },
  
    'initFilters' : function(categories) {
  
      Loader.update('HUD Filter...');
  
      var grpNb = 1;
      $.each(categories, function(typeFilter, values) {
  
        if(typeof values === "object" ) {
  
          var groupId = 'group_'+grpNb;
          var nbFilters = values.length;
          var count = 0;
          var visible = true;
  
          $('#filters').append('<h2>'+typeFilter+'</h2>');
          $('#filters').append('<div id="'+groupId+'"></div>');
  
          $.each(values, function(key, val) {
  
            visible = true;
  
            //-- Manage view limit if activated
  
            if(ArqoniaMap.categoryAutoCollapseSize !== false) {
              count++;
              if(count>ArqoniaMap.categoryAutoCollapseSize) visible = false;
            }
  
            //-- Add filter
  
            HUD.addFilter(groupId, key, val, visible);
            ArqoniaMap.catObjs[key] = [];
  
          });
  
          grpNb++;
  
          //-- If more childs than 'categoryAutoCollapseSize' value
          //-- add the button to toggle items
  
          if(visible==false) {
  
            $('#'+groupId).append(
              '<a class="show_childs">'+
              '+ See more' +
              '</a>'
            ).click(function(){
              HUD.expandFilters(groupId);
            });
  
          }
        }
  
      });
  
  
    },

  
    'expandFilters' : function(groupId) {
  
      $('#'+groupId)
        .addClass('open');
  
      $('#hud').addClass('enlarge');
  
  
    },

    'removeFilters' : function() {
  
      $('#hud #filters').html('');
  
    },
  
    'addFilter' : function(groupId, idCat, val, visible) {
  
      //-- Add material, if custom color defined, use it
      var back = '#fff';
      var addClass = '';
  
      if(val.color != undefined) {
        ArqoniaMap.addCustomMaterial(idCat, val.color);
        back = '#'+val.color;
      }
  
      if(!visible) {
        addClass += ' hidden';
      }
  
      //-- Add html link
      $('#'+groupId).append(
        '<a class="map_filter'+addClass+'" data-active="1" data-filter="' + idCat + '">'+
        '<span class="check" style="background:'+back+'"> </span>' + val.name +
        '</a>'
      );
    },
  
  
    'setInfoPanel' : function(index, point) {
  
      $('#systemDetails').html(
        '<h2>'+point.name+'</h2>'+
        '<div class="coords">'+
        '  <span>'+point.x+'</span><span>'+point.y+'</span><span>'+(-point.z)+'</span></div>'+
        '  <p id="infos"></p>'+
        '</div>'+
        (point.infos != undefined ? '<div>'+point.infos+'</div>' : '')+
        '<div id="nav">'+
        '</div>'
      );
  */
  }