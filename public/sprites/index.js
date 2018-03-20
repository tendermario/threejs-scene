// // Helper functions

// Custom cubemap creator
function getTexturesFromCubeMapFile ( atlasImgUrl, tilesNum = 6, tileY = 1, rearrange = false ) {
  const textures = [];
  for (  let i = 0; i < 6; i ++ ) {
    textures[ i ] = new THREE.Texture();
  }
  let imageObj = new Image();
  imageObj.onload = function() {
    let canvas, context;
    let tileWidth = imageObj.height / tileY;
    for (  let i = 0; i < textures.length; i ++ ) {
      canvas = document.createElement( 'canvas' );
      context = canvas.getContext( '2d' );
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      const y = i % tileY;
      const x = Math.floor(i / tileY);
      context.drawImage( imageObj, tileWidth * x, tileWidth * y, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
      textures[ i ].image = canvas
      textures[ i ].needsUpdate = true;
    }
  };
  imageObj.src = atlasImgUrl;

  // Custom code for our own cubemaps layout
  if (rearrange) {
    const rearrangedTextures = [];
    rearrangedTextures[0] = textures[0]
    rearrangedTextures[1] = textures[1]
    rearrangedTextures[2] = textures[4]
    rearrangedTextures[3] = textures[5]
    rearrangedTextures[4] = textures[3]
    rearrangedTextures[5] = textures[2]
    textureRotate(rearrangedTextures[3])
    textureInvert(rearrangedTextures[3])
    return rearrangedTextures
  }
  return textures;
}

// Function for rotating a texture
function textureRotate (texture, quarterRotations = 1) {
  texture.center.set(0.5,0.5);
  texture.rotation = Math.PI/2 * quarterRotations;
}
function textureInvert(texture) {
  texture.repeat.x = -1;
}

// Function for turning an array of textures into a cube
function getMeshFromCubeTextures(textures, size = 10) {
  const materials = [];
    for ( let i = 0; i < 6; i ++ ) {
      materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );
    }
    const geometry = new THREE.BoxGeometry( size, size, size );
    const mesh = new THREE.Mesh( geometry, materials );
    mesh.geometry.scale( -1, 1, 1 );
    return mesh;
}

function degreesToRadians(degrees) {
  return degrees *= Math.PI / 90
}

function spinSprite(sprite, ath, atv) {
  ath = degreesToRadians(ath)
  atv = degreesToRadians(atv)
  sprite.position.applyAxisAngle( new THREE.Vector3( 1, 0, 0 ), atv );
  sprite.position.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), ath );
}

// Data 

const tour = {
  "id": "ed2b966152974849b0485781880bd721",
  "name": "Test2",
  "thumbUrl": "",
  "thumbUrlPkm": "",
  "groupId": "aadc283029814b6a8e9906e28fc617f8",
  "startIndex": 0,
  "locations": [
    {
      "links": [
        {
          "ath": -86.837,
          "atv": 4.131,
          "destination": 8
        },
        {
          "ath": -22.403,
          "atv": 2.486,
          "destination": 2
        }
      ],
      "name": "Entrance",
      "north": 180,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_ENT.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_ENT.pkm"
    },
    {
      "links": [
        {
          "ath": 59.692,
          "atv": 2.279,
          "destination": 2
        },
        {
          "ath": -16.153,
          "atv": 3.543,
          "destination": 7
        },
        {
          "ath": 160.348,
          "atv": 2.35,
          "destination": 4
        }
      ],
      "name": " BedRoom A 1",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_1.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_1.pkm"
    },
    {
      "links": [
        {
          "ath": -22.843,
          "atv": -0.116,
          "destination": 0
        },
        {
          "ath": -13.2,
          "atv": 9.572,
          "destination": 3
        },
        {
          "ath": -104.154,
          "atv": 1.218,
          "destination": 1
        },
        {
          "ath": 159.121,
          "atv": 2.1,
          "destination": 6
        },
        {
          "ath": 4.881,
          "atv": 0.708,
          "destination": 8
        }
      ],
      "name": " LivingRoom",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_LivingRoom.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_LivingRoom.pkm"
    },
    {
      "links": [
        {
          "ath": 123.38,
          "atv": 8.541,
          "destination": 2
        },
        {
          "ath": -15.141,
          "atv": 0.513,
          "destination": 0
        },
        {
          "ath": 36.586,
          "atv": 3.928,
          "destination": 8
        },
        {
          "ath": 162.858,
          "atv": 2.77,
          "destination": 6
        },
        {
          "ath": -162.54,
          "atv": 12.931,
          "destination": 1
        }
      ],
      "name": " DiningRoom",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_DiningRoom.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_DiningRoom.pkm"
    },
    {
      "links": [
        {
          "ath": -17.645,
          "atv": 7.143,
          "destination": 1
        },
        {
          "ath": 9.388,
          "atv": 2.892,
          "destination": 2
        },
        {
          "ath": -27.28,
          "atv": -2.053,
          "destination": 7
        }
      ],
      "name": " BedRoom A 2",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_2.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_2.pkm"
    },
    {
      "links": [
        {
          "ath": -165.693,
          "atv": 2.907,
          "destination": 7
        }
      ],
      "name": " WashRoom",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_WashRoom.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_WashRoom.pkm"
    },
    {
      "links": [
        {
          "ath": -60.202,
          "atv": 0.214,
          "destination": 1
        },
        {
          "ath": -12.182,
          "atv": 3.087,
          "destination": 2
        },
        {
          "ath": -28.278,
          "atv": -4.515,
          "destination": 0
        }
      ],
      "name": " LivingRoom 2",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_LivingRoom_2.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_LivingRoom_2.pkm"
    },
    {
      "links": [
        {
          "ath": -177.634,
          "atv": 3.543,
          "destination": 1
        },
        {
          "ath": 388.678,
          "atv": 11.183,
          "destination": 5
        }
      ],
      "name": " BedRoom A 3",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_3.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_BedRoom_A_3.pkm"
    },
    {
      "links": [
        {
          "ath": -97.086,
          "atv": 1.091,
          "destination": 0
        },
        {
          "ath": -176.222,
          "atv": 5.576,
          "destination": 2
        },
        {
          "ath": -134.645,
          "atv": 6.591,
          "destination": 3
        }
      ],
      "name": " Kitchen",
      "north": 0,
      "panoUrl": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_Kitchen.png",
      "panoUrlPkm": "https://s3.amazonaws.com/uforis.tours.dev/processed/2/tours/ed2b966152974849b0485781880bd721/scene_TXT_Kitchen.pkm"
    }
  ]
}

const {startIndex} = tour
const firstArea = tour.locations[startIndex]
const {north} = firstArea

// Visualizer object
function Visualizer() {
  this.initScene = () => {
    this.scene = new THREE.Scene()
  }
  this.initCamera = () => {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = -1
  }
  this.initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )
  }
  this.initObjects = () => {
    this.loadSprite()
    this.loadNorth()
    this.loadCube()
  }
  this.loadCube = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({color: 0xfd59d7})
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.x = 1;
    this.cube.position.y = 100;
    this.cube.position.z = -101;
    this.scene.add(this.cube)
  }
  this.loadSprite = () => {
    const links = [
      {
        "ath": -86.837,
        "atv": 4.131,
        "destination": 8
      },
      {
        "ath": -22.403,
        "atv": 2.486,
        "destination": 2
      }
    ];
    const ath = links[0].ath;
    const atv = links[0].atv;
    const spriteMap = new THREE.TextureLoader().load( "../assets/textures/sprite2.png" );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    // for (let hotspot in links) {

    // }
    const sprite = new THREE.Sprite( spriteMaterial );

    sprite.position.z = 10
    spinSprite(sprite, ath, atv)
    this.scene.add( sprite );
  }
  this.loadNorth = () => {
    const spriteMap = new THREE.TextureLoader().load( "../assets/textures/sprite2.png" );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    const sprite = new THREE.Sprite( spriteMaterial );
    sprite.position.z = 10
    spinSprite(sprite, 0, north)
    console.log('sprite.position', sprite.position);
    this.scene.add( sprite );
  }
  this.initLights = () => {
    this.light = new THREE.PointLight(0xFFFF00)
    this.light.position.set(10, 0, 25)
    this.scene.add(this.light)
  }
  this.initBackground = () => {
    this.loadPanorama();
    // this.loadFlatBackground();
    this.loadSkybox();
  }
  this.loadFlatBackground = () => {
    const sphereGeo = new THREE.SphereGeometry(40, 16, 8);
    const loader = new THREE.TextureLoader
    const texture = loader.load('../assets/panoramas/pano.png');
    this.scene.background = texture;
  }
  this.loadSkybox = () => {
    const texture = new THREE.CubeTextureLoader()
    .setPath( '../assets/textures/cube/Bridge2/' )
    .load( [
      'posx.jpg',
      'negx.jpg',
      'posy.jpg',
      'negy.jpg',
      'posz.jpg',
      'negz.jpg'
    ] );
    this.scene.background = texture;
  }
  this.loadPanorama = () => {
    const cubeMap = getTexturesFromCubeMapFile("../assets/panoramas/pano.png", 6, 2, true)
    const cubeBackground = getMeshFromCubeTextures(cubeMap, 100)
    this.scene.add(cubeBackground);
  }
  this.initControls = () => {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enablePan = false;
  }
  this.animate = () => {
    if (this.cube) {
      this.cube.rotation.x += .1
      this.cube.rotation.y += .1
    }
    this.camera.updateProjectionMatrix()
  }
  this.renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  this.animationLoop = () => {
    requestAnimationFrame( this.animationLoop.bind(this) ) 
    this.animate();
    this.renderScene();
  }
  this.initialize = () => {
    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.initObjects ()
    this.initLights()
    this.initBackground()
    this.initControls()
  }
}
const Viz = new Visualizer()
Viz.initialize()
Viz.animationLoop()
