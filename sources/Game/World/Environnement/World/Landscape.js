import * as THREE from 'three'


import { Octree } from 'three/addons/math/Octree.js';


import Game from '../../../Game.js'


export default class Landscape
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.time = this.game.time

        // Resource
        this.resource = this.resources.items.landscapeModel

        this.setModel()
    }

    setModel()
    {
        // this.worldOctree = new Octree();

        this.model = this.resource.scene
        this.model.scale.set(1000, 1000, 1000)
        this.model.position.set(0,- 3000, 0)
        this.scene.add(this.model)

        // this.worldOctree.fromGraphNode(this.model);

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
                console.log(child)
            }
        })
    }
}

