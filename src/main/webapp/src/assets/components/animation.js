function animate(time) {

  if(scene.visible == false) {
    requestAnimationFrame( animate );
    return;
  }

  refreshWithCamPos();

  controls.update();

  TWEEN.update(time);

  renderer.render(scene, camera);

  $('#cx').html(Math.round(controls.target.x));
  $('#cy').html(Math.round(controls.target.y));
  $('#cz').html(Math.round(-controls.target.z)); // Reverse z coord

  //Change selection cursor size depending on camera distance

  var scale = distanceFromTarget(camera)/200;

  if(scale>25) {
    enableFarView(scale);
  } else {
    disableFarView(scale);
  }
  requestAnimationFrame( animate );
}

var isFarView = false;

function enableFarView (scale, withAnim) {

  if(isFarView || this.Galaxy == null) return;
  if(withAnim == undefined) withAnim = true;

  isFarView = true;

  //Scale change animation
  var scaleFrom = {zoom:150};
  var scaleTo = {zoom:500};
  if(withAnim) {

    var obj = this;

    ArqoniaMap.tween = new TWEEN.Tween(scaleFrom, {override:true}).to(scaleTo, 500)
      .start()
      .onUpdate(function () {
        setTimeout(
          function() 
          {
            obj.Galaxy.milkyway[1].material.size = scaleFrom.zoom*4;
          }, 1000);
        //obj.Galaxy.milkyway[1].material.size = scaleFrom.zoom*4;
      });

  } else {
    this.Galaxy.milkyway[1].material.size = scaleTo*4;
  }

  //Enable 2D galaxy
  this.Galaxy.milkyway2D.visible = true;
  scene.fog.density = 0.000009;
}

function disableFarView(withAnim) {

  if(!isFarView) return;
  if(withAnim == undefined) withAnim = true;

  isFarView = false;

  //Scale change animation

  var scaleFrom = {zoom:250};
  var scaleTo = {zoom:64};
  if(withAnim) {

    var obj = this;

    //controls.enabled = false;
    ArqoniaMap.tween = new TWEEN.Tween(scaleFrom, {override:true}).to(scaleTo, 500)
      .start()
      .onUpdate(function () {
        setTimeout(
          function() 
          {
            obj.Galaxy.milkyway[1].material.size = scaleFrom.zoom;
          }, 1000);
        //obj.Galaxy.milkyway[1].material.size = scaleFrom.zoom;
      });

  } else {
    this.Galaxy.milkyway[1].material.size = scaleTo;
  }

  //Disable 2D galaxy
  this.Galaxy.milkyway2D.visible = false;
  camera.scale.set(1,1,1);
  scene.fog.density = ArqoniaMap.fogDensity;
}


function render() {
  renderer.render(scene, camera);
}

function refresh3dMapSize () {
  if(renderer != undefined) {
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    if(width<100) width = 100;
    if(height<100) height = 100;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

window.addEventListener('resize', function () {
  refresh3dMapSize();
});


function distance (v1, v2) {
    var dx = v1.position.x - v2.position.x;
    var dy = v1.position.y - v2.position.y;
    var dz = v1.position.z - v2.position.z;

    return Math.round(Math.sqrt(dx*dx+dy*dy+dz*dz));
}

function distanceFromTarget (v1) {
    var dx = v1.position.x - controls.target.x;
    var dy = v1.position.y - controls.target.y;
    var dz = v1.position.z - controls.target.z;

    return Math.round(Math.sqrt(dx*dx+dy*dy+dz*dz));
}

var camSave = {'x':0,'y':0,'z':0};


function refreshWithCamPos() {

  var d = new Date();
  var n = d.getTime();

  if(n % 1 != 0) return;


  //Refresh only if the camera moved
  var p = ArqoniaMap.optDistObj/2;
  if(
    camSave.x == Math.round(camera.position.x/p)*p &&
    camSave.y == Math.round(camera.position.y/p)*p &&
    camSave.z == Math.round(camera.position.z/p)*p
  ) return;

  //Save new pos

  camSave.x = Math.round(camera.position.x/p)*p;
  camSave.y = Math.round(camera.position.y/p)*p;
  camSave.z = Math.round(camera.position.z/p)*p;

}
