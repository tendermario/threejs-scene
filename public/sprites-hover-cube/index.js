// // Helper functions
let intersects = [];
function makeTextSprite(message, parameters) {
  if (parameters === undefined) parameters = {};

  const fontface = parameters.hasOwnProperty("fontface") ?
    parameters["fontface"] : "Arial";

  const fontsize = parameters.hasOwnProperty("fontsize") ?
    parameters["fontsize"] : 120;

  const borderThickness = parameters.hasOwnProperty("borderThickness") ?
    parameters["borderThickness"] : 4;

  const borderColor = parameters.hasOwnProperty("borderColor") ?
    parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

  const backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
    parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const font = fontsize + 'px ' + fontface;
  
  // Set canvas to text size
  context.font = font;
  const width = context.measureText(message).width;
  canvas.width = width
  canvas.height = fontsize + 40

  // Set context's font
  context.font = font;
  context.fillStyle = "rgba(225, 225, 225, 1.0)"; // font color
  // Write text
  context.fillText(message, 0, fontsize - 20);

  // canvas contents will be used for a texture
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial(
    { map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(0,0,10)
  sprite.scale.set(10, 5, 1);
    return sprite;
  }

  // function for drawing rounded rectangles
  function roundRect(ctx, x, y, w, h, r) 
  {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

// Custom cubemap creator
function getTexturesFromCubeMapFile(atlasImgUrl, tilesNum = 6, tileY = 1, rearrange = false) {
  const textures = [];
  for (let i = 0; i < 6; i++) {
    textures[i] = new THREE.Texture();
  }
  let imageObj = new Image();
  imageObj.onload = function () {
    let canvas, context;
    let tileWidth = imageObj.height / tileY;
    for (let i = 0; i < textures.length; i++) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      const y = i % tileY;
      const x = Math.floor(i / tileY);
      context.drawImage(imageObj, tileWidth * x, tileWidth * y, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
      textures[i].image = canvas
      textures[i].needsUpdate = true;
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
function textureRotate(texture, quarterRotations = 1) {
  texture.center.set(0.5, 0.5);
  texture.rotation = Math.PI / 2 * quarterRotations;
}
function textureInvert(texture) {
  texture.repeat.x = -1;
}

// Function for turning an array of textures into a cube
function getMeshFromCubeTextures(textures, size = 10) {
  const materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
  }
  const geometry = new THREE.BoxGeometry(size, size, size);
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.geometry.scale(-1, 1, 1);
  return mesh;
}

function degreesToRadians(degrees) {
  return degrees *= Math.PI / 90
}

function spinSprite(sprite, ath, atv) {
  ath = degreesToRadians(ath)
  atv = degreesToRadians(atv)
  sprite.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), atv);
  sprite.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), ath);
}

function updateMouseCoords(mouse, event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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

const { startIndex } = tour
const firstArea = tour.locations[startIndex]
const { north } = firstArea

// Visualizer object
function Visualizer() {
  this.initScene = () => {
    this.scene = new THREE.Scene()
    this.intersected;
  }
  this.initCamera = () => {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = -1
  }
  this.initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
  }
  this.initObjects = () => {
    this.loadSprite()
    this.loadSpriteText()
    this.loadNorth()
    this.loadCube()
  }
  this.initMouse = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }
  this.initEventListeners = () => {

    const onDocumentMouseMove = (event) => {
      updateMouseCoords(this.mouse, event)
    }
    document.addEventListener( 'mousemove', onDocumentMouseMove, false )

    const onDocumentMouseDown = (event) => {
      this.raycast()
    }
    document.addEventListener( 'mousedown', onDocumentMouseDown, false )
  }
  this.raycast = () => {
    this.raycaster.setFromCamera( this.mouse, this.camera )
      intersects = this.raycaster.intersectObjects( this.scene.children )
      if (this.intersected) {
        // switch the color back
        if (this.intersected.material) {
          this.intersected.material.color = this.intersected.material.originalColor;
        }
      }
      if (intersects.length > 0) {
      this.intersected = intersects[0].object
      if (this.intersected.name === 'Floaty pink cube') {
        this.intersected.material.originalColor = this.intersected.material.color;
        this.intersected.material.color = new THREE.Color(0xff0000)
      }
    }
  }
  this.loadCube = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xfd59d7 })
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.x = 1;
    this.cube.position.y = 10;
    this.cube.position.z = 10;
    this.cube.name = "Floaty pink cube"
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
    const spriteMap = new THREE.TextureLoader().load("../assets/textures/sprite2.png");
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.position.z = 10
    spinSprite(sprite, ath, atv)
    this.scene.add(sprite);
  }
  this.loadSpriteText = () => {
    var sprite = makeTextSprite("uForis VR")
    sprite.room = 3;
    this.scene.add(sprite);
  }
  this.loadNorth = () => {
    const spriteMap = new THREE.TextureLoader().load("../assets/textures/sprite2.png");
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = 10
    spinSprite(sprite, 0, north)
    this.scene.add(sprite);
  }
  this.initLights = () => {
    this.light = new THREE.PointLight(0xFFFF00)
    this.light.position.set(10, 0, 25)
    this.scene.add(this.light)
  }
  this.initBackground = () => {
    this.loadPanorama();
    // this.loadFlatBackground();
    // this.loadSkybox();
  }
  this.loadFlatBackground = () => {
    const sphereGeo = new THREE.SphereGeometry(40, 16, 8);
    const loader = new THREE.TextureLoader
    const texture = loader.load('../assets/panoramas/pano.png');
    this.scene.background = texture;
  }
  this.loadSkybox = () => {
    const texture = new THREE.CubeTextureLoader()
      .setPath('../assets/textures/cube/Bridge2/')
      .load([
        'posx.jpg',
        'negx.jpg',
        'posy.jpg',
        'negy.jpg',
        'posz.jpg',
        'negz.jpg'
      ]);
    this.scene.background = texture;
  }
  this.loadPanorama = () => {
    const cubeMap = getTexturesFromCubeMapFile("../assets/panoramas/pano.png", 6, 2, true)
    const cubeBackground = getMeshFromCubeTextures(cubeMap, 100)
    cubeBackground.name = 'background'
    this.scene.add(cubeBackground);
  }
  this.initControls = () => {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
  }
  this.animate = () => {
    if (this.cube) {
      this.cube.rotation.x += .1
      this.cube.rotation.y += .1
    }
    this.raycast()
    this.camera.updateProjectionMatrix()
  }
  this.renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  this.animationLoop = () => {
    requestAnimationFrame(this.animationLoop.bind(this))
    this.animate();
    this.renderScene();
  }
  this.initialize = () => {
    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.initObjects()
    this.initLights()
    this.initBackground()
    this.initControls()
    this.initMouse()
    this.initEventListeners()
  }
}
const Viz = new Visualizer()
Viz.initialize()
Viz.animationLoop()
