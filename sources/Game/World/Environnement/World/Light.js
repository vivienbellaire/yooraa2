import * as THREE from 'three'

import Game from '../../../Game.js'

export default class Light
{
    constructor()
    {
        this.game = new Game()
        this.environment = this.game.environment

        this.scene = this.game.scene
        this.resources = this.game.resources
        this.debug = this.game.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Light')
        }

        // this.setSunLight()
           this.setAmbientLight()
           this.setDirectionalLight()
    }
    
    setAmbientLight()
    {
        /**
         * Ambient Light
        */
        this.ambiantLight = new THREE.AmbientLight( 0xffffff, 1)
        // const ambiantLight = new THREE.AmbientLight(0x111111, 0.2)
        this.scene.add(this.ambiantLight)
        console.log(this.ambiantLight)
    }

    setDirectionalLight()
    {
        /**
         * directionalLight
        */
        this.directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 2)
        // const directionalLight = new THREE.AmbientLight(0x111111, 0.2)
        this.directionalLight.position.set(45000,45000,45000)
        this.directionalLight.castShadow = true
        this.scene.add(this.directionalLight)
        console.log(this.directionalLight)


        // this.directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
        // this.helper = new THREE.DirectionalLightHelper( this.directionalLight, 5 );
        // this.scene.add( this.helper );
    }
}