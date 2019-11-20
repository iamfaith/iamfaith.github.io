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
// THIS SOFTWARE IS PROVIDED BY <copyright holder=""> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <copyright holder=""> OR
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


function Hash(am, w, h)
{
	if (am == undefined)
	{
		return;
	}
	this.init(am, w, h);
}

Hash.prototype = new Algorithm();
Hash.prototype.constructor = Hash;
Hash.superclass = Algorithm.prototype;

var MAX_HASH_LENGTH = 10;


var HASH_NUMBER_START_X = 200;
var HASH_X_DIFF = 7;
var HASH_NUMBER_START_Y = 10;
var HASH_ADD_START_Y = 30;
var HASH_INPUT_START_X = 60;
var HASH_INPUT_X_DIFF = 7;
var HASH_INPUT_START_Y = 45;
var HASH_ADD_LINE_Y = 42;
var HASH_RESULT_Y = 50;
var ELF_HASH_SHIFT = 10;

var HASH_LABEL_X = 300;
var HASH_LABEL_Y = 30;
var HASH_LABEL_DELTA_X = 50;

var HIGHLIGHT_COLOR = "#0000FF";



Hash.prototype.init = function(am, w, h)
{
	var sc = Hash.superclass;
	var fn = sc.init;
	fn.call(this,am, w, h);
	this.addControls();
	this.nextIndex = 0;
	this.hashingIntegers = true;
	
}

Hash.prototype.addControls = function()
{
	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertField.size = MAX_HASH_LENGTH;
	this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), MAX_HASH_LENGTH, true);
	this.insertButton = addControlToAlgorithmBar("Button", "Insert");
	this.insertButton.onclick =  this.insertCallback.bind(this);
	
	this.deleteField = addControlToAlgorithmBar("Text", "");
	this.deleteField.size = MAX_HASH_LENGTH;
	this.deleteField.onkeydown = this.returnSubmit(this.insertField,  this.deleteCallback.bind(this), MAX_HASH_LENGTH, true);
	this.deleteButton = addControlToAlgorithmBar("Button", "Delete");
	this.deleteButton.onclick =  this.deleteCallback.bind(this);

	
	this.findField = addControlToAlgorithmBar("Text", "");
	this.findField.size = MAX_HASH_LENGTH;
	this.findField.onkeydown = this.returnSubmit(this.insertField,  this.findCallback.bind(this), MAX_HASH_LENGTH, true);
	this.findButton = addControlToAlgorithmBar("Button", "Find");
	this.findButton.onclick =  this.findCallback.bind(this);
	
	
	var radioButtonList = addRadioButtonGroupToAlgorithmBar(["Hash Integer", "Hash Strings"], "HashType");
	this.hashIntegerButton = radioButtonList[0];
	this.hashIntegerButton.onclick = this.changeHashTypeCallback.bind(this, true);
//  this.hashIntegerButton.onclick = this.hashIntegerCallback.bind(this);
	this.hashStringButton = radioButtonList[1];
	this.hashStringButton.onclick = this.changeHashTypeCallback.bind(this, false);

//	this.hashStringButton.onclick = this.hashStringCallback.bind(this);
	this.hashIntegerButton.checked = true;
}


// Do this extra level of wrapping to get undo to work properly.
// (also, so that we only implement the action if we are changing the
// radio button)
Hash.prototype.changeHashTypeCallback = function(newHashingIntegers, event)
{
	if (this.hashingIntegers != newHashingIntegers)
	{
		this.implementAction(this.changeHashType.bind(this), newHashingIntegers);
	}

}

Hash.prototype.changeHashType = function(newHashingIntegerValue)
{
	this.hashingIntegers = newHashingIntegerValue;
	if (this.hashingIntegers)
	{
		this.hashIntegerButton.checked = true;
		this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), MAX_HASH_LENGTH, true);
		this.deleteField.onkeydown = this.returnSubmit(this.insertField,  this.deleteCallback.bind(this), MAX_HASH_LENGTH, true);
		this.findField.onkeydown = this.returnSubmit(this.insertField,  this.findCallback.bind(this), MAX_HASH_LENGTH, true);
	}
	else
	{
		this.hashStringButton.checked = true;	
		this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), MAX_HASH_LENGTH, false);
		this.deleteField.onkeydown = this.returnSubmit(this.insertField,  this.deleteCallback.bind(this), MAX_HASH_LENGTH, false);
		this.findField.onkeydown = this.returnSubmit(this.insertField,  this.findCallback.bind(this), MAX_HASH_LENGTH, false);
	}
	return this.resetAll();
}


Hash.prototype.doHash = function(input)
{
	if (this.hashingIntegers)
	{
		var labelID1 = this.nextIndex++;
		var labelID2 = this.nextIndex++;
		var highlightID = this.nextIndex++;
		var index = parseInt(input) % this.table_size;
		this.currHash =  parseInt(input);
				
		this.cmd("CreateLabel", labelID1, input + " % " + String(this.table_size) + " = " , HASH_LABEL_X, HASH_LABEL_Y);
		this.cmd("CreateLabel", labelID2,index,  HASH_LABEL_X + HASH_LABEL_DELTA_X, HASH_LABEL_Y);
		this.cmd("Step");
		this.cmd("CreateHighlightCircle", highlightID, HIGHLIGHT_COLOR, HASH_LABEL_X + HASH_LABEL_DELTA_X, HASH_LABEL_Y);
		this.cmd("Move", highlightID, this.indexXPos[index], this.indexYPos[index]);
		this.cmd("Step");
		this.cmd("Delete", labelID1);
		this.cmd("Delete", labelID2);
		this.cmd("Delete", highlightID);
		this.nextIndex -= 3;
		
		return index;
		
	}
	else
	{
		var oldnextIndex = this.nextIndex;
		var label1= this.nextIndex++;
		this.cmd("CreateLabel", label1, "Hashing:" , 10, 45, 0);
		var wordToHashID = new Array(input.length);
		var wordToHash = new Array(input.length);
		for (var i = 0; i < input.length; i++)
		{
			wordToHashID[i] = this.nextIndex++;
			wordToHash[i] = input.charAt(i);
			this.cmd("CreateLabel", wordToHashID[i], wordToHash[i], HASH_INPUT_START_X + i * HASH_INPUT_X_DIFF, HASH_INPUT_START_Y, 0);
		}
		var digits = new Array(32);
		var hashValue = new Array(32);
		var nextByte = new Array(8);
		var nextByteID = new Array(8);
		var resultDigits = new Array(32);
		var floatingDigits = new Array(4);
		var floatingVals = new Array(4);
		
		var operatorID = this.nextIndex++;
		var barID = this.nextIndex++;
		for (i = 0; i < 32; i++)
		{
			hashValue[i] = 0;
			digits[i] = this.nextIndex++;
			resultDigits[i] = this.nextIndex++;
		}
		for (i=0; i<8; i++)="" {="" nextbyteid[i]="this.nextIndex++;" }="" for="" (i="0;" i="" <="" 4;="" floatingdigits[i]="this.nextIndex++;" this.cmd("step");="">= 0; i--)
		{
			for (j = 0; j < 32; j++)
			{
				this.cmd("CreateLabel", digits[j],hashValue[j], HASH_NUMBER_START_X + j * HASH_X_DIFF, HASH_NUMBER_START_Y, 0);					
			}
			this.cmd("Delete", wordToHashID[i]);
			var nextChar = wordToHash[i].charCodeAt(0);
			for (var j = 7; j >= 0; j--)
			{
				nextByte[j] = nextChar % 2;
				nextChar = Math.floor((nextChar / 2));
				this.cmd("CreateLabel", nextByteID[j], nextByte[j], HASH_INPUT_START_X + i*HASH_INPUT_X_DIFF, HASH_INPUT_START_Y, 0);
				this.cmd("Move", nextByteID[j], HASH_NUMBER_START_X + (j + 24) * HASH_X_DIFF, HASH_ADD_START_Y);
			}
			this.cmd("Step");
			this.cmd("CreateRectangle", barID, "", 32 * HASH_X_DIFF, 0, HASH_NUMBER_START_X, HASH_ADD_LINE_Y,"left","bottom");
			this.cmd("CreateLabel", operatorID, "+", HASH_NUMBER_START_X, HASH_ADD_START_Y, 0);
			this.cmd("Step");
			
			var carry = 0;
			for (j = 7; j>=0; j--)
			{
				hashValue[j+24] = hashValue[j+24] + nextByte[j] + carry;
				if (hashValue[j+24] > 1)
				{
					hashValue[j+24] = hashValue[j+24] - 2;
					carry = 1;
				}
				else
				{
					carry = 0;
				}						
			}
			for (j = 23; j>=0; j--)
			{
				hashValue[j] = hashValue[j]  + carry;
				if (hashValue[j] > 1)
				{
					hashValue[j] = hashValue[j] - 2;
					carry = 1;
				}
				else
				{
					carry = 0;
				}		
			}
			for (j = 0; j < 32; j++)
			{
				this.cmd("CreateLabel", resultDigits[j], hashValue[j], HASH_NUMBER_START_X + j * HASH_X_DIFF, HASH_RESULT_Y, 0);					
			}
			
			this.cmd("Step");
			for (j=0; j<8; j++)="" {="" this.cmd("delete",="" nextbyteid[j]);="" }="" barid);="" operatorid);="" for="" (j="0;" j<32;="" digits[j]);="" this.cmd("move",="" resultdigits[j],="" hash_number_start_x="" +="" j="" *="" hash_x_diff,="" hash_number_start_y)="" this.cmd("step");="" if="" (i=""> 0)
			{
				for (j = 0; j < 32; j++)
				{
					this.cmd("Move", resultDigits[j], HASH_NUMBER_START_X + (j - 4) * HASH_X_DIFF, HASH_NUMBER_START_Y)						
				}
				this.cmd("Step");
				for (j = 0; j < 28; j++)
				{
					floatingVals[j] = hashValue[j];
					hashValue[j] = hashValue[j+4];
				}
				
				for (j = 0; j < 4; j++)
				{
					this.cmd("Move", resultDigits[j], HASH_NUMBER_START_X + (j + ELF_HASH_SHIFT) * HASH_X_DIFF, HASH_ADD_START_Y);
					hashValue[j+28] = 0;
					this.cmd("CreateLabel", floatingDigits[j],0, HASH_NUMBER_START_X + (j + 28) * HASH_X_DIFF, HASH_NUMBER_START_Y,0);
					if (floatingVals[j])
					{
						hashValue[j + ELF_HASH_SHIFT] = 1 - hashValue[j + ELF_HASH_SHIFT];
					}
				}
				this.cmd("CreateRectangle", barID, "", 32 * HASH_X_DIFF, 0, HASH_NUMBER_START_X, HASH_ADD_LINE_Y,"left","bottom");
				this.cmd("CreateLabel", operatorID, "XOR", HASH_NUMBER_START_X, HASH_ADD_START_Y, 0);
				this.cmd("Step");
				for (j = 0; j < 32; j++)
				{
					this.cmd("CreateLabel", digits[j], hashValue[j], HASH_NUMBER_START_X + j * HASH_X_DIFF, HASH_RESULT_Y, 0);					
				}
				this.cmd("Step");
				
				this.cmd("Delete", operatorID);
				this.cmd("Delete", barID);
				for (j = 0; j</8;></8;></copyright></copyright>