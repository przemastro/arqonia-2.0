var MilkyWay = {


  //---------------------------------
  //Load Texture
  //---------------------------------  
  'loadTexture' : function() {
    var img = new Image();
    var obj = this;
    
    img.onload = function () {
      obj.createCanvas(img, obj);
    };
    img.src = ArqoniaMap.basePath + 'assets/images/milkyway.jpg';
  },

  //---------------------------------
  //Create Canvas
  //--------------------------------
  'createCanvas' : function(img, obj) {
    var canvas = document.createElement( 'canvas' );
    canvas.width = img.width;
    canvas.height = img.height;
    console.log(canvas.height);
    var context = canvas.getContext( '2d' );

    var size = img.width * img.height;
    console.log(size);
    context.drawImage(img,0,0);

    document.body.appendChild(canvas);
    document.getElementById('arqoniamap').appendChild(canvas);
  }
}