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



function DPFib(am, w, h)
{
	this.init(am, w, h);
	
}

DPFib.prototype = new Algorithm();
DPFib.prototype.constructor = DPFib;
DPFib.superclass = Algorithm.prototype;

DPFib.TABLE_ELEM_WIDTH = 40;
DPFib.TABLE_ELEM_HEIGHT = 30;

DPFib.TABLE_START_X = 500;
DPFib.TABLE_START_Y = 40;
DPFib.TABLE_DIFF_X = 100;

DPFib.CODE_START_X = 10;
DPFib.CODE_START_Y = 10;
DPFib.CODE_LINE_HEIGHT = 14;

DPFib.RECURSIVE_START_X = 20;
DPFib.RECURSIVE_START_Y = 120;
DPFib.RECURSIVE_DELTA_Y = 14;
DPFib.RECURSIVE_DELTA_X = 15;
DPFib.CODE_HIGHLIGHT_COLOR = "#FF0000";
DPFib.CODE_STANDARD_COLOR = "#000000";

DPFib.TABLE_INDEX_COLOR = "#0000FF"
DPFib.CODE_RECURSIVE_1_COLOR = "#339933";
DPFib.CODE_RECURSIVE_2_COLOR = "#0099FF";



DPFib.MAX_VALUE = 20;

DPFib.MESSAGE_ID = 0;
		
DPFib.prototype.init = function(am, w, h)
{
	DPFib.superclass.init.call(this, am, w, h);
	this.nextIndex = 0;
	this.addControls();
	this.code = [["def ","fib(n)",":"], 
				 ["     if ","(n <= 1)="" "],="" ["="" return="" 1"],="" else"],="" ",="" "fib(n-1)",="" "="" +="" "fib(n-2)"]];="" this.codeid="Array(this.code.length);" var="" i,="" j;="" for="" (i="0;" i="" <="" this.code.length;="" i++)="" {="" this.codeid[i]="new" array(this.code[i].length);="" (j="0;" j="" this.code[i].length;="" j++)="" this.codeid[i][j]="this.nextIndex++;" this.cmd("createlabel",="" this.codeid[i][j],="" this.code[i][j],="" dpfib.code_start_x,="" dpfib.code_start_y="" *="" dpfib.code_line_height,="" 0);="" this.cmd("setforegroundcolor",="" dpfib.code_standard_color);="" if=""> 0)
			{
				this.cmd("AlignRight", this.codeID[i][j], this.codeID[i][j-1]);
			}
		}
		
		
	}
		
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	this.initialIndex = this.nextIndex;
	this.oldIDs = [];
	this.commands = [];
}


DPFib.prototype.addControls =  function()
{
	this.controls = [];
	this.fibField = addControlToAlgorithmBar("Text", "");
	this.fibField.onkeydown = this.returnSubmit(this.fibField,  this.emptyCallback.bind(this), 2, true);
	this.controls.push(this.fibField);

	this.recursiveButton = addControlToAlgorithmBar("Button", "Fibonacci Recursive");
	this.recursiveButton.onclick = this.recursiveCallback.bind(this);
	this.controls.push(this.recursiveButton);

	this.tableButton = addControlToAlgorithmBar("Button", "Fibonacci Table");
	this.tableButton.onclick = this.tableCallback.bind(this);
	this.controls.push(this.tableButton);

	this.memoizedButton = addControlToAlgorithmBar("Button", "Fibonacci Memoized");
	this.memoizedButton.onclick = this.memoizedCallback.bind(this);
	this.controls.push(this.memoizedButton);
		
}
	


DPFib.prototype.buildTable  = function(maxVal)
{
	this.tableID = new Array(maxVal + 1);
	this.tableVals = new Array(maxVal + 1);
	this.tableXPos = new Array(maxVal + 1);
	this.tableYPos = new Array(maxVal + 1);
	var i;
	var indexID;
	var xPos;
	var yPos;
	var	table_rows = Math.floor((this.canvasHeight - DPFib.TABLE_ELEM_HEIGHT - DPFib.TABLE_START_Y) / DPFib.TABLE_ELEM_HEIGHT);
	
	for (i = 0; i <= 0="" maxval;="" i++)="" {="" this.tableid[i]="this.nextIndex++;" this.tablevals[i]="-1;" this.oldids.push(this.tableid[i]);="" ypos="i" %="" table_rows="" *="" dpfib.table_elem_height="" +="" dpfib.table_start_y;="" xpos="Math.floor(i" table_rows)="" dpfib.table_diff_x="" dpfib.table_start_x;="" this.tablexpos[i]="xPos;" this.tableypos[i]="yPos;" this.cmd("createrectangle",="" this.tableid[i],="" "",="" dpfib.table_elem_width,="" dpfib.table_elem_height,="" xpos,="" ypos);="" indexid="this.nextIndex++;" this.oldids.push(indexid);="" this.cmd("createlabel",="" indexid,="" i,="" -="" this.cmd("setforegroundcolor",="" dpfib.table_index_color);="" }="" dpfib.prototype.clearoldids="function()" for="" (var="" i="0;" <="" this.oldids.length;="" this.cmd("delete",="" this.oldids[i]);="" this.oldids="[];" this.nextindex="this.initialIndex;" dpfib.prototype.reset="function()" dpfib.prototype.emptycallback="function(event)" this.implementaction(this.helpmessage.bind(this),="" "");="" todo:="" put="" up="" a="" message="" to="" push="" the="" appropriate="" button?="" dpfib.prototype.recursivecallback="function(event)" var="" fibvalue;="" if="" (this.fibfield.value="" !="" )="" fibvalue="Math.min(parseInt(this.fibField.value)," dpfib.max_value);="" this.fibfield.value="String(fibValue);" this.implementaction(this.recursivefib.bind(this),fibvalue);="" else="" dpfib.prototype.tablecallback="function(event)" this.implementaction(this.tablefib.bind(this),fibvalue);="" dpfib.prototype.memoizedcallback="function(event)" this.implementaction(this.memoizedfib.bind(this),fibvalue);="" dpfib.prototype.helpmessage="function(value)" this.commands="[];" this.clearoldids();="" messageid="this.nextIndex++;" this.oldids.push(messageid);="" messageid,="" "enter="" value="" betweeen="" and="" "="" string(dpfib.max_value)="" in="" text="" field.\n"="" "then="" press="" fibonacci="" recursive,="" table,="" or="" memoized="" button",="" dpfib.recursive_start_x,="" dpfib.recursive_start_y,="" 0);="" return="" this.commands;="" dpfib.prototype.recursivefib="function(value)" this.currenty="DPFib.RECURSIVE_START_Y;" functioncallid="this.nextIndex++;" this.oldids.push(functioncallid);="" final="this.fib(value," functioncallid);="" this.cmd("settext",="" functioncallid,="" "fib("="" string(value)="" ")=" + String(final));
	return this.commands;
}


DPFib.prototype.fib = function(value, xPos, ID)
{
	this.cmd(" createlabel",="" id,="" string(value)+")",="" this.currenty,="" this.codeid[0][1],="" dpfib.code_highlight_color);="" this.cmd("step");="" dpfib.code_standard_color);="" this.codeid[1][1],="" (value=""> 1)
	{
		var firstID = this.nextIndex++;
		var secondID = this.nextIndex++;
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_STANDARD_COLOR);
		var firstValue = this.fib(value-1, xPos + DPFib.RECURSIVE_DELTA_X, firstID);
		this.currentY += DPFib.RECURSIVE_DELTA_Y;
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_STANDARD_COLOR);
		var secondValue = this.fib(value-2, xPos + DPFib.RECURSIVE_DELTA_X, secondID);

		
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_RECURSIVE_1_COLOR);
		this.cmd("SetForegroundColor", firstID, DPFib.CODE_RECURSIVE_1_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][2], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_RECURSIVE_2_COLOR);
		this.cmd("SetForegroundColor", secondID, DPFib.CODE_RECURSIVE_2_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][2], DPFib.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_STANDARD_COLOR);
		
		
		
		this.cmd("Delete", firstID);
		this.cmd("Delete", secondID);
		this.cmd("SetText", ID, firstValue + secondValue);
		this.cmd("Step");
		this.currentY  = this.currentY - 2 * DPFib.RECURSIVE_DELTA_Y;
		return firstValue + secondValue;
	}
	else
	{
		this.cmd("SetText", ID, "1");
		this.cmd("SetForegroundColor", this.codeID[2][0], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[2][0], DPFib.CODE_STANDARD_COLOR);
		
		this.currentY -= DPFib.RECURSIVE_DELTA_Y;
		return 1;
	}
	
	
	
}




DPFib.prototype.tableFib = function(value)
{
	this.commands = [];
	this.clearOldIDs();
	this.buildTable(value);
	var i;
	for (i = 0; i <= value="" &&="" i="" <="1;" i++)="" {="" this.cmd("setforegroundcolor",="" this.codeid[1][1],="" dpfib.code_highlight_color);="" this.codeid[2][0],="" this.cmd("sethighlight",="" this.tableid[i],="" 1);="" this.cmd("settext",="" this.tablevals[i]="1;" this.cmd("step");="" dpfib.code_standard_color);="" 0);="" }="" for="" (i="2;" this.tableid[i-1],="" 1)="" this.tableid[i-2],="" this.codeid[4][1],="" this.codeid[4][2],="" this.codeid[4][3],="" +="" this.tablevals[i-2];="" this.tablevals[i]);="" this.cmd("settextcolor",="" 0)="" var="" finalid="this.nextIndex++;" this.oldids.push(finalid);="" this.cmd("createlabel",="" finalid,="" this.tablevals[value],="" this.tablexpos[value]="" -="" 5,="" this.tableypos[value]="" this.cmd("move",="" dpfib.recursive_start_x,="" dpfib.recursive_start_y);="" "fib("="" string(value)="" ")=" + String(this.tableVals[value]));
												  
	return this.commands;
	
	
}



DPFib.prototype.fibMem = function(value, xPos, ID)
{
	this.cmd(" createlabel",="" id,="" string(value)+")",="" xpos,="" this.currenty,="" this.tableid[value],="" todo:="" add="" an="" extra="" pause="" here?="" if="" (this.tablevals[value]="">= 0)
	{
		this.cmd("Delete", ID, "fib(" + String(value)+")", xPos, this.currentY, 0);
		this.cmd("CreateLabel", ID, this.tableVals[value], this.tableXPos[value] - 5, this.tableYPos[value] - 5, 0);
		this.cmd("Move", ID, xPos, this.currentY);
		this.cmd("Step")
		this.cmd("SetHighlight", this.tableID[value], 0);
		return this.tableVals[value];
	}
	this.cmd("SetHighlight", this.tableID[value], 0);
	this.currentY += DPFib.RECURSIVE_DELTA_Y;
	this.cmd("SetForegroundColor", this.codeID[0][1], DPFib.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");
	this.cmd("SetForegroundColor", this.codeID[0][1], DPFib.CODE_STANDARD_COLOR);
	this.cmd("SetForegroundColor", this.codeID[1][1], DPFib.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");
	this.cmd("SetForegroundColor", this.codeID[1][1], DPFib.CODE_STANDARD_COLOR);
	if (value > 1)
	{
		var firstID = this.nextIndex++;
		var secondID = this.nextIndex++;
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_STANDARD_COLOR);
		var firstValue = this.fibMem(value-1, xPos + DPFib.RECURSIVE_DELTA_X, firstID);
		this.currentY += DPFib.RECURSIVE_DELTA_Y;
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_STANDARD_COLOR);
		var secondValue = this.fibMem(value-2, xPos + DPFib.RECURSIVE_DELTA_X, secondID);
		
		
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_RECURSIVE_1_COLOR);
		this.cmd("SetForegroundColor", firstID, DPFib.CODE_RECURSIVE_1_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][2], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_RECURSIVE_2_COLOR);
		this.cmd("SetForegroundColor", secondID, DPFib.CODE_RECURSIVE_2_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], DPFib.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][2], DPFib.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[4][3], DPFib.CODE_STANDARD_COLOR);
		
		
		
		this.cmd("Delete", firstID);
		this.cmd("Delete", secondID);
		this.cmd("SetText", ID, firstValue + secondValue);
		this.cmd("Step");
		this.tableVals[value] = firstValue + secondValue;
		this.currentY  = this.currentY - 2 * DPFib.RECURSIVE_DELTA_Y;
		this.cmd("CreateLabel", this.nextIndex, this.tableVals[value], xPos+5, this.currentY + 5);
		this.cmd("Move", this.nextIndex, this.tableXPos[value], this.tableYPos[value], this.currentY);
		this.cmd("Step");
		this.cmd("Delete", this.nextIndex);
		this.cmd("SetText", this.tableID[value], this.tableVals[value]);
		return firstValue + secondValue;
	}
	else
	{
		this.cmd("SetText", ID, "1");
		this.cmd("SetForegroundColor", this.codeID[2][0], DPFib.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[2][0], DPFib.CODE_STANDARD_COLOR);
		this.tableVals[value] = 1;
		this.cmd("CreateLabel", this.nextIndex, this.tableVals[value], xPos + 5, this.currentY + 5);
		this.cmd("Move", this.nextIndex, this.tableXPos[value], this.tableYPos[value], this.currentY);
		this.cmd("Step");
		this.cmd("Delete", this.nextIndex);
		this.cmd("SetText", this.tableID[value], this.tableVals[value]);
		
		this.currentY -= DPFib.RECURSIVE_DELTA_Y;
		return 1;
	}
	
}

DPFib.prototype.memoizedFib = function(value)
{
	this.commands = [];
	
	this.clearOldIDs();
	this.buildTable(value);
	
	this.currentY = DPFib.RECURSIVE_START_Y;
	
	var functionCallID = this.nextIndex++;
	this.oldIDs.push(functionCallID);
	var final = this.fibMem(value, DPFib.RECURSIVE_START_X, functionCallID);
	
	this.cmd("SetText", functionCallID, "fib(" + String(value) + ") = " + String(final));
	return this.commands;
}

DPFib.prototype.enableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
	
	
}
DPFib.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}




var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new DPFib(animManag, canvas.width, canvas.height);
}



</=></=></=></copyright></copyright>