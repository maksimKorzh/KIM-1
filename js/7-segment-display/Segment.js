// Name: SegmentDisplay .js
// URL : https://github.com/gavinlyonsrepo/LED_Segment_Display_Simulator.git
// Description:  file to hold class Segment.
// Language : P5 JavaScript 
// Written : Gavin Lyons 

class Segment
{
  constructor() {
    this._offColor = color(125, 0, 0);
    this._onColor = color(255, 0, 0);
    this._length = 0;
    this._width = 4;
    this.state = false;
  }
  
  /* Set Color when Off */
  set offColor(color) {
    // a delay to mimic real LED slow light down
  	this._offColor = color;
  }
  
  /* Set Color when On */
  set onColor(color) {
    this._onColor = color;
  }
  
	/* Set Length in pixels */
	set length(length) {
  	this._length = length;
  }

	/* Set Width in pixels */
	set segmentWidth(w) {
  	this._width = w;
  }

	/* Displays the segment, passed shape */
  show(fullShape) {
	stroke(this.state ? this._onColor : this._offColor);
	strokeWeight(this._width);
	switch(fullShape)
		{
		case 1 : line(0, 0, this._length, 0); break; //Full length segment
		case 2 : line(0, 0, (this._length-this._width)/2, 0); break; //half length
		case 3 : line(0, 0, (this._length-this._width-10), 0);break; //Diag
		case 4 : /*line(0, 0, this._width/2, 0);*/ break; //Decimal point 
		}
  }
  
	/*  Sets the segment on */
  setOn() {
  	this.state = true;
  }
  
	/* Sets the segment off */
  setOff() {
  	this.state = false;
  }
  

}
