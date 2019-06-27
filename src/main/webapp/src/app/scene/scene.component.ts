import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import "./js/EnableThreeExamples";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";
import {Galaxy} from './galaxy'

@Component({
    selector: 'scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.css'],
    providers: [Galaxy]
})
export class SceneComponent implements AfterViewInit {

    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;

    public scene: THREE.Scene;

    public fieldOfView: number = 60;
    public nearClippingPane: number = 1;
    public farClippingPane: number = 1100;
    public galaxyImage: 'assets/images/milkyway.jpg';
    public basePath: './';
    public milkyway2D: null;
    public flareYellow: 'assets/images/flare_yellow.png';
    public flareWhite: 'assets/images/flare_white.png';
    public textures: {};
    public material: {};

    public controls: THREE.OrbitControls;

    @ViewChild('canvas')
    private canvasRef: ElementRef;

    constructor(
        private galaxy: Galaxy
    ) {
        this.render = this.render.bind(this);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    private createScene() {
        //create scene
        this.scene = new THREE.Scene();
        this.scene.visible = true;
    }


    private createLight() {
        //HemisphereLight
        var light = new THREE.HemisphereLight(0x0000ff, 0xcccccc);
        light.position.set(-0.2, 0.5, 0.8).normalize();
        this.scene.add(light);
    }

    private createCamera() {
        //let aspectRatio = this.getAspectRatio();
        //specify camera type
        this.camera = new THREE.PerspectiveCamera(
            45, 
            this.canvas.offsetWidth / this.canvas.offsetHeight, 
            1, 
            10000);
        //specify camera position
        this.camera.position.set(1, 1, 1);
        //focus camera to certain position
        this.camera.lookAt(1,1,1);
    }

    private startRendering() {
        //WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //this.renderer.setClearColor(0xffffff, 1);
        this.renderer.autoClear = true;

         //this.renderer.setClearColor(0x000000, 1);
         //this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
         //this.renderer.domElement.style.zIndex = 5;
         //this.canvas.appendChild(this.renderer.domElement);


        let component: SceneComponent = this;

        (function render() {
            //requestAnimationFrame(render);
            component.render();
        }());
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public addControls() {
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.rotateSpeed = 0.6;
        this.controls.zoomSpeed = 2.0;
        this.controls.panSpeed = 0.8;
        this.controls.maxDistance = 9000;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.05;
        this.controls.enableZoom=1;
        this.controls.addEventListener('change', this.render);
    }

    /*
    //load textures for stars
    public starsTextures() {
        var texloader = new THREE.TextureLoader();
        this.textures.flare_white = texloader.load(this.basePath + this.flareWhite);
        this.textures.flare_yellow = texloader.load(this.basePath + this.flareYellow);
    
        //Specify properties of stars maps
        this.material.flare_yellow = new THREE.SpriteMaterial({
           map: this.textures.flare_yellow,
           color: 0xffffff, transparent: false,
           fog: true
        });
        this.material.flare_white = new THREE.SpriteMaterial({
           map: this.textures.flare_white,
           transparent: true,
           blending: THREE.AdditiveBlending,
           depthWrite: false,
           opacity: 0.9
        });
    }*/

    /* LIFECYCLE */
    ngAfterViewInit() {
        this.createScene();
        this.createLight();
        this.createCamera();
        this.startRendering();
        this.addControls();
        //this.starsTextures();
        this.galaxy.add2DImage(this.scene, this.camera);
   }
}