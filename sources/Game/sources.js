export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/right.png',
            'textures/environmentMap/left.png',
            'textures/environmentMap/top.png',
            'textures/environmentMap/bottom.png',
            'textures/environmentMap/front.png',
            'textures/environmentMap/back.png'
        ]
    },
    // {
    //     name: 'grassColorTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/color.jpg'
    // },
    // {
    //     name: 'grassNormalTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/normal.jpg'
    // },
    {
        name: 'landscapeModel',
        type: 'gltfModel',
        path: 'models/Landscape/landscape-6.glb'
    },
    {
        name: 'playerModel',
        type: 'gltfModel',
        path: 'models/Players/Player2.glb'
    },
    // {
    //     name: 'PlayerModel',
    //     type: 'audio',
    //     path: 'models/Players/Player2.glb'
    // }
]