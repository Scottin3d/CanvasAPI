/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

/* global gEngine, GameObject */

"use strict";
//https://stackoverflow.com/questions/20835768/addeventlistener-on-custom-object

/* <summary> UIelement is the base class for all UI element objects used by the
 * UI canvas.  It contains common shared function as well as handles the events 
 * for each of the elements.
 * </summary>
 */
function UIelement() {
    this.eType = null;
    this.isHighlighted = false;
    this.element = null;
    this.isPressed = false;
    this.onClick = null;
    this.onHighlight = null;
    
    this.eTextDefault = null;
    this.eTextClickedDefault = null;
    this.eTextHighlightedDefault = null;
    this.eText = null;
    this.eTextClicked = null;
    this.eTextHighlighted = null;
    this.enabled = true;
    
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);

//==PUBLIC======================================================================
UIelement.prototype.SetEnabled = function(isEnabled) {
    this.enabled = isEnabled;
};

UIelement.prototype.isEnabled = function() {
    return this.enabled;
};

UIelement.prototype.GetType = function() {
    return this.eType;
};
//==============================================================================

//==PRIVATE=====================================================================


/*<summary>Initializes the UI element.</summary>   
 *<param = obj>an object, the element that the class is attached to.</param>
 */
UIelement.prototype._initElement = function(obj){
    this.element = obj;
    
    this.eTextDefault = this.element.name;
    this.eTextClickedDefault = "Clicked!";
    this.eTextHighlightedDefault = "Highlighted!";
    this.eText = this.eTextDefault;
    this.eTextClicked = this.eTextClickedDefault;
    this.eTextHighlighted = this.eTextHighlightedDefault;
    this.enabled = true;
};





UIelement.prototype.DrawElement = function (camera) {
    // forwards to subclass
    this.element._draw(camera);
};


UIelement.prototype.Update = function (camera) {
    // forwards to subclass
    this.element._update(camera);
};

/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
UIelement.prototype.highlight = function(bool){
    this.element._highlight(bool);
};

/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
UIelement.prototype.Click = function(){
    this.element._click();
};

/*<summary>Addes a listener to a UI element.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 */
UIelement.prototype.AddListener = function(func, target, value){
    this.element._addListener(func, target, value);
};


/*<summary>Check to see if the UI element is currently being pressed by the user.</summary> 
 *<return = this.isPressed>A bool, if pressed or not.</return> 
 */
UIelement.prototype.IsHeld = function() {
    return this.isPressed;
};




/*<summary>Returns the distance between the mouse X position and the UI element
 *X postion.</summary> 
 *<return = > A number.</return>  
 */
UIelement.prototype._mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.eButton.getXform().getXPos();
};

/*<summary>Returns the distance between the mouse Y position and the UI element
 *Y postion.</summary> 
 *<return = > A number.</return>  
 */
UIelement.prototype._mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.eButton.getXform().getYPos();
};

//==============================================================================

