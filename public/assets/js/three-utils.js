function getTexturesFromAtlasFile ( atlasImgUrl, tilesNum ) {
  var textures = [];
  for ( var i = 0; i < tilesNum; i ++ ) {
    textures[ i ] = new Texture();
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
