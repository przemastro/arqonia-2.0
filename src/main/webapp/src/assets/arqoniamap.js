
var camera;
var controls;
var scene;
var light;
var renderer;
var container;


var ArqoniaMap = {

  'container'           : null,
  'basePath'            : './',
  'jsonPath'            : 'assets/data',
  'tween'               : null,
  'fogDensity'          : null,
  'material'            : {},

  'galaxyImage'         : 'assets/images/milkyway.jpg',
  'flareYellow'         : 'assets/images/flare_yellow.png',
  'flareWhite'          : 'assets/images/flare_white.png',

  'colors'              : [],
  'textures'            : {},
  'systemColor'         : '#eeeeee',
  'optDistObj'          : 2500,
  'Galaxy' : null,


  'init' : function(options) {
    //Merge options with defaults ArqoniaMap
    var options = $.extend(ArqoniaMap, options);

    //Init 3D map container
    $('#'+ArqoniaMap.container).append('<div id="ArqoniaMap"></div>');

    $.when(
        $.getScript(ArqoniaMap.basePath + "assets/components/galaxy.class.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/filters.class.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/animation.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/three-js/OrbitControls.js"),
        $.getScript(ArqoniaMap.basePath + "assets/components/vendor/tween-js/Tween.js")

    ).done(function() {
      ArqoniaMap.launchMap();
    });

  },

  'launchMap' : function() {
    console.log("colors: " + this.colors);
    this.Galaxy = Galaxy;
    this.Filters = Filters;
    ArqoniaMap.starsTextures();
    ArqoniaMap.initScene();
    
    this.Galaxy.createGalaxy(this.colors);
    this.Filters.create("ArqoniaMap");
    scene.visible = true;
    animate();
  },

  //load textures for stars
  'starsTextures' : function() {
    var texloader = new THREE.TextureLoader();
    this.textures.flare_white = texloader.load(ArqoniaMap.basePath + ArqoniaMap.flare_white);
    this.textures.flare_yellow = texloader.load(ArqoniaMap.basePath + ArqoniaMap.flareYellow);
    
    //Specify properties of stars maps
    ArqoniaMap.material.flare_yellow = new THREE.SpriteMaterial({
      map: this.textures.flare_yellow,
      color: 0xffffff, transparent: false,
      fog: true
    });
    ArqoniaMap.material.flare_white = new THREE.SpriteMaterial({
      map: ArqoniaMap.textures.flare_white,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9
    });
  },

  'initScene' : function() {
    container = document.getElementById("ArqoniaMap");

    //create scene
    scene = new THREE.Scene();
    scene.visible = false;

    //specify camera type
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 200000);
    //specify camera position
    camera.position.set(0, 0, 0);
    //focus camera to certain position
    camera.lookAt(0,0,0);

    //HemisphereLight
    light = new THREE.HemisphereLight(0x0000ff, 0xcccccc);
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

    //controls for mesh
    controls = new THREE.OrbitControls(camera, container);
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 2.0;
    controls.panSpeed = 0.8;
    controls.maxDistance = 90000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.05;
    controls.enableZoom=1;controls.enablePan=1;controls.enableDamping=!0;controls.dampingFactor=.3;

    //add fog
    scene.fog = new THREE.FogExp2(0x000000, 0.000128);
    renderer.setClearColor(scene.fog.color, 1);
    ArqoniaMap.fogDensity = scene.fog.density;
  }
}


