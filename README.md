# CSS452 Final - UI Canvas API

## Application 
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
3. [Checkbox](#checkbox)
4. [Toggle](#toggle)
5. [Dropdown](#dropdown) 

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
### Checkbox  
A UI element checkbox is... TODO

#### Properties
* TODO  

#### Implementation  
Argument list: TODO

A sample implement looks like the following:  
`TODO`

[Back to top.](#application)
### Toggle  
A UI element toggle is... TODO

#### Properties
* TODO  

#### Implementation  
Argument list: TODO

A sample implement looks like the following:  
`TODO`

[Back to top.](#application)
### Dropdown  
A UI element dropdown is... TODO

#### Properties
* TODO  

#### Implementation  
Argument list: TODO

A sample implement looks like the following:  
`TODO`

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

### Documentation 
### Draw()
  
```
/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
```

### Update() 

``` 
/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
```

summary>A brief description of what the function does.</summary>   
<param = (name)> A (type), a brief description of the argument</param>  
<return = (name)> A (type), what is returned.</return>  
<remarks>Any additional notes you think is need to clarify your code.</remarks>  

#### Template  
```
/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
```