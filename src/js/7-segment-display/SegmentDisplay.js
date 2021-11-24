// Name: SegmentDisplay .js
// URL : https://github.com/gavinlyonsrepo/LED_Segment_Display_Simulator.git
// Description:  file to hold class SegmentDisplay.
// Language : P5 JavaScript 
// Written : Gavin Lyons 
const fullseg = 1;
const halfseg = 2;
const diagseg = 3;
const pointseg = 4;

class SegmentDisplay {
  
  constructor(type) {
	// Default config
	this._offsetVector = createVector(15, 10);
	//this._offColor = color(255, 0, 0, 40);
	this._offColor = color(200, 200, 200);
	this._onColor = color(255, 0, 0);
	this._segmentLength = 20;
	this._segmentWidth = 5;
	// Load segment objects
	this.segmentsType = type;
	this.segments = [];
	this.initSegments();
  }
  
  // Creates the  segments objects of the display
  initSegments() {
  	for (let segmentNumber = 0; segmentNumber <this.segmentsType+1; segmentNumber++) {
	  let segment = new Segment();
	  segment.length = this._segmentLength;
	  segment.width = this._segmentWidth;
	  segment.onColor = this._onColor;
	  segment.offColor = this._offColor;
	  this.segments[segmentNumber] = segment;
	}
  }

	// ASCII CODE SECTION Returns the corresponding ASCII codes of the digits four choices.
	get SevenSegCodes() {
		return [0x00, 0x86, 0x22, 0x7E, 0x6D, 0xD2, 0x46, 0x20, 0x29, 0x0B, 0x21, 0x70, 0x10, 0x40, 0x80, 0x52, 0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x09, 0x0D, 0x61, 0x48, 0x43, 0xD3, 0x5F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x3D, 0x76, 0x30, 0x1E, 0x75, 0x38, 0x15, 0x37, 0x3F, 0x73, 0x6B, 0x33, 0x6D, 0x78, 0x3E, 0x3E, 0x2A, 0x76, 0x6E, 0x5B, 0x39, 0x64, 0x0F, 0x23, 0x08, 0x02, 0x5F, 0x7C, 0x58, 0x5E, 0x7B, 0x71, 0x6F, 0x74, 0x10, 0x0C, 0x75, 0x30, 0x14, 0x54, 0x5C, 0x73, 0x67, 0x50, 0x6D, 0x78, 0x1C, 0x1C, 0x14, 0x76, 0x6E, 0x5B, 0x46, 0x30, 0x70, 0x01, 0x00];
	  }
	get NineSegCodes() {
		return[0x000, 0x206, 0x022, 0x1FE, 0x0ED, 0x1A4, 0x1E9, 0x080, 0x188, 0x00F, 0x083, 0x1C0, 0x100, 0x040, 0x200, 0x1C0, 0x1BF, 0x086, 0x05B, 0x04F, 0x066, 0x06D, 0x07D, 0x181, 0x07F, 0x06F, 0x084, 0x120, 0x0C0, 0x041, 0x081, 0x091, 0x0BB, 0x077, 0x0FD, 0x039, 0x1B1, 0x079, 0x071, 0x03D, 0x076, 0x006, 0x01E, 0x0F4, 0x038, 0x0B7, 0x037, 0x03F, 0x073, 0x13F, 0x0F5, 0x06D, 0x1A3, 0x03E, 0x1B0, 0x13E, 0x1E4, 0x162, 0x189, 0x039, 0x064, 0x00F, 0x082, 0x008, 0x003, 0x14C, 0x07C, 0x058, 0x05E, 0x158, 0x0D0, 0x0CE, 0x074, 0x005, 0x00D, 0x178, 0x018, 0x154, 0x054, 0x05C, 0x0F1, 0x067, 0x050, 0x0CC, 0x1C8, 0x01C, 0x110, 0x11C, 0x1C4, 0x06E, 0x148, 0x000, 0x206, 0x022, 0x1FE, 0x0ED, 0x1A4, 0x1E9, 0x080, 0x188, 0x00F, 0x083, 0x1C0, 0x100, 0x040, 0x200, 0x1C0, 0x1BF, 0x086, 0x10B, 0x1C1, 0x066, 0x06D, 0x0DC, 0x091, 0x07F, 0x163, 0x084, 0x120, 0x0C0, 0x041, 0x081, 0x091, 0x0BB, 0x077, 0x0FD, 0x039, 0x1B1, 0x079, 0x071, 0x03D, 0x077, 0x006, 0x01E, 0x0F4, 0x038, 0x0B7, 0x037, 0x03F, 0x073, 0x13F, 0x0F5, 0x06D, 0x1A3, 0x03E, 0x1B0, 0x13E, 0x1E4, 0x162, 0x189, 0x039, 0x064, 0x00F, 0x082, 0x008, 0x003, 0x14C, 0x07C, 0x058, 0x05E, 0x158, 0x0D0, 0x0CE, 0x074, 0x005, 0x00D, 0x178, 0x018, 0x154, 0x054, 0x05C, 0x0F1, 0x067, 0x050, 0x0CC, 0x1C8, 0x01C, 0x110, 0x11C, 0x1C4, 0x06E, 0x148];
	  }
	get FourteenSegCodes() {
		return [0x0000, 0x4006, 0x0202, 0x12CE, 0x12ED, 0x3FE4, 0x2359, 0x0200, 0x2400, 0x0900, 0x3FC0, 0x12C0, 0x0800, 0x00C0, 0x4000, 0x0C00, 0x0C3F, 0x0406, 0x00DB, 0x008F, 0x00E6, 0x2069, 0x00FD, 0x0007, 0x00FF, 0x00EF, 0x1200, 0x0A00, 0x2440, 0x00C8, 0x0980, 0x5083, 0x02BB, 0x00F7, 0x128F, 0x0039, 0x120F, 0x0079, 0x0071, 0x00BD, 0x00F6, 0x1209, 0x001E, 0x2470, 0x0038, 0x0536, 0x2136, 0x003F, 0x00F3, 0x203F, 0x20F3, 0x00ED, 0x1201, 0x003E, 0x0C30, 0x2836, 0x2D00, 0x00EE, 0x0C09, 0x0039, 0x2100, 0x000F, 0x2800, 0x0008, 0x0100, 0x1058, 0x2078, 0x00D8, 0x088E, 0x0858, 0x14C0, 0x048E, 0x1070, 0x1000, 0x0A10, 0x3600, 0x0030, 0x10D4, 0x1050, 0x00DC, 0x0170, 0x0486, 0x0050, 0x2088, 0x0078, 0x001C, 0x0810, 0x2814, 0x2D00, 0x028E, 0x0848, 0x0949, 0x1200, 0x2489, 0x0CC0, 0x0000]
	}
	get SixteenSegCodes() {
		return [0x0000, 0x000C, 0x0204, 0xAA3C, 0xAABB, 0xEE99, 0x9371, 0x0200, 0x1400, 0x4100, 0xFF00, 0xAA00, 0x4000, 0x8800, 0x1000, 0x4400, 0x44FF, 0x040C, 0x8877, 0x083F, 0x888C, 0x90B3, 0x88FB, 0x000F, 0x88FF, 0x88BF, 0x2200, 0x4200, 0x9400, 0x8830, 0x4900, 0x2807, 0x0AF7, 0x88CF, 0x2A3F, 0x00F3, 0x223F, 0x80F3, 0x80C3, 0x08FB, 0x88CC, 0x2233, 0x007C, 0x94C0, 0x00F0, 0x05CC, 0x11CC, 0x00FF, 0x88C7, 0x10FF, 0x98C7, 0x88BB, 0x2203, 0x00FC, 0x44C0, 0x50CC, 0x5500, 0x88BC, 0x4433, 0x2212, 0x1100, 0x2221, 0x5000, 0x0030, 0x0100, 0xA070, 0xA0E0, 0x8060, 0x281C, 0xC060, 0xAA02, 0xA2A1, 0xA0C0, 0x2000, 0x2260, 0x3600, 0x00C0, 0xA848, 0xA040, 0xA060, 0x82C1, 0xA281, 0x8040, 0xA0A1, 0x80E0, 0x2060, 0x4040, 0x5048, 0x5500, 0x0A1C, 0xC020, 0xA212, 0x2200, 0x2A21, 0xCC00, 0x0000]
	}
	// END OF ASCII CODE SECTION
	
  // Top left position of the display in the sketch
  set offsetVector(offsetVector) {
	this._offsetVector = offsetVector;
  }

  // Color of an inactive segment
  set offColor(color) {
	this._offColor = color;
  }

  // Color of an active segment
  set onColor(color) {
	this._onColor = color;
  }

  // Length of a segment
  set segmentLength(len) {
	this._segmentLength = len;
  }

  // Width of a segment
  set segmentWidth(w) {
	this._segmentWidth = w;
  }


/* Transformations sections. Used for generating display. drawing the segments*/

  // Right rotation and transformation. Used for generating display.
  rightTransform() {
	translate(this._segmentWidth + this._segmentLength, this._segmentWidth);
	rotate(PI / 2);
  }
  //Vertical transformation.Used for generating display.
	topDownTransform() {
  	translate(this._segmentWidth * 2 + this._segmentLength, 0);
	}
	// Shift right transformation  used for half horizontal segments, Used for generating display.
	shiftRightTransform(){
		translate((this._segmentWidth + this._segmentLength+4)/2, 0);
	}
  //Used for flipping from diag to center half in 16 seg n to m t to u, Used for generating display.
	shiftMidTransform(){
		rotate(PI/2.6);
		translate(-(this._segmentWidth/2), (this._segmentWidth*1.2));
	}
	 //Used for flipping , Used for generating display.
	 //16 seg k to m and r to S,
	 //14 seg J
	diagTransform(){
		rotate(PI*0.12); 
		translate( -(this._segmentLength/16), this._segmentWidth*1.1); 
	}
	//used for flipping, 16 seg M to N S to T, 14 seg J , 
	//Used for generating display.
	diag2Transform(){
			rotate(PI*0.12); 
			translate((this._segmentLength/8), this._segmentWidth);
		}
	//left transformation. G turn from F, fullseg,  Used for generating display.
	leftTransform(){
		rotate(HALF_PI); 
		translate(this._segmentWidth, this._segmentWidth);
	}
	
	//half segment change back to full ,16 seg C to D and f to G , Used for generating display.
	halfrightTransform(){
		rotate(PI / 2); 
		translate(this._segmentWidth, - (((this._segmentLength-this._segmentWidth)/2)+this._segmentWidth)); 
	}
	
	/* End of Transformation section */
	
  /* Returns the ordered transformations to apply for generating the display segments
   * SEVEN SEGMENT @returns {Array} - Array of callable functions */
  getTransformationsSeven() {
	let _this = this;
	return [
	  //function() {}, //A
	  function() {_this.rightTransform()}, //B
	  function() {_this.topDownTransform()}, //C
	  function() {_this.rightTransform()},  //D
	  function() {_this.rightTransform()},  //E
	  function() {_this.topDownTransform()}, //F
	  function() {_this.leftTransform()}, //G
	  function() {
		  //rotate(HALF_PI); //Decimal point
		  translate(_this._segmentLength*2.5, -(_this._segmentLength*2));
		  },
	];
  }

   /* Returns the ordered transformations to apply for generating the display segments
   * NINE SEGMENT , @returns {Array} - Array of callable functions */
  getTransformationsNine() {
	let _this = this;
	return [
	  function() {_this.rightTransform()}, //B
	  function() {_this.topDownTransform()}, //C
	  function() {_this.rightTransform()}, //D
	  function() {_this.rightTransform()},
	  function() {_this.topDownTransform()}, //F
	  function() {_this.leftTransform()}, //G
	  function() {
		rotate(PI * 1.75); // H , 315 degrees
		translate(_this._segmentLength/2.75, -(_this._segmentLength/5)); 
	  },
	  function() {
		 translate(-_this._segmentLength , _this._segmentLength); //I
		},
		function() {
			rotate(PI/1.3); // Decimal point
			translate(_this._segmentWidth, -(_this._segmentLength + _this._segmentWidth*2.3));
		},
	];
  }
  
  /* Returns the ordered transformations to apply for generating the display segments
   * FOURTEEN Segment @returns {Array} - Array of callable functions*/
  getTransformationsFourteen() {
	let _this = this;
	return [
	  function() {_this.rightTransform()}, //B
	  function() {_this.topDownTransform()}, //C
	  function() {_this.rightTransform()}, //D
	  function() {_this.rightTransform()}, //E
	  function() {_this.topDownTransform()}, //F
	  function() {_this.leftTransform()}, //G1 
	  function() {_this.shiftRightTransform()}, //G2
	  function() {
		rotate(PI*1.375); //  H , 78.7 degree
		translate((_this._segmentLength/2.8), -(_this._segmentLength/5));
		},
		function() {_this.diagTransform()},// J ,21.6 degree
		function() {_this.diag2Transform()},// K ,21.6 degree
		function() {
		 rotate(PI); // L , 180 degree 
		 translate((_this._segmentLength/1.5), _this._segmentLength/3.5);
		},
		function() {
		 rotate(-(PI*0.12)); // M - 21.6 degree
		 translate(-(_this._segmentLength/10), -(_this._segmentLength/4));
		},
		function() {
		 rotate(-(PI*0.12)); // N 21.6 degree
		 translate(_this._segmentWidth, -(_this._segmentLength/6));
		},
		function(){
			translate(_this._segmentLength*1.25,-(_this._segmentLength/2.5));
			rotate((PI*0.12))} ,//Dp Point
	];
  }
 
   /* Returns the ordered transformations to apply for generating the display segments
   * SIXTEEN SEGMENT @returns {Array} - Array of 16 callable functions */
  getTransformationsSixteen() {
	let _this = this;
	return [
		function() {_this.shiftRightTransform()}, // B
		function() {_this.halfrightTransform()}, //C
		function() {_this.topDownTransform()}, //D
		function() {_this.rightTransform()}, // E 
		function() {_this.shiftRightTransform() }, // F
		function() {_this.halfrightTransform()}, //G
		function() {_this.topDownTransform()}, //H
		function() {
			rotate(-(PI*0.12))  //K
			translate(-(_this._segmentLength/8), _this._segmentWidth*2.4);
			}, 
		function() {_this.diagTransform()},// M ,21.6 degree
		function() {_this.diag2Transform()},// N ,21.6 degree
		function() {_this.shiftMidTransform()}, //P 
		function() { 
			rotate(PI/2.6) //R
			translate((_this._segmentWidth*1.5), -(_this._segmentWidth/12))},
		function() {_this.diagTransform()},// S ,21.6 degree
        function() {_this.diag2Transform()},// T ,21.6 degree
		function() {_this.shiftMidTransform()}, //U 21.6 degree
		function() { // Dp
			translate(-_this._segmentLength*1.2, -(_this._segmentLength*1.35));
			rotate(PI/2);
			}
	];
  }
  
  /* Update function to call each frame */
  update() {
	this.generateDisplay();
  }

  /*  Draws each segments  called from update */
  generateDisplay() {
	translate(this._offsetVector);

	for (let segmentNumber = 0; segmentNumber < this.segmentsType+1; segmentNumber++) {
		// switch statement to pick shape segs.
		switch(this.segmentsType){
			case '7': 
				switch(segmentNumber){
					case 7:   // Dec point
						this.segments[segmentNumber].show(pointseg); 
					break;
					case 0: case 1: case 2: case 3: case 4: case 5: case 6:
						this.segments[segmentNumber].show(fullseg); 
					break;
				}
				if (this.getTransformationsSeven()[segmentNumber]) this.getTransformationsSeven()[segmentNumber](); 
			break;
			case '9': 
				switch(segmentNumber){
					case 9:   // Dec point
						this.segments[segmentNumber].show(pointseg); 
					break;
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
						this.segments[segmentNumber].show(fullseg); 
					break;
				}
				if (this.getTransformationsNine()[segmentNumber]) this.getTransformationsNine()[segmentNumber](); 
				break;
			case '14':
				switch(segmentNumber){
					case 0: case 1: case 2: case 3: case 4: case 5: case 9: case 12:
						this.segments[segmentNumber].show(fullseg); // ABCDEFJM full segment
					break;
					case 6: case 7:
						this.segments[segmentNumber].show(halfseg); // G1G2 half segment
					break;
					case 8: case 10: case 11: case 13:
						this.segments[segmentNumber].show(diagseg); // HKLN diag 3/4 segment
					break;
					case 14: 
						this.segments[segmentNumber].show(pointseg);
					break;
				}
				if (this.getTransformationsFourteen()[segmentNumber]) this.getTransformationsFourteen()[segmentNumber](); 
			break;
			case '16': 
				switch(segmentNumber){
					case 0: case 1: case 4: case 5: case 11: case 15:
						this.segments[segmentNumber].show(halfseg); // ABEFPU half segment
					break;
					case 2: case 3: case 6: case 7: case 9: case 13:
						this.segments[segmentNumber].show(fullseg); // CDHGMS full
					break;
					case 8: case 10: case 12: case 14:
						this.segments[segmentNumber].show(diagseg); // KNRT diag 3/4 segment
					break;
					case 16: // Dec point 
						this.segments[segmentNumber].show(pointseg)
					break;
				}
				if (this.getTransformationsSixteen()[segmentNumber]) this.getTransformationsSixteen()[segmentNumber]();
			break;
		} // End of switch
	} // End of For 
  }

  // Turns the segments on and off
  displayDigit(segmentCode) {
	  
	let segCode = 0;
	segCode = segmentCode;
	
	for (let segmentNumber = 0; segmentNumber < this.segmentsType+1; segmentNumber++) {
	  if ((segCode >> segmentNumber) & 1) {
				this.segments[segmentNumber].setOn();
	  } else {
				this.segments[segmentNumber].setOff();
	  }
	}
	
	return true;
  }

}
