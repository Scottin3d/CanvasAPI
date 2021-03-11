# CSS452 Final - UI Canvas API

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
/*<summary>Update is the most commonly used function to implement any kind of game script.  Update is called every frame.</summary>   
 */
```

summary>A brief description of what the function does.</summary>   
<param = (name)> A (type), a brief description of the argument</param>  
<return = (type)> What is returned.</return>  
<remarks>Any additional notes you think is need to clarify your code.</remarks>  

#### Template  
```
/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
```