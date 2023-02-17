import * as THREE from 'three'
import { Vector3 } from 'three';


import { Octree } from 'three/addons/math/Octree.js';


import Game from '../../../Game.js'


export default class Player
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.camera = this.game.camera
        this.resources = this.game.resources
        this.time = this.game.time

        // Resource
        this.resource = this.resources.items.playerModel

        this.setModel()
        this.setMoveSet()
    }

    setModel()
    {
        // this.worldOctree = new Octree();

        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, 3000, 0)
        this.scene.add(this.model)

        // this.worldOctree.fromGraphNode(this.model);

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
                
            }
        })

    this.model.add(this.camera.instance)

    this.camera.instance.lookAt(this.model.position)


    this.mouseTime = 0

    document.body.addEventListener( 'mousedown', () => {

        document.body.requestPointerLock();

        this.mouseTime = performance.now();

    });

    document.body.addEventListener( 'mousemove', ( event ) => {

        if ( document.pointerLockElement === document.body ) {

            this.model.rotation.y -= event.movementX / 800;
            this.model.rotation.x -= event.movementY / 800;
        }

    });

    }

    setMoveSet()
    {
        this.keys = {};

        document.addEventListener("keydown", event => {
            this.keys[event.code] = true;
            // console.log(this.keys["keydown"]) 
        });

        document.addEventListener("keyup", event => {
            this.keys[event.code] = false;
        }); 
                      
    }

    update()
    {


        
        this.speed = 30;
        this.modelDirection = new THREE.Vector3();
        
        if (this.keys["KeyW"]) {
            
            this.modelDirection.copy(this.camera.instance.getWorldDirection(new Vector3())).multiplyScalar(this.speed);
            console.log(this.keys["KeyW"])
        }
        if (this.keys["KeyS"]) {
            this.modelDirection.copy(this.camera.instance.getWorldDirection(new Vector3())).multiplyScalar(- this.speed);
        }
        if (this.keys["KeyA"]) {
            this.model.rotation.y += this.speed / 1000
        }
        if (this.keys["KeyD"]) {
            this.model.rotation.y -= this.speed / 1000
        }
        if (this.keys["KeyQ"]) {
            this.model.rotation.z += this.speed / 1000
        }
        if (this.keys["KeyE"]) {
            this.model.rotation.z -= this.speed / 1000
        }
        if (this.keys["KeyF"]) {
            this.model.position.y += this.speed 
        }
        if (this.keys["KeyC"]) {
            this.model.position.y -= this.speed 
        }
        if (this.keys["KeyR"]) {
            this.model.position.set(100,100,100)
        }

        // this.modelDirection.applyQuaternion(this.camera.instance.quaternionq)
        this.model.position.add(this.modelDirection);
    }
}

