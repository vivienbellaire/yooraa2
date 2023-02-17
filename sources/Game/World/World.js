import Game from '../Game.js'

import Landscape from './Environnement/World/Landscape.js'
import Light from './Environnement/World/Light.js'
import Environment from './Environnement/World/Environment.js'
import Player from './Environnement/World/Player.js'


export default class World
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.landscape = new Landscape()
            this.light = new Light()
            this.environment = new Environment()
            this.player = new Player()
        })
    }

    update()
    {
        if(this.player)
            this.player.update()
    }
}