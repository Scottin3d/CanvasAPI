# CSS452 Final - UI Canvas API

## Application 
**Table of Contents**
1. [UI Canvas Overview](#ui-canvas )
2. [UI Canvas Elements](#adding-elements)
	* [Button](#button)  
	* [Slider](#slider)
	* [Toggle](#toggle)
	* [Dropdown](#dropdown) 
3. [UI Events](#ui-events)

### UI Canvas 
A UIcanvas is an overlay of the main document that has objects that display information and allow the user to interact with objects in the scene with out explicited referencing the object themselves. It requires no arguements.  

#### Properties  
#### Implementation  
A sample implement looks like the following:  
`this.UI = new UIcanvas();` 

### Adding Elements  
Currently, the UI Canvas APi supports five elements:
1. [Button](#button)  
2. [Slider](#slider)
3. [Toggle](#toggle)
4. [Dropdown](#dropdown) 

To add an element to the Ui canvas, call the `CreateElement()` function.  The `CreateElement()` function can take unlimited arguments, but will throw an error if an invalid combination of arguments is given.  

See below for details on valid arguments for each UI element type. When calling `CreateElement()`, the first argument is ***always*** the type as defined by the UI Canvas.  

[Back to top.](#application)
### Button  
A UI element button is a standard button that can be clicked in order to trigger an event.  

#### Properties
* onClick - Callback executed when the button is clicked.   

#### Implementation  
Argument list: type, size, position, color, text.  

A sample implement looks like the following:  
`this.UI.CreateElement(this.UI.UIELEM_TYPES.Button,[50,20], [20,60], [1,1,1,1], "Button");`  

[Back to top.](#application)
### Slider  
A UI element slider can be moved between a minimum and maximum value. When a change to the slider value occurs, a callback is sent to any registered listeners of Slider.onValueChanged.  

#### Properties  
* minValue - The minimum allowed value of the slider.  
* maxValue - The maximum allowed value of the slider.  
* steps - The step increment of the slider.  
* sliderValue - The current value of the slider.  
* onValueChanged - Callback executed when the value of the slider is changed.  

#### Implementation  
Argument list: type, size, position, range, default value, step increment.  

A sample implement looks like the following:   
`this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider,[50,5], [60, 5], [-100, 100], 0, 1);`  


[Back to top.](#application)
### Toggle  
A UI element toggle is a checkbox that allows the user to switch an option on or off.  

#### Properties
* onValueChanged - Callback executed when the value of the toggle is changed.  

#### Implementation  
Argument list: type, size, position, text

A sample implement looks like the following:  
`this.UI.CreateElement(this.UI.UIELEM_TYPES.Toggle, [20,20], [-50, 10], "Toggle");`

[Back to top.](#application)
### Dropdown  
A UI element dropdown presents a list of options when clicked, of which one can be chosen. When a dropdown event occurs a callback is sent to any registered listeners of onValueChanged.

#### Properties
* onValueChanged - Callback executed when the value of the dropdown is changed. 

#### Implementation  
Argument list: TODO

A sample implement looks like the following:  
`TODO`

### UI Events
UI Events are a special kind of multicast delegate that can only be invoked from within the class where they are declared (the publisher class). If other classes subscribe to the event, their event handler methods will be called when the publisher class raises the event.  

UI Events can:  
1. Pass values when invoked.     
`this.onValueChange.Invoke(this.eSliderValue.toFixed(this.decimalPlaces));`  
This invoke will pass the slider value to all of the handlers subscribed to the event.

2. Utilize a static value passed when the listener was created.  
`this.onClick.Invoke();`  
This invoke will use the value set when the listener was created.

The value used by the handler is determined in the event when invoked. As the event executes the listener, it checks the value associated with the same index. If the value is `null`, the value is taken from the default `arguments`.  
```javascript
UIEvent.prototype.Invoke = function(){
    for (var i = 0; i < this.listeners.length; i++) {
        var val = (this.values[i] === null)? arguments[0] : this.values[i];
        this.listeners[i](val);
    }
};
```

#### Properties
* eventName -  The name of the event.

#### Implementation  
Argument list: function, handler, value

A sample implement looks like the following:  
`this.UI.UIElements[0].AddListener(this.UI.UIElements[1].SetValue, this.UI.UIElements[1], 50);`

This line of code will add an event listener to the object stored in `UIElements[0]`.  The function associated with the event handler is `this.UI.UIElements[1].SetValue` and the object it is called from on being invoked is `this.UI.UIElements[1]`.  Additionally, when subscribing a handler to an event, a `value` can be associated with that listener. If a value is not passed, it will use the default `arguments` passed by the function when it is invoked.  


[Back to top.](#application)
## Style Guide  
### Variables  
* const - Uppercase  
` this.UIELEM_TYPES = {Button : 1, Slider : 2};`  
* public - Camal Case  
`this.editMode;`  
* private - Leading Camal Case  
`this.mClickHold;` 
The leading letter should be relavent to the class.  

### Functions  
* public - Proper CamalCase  
`UIcanvas.prototype.IsMouseOverElement = function (mousePosition){}`  
* private - underscore camalCase  
`UIcanvas.prototype._initCanvas = function (){}`  
***NOTE*** 
* a function with a '_' should ***NOT*** be called from outside of the class it is declared in.  

### Documentation 
#### TODO
* assets/UIcanvas.xml
* canvas/UIcanvas.js
* canvas/UIcanvasCreate.js
* canvas/UIcanvasEditMode.js
* canvas/UIcanvasUpdate.js
* ~~elements/UIelement.js~~
* elements/UIButton.js
* elements/UISlider.js
* elements/UIDropdown.js
* elements/UICheckbox.js
* elements/UIToggle.js
* ~~events/UIEvent.js~~
* ~~events/UIEventHandler.js~~
* ~~utilities.js~~

### Draw()
  
```javascript
/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
```

### Update() 

```javascript 
/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
```

summary>A brief description of what the function does.</summary>   
<param = (name)> A (type), a brief description of the argument</param>  
<return = (name)> A (type), what is returned.</return>  
<remarks>Any additional notes you think is need to clarify your code.</remarks>  

#### Templates  
**Function Descriptions**  

```javascript
/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
```

**Function Separaters**

```javascript
//==PUBLIC======================================================================
//==============================================================================
//==PRIVATE=====================================================================
//==============================================================================
```

