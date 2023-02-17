import * as dat from 'lil-gui'

import Stats from 'three/addons/libs/stats.module.js'


export default class Debug
{
    constructor()
    {

        this.active = window.location.hash === '#debug'
       
        if(this.active)
        {
            this.ui = new dat.GUI()
        }

        this.setStat()
    }

    setStat()
    {
        /**
         * stats
         */
        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom)
    }

    update()
    {
        this.stats.end() 
        // ...
        this.stats.begin()
        
    }
}