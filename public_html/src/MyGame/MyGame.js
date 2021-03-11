/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBg = "assets/bg.png";
    this.space = "assets/space.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;

    this.mMsg = null;
    this.vCanvas = null;
    this.cButton = null;
    this.vMsgBg = null;
    
    this.UI = null;

    // the hero and the support objects
    this.mHero = null;
    this.mBrain = null;
    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;
    this.mFocusObj = null;

    this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.space);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.space);
};

MyGame.prototype.initialize = function () { 
    
    // color variable
    // I wrote the hexToRgb utility to help with better colors -- Scott
    var c; 
    // objects
    this.mBrain = new Brain(this.kMinionSprite);
    this.mHero = new Hero(this.kMinionSprite);
    this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);
    
    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
    this.mFocusObj = this.mHero;
    
    this.vBackground = new Renderable(gEngine.DefaultResources.getConstColorShader());
    c = hexToRgb("14213d");
    this.vBackground.setColor([c.r, c.g, c.b, c.a]);
    this.vBackground.getXform().setPosition(10, 10);
    this.vBackground.getXform().setSize(10, 10);

    this.UI = new UIcanvas();
    
    // main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, 940, 640]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("14213d");
    this.mCamera.setBackgroundColor([c.r, c.g, c.b, c.a]);
    
    this.vCanvas = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, 940, 640]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("14213d");
    this.vCanvas.setBackgroundColor([c.r, c.g, c.b, 0]);
   
   
    this.UI.CreateElement(this.UI.UIELEM_TYPES.Button,[50,20], [20,60], [1,1,1,1], "Button");
    this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider,[50,5], [60, 5], [-100, 100], 0, 1);
    var opts = ["option 1", "option 2", "option 3", "option 4"];
    this.UI.CreateDropdown([50,20], [0,0], [1,1,1,1], "Button", opts);
    var vals = [0.5, 1, -1, -0.5];
    this.UI.UIElements[0].addListener(this.mHero.increaseSize, this.mHero, 0.5);
    this.UI.UIElements[1].addListener(this.UI.UIElements[0].setHeight, this.UI.UIElements[0]);
    this.UI.UIElements[2].addListener(this.mHero.increaseSize, this.mHero, vals);
    
    
    // Large background image
    var bgR = new SpriteRenderable(this.space);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(250, 250);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
};


MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    this.mBg.draw(camera);
    this.mHero.draw(camera);
    this.mBrain.draw(camera);
    
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    //**Canvas / UI elements must be drawn last**
    var c = hexToRgb("14213d");
    gEngine.Core.clearCanvas([c.r, c.g, c.b, c.a]);
    
    this.drawCamera(this.mCamera);
    //this.drawCamera(this.vCanvas);
    
    this.UI.Draw();
    /*
    this.vCanvas.setupCanvas();
    //this.vCanvas.setupViewProjection();
    this.cButton.draw(this.vCanvas);
    */
    //this.mMsg[0].draw(this.vCanvas);
    //this.mMsg[1].draw(this.vCanvas);
    //this.mMsg[2].draw(this.vCanvas);
    // dont clear viewport
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // update UI
    this.UI.update();
    
    var zoomDelta = 0.05;
    //this.mCamera.update();
    
    // Brain chasing the hero
    
    var h = [];
    /*
    if (!this.mHero.pixelTouches(this.mBrain, h)) {
        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.01);
        GameObject.prototype.update.call(this.mBrain);
    }
    */
    
    var heroPos = this.mHero.getXform().getPosition();
    var a = heroPos[0] - this.mCamera.mouseWCX();
    var b = heroPos[1] - this.mCamera.mouseWCY();
    var heroMag = Math.sqrt(a*a + b*b);
    if (heroMag > 6) {
        this.mHero.rotateObjPointTo(vec2.fromValues(this.mCamera.mouseWCX(), 
                                                    this.mCamera.mouseWCY()), 0.1);
        this.mHero.setSpeed(0.3);                     
        GameObject.prototype.update.call(this.mHero);
        
    }
    this.mHero.update();
};
