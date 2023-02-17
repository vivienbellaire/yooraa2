import * as THREE from 'three'

import { Sky } from 'three/addons/objects/Sky.js';

import Game from '../../../Game.js'


export default class Environment
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.debug = this.game.debug

        this.renderer = this.game.renderer
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        console.log(this.resources)
        
        this.setEnvironmentMap()
        this.setSky()
        this.setFog()
    }
    
    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        // this.scene.environment = this.environmentMap.texture
        this.scene.background = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()



        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder
        //         .add(this.environmentMap, 'intensity')
        //         .name('envMapIntensity')
        //         .min(0)
        //         .max(4)
        //         .step(0.001)
        //         .onChange(this.environmentMap.updateMaterials)
        // }
    }

    setSky()
    {
        // Add Sky
        this.sky = new Sky();

        this.sky.scale.setScalar( 55000 );
        // this.sky.color.setScalar( intensity );
		this.scene.add( this.sky )
        
        this.sun = new THREE.Vector3();
        

        this.moon = new THREE.Vector3();

        ///GUI
        this.effectController = {
            turbidity: 1,
            rayleigh: 0.2,
            mieCoefficient: 0,
            mieDirectionalG: 1,
            elevation: 20,
            azimuth: 270,
            exposure: this.renderer.instance.toneMappingExposure
        }

        
        this.effectController.updateMaterials = () =>
        {
        this.uniforms = this.sky.material.uniforms;
        this.uniforms['turbidity'].value = this.effectController.turbidity;
        this.uniforms['rayleigh'].value = this.effectController.rayleigh;
        this.uniforms['mieCoefficient'].value = this.effectController.mieCoefficient;
        this.uniforms['mieDirectionalG'].value = this.effectController.mieDirectionalG;

        this.phi = THREE.MathUtils.degToRad(90 - this.effectController.elevation);
        this.theta = THREE.MathUtils.degToRad(this.effectController.azimuth);

        this.sun.setFromSphericalCoords(1, this.phi, this.theta);

        this.uniforms['sunPosition'].value.copy(this.sun);
        
        this.renderer.instance.toneMappingExposure = this.effectController.exposure;
        
        }
        this.effectController.updateMaterials()


        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.effectController, 'turbidity')
                .name('turbidity')
                .min(0)
                .max(20)
                .step(0.1)
                .onChange(this.effectController.updateMaterials)
            
            this.debugFolder
                .add(this.effectController, 'rayleigh')
                .name('rayleigh')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.effectController.updateMaterials)
            
            this.debugFolder
                .add(this.effectController, 'mieCoefficient')
                .name('mieCoefficient')
                .min(0)
                .max(0.1)
                .step(0.001)
                .onChange(this.effectController.updateMaterials)
            
            this.debugFolder
                .add(this.effectController, 'mieDirectionalG')
                .name('mieDirectionalG')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(this.effectController.updateMaterials)

            this.debugFolder
                .add(this.effectController, 'elevation')
                .name('elevation')
                .min(0)
                .max(180)
                .step(0.1)
                .onChange(this.effectController.updateMaterials)
        
            this.debugFolder
                .add(this.effectController, 'azimuth')
                .name('azimuth')
                .min(0)
                .max(360)
                .step(0.1)
                .onChange(this.effectController.updateMaterials)

            this.debugFolder
                .add(this.effectController, 'exposure')
                .name('exposure')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(this.effectController.updateMaterials)
        }
    }
    
    setFog()
    {
        this.scene.fog = new THREE.FogExp2( 0x33AADD, 0.000100)
        // this.scene.fog = new THREE.Fog( 0xAA22AA, 1, 10000)        
    }
}

