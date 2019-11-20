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


function ComparisonSort(am, w, h)
{
	this.init(am, w, h);

}


var ARRAY_SIZE_SMALL  = 50;
var ARRAY_WIDTH_SMALL = 17;
var ARRAY_BAR_WIDTH_SMALL = 10;
var ARRAY_INITIAL_X_SMALL = 15;

var ARRAY_Y_POS = 250;
var ARRAY_LABEL_Y_POS = 260;

var LOWER_ARRAY_Y_POS = 500;
var LOWER_ARRAY_LABEL_Y_POS = 510;

var SCALE_FACTOR = 2.0;

var ARRAY_SIZE_LARGE = 200;
var ARRAY_WIDTH_LARGE = 4;
var ARRAY_BAR_WIDTH_LARGE = 2;
var ARRAY_INITIAL_X_LARGE = 15;

var BAR_FOREGROUND_COLOR = "#0000FF";
var BAR_BACKGROUND_COLOR ="#AAAAFF";
var INDEX_COLOR = "#0000FF";
var HIGHLIGHT_BAR_COLOR = "#FF0000";
var HIGHLIGHT_BAR_BACKGROUND_COLOR = "#FFAAAA";

var QUICKSORT_LINE_COLOR = "#FF0000";



ComparisonSort.prototype = new Algorithm();
ComparisonSort.prototype.constructor = ComparisonSort;
ComparisonSort.superclass = Algorithm.prototype;

ComparisonSort.prototype.init = function(am, w, h)
{
	var sc = ComparisonSort.superclass;
	var fn = sc.init;
	fn.call(this,am);
	this.addControls();
	this.nextIndex = 0;
	
	this.setArraySize(true);
	this.arrayData = new Array(ARRAY_SIZE_LARGE);
	this.arraySwap = new Array(ARRAY_SIZE_LARGE);
	this.labelsSwap = new Array(ARRAY_SIZE_LARGE);
	this.objectsSwap = new Array(ARRAY_SIZE_LARGE);
	
	this.createVisualObjects();	
}



ComparisonSort.prototype.addControls =  function()
{
	this.resetButton = addControlToAlgorithmBar("Button", "Randomize Array");
	this.resetButton.onclick = this.resetCallback.bind(this);

	this.insertSortButton = addControlToAlgorithmBar("Button", "Insertion Sort");
	this.insertSortButton.onclick = this.insertSortCallback.bind(this);

	this.selectSortButton = addControlToAlgorithmBar("Button", "Selection Sort");
	this.selectSortButton.onclick = this.selectSortCallback.bind(this);

	this.bubbleSortButton = addControlToAlgorithmBar("Button", "Bubble Sort");
	this.bubbleSortButton.onclick = this.bubbleSortCallback.bind(this);

	this.quickSortButton = addControlToAlgorithmBar("Button", "Quick Sort");
	this.quickSortButton.onclick = this.quickSortCallback.bind(this);

	this.mergeSortButton = addControlToAlgorithmBar("Button", "Merge Sort");
	this.mergeSortButton.onclick = this.mergeSortCallback.bind(this);

	this.shellSortButton = addControlToAlgorithmBar("Button", "Shell Sort");
	this.shellSortButton.onclick = this.shellSortCallback.bind(this);

	this.sizeButton = addControlToAlgorithmBar("Button", "Change Size");
	this.sizeButton.onclick = this.changeSizeCallback.bind(this);
}

		
ComparisonSort.prototype.setArraySize = function (small)
{
	if (small)
	{
		this.array_size = ARRAY_SIZE_SMALL;
		this.array_width = ARRAY_WIDTH_SMALL;
		this.array_bar_width = ARRAY_BAR_WIDTH_SMALL;
		this.array_initial_x = ARRAY_INITIAL_X_SMALL;
		this.array_y_pos = ARRAY_Y_POS;
		this.array_label_y_pos = ARRAY_LABEL_Y_POS;
		this.showLabels = true;
	}
	else
	{
		this.array_size = ARRAY_SIZE_LARGE;
		this.array_width = ARRAY_WIDTH_LARGE;
		this.array_bar_width = ARRAY_BAR_WIDTH_LARGE;
		this.array_initial_x = ARRAY_INITIAL_X_LARGE;
		this.array_y_pos = ARRAY_Y_POS;
		this.array_label_y_pos = ARRAY_LABEL_Y_POS;
		this.showLabels = false;
	}
	
}


ComparisonSort.prototype.resetAll = function(small)
{
	this.animationManager.resetAll();
	this.setArraySize(!small);
	this.nextIndex = 0;
	this.createVisualObjects();
}


ComparisonSort.prototype.randomizeArray = function()
{
	this.commands = new Array();
	for (var i = 0; i < this.array_size; i++)
	{
		this.arrayData[i] = Math.floor(1 + Math.random()*99);
		this.oldData[i] = this.arrayData[i];
		if (this.showLabels)
		{
			this.cmd("SetText", this.barLabels[i], this.arrayData[i]);
		}
		else
		{
			this.cmd("SetText", this.barLabels[i], "");					
		}
		this.cmd("SetHeight", this.barObjects[i], this.arrayData[i] * SCALE_FACTOR);				
	}
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}


ComparisonSort.prototype.swap = function(index1, index2)
{
	var tmp = this.arrayData[index1];
	this.arrayData[index1] = this.arrayData[index2];
	this.arrayData[index2] = tmp;
	
	tmp = this.barObjects[index1];
	this.barObjects[index1] = this.barObjects[index2];
	this.barObjects[index2] = tmp;
	
	tmp = this.barLabels[index1];
	this.barLabels[index1] = this.barLabels[index2];
	this.barLabels[index2] = tmp;
	
	
	this.cmd("Move", this.barObjects[index1], this.barPositionsX[index1], this.array_y_pos);
	this.cmd("Move", this.barObjects[index2], this.barPositionsX[index2], this.array_y_pos);
	this.cmd("Move", this.barLabels[index1], this.barPositionsX[index1], this.array_label_y_pos);
	this.cmd("Move", this.barLabels[index2], this.barPositionsX[index2], this.array_label_y_pos);
	this.cmd("Step");
}


ComparisonSort.prototype.createVisualObjects = function()
{
	this.barObjects = new Array(this.array_size);
	this.oldBarObjects= new Array(this.array_size);
	this.oldbarLabels= new Array(this.array_size);
	
	this.barLabels = new Array(this.array_size);
	this.barPositionsX = new Array(this.array_size);			
	this.oldData = new Array(this.array_size);
	this.obscureObject  = new Array(this.array_size);
	
	
	var xPos = this.array_initial_x;
	var yPos = this.array_y_pos;
	var yLabelPos = this.array_label_y_pos;
	
	this.commands = new Array();
	for (var i = 0; i < this.array_size; i++)
	{
		xPos = xPos + this.array_width;
		this.barPositionsX[i] = xPos;
		this.cmd("CreateRectangle", this.nextIndex, "", this.array_bar_width, 200, xPos, yPos,"center","bottom");
		this.cmd("SetForegroundColor", this.nextIndex, BAR_FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.nextIndex, BAR_BACKGROUND_COLOR);
		this.barObjects[i] = this.nextIndex;
		this.oldBarObjects[i] = this.barObjects[i];
		this.nextIndex += 1;
		if (this.showLabels)
		{
			this.cmd("CreateLabel", this.nextIndex, "99", xPos, yLabelPos);
		}
		else
		{
			this.cmd("CreateLabel", this.nextIndex, "", xPos, yLabelPos);
		}
		this.cmd("SetForegroundColor", this.nextIndex, INDEX_COLOR);
		
		this.barLabels[i] = this.nextIndex;
		this.oldbarLabels[i] = this.barLabels[i];
		++this.nextIndex;				
	}
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.randomizeArray();
	for (i = 0; i < this.array_size; i++)
	{
		this.obscureObject[i] = false;
	}
	this.lastCreatedIndex = this.nextIndex;
}

ComparisonSort.prototype.highlightRange  = function(lowIndex, highIndex)
{
	for (var i = 0; i < lowIndex; i++)
	{
		if (!this.obscureObject[i])
		{
			this.obscureObject[i] = true;
			this.cmd("SetAlpha", this.barObjects[i], 0.08);
			this.cmd("SetAlpha", this.barLabels[i], 0.08);
		}
	}
	for (i = lowIndex; i <= highindex;="" i++)="" {="" if="" (this.obscureobject[i])="" this.obscureobject[i]="false;" this.cmd("setalpha",="" this.barobjects[i],="" 1.0);="" this.barlabels[i],="" }="" for="" (i="highIndex+1;" i="" <="" this.array_size;="" (!this.obscureobject[i])="" 0.08);="" comparisonsort.prototype.reset="function()" (var="" this.arraydata[i]="this.oldData[i];" this.barobjects[i]="this.oldBarObjects[i];" this.barlabels[i]="this.oldbarLabels[i];" (this.showlabels)="" this.cmd("settext",="" this.arraydata[i]);="" else="" "");="" this.cmd("setheight",="" *="" scale_factor);="" this.commands="new" array();="" comparisonsort.prototype.resetcallback="function(event)" this.randomizearray();="" comparisonsort.prototype.changesizecallback="function(event)" this.resetall(this.showlabels);="" comparisonsort.prototype.insertsortcallback="function(event)" this.animationmanager.clearhistory();="" this.insertionsortskip(1,0);="" this.animationmanager.startnewanimation(this.commands);="" comparisonsort.prototype.selectsortcallback="function(event)" this.array_size="" -="" 1;="" var="" smallestindex="i;" this.cmd("setforegroundcolor",="" this.barobjects[smallestindex],="" highlight_bar_color);="" this.cmd("setbackgroundcolor",="" highlight_bar_background_color);="" j="i+1;" j++)="" this.barobjects[j],="" this.cmd("step");="" (this.arraydata[j]="" this.arraydata[smallestindex])="" bar_foreground_color);="" bar_background_color);="" (smallestindex="" !="i)" this.swap(smallestindex,="" i);="" comparisonsort.prototype.bubblesortcallback="function(event)"> 0; i--)
	{
		for (var j = 0; j < i; j++)
		{
			this.cmd("SetForegroundColor", this.barObjects[j], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j], HIGHLIGHT_BAR_BACKGROUND_COLOR);

			this.cmd("SetForegroundColor", this.barObjects[j+1], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j+1], HIGHLIGHT_BAR_BACKGROUND_COLOR);
			this.cmd("Step");
			if (this.arrayData[j] > this.arrayData[j+1])
			{
				this.swap(j,j+1);
			}
			this.cmd("SetForegroundColor", this.barObjects[j], BAR_FOREGROUND_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j], BAR_BACKGROUND_COLOR);

			this.cmd("SetForegroundColor", this.barObjects[j+1], BAR_FOREGROUND_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j+1], BAR_BACKGROUND_COLOR);

		}
	}
	this.animationManager.StartNewAnimation(this.commands);
}
ComparisonSort.prototype.quickSortCallback = function(event)
{
	this.animationManager.clearHistory();
	
	this.commands = new Array();
	this.iID = this.nextIndex++;
	this.jID= this.nextIndex++;
	this.cmd("CreateLabel", this.iID, "i", this.barObjects[0], this.array_label_y_pos + 20);
	this.cmd("CreateLabel", this.jID, "j", this.barObjects[this.array_size - 1], this.array_label_y_pos + 20);
	this.cmd("SetForegroundColor", this.iID, HIGHLIGHT_BAR_COLOR);
	this.cmd("SetBackgroundColor", this.iID, HIGHLIGHT_BAR_BACKGROUND_COLOR);
	this.cmd("SetForegroundColor", this.jID, HIGHLIGHT_BAR_COLOR);			
	this.cmd("SetBackgroundColor", this.jID, HIGHLIGHT_BAR_BACKGROUND_COLOR);
	this.doQuickSort(0, this.array_size - 1);			
	this.cmd("Delete", this.iID);
	this.cmd("Delete", this.jID);
	this.animationManager.StartNewAnimation(this.commands);
}

ComparisonSort.prototype.doQuickSort = function(low, high)
{
	this.highlightRange(low,high);
	if (high <= low)="" return;="" this.cmd("step");="" var="" lineid="this.nextIndex;" pivot="this.arrayData[low];" this.cmd("createrectangle",="" lineid,="" "",="" (this.array_size="" +="" 1)="" *="" this.array_width,="" 0,="" this.array_initial_x,="" this.array_y_pos="" -="" 2,"left","bottom");="" this.cmd("setforegroundcolor",="" quicksort_line_color);="" i="low+1;" j="high;" this.cmd("move",="" this.iid,="" this.barpositionsx[i],="" this.array_label_y_pos="" 20);="" this.jid,="" this.barpositionsx[j],="" while="" (i="" <="j)" {="" this.barobjects[i],="" highlight_bar_color);="" this.cmd("setbackgroundcolor",="" highlight_bar_background_color);="" this.barobjects[low],="" bar_foreground_color);="" bar_background_color);="" &&="" this.arraydata[i]="" pivot)="" ++i;="" }="" this.barobjects[j],="" (j="">= i && this.arrayData[j] > pivot)
		{
			--j;			
			this.cmd("Move", this.jID, this.barPositionsX[j], this.array_label_y_pos + 20);
			this.cmd("Step");	
			this.cmd("SetForegroundColor", this.barObjects[j], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j], HIGHLIGHT_BAR_BACKGROUND_COLOR);

			this.cmd("SetForegroundColor", this.barObjects[low], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[low], HIGHLIGHT_BAR_BACKGROUND_COLOR);

			this.cmd("Step");					
			this.cmd("SetForegroundColor", this.barObjects[j], BAR_FOREGROUND_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j], BAR_BACKGROUND_COLOR);
			this.cmd("SetForegroundColor", this.barObjects[low], BAR_FOREGROUND_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[low], BAR_BACKGROUND_COLOR);
		}
		if (i <= j)="" {="" this.cmd("move",="" this.jid,="" this.barpositionsx[j-1],="" this.array_label_y_pos="" +="" 20);="" this.iid,="" this.barpositionsx[i+1],="" this.swap(i,j);="" ++i;="" --j;="" }="" if="" (i="">= low)
	{
		this.cmd("SetForegroundColor", this.barObjects[i], BAR_FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.barObjects[i], BAR_BACKGROUND_COLOR);

	}
	if (j <= high)="" {="" this.cmd("setforegroundcolor",="" this.barobjects[j],="" bar_foreground_color);="" this.cmd("setbackgroundcolor",="" bar_background_color);="" }="" this.swap(low,="" j);="" this.cmd("step");="" this.cmd("delete",="" lineid);="" this.doquicksort(low,="" j-1);="" this.doquicksort(j+1,high);="" this.highlightrange(low,high);="" comparisonsort.prototype.mergesortcallback="function(event)" this.animationmanager.clearhistory();="" this.commands="new" array();="" this.domergesort(0,="" this.array_size-1);="" this.animationmanager.startnewanimation(this.commands);="" comparisonsort.prototype.domergesort="function(low,high)" this.highlightrange(low,="" high);="" if="" (low="" <="" var="" mid="Math.floor((low" +="" 2);="" this.domergesort(low,mid);="" this.domergesort(mid+1,="" insertindex="low;" leftindex="low;" rightindex="mid+1;" while="" (insertindex="" (leftindex="" &&="" (rightindex=""> high || this.arrayData[leftIndex] <= this.arraydata[rightindex]))="" {="" this.arrayswap[insertindex]="this.arrayData[leftIndex];" this.cmd("move",="" this.barobjects[leftindex],="" this.barpositionsx[insertindex],="" lower_array_y_pos);="" this.barlabels[leftindex],="" lower_array_label_y_pos);="" this.cmd("step");="" this.labelsswap[insertindex]="this.barLabels[leftIndex];" this.objectsswap[insertindex]="this.barObjects[leftIndex];" insertindex++;="" leftindex++;="" }="" else="" this.barlabels[rightindex],="" this.barobjects[rightindex],="" rightindex++;="" for="" (insertindex="low;" insertindex="" <="high;" insertindex++)="" this.barobjects[insertindex]="this.objectsSwap[insertIndex];" this.barlabels[insertindex]="this.labelsSwap[insertIndex];" this.arraydata[insertindex]="this.arraySwap[insertIndex];" this.barobjects[insertindex],="" this.array_y_pos);="" this.barlabels[insertindex],="" this.array_label_y_pos);="" comparisonsort.prototype.shellsortcallback="function(event)" this.animationmanager.clearhistory();="" this.commands="new" array();="" var="" inc;="" (inc="Math.floor(this.array_size" 2);="" inc="">=1; inc = Math.floor(inc / 2))
	{
		for (var offset = 0; offset < inc; offset = offset + 1)
		{
			for (var k = 0; k < this.array_size; k++)
			{
				if ((k - offset) % inc == 0)
				{
					if (this.obscureObject[k])
					{
						this.obscureObject[k] = false;
						this.cmd("SetAlpha", this.barObjects[k], 1.0);
						this.cmd("SetAlpha", this.barLabels[k], 1.0);
					}
					
				}
				else
				{
					if (!this.obscureObject[k])
					{
						this.obscureObject[k] = true;
						this.cmd("SetAlpha", this.barObjects[k], 0.08);
						this.cmd("SetAlpha", this.barLabels[k], 0.08);
					}
				}												
			}
			this.cmd("Step");
			this.insertionSortSkip(inc, offset)
			
		}
		
	}
	this.animationManager.StartNewAnimation(this.commands);
	
}

ComparisonSort.prototype.insertionSortSkip = function(inc, offset)
{
	for (var i =inc + offset; i < this.array_size; i = i + inc)
	{
		var j = i;
		while (j > inc - 1)
		{
			this.cmd("SetForegroundColor", this.barObjects[j], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetForegroundColor", this.barObjects[j-inc], HIGHLIGHT_BAR_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j], HIGHLIGHT_BAR_BACKGROUND_COLOR);
			this.cmd("SetBackgroundColor", this.barObjects[j - inc], HIGHLIGHT_BAR_BACKGROUND_COLOR);
			this.cmd("Step");
			if (this.arrayData[j-inc] </=></=></=></=></=></copyright></copyright>