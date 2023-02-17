import * as THREE from 'three'
import Game from './Game'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


export default class Camera
{
    constructor()
    {
        this.game = new Game()
        this.sizes = this.game.sizes
        this.scene = this.game.scene
        this.canvas = this.game.canvas

        this.setInstance()
        // this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 60000)
        this.instance.position.set(0, 3, -3)
        this.scene.add(this.instance)
    }

    setControls()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.enablePan = false

        // this.controls.enableZoom = true
        // this.controls.minDistance = 1
        // this.controls.maxDistance = 10
        // this.controls.zoomSpeed = 2
        
        // this.controls.enableRotate = true
        // this.controls.target()

        // this.controls = new PointerLockControls( this.instance, this.canvas );
        // this.scene.add( this.controls.getObject() );  
        // this.controls.isLocked === true
        // this.controls.lock()
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        // this.controls.update()
    }
}