// // Helper functions

function getTexturesFromAtlasFile ( atlasImgUrl, tilesNum ) {
  var textures = [];
  for ( var i = 0; i < tilesNum; i ++ ) {
    textures[ i ] = new THREE.Texture();
  }

  var imageObj = new Image();
  imageObj.onload = function() {
    var canvas, context;
    var tileWidth = imageObj.height;

    for ( var i = 0; i < textures.length; i ++ ) {
      canvas = document.createElement( 'canvas' );
      context = canvas.getContext( '2d' );
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
      textures[ i ].image = canvas
      textures[ i ].needsUpdate = true;
    }
  };

  imageObj.src = atlasImgUrl;
  return textures;
}

// Visualizer object

function Visualizer() {
  this.initScene = function () {
    this.scene = new THREE.Scene()
  }
  this.initCamera = function () {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 10
  }
  this.initRenderer = function () {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )
  }
  this.initObjects = function () {
    var geometry = new THREE.BoxGeometry(2, 2, 2)
    var material = new THREE.MeshLambertMaterial({color: 0xfd59d7})
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }
  this.initLights = function () {
    this.light = new THREE.PointLight(0xFFFF00)
    this.light.position.set(10, 0, 25)
    this.scene.add(this.light)
  }
  this.initBackground = function () {
    var texture = new THREE.TextureLoader().load( "assets/textures/water.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    this.scene.background = texture;
  }
  this.initControls = function () {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
  }
  this.animate = function () {
    this.cube.rotation.x += .1
    this.cube.rotation.y += .1
    this.camera.updateProjectionMatrix()
  }
  this.animationLoop = function () {
    requestAnimationFrame( this.animationLoop.bind(this) ) 
    this.animate();
    this.renderer.render(this.scene, this.camera)
  }
  this.initialize = function () {
    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.initObjects()
    this.initLights()
    this.initBackground()
    this.initControls()
  }
}
var Viz = new Visualizer()
Viz.initialize()
Viz.animationLoop()