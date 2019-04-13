
var Galaxy = {

  'obj' : null,
  'milkyway' : [],
  'milkyway2D' : null,

  //center coordinates
  'x' : 0,
  'y' : 0,
  'z' : 0,

  'createGalaxy' : function () {

    var objValue = new Object;
    objValue.coords = {'x':this.y,'y':this.y,'z':this.z};
    objValue.cat = [];

    this.obj = Galaxy.createSphere(objValue);

    //Firstly use loaded stars textures with known properties (defined material)
    //Having thins we can crate a sprites which are special kind of rendering of elements 
    //Elements are always flat on the screen. It does not matter if we rotate we always see the same plane image
    var sprite = new THREE.Sprite( ArqoniaMap.material.flare_white );
    sprite.scale.set(10, 40, 2.0);
    this.obj.add(sprite); /// this centers the glow at the mesh

    //add stars to the Galaxy and add to these stars textures by means of sprites
    this.addStars();

    //add mesh using 2D image
    this.add2DImage();

  },

  'createSphere' : function(objValue) {
    if(objValue.coords==undefined) return false;

    var x = parseInt(objValue.coords.x);
    var y = parseInt(objValue.coords.y);
    var z = -parseInt(objValue.coords.z); 

    var mat = ArqoniaMap.material.flare_yellow;
    var sprite = new THREE.Sprite( mat );
    sprite.position.set(x, y, z);
    sprite.scale.set(50, 50, 1.0);
    scene.add(sprite); // this centers the glow at the mesh

    //Sphere
    var geometry = new THREE.SphereGeometry(2, 10, 10);
    var sphere = new THREE.Mesh(geometry, ArqoniaMap.material.white);
    sphere.position.set(x, y, z);
    sphere.name = objValue.name;
    sphere.clickable = true;
    sphere.idsprite = sprite.id;
    scene.add(sphere);

    return sphere;
  },

  //Create Canvas, add objects and set camera position
  'addStars' : function () {

    var img = new Image();
    var obj = this;

    img.onload = function () {
       obj.createCanvasAndLoadData(img, obj);
       camera.position.set(-1000, 10000, 50000);
    };

    //load img source
    img.src = ArqoniaMap.basePath + ArqoniaMap.galaxyImage;
  },

  'add2DImage' : function() {

    //load texture
    var texloader = new THREE.TextureLoader();

    //Load image for plane geometry - mesh
    var back2D = texloader.load(ArqoniaMap.basePath + ArqoniaMap.galaxyImage);

   //define material for drawing plane geometry, e.g. image, transpareny, opacity etc.
    var floorMaterial = new THREE.MeshBasicMaterial( {
      map: back2D,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      //visible two sides of a picture
      side: THREE.DoubleSide
    } );

    //generate plane geometries. define size of a plane geometry
    var floorGeometry = new THREE.PlaneGeometry(79000, 79000, 1, 1);
    //Makes object using trinagular meshes. It requires definition of materials for meshes and geometry of an object
    this.milkyway2D = new THREE.Mesh(floorGeometry, floorMaterial);
    //set center position in mesh - plane geometry
    this.milkyway2D.position.set(this.x, this.y, -this.z);
    //set mesh horizontal a rotates by x axis
    this.milkyway2D.rotation.x = Math.PI / 2;
    //add mesh to scene
    scene.add(this.milkyway2D);

  },


  'createCanvasAndLoadData' : function(img, obj) {

    
    var canvas = document.createElement( 'canvas' );
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext( '2d' );
    context.drawImage(img,0,0);
    this.loadDataFromFile(obj);
  },

  'loadDataFromFile' : function(obj) {
    $.when( 
      $.getJSON("assets/data/objects.json")
    ).done(function(data){
      console.log(data);
      var colors = [];
      j=0;  
      var particles = new THREE.Geometry;
      for (var key in data) {
        console.log(key);
        var particle = new THREE.Vector3(data[key].x,data[key].y,data[key].z);
        particles.vertices.push(particle);
        colors[j] = new THREE.Color(data[key].color);
        j++;
      }
        particles.colors = colors;
        console.log(particles);
    
        var particleMaterial = new THREE.PointsMaterial({
          map: ArqoniaMap.textures.flare_yellow,
          transparent: true,
          vertexColors: THREE.VertexColors,
          sizeAttenuation: true,
          size: 50,
          blending: THREE.AdditiveBlending,
          depthTest: true,
          depthWrite: false
        });
    
        var points = new THREE.Points(particles, particleMaterial);
        points.sortParticles = true;
        particles.center();
  
        obj.milkyway[1] = points;
        obj.milkyway[1].scale.set(20,20,20);
    
        obj.obj.add(points);     
      
      console.log(obj.milkyway[1]);
      return obj.milkyway[1];
    });
  }
}
