import * as THREE from 'three';

export class Galaxy {
    public add2DImage(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        console.log('./assets/images/milkyway.jpg');
        //load texture
        var texloader = new THREE.TextureLoader();
    
        //Load image for plane geometry - mesh
        var back2D = texloader.load('../assets/images/milkyway.jpg');
    
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
        var floorGeometry = new THREE.PlaneGeometry(700, 700, 1, 1);
        //Makes object using trinagular meshes. It requires definition of materials for meshes and geometry of an object
        var milkyway2D = new THREE.Mesh(floorGeometry, floorMaterial);
        //set center position in mesh - plane geometry
        milkyway2D.position.set(camera.position.x, camera.position.y, -camera.position.z);
        //set mesh horizontal a rotates by x axis
        milkyway2D.rotation.x = Math.PI / 2;
        //add mesh to scene
        scene.add(milkyway2D);
      };
    }
