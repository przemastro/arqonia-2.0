//--
var camera;
var controls;
var scene;
var light;
var renderer;

var raycaster;

var composer;

//-- Map Vars
var container;
var routes = [];
var lensFlareSel;


var ArqoniaMap = {

  'container'           : null,
  'basePath'            : './',

  'jsonPath'            : null,
  'jsonContainer'       : null,
  'json'                : null,

  'tween'               : null,

  'globalView'          : true,

  //-- Fog density save
  'fogDensity'          : null,

  //-- Defined texts
  'textSel'             : [],

  //-- Object list by categories
  'catObjs'             : [],
  'catObjsRoutes'       : [],

  //-- Materials
  'material'            : {
    'Trd' : new THREE.MeshBasicMaterial({
      color: 0xffffff
    }),
    'line' : new THREE.LineBasicMaterial({
      color: 0xcccccc
    }),
    'white' : new THREE.MeshBasicMaterial({
      color: 0xffffff
    }),
    'orange' : new THREE.MeshBasicMaterial({
      color: 0xFF9D00
    }),
    'black' : new THREE.MeshBasicMaterial({
      color: 0x010101
    }),
    'lightblue' : new THREE.MeshBasicMaterial({
      color: 0x0E7F88
    }),
    'darkblue' : new THREE.MeshBasicMaterial({
      color: 0x16292B
    }),
    'selected' : new THREE.MeshPhongMaterial({
      color: 0x0DFFFF
    }),
    'grey' : new THREE.MeshPhongMaterial({
      color: 0x7EA0A0
    }),
    'transparent' : new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0
    }),
    'glow_1'            : null,
    'custom'            : []
  },

  'starSprite' : 'assets/images/star_grey2.png',

  'colors'              : [],
  'textures'            : {},

  //-- Default color for system sprite
  'systemColor'         : '#eeeeee',

  //-- HUD
  'withHudPanel'        : false,
  'withOptionsPanel'    : true,
  'hudMultipleSelect'   : true,

  //-- Systems
  'systems'             : [],

  //-- Starfield
  'starfield'           : null,

  //-- Start animation
  'startAnim'           : true,

  //-- Scale system effect
  'effectScaleSystem'   : [10,800],

  //-- Graphical Options
  'optDistObj'          : 1500,

  //-- Player position
  'playerPos'           : [0, 0, 0],

  //-- Initial camera position
  'cameraPos'           : null,

  //-- Active 2D top view
  'isTopView'           : false,

  //-- Show galaxy infos
  'showGalaxyInfos'     : false,

  //-- Show names near camera
  'showNameNear'     : false,

  //-- Popup mode for click on detal
  'popupDetail'      : false,

  //-- Objects
  'Action' : null,
  'Galaxy' : null,

  //-- With button to toggle fullscreen
  'withFullscreenToggle' : false,

  //-- Collapse subcategories (false: don't collapse)
  'categoryAutoCollapseSize' : false,

  /**
   * Init ArqoniaMap map
   *
   */

  'init' : function(options) {
    // Merge options with defaults ArqoniaMap
    var options = $.extend(ArqoniaMap, options);

    //-- Init 3D map container
    $('#'+ArqoniaMap.container).append('<div id="ArqoniaMap"></div>');


    if(typeof isMinified !== 'undefined') return ArqoniaMap.launchMap();

    $.when(

        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/OrbitControls.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/CSS3DRenderer.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/Projector.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/FontUtils.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/helvetiker_regular.typeface.js"),

        $.getScript(ArqoniaMap.basePath + "assets/components/system.class.2.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/galaxy.class.2.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/animation.js"),

        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/tween-js/Tween.js")

    ).done(function() {
      ArqoniaMap.launchMap();
    });

  },


  'initObjects' : function(options) {
    this.Galaxy = Galaxy;
  },


  'launchMap' : function() {
    this.initObjects();
    ArqoniaMap.loadTextures();
    ArqoniaMap.initScene();
    ArqoniaMap.skyboxStars();
    this.Galaxy.addGalaxyCenter();
    ArqoniaMap.showScene();
    animateMe();
  },


  'loadTextures' : function() {
    var texloader = new THREE.TextureLoader();
    this.textures.flare_white = texloader.load(ArqoniaMap.basePath + "assets/images/flare2.png");
    this.textures.flare_yellow = texloader.load(ArqoniaMap.basePath + ArqoniaMap.starSprite);
    this.textures.flare_center = texloader.load(ArqoniaMap.basePath + "assets/images/flare3.png");

    ArqoniaMap.material.glow_1 = new THREE.SpriteMaterial({
      map: this.textures.flare_yellow,
      color: 0xffffff, transparent: false,
       fog: true
    });
    ArqoniaMap.material.glow_2 = new THREE.SpriteMaterial({

      map: ArqoniaMap.textures.flare_white,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9
    });

  },


  'initScene' : function() {
    
    container = document.getElementById("ArqoniaMap");

    //Scene
    scene = new THREE.Scene();
    scene.visible = false;

    //camera
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 200000);
    camera.position.set(0, 0, 0);

    //HemisphereLight
    light = new THREE.HemisphereLight(0xffffff, 0xcccccc);
    light.position.set(-0.2, 0.5, 0.8).normalize();
    scene.add(light);

    //WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.domElement.style.zIndex = 5;
    container.appendChild(renderer.domElement);

    //controls
    controls = new THREE.OrbitControls(camera, container);
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 2.0;
    controls.panSpeed = 0.8;
    controls.maxDistance = 90000;
    controls.enableZoom=1;controls.enablePan=1;controls.enableDamping=!0;controls.dampingFactor=.3;

    // Add Fog
    scene.fog = new THREE.FogExp2(0x000000, 0.000128);
    renderer.setClearColor(scene.fog.color, 1);
    ArqoniaMap.fogDensity = scene.fog.density;
  },

  'showScene' : function() {
      scene.visible = true;
  },

  'skyboxStars' : function() {

    var sizeStars = 200;

    var particles = new THREE.Geometry;
    for (var p = 0; p < 10; p++) {
      var particle = new THREE.Vector3(
        Math.random() * sizeStars - (sizeStars / 2),
        Math.random() * sizeStars - (sizeStars / 2),
        Math.random() * sizeStars - (sizeStars / 2)
      );
      particles.vertices.push(particle);
    }

    var particleMaterial = new THREE.PointsMaterial({
      color: 0xeeeeee,
      size: 2
    });
    this.starfield = new THREE.Points(particles, particleMaterial);


    scene.add(this.starfield);
  }
}


