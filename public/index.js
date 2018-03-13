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
      var y = i % tileY;
      var x = Math.floor(i / tileY);
      context.drawImage( imageObj, tileWidth * x, tileWidth * y, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
      textures[ i ].image = canvas
      textures[ i ].needsUpdate = true;
    }
  };
  imageObj.src = atlasImgUrl;

  // Custom code for our own cubemaps layout
  if (rearrange) {
    var rearrangedTextures = [];
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
    mesh.geometry.scale( 1, 1, - 1 );
    return mesh;
}

// Visualizer object
function Visualizer() {
  this.initScene = () => {
    this.scene = new THREE.Scene()
  }
  this.initCamera = () => {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 1
  }
  this.initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )
  }
  this.initObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({color: 0xfd59d7})
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }
  this.initLights = () => {
    this.light = new THREE.PointLight(0xFFFF00)
    this.light.position.set(10, 0, 25)
    this.scene.add(this.light)
  }
  this.initBackground = () => {
    this.loadPanorama();
  }
  this.loadPanorama = () => {
    const cubeMap = getTexturesFromCubeMapFile("assets/panoramas/panorama.png", 6, 2, true)
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
    this.initObjects()
    this.initLights()
    this.initBackground()
    this.initControls()
  }
}
const Viz = new Visualizer()
Viz.initialize()
Viz.animationLoop()
