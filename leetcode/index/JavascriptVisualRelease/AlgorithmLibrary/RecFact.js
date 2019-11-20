// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY David Galles ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL David Galles OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco



function RecFact(am, w, h)
{
	this.init(am, w, h);
	
}

RecFact.prototype = new Recursive();
RecFact.prototype.constructor = RecFact;
RecFact.superclass = Recursive.prototype;


RecFact.MAX_VALUE = 20;

RecFact.ACTIVATION_FIELDS = ["n ", "subValue ", "returnValue "];
RecFact.CODE = [["def ","factorial(n)",":"], 
				["     if ","(n <= 1):="" "],="" ["="" return="" 1"],="" else:"],="" subsolution=", " factorial(n="" -="" 1)"],="" solution=", " *="" n"],="" ",="" "solution"]];="" recfact.recursive_delta_y="RecFact.ACTIVATION_FIELDS.length" recursive.activation_record_height;="" recfact.activation_recort_start_x="330;" recfact.activation_recort_start_y="20;" recfact.prototype.init="function(am," w,="" h)="" {="" recfact.superclass.init.call(this,="" am,="" h);="" this.nextindex="0;" this.addcontrols();="" this.code="RecFact.CODE;" this.addcodetocanvas(this.code);="" this.animationmanager.startnewanimation(this.commands);="" this.animationmanager.skipforward();="" this.animationmanager.clearhistory();="" this.initialindex="this.nextIndex;" this.oldids="[];" this.commands="[];" }="" recfact.prototype.addcontrols="function()" this.controls="[];" this.factorialfield="addControlToAlgorithmBar(" text","="" "");="" this.factorialfield.onkeydown="this.returnSubmit(this.factorialField," this.factorialcallback.bind(this),="" 2,="" true);="" this.controls.push(this.factorialfield);="" this.factorialbutton="addControlToAlgorithmBar(" button","="" "factorial");="" this.factorialbutton.onclick="this.factorialCallback.bind(this);" this.controls.push(this.factorialbutton);="" recfact.prototype.factorialcallback="function(event)" var="" factvalue;="" if="" (this.factorialfield.value="" !="" )="" factvalue="Math.min(parseInt(this.factorialField.value)," recfact.max_value);="" this.factorialfield.value="String(factValue);" this.implementaction(this.dofactorial.bind(this),factvalue);="" recfact.prototype.dofactorial="function(value)" this.clearoldids();="" this.currenty="RecFact.ACTIVATION_RECORT_START_Y;" this.currentx="RecFact.ACTIVATION_RECORT_START_X;" final="this.factorial(value);" resultid="this.nextIndex++;" this.oldids.push(resultid);="" this.cmd("createlabel",="" resultid,="" "factorial("="" +="" string(value)="" ")=" + String(final),  
			 Recursive.CODE_START_X, Recursive.CODE_START_Y + (this.code.length + 1) * Recursive.CODE_LINE_HEIGHT, 0);
	//this.cmd(" settext",="" functioncallid,="" factorial="" recfact.activation_fields,="" this.currentx,="" this.currenty);="" this.cmd("settext",="" activationrec.fieldids[0],="" value);="" id,="" "",="" 10,="" this.currenty,="" 0);="" oldx="this.currentX;" oldy="this.currentY;" (this.currenty="" recursive.recursive_delta_y=""> this.canvasHeight)
	{
		this.currentY =  RecFact.ACTIVATION_RECORT_START_Y;
		this.currentX += Recursive.ACTIVATION_RECORD_SPACING;
	}
	this.cmd("SetForegroundColor", this.codeID[0][1], Recursive.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");
	this.cmd("SetForegroundColor", this.codeID[0][1], Recursive.CODE_STANDARD_COLOR);
	this.cmd("SetForegroundColor", this.codeID[1][1], Recursive.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");
	this.cmd("SetForegroundColor", this.codeID[1][1], Recursive.CODE_STANDARD_COLOR);
	if (value > 1)
	{
		this.cmd("SetForegroundColor", this.codeID[4][1], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], Recursive.CODE_STANDARD_COLOR);
		
		var firstValue = this.factorial(value-1);

		this.cmd("SetForegroundColor", this.codeID[4][0], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][1], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetText", activationRec.fieldIDs[1], firstValue);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][0], Recursive.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][1], Recursive.CODE_STANDARD_COLOR);
			
		this.cmd("SetForegroundColor", this.codeID[5][0], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[5][1], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetText", activationRec.fieldIDs[2], firstValue * value);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[5][0], Recursive.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[5][1], Recursive.CODE_STANDARD_COLOR);

		this.cmd("SetForegroundColor", this.codeID[6][0], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][1], Recursive.CODE_HIGHLIGHT_COLOR);

		this.cmd("Step");
		this.deleteActivation(activationRec);
		this.currentY = oldY;
		this.currentX = oldX;
		this.cmd("CreateLabel", this.nextIndex, "Return Value = " + String(firstValue * value), oldX, oldY);
		this.cmd("SetForegroundColor", this.nextIndex, Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[6][0], Recursive.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][1], Recursive.CODE_STANDARD_COLOR);
		this.cmd("Delete",this.nextIndex);
		
		
		
//		this.cmd("SetForegroundColor", this.codeID[4][3], Recursive.CODE_HIGHLIGHT_COLOR);
//		this.cmd("Step");

		return firstValue *value;
	}
	else
	{
		this.cmd("SetForegroundColor", this.codeID[2][0], Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[2][0], Recursive.CODE_STANDARD_COLOR);
		
		
		this.currentY = oldY;
		this.currentX = oldX;
		this.deleteActivation(activationRec);
		this.cmd("CreateLabel", this.nextIndex, "Return Value = 1", oldX, oldY);
		this.cmd("SetForegroundColor", this.nextIndex, Recursive.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("Delete",this.nextIndex);
		
		return 1;
	}
	
	
	
}
var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new RecFact(animManag, canvas.width, canvas.height);
}



</=>