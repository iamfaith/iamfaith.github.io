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



function DPLCS(am, w, h)
{
	this.init(am, w, h);
	
}

DPLCS.prototype = new Algorithm();
DPLCS.prototype.constructor = DPLCS;
DPLCS.superclass = Algorithm.prototype;

DPLCS.TABLE_ELEM_WIDTH = 40;
DPLCS.TABLE_ELEM_HEIGHT = 30;

DPLCS.TABLE_START_X = 500;
DPLCS.TABLE_START_Y = 80;


DPLCS.TABLE_DIFF_X = 100;

DPLCS.CODE_START_X = 10;
DPLCS.CODE_START_Y = 10;
DPLCS.CODE_LINE_HEIGHT = 14;

DPLCS.RECURSIVE_START_X = 20;
DPLCS.RECURSIVE_START_Y = 120;
DPLCS.RECURSIVE_DELTA_Y = 14;
DPLCS.RECURSIVE_DELTA_X = 15;
DPLCS.CODE_HIGHLIGHT_COLOR = "#FF0000";
DPLCS.CODE_STANDARD_COLOR = "#000000";
DPLCS.MAX_SEQUENCE_LENGTH = 15;

DPLCS.TABLE_INDEX_COLOR = "#0000FF"
DPLCS.CODE_RECURSIVE_1_COLOR = "#339933";
DPLCS.CODE_RECURSIVE_2_COLOR = "#0099FF";

DPLCS.SEQUENCE_START_X = 30;
DPLCS.SEQUENCE_START_Y = 180;
DPLCS.SEQUENCE_DELTA_X = 10;


DPLCS.MAX_VALUE = 20;

DPLCS.MESSAGE_ID = 0;
		
DPLCS.prototype.init = function(am, w, h)
{
	DPLCS.superclass.init.call(this, am, w, h);
	this.nextIndex = 0;
	this.addControls();
	this.code = [["def ","LCS(S1, S2, x, y)",":"], 
				 ["     if (","(x == -1) ", " or ", "(y == -1)", ")" ],
				 ["          return 0"],
				 ["     else if ", "(S1[x] == S2[y])"],
				 ["          return 1 + ","LCS(S1, S2, x-1, y-1)"],
				 ["     else"],
				 ["          return max(", "LCS(S1, S2, x-1, y)", ",", "LCS(S1, S2, x, y-1)", ")"]];
	
	this.codeID = Array(this.code.length);
	var i, j;
	for (i = 0; i < this.code.length; i++)
	{
		this.codeID[i] = new Array(this.code[i].length);
		for (j = 0; j < this.code[i].length; j++)
		{
			this.codeID[i][j] = this.nextIndex++;
			this.cmd("CreateLabel", this.codeID[i][j], this.code[i][j], DPLCS.CODE_START_X, DPLCS.CODE_START_Y + i * DPLCS.CODE_LINE_HEIGHT, 0);
			this.cmd("SetForegroundColor", this.codeID[i][j], DPLCS.CODE_STANDARD_COLOR);
			if (j > 0)
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


DPLCS.prototype.addControls =  function()
{
	this.controls = [];
	addLabelToAlgorithmBar("S1:");
	this.S1Field = addControlToAlgorithmBar("Text", "");
	this.S1Field.onkeydown = this.returnSubmit(this.S1Field,  this.emptyCallback.bind(this), DPLCS.MAX_SEQUENCE_LENGTH, false);
	this.controls.push(this.S1Field);

	addLabelToAlgorithmBar("S2:");
	this.S2Field = addControlToAlgorithmBar("Text", "");
	this.S2Field.onkeydown = this.returnSubmit(this.S2Field,  this.emptyCallback.bind(this), DPLCS.MAX_SEQUENCE_LENGTH, false);
	this.controls.push(this.S2Field);
	
	this.recursiveButton = addControlToAlgorithmBar("Button", "LCS Recursive");
	this.recursiveButton.onclick = this.recursiveCallback.bind(this);
	this.controls.push(this.recursiveButton);

	this.tableButton = addControlToAlgorithmBar("Button", "LCS Table");
	this.tableButton.onclick = this.tableCallback.bind(this);
	this.controls.push(this.tableButton);

	this.memoizedButton = addControlToAlgorithmBar("Button", "LCS Memoized");
	this.memoizedButton.onclick = this.memoizedCallback.bind(this);
	this.controls.push(this.memoizedButton);
		
}
	


DPLCS.prototype.buildTable  = function(S1, S2)
{
	var x = S1.length;
	var y = S2.length;
	this.tableID = new Array(x+1);
	this.tableVals = new Array(x + 1);
	this.tableXPos = new Array(x + 1);
	this.tableYPos = new Array(x + 1);
	
	var i, j;
	var sequence1ID = new Array(x);
	var sequence2ID = new Array(y);
	
	this.S1TableID = new Array(x);
	for (i = 0; i <=x; i++)="" {="" if="" (i=""> 0)
		{
			this.S1TableID[i-1] = this.nextIndex++;
			this.cmd("CreateLabel", this.S1TableID[i-1], S1.charAt(i-1),DPLCS.TABLE_START_X + i*DPLCS.TABLE_ELEM_WIDTH, DPLCS.TABLE_START_Y - 2 * DPLCS.TABLE_ELEM_HEIGHT);
			this.oldIDs.push(this.S1TableID[i-1]);					 
		}
		var index = this.nextIndex++;
		this.oldIDs.push(index);
		this.cmd("CreateLabel", index, i - 1,DPLCS.TABLE_START_X + i*DPLCS.TABLE_ELEM_WIDTH, DPLCS.TABLE_START_Y - 1 * DPLCS.TABLE_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", index, "#0000FF");

	}

	
	this.S2TableID = new Array(y);
	for (i = 0; i <=y; i++)="" {="" if="" (i=""> 0)
		{
			this.S2TableID[i-1] = this.nextIndex++;
			this.cmd("CreateLabel", this.S2TableID[i-1], S2.charAt(i-1),DPLCS.TABLE_START_X - 2 * DPLCS.TABLE_ELEM_WIDTH, DPLCS.TABLE_START_Y + i * DPLCS.TABLE_ELEM_HEIGHT);
			this.oldIDs.push(this.S2TableID[i-1]);					 
		}
		var index = this.nextIndex++;
		this.oldIDs.push(index);
		this.cmd("CreateLabel", index, i - 1, DPLCS.TABLE_START_X  - 1 * DPLCS.TABLE_ELEM_WIDTH, DPLCS.TABLE_START_Y +  i * DPLCS.TABLE_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", index, "#0000FF");
	}
	
	
	for (i = 0; i <= 1="" x;="" i++)="" {="" this.tableid[i]="new" array(y+1);="" this.tablevals[i]="new" this.tablexpos[i]="new" this.tableypos[i]="new" for="" (j="0;" j="" <="y;" j++)="" this.tableid[i][j]="this.nextIndex++;" this.tablevals[i][j]="-1;" this.oldids.push(this.tableid[i][j]);="" this.tablexpos[i][j]="DPLCS.TABLE_START_X" +="" i="" *="" dplcs.table_elem_width;="" this.tableypos[i][j]="DPLCS.TABLE_START_Y" dplcs.table_elem_height;="" this.cmd("createrectangle",="" this.tableid[i][j],="" "",="" dplcs.table_elem_width,="" dplcs.table_elem_height,="" this.tablexpos[i][j],="" this.tableypos[i][j]);="" }="" dplcs.prototype.clearoldids="function()" (var="" this.oldids.length;="" this.cmd("delete",="" this.oldids[i]);="" this.oldids="[];" this.nextindex="this.initialIndex;" dplcs.prototype.reset="function()" dplcs.prototype.emptycallback="function(event)" this.implementaction(this.helpmessage.bind(this),="" "");="" todo:="" put="" up="" a="" message="" to="" push="" the="" appropriate="" button?="" dplcs.prototype.recursivecallback="function(event)" var="" fibvalue;="" if="" (this.s1field.value="" !="" &&="" this.s2field.value="" )="" this.implementaction(this.recursivelcs.bind(this),this.s1field.value="" ";"="" this.s2field.value);="" else="" dplcs.prototype.tablecallback="function(event)" this.implementaction(this.tablelcs.bind(this),this.s1field.value="" dplcs.prototype.memoizedcallback="function(event)" this.implementaction(this.memoizedlcs.bind(this),="" this.s1field.value="" dplcs.prototype.helpmessage="function(value)" this.commands="[];" this.clearoldids();="" messageid="this.nextIndex++;" this.oldids.push(messageid);="" this.cmd("createlabel",="" messageid,="" "enter="" two="" sequences="" in="" text="" fields.\n"="" "then="" press="" lcs="" recursive,="" table,="" or="" memoized="" button",="" dplcs.recursive_start_x,="" dplcs.recursive_start_y,="" 0);="" return="" this.commands;="" dplcs.prototype.recursivelcs="function(value)" this.currenty="DPLCS.RECURSIVE_START_Y;" functioncallid="this.nextIndex++;" this.oldids.push(functioncallid);="" final="this.LCS(sequences[0]," sequences[1],="" sequences[0].length="" -="" 1,="" sequences[1].length="" functioncallid);="" this.cmd("settext",="" functioncallid,="" "lcs("="" sequences[0]="" ",="" "="" sequences[1]="" string(sequences[0].length="" 1)="" string(sequences[1].length="" ")=" + String(final));
	return this.commands;
}


DPLCS.prototype.LCS = function(S1, S2, x, y, xPos, ID)
{	
	var ID2 = this.nextIndex++;
	this.cmd(" createlabel",="" id,="" s1="" s2="" string(x)="" "+="" string(y)="" ")",="" xpos,="" this.currenty,="" id2,="" [lcs("="" s1.substring(0,x="" 1)+="" ","="" s2.substring(0,y="" ")]");="" this.cmd("setforegroundcolor",="" "#3333ff");="" this.cmd("alignright",="" id);="" this.codeid[0][1],="" dplcs.code_highlight_color);="" this.cmd("step");="" dplcs.code_standard_color);="" (x="=" -1="" ||="" y="=" -1)="" this.codeid[1][1],="" (y="=" this.codeid[1][3],="" this.codeid[2][0],="" id2);="" 0;="" this.codeid[3][1],="" (s1.charat(x)="=" s2.charat(y))="" this.codeid[4][1],="" nextid="this.nextIndex++;" subprob="this.LCS(S1," s2,="" x-1,="" y-1,="" xpos="" dplcs.recursive_delta_x,="" nextid);="" this.codeid[4][0],="" 1);="" firstid="this.nextIndex++;" secondid="this.nextIndex++;" this.codeid[6][1],="" subprob1="this.LCS(S1," y,="" firstid);="" this.codeid[6][3],="" subprob2="this.LCS(S1," x,="" secondid);="" this.codeid[6][0],="" this.codeid[6][2],="" this.codeid[6][4],="" best="Math.max(subProb1," subprob2);="" best);="" best;="" dplcs.prototype.buildlcsfromtable="function(S1," s2)="" currx="this.tableVals.length" 1;="" curry="this.tableVals[0].length" sequence="[];" header="this.nextIndex++;" this.oldids.push(header);="" header,="" "sequence",="" dplcs.sequence_start_x,="" dplcs.sequence_start_y="" 30,="" "#003300");="" while="" (currx=""> 0 && currY > 0)
	{
		this.cmd("SetHighlight", this.tableID[currX][currY], 1);
		this.cmd("Step");
		this.cmd("SetHighlight", this.S1TableID[currX-1], 1);
		this.cmd("SetHighlight", this.S2TableID[currY-1], 1);
		this.cmd("Step");
		this.cmd("SetHighlight", this.S1TableID[currX-1], 0);
		this.cmd("SetHighlight", this.S2TableID[currY-1], 0);
		this.cmd("SetHighlight", this.tableID[currX][currY], 0);
		
		if (S1.charAt(currX - 1) == S2.charAt(currY - 1))
		{
			var nextSequenceID = this.nextIndex++;
			this.oldIDs.push(nextSequenceID);
			sequence.push(nextSequenceID);
			this.cmd("CreateLabel", nextSequenceID, S1.charAt(currX - 1), DPLCS.TABLE_START_X + currX*DPLCS.TABLE_ELEM_WIDTH, DPLCS.TABLE_START_Y - 2 * DPLCS.TABLE_ELEM_HEIGHT);
			this.cmd("SetForegroundColor", nextSequenceID, "#0000FF");

			for (var i = sequence.length - 1; i >=0; i--)
			{
				this.cmd("Move", sequence[i], DPLCS.SEQUENCE_START_X + (sequence.length - 1 - i) * DPLCS.SEQUENCE_DELTA_X, DPLCS.SEQUENCE_START_Y);				
			}
			
			currX = currX - 1;
			currY = currY - 1;
		}
		else 
		{
			this.cmd("SetHighlight", this.tableID[currX-1][currY], 1);
			this.cmd("SetHighlight", this.tableID[currX][currY - 1], 1);
			this.cmd("Step");
			this.cmd("SetHighlight", this.tableID[currX-1][currY], 0);
			this.cmd("SetHighlight", this.tableID[currX][currY - 1], 0	);
			
			if (this.tableVals[currX-1][currY] > this.tableVals[currX][currY - 1])
			{
				currX = currX - 1;
			}
			else
			{
				currY = currY - 1;
				
			}
		}
		
	}
	
	
	
}


DPLCS.prototype.tableLCS = function(value)
{
	this.commands = [];
	this.clearOldIDs();
	
	var sequences=value.split(";");

	this.buildTable(sequences[0], sequences[1]);
						
	var moveID = this.nextIndex++;
	var x = sequences[0].length;
	var y = sequences[1].length;
	var i, j;
	
	for (i = 0; i <= x;="" i++)="" {="" this.cmd("settext",="" this.tableid[i][0],="" "0");="" this.tablevals[i][0]="0;" }="" for="" (i="0;" i="" <="y;" this.tableid[0][i],="" this.tablevals[0][i]="0;" this.cmd("step");="" (j="0;" j="" y;="" j++)="" this.cmd("sethighlight",="" this.tableid[i+1][j+1],="" 1);="" this.s1tableid[i],="" this.s2tableid[j],="" this.cmd("setforegroundcolor",="" this.codeid[3][1],="" dplcs.code_highlight_color);="" this.cmd("step")="" 0);="" dplcs.code_standard_color);="" if="" (sequences[0].charat(i)="=" sequences[1].charat(j))="" this.codeid[4][0],="" this.codeid[4][1],="" this.tableid[i+1-1][j+1-1],="" this.cmd("createlabel",="" moveid,="" this.tablevals[i][j]="" +="" 1,="" this.tablexpos[i][j],="" this.tableypos[i][j]);="" this.cmd("move",="" this.tablexpos[i+1][j+1],="" this.tableypos[i+1][j+1]);="" this.cmd("delete",="" moveid);="" this.tablevals[i+1][j+1]="this.tableVals[i][j]" 1;="" this.tablevals[i+1][j+1]);="" else="" this.codeid[6][0],="" this.codeid[6][1],="" this.codeid[6][2],="" this.codeid[6][3],="" this.codeid[6][4],="" this.tableid[i][j+1],="" this.tableid[i+1][j],="" (this.tablevals[i][j+1]=""> this.tableVals[i+1][j])
				{
					this.cmd("SetHighlight", this.tableID[i+1][j], 0);
					this.cmd("SetForegroundColor", this.codeID[6][3], DPLCS.CODE_STANDARD_COLOR);

					this.tableVals[i+1][j+1] = this.tableVals[i][j+1];
					this.cmd("CreateLabel", moveID, this.tableVals[i][j+1], this.tableXPos[i][j+1], this.tableYPos[i][j+1]);
					
				}
				else
				{
					this.cmd("SetForegroundColor", this.codeID[6][1], DPLCS.CODE_STANDARD_COLOR);
					this.cmd("SetHighlight", this.tableID[i][j+1], 0);
					this.tableVals[i+1][j+1] = this.tableVals[i+1][j];
					this.cmd("CreateLabel", moveID, this.tableVals[i+1][j], this.tableXPos[i+1][j], this.tableYPos[i+1][j]);
				}
				this.cmd("Move", moveID, this.tableXPos[i+1][j+1], this.tableYPos[i+1][j+1]);
				this.cmd("Step");
				this.cmd("SetText", this.tableID[i+1][j+1], this.tableVals[i+1][j+1]);
				this.cmd("Delete", moveID);
				if (this.tableVals[i][j+1] > this.tableVals[i+1][j])
				{
					this.cmd("SetForegroundColor", this.codeID[6][1], DPLCS.CODE_STANDARD_COLOR);
					this.cmd("SetHighlight", this.tableID[i][j+1], 0);
				}
				else
				{
					this.cmd("SetForegroundColor", this.codeID[6][3], DPLCS.CODE_STANDARD_COLOR);
					this.cmd("SetHighlight", this.tableID[i+1][j], 0);
				}
				
			}
			this.cmd("SetHighlight", this.tableID[i+1][j+1], 0);
			//this.cmd("Step");

		}
	}
	this.buildLCSFromTable(sequences[0], sequences[1]);
	return this.commands;
}



DPLCS.prototype.LCSMem = function(S1, S2, x, y, xPos, ID)
{	
	var ID2 = this.nextIndex++;
	this.cmd("CreateLabel", ID, "LCS(" + S1 + ", " + S2 + ", " + String(x) + ", "+ String(y) + ")", xPos, this.currentY, 0);
	this.cmd("CreateLabel", ID2,   "        [LCS(" +  S1.substring(0,x + 1)+ "," +  S2.substring(0,y + 1) + ")]");
	this.cmd("SetForegroundColor", ID2, "#3333FF");
	this.cmd("AlignRight", ID2, ID);
	this.cmd("SetForegroundColor", this.codeID[0][1], DPLCS.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");	
	this.cmd("SetForegroundColor", this.codeID[0][1], DPLCS.CODE_STANDARD_COLOR);
	
	if (this.tableVals[x+1][y+1] != -1)
	{
		var movingLabel = this.nextIndex++;
		this.cmd("CreateLabel", movingLabel, this.tableVals[x+1][y+1], this.tableXPos[x+1][y+1], this.tableYPos[x+1][y+1]);
		this.cmd("Move", movingLabel, xPos, this.currentY);
		this.cmd("SetText", ID, "");		
		this.cmd("Step");
		this.cmd("Delete", movingLabel);
		
		
		this.cmd("SetText", ID, this.tableVals[x+1][y+1]);		
		this.cmd("Delete", ID2);
		this.cmd("Step");
		return this.tableVals[x+1][y+1];				
	}
	
	
	if (x == -1 || y == -1)
	{
		if (x == -1)
		{
			this.cmd("SetForegroundColor", this.codeID[1][1], DPLCS.CODE_HIGHLIGHT_COLOR);
			
		}
		if (y == -1)
		{
			this.cmd("SetForegroundColor", this.codeID[1][3], DPLCS.CODE_HIGHLIGHT_COLOR);
			
		}
		this.cmd("Step");
		if (x == -1)
		{
			this.cmd("SetForegroundColor", this.codeID[1][1], DPLCS.CODE_STANDARD_COLOR);
			
		}
		if (y == -1)
		{
			this.cmd("SetForegroundColor", this.codeID[1][3], DPLCS.CODE_STANDARD_COLOR);
		}
		this.cmd("SetForegroundColor", this.codeID[2][0], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetText", ID, 0);		
		this.cmd("Delete", ID2);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[2][0], DPLCS.CODE_STANDARD_COLOR);
		

		var movingLabel = this.nextIndex++;
		this.cmd("CreateLabel", movingLabel,0,  xPos, this.currentY);
		this.cmd("Move", movingLabel, this.tableXPos[x+1][y+1], this.tableYPos[x+1][y+1]);
		this.cmd("Step");
		this.cmd("Delete", movingLabel);
		
		this.tableVals[x+1][y+1] = 0;
		this.cmd("SetText", this.tableID[x+1][y+1], 0);
		
		
		return 0;
	}
	this.cmd("SetForegroundColor", this.codeID[3][1], DPLCS.CODE_HIGHLIGHT_COLOR);
	this.cmd("Step");
	this.cmd("SetForegroundColor", this.codeID[3][1], DPLCS.CODE_STANDARD_COLOR);
	
	if (S1.charAt(x) == S2.charAt(y))
	{
		
		this.cmd("SetForegroundColor", this.codeID[4][1], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][1], DPLCS.CODE_STANDARD_COLOR);
		
		var nextID = this.nextIndex++;
		this.currentY += DPLCS.RECURSIVE_DELTA_Y;
		var subProb = this.LCSMem(S1, S2, x-1, y-1, xPos + DPLCS.RECURSIVE_DELTA_X, nextID);
		
		
		this.cmd("SetForegroundColor", this.codeID[4][0], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[4][0], DPLCS.CODE_STANDARD_COLOR);
		
		
		this.cmd("Delete", nextID);
		this.cmd("SetText", ID, subProb + 1);
		this.cmd("Delete", ID2);
		this.cmd("step");
		this.currentY -= DPLCS.RECURSIVE_DELTA_Y;
		
		// TODO:  Animate moving value into table here
		
		
		var movingLabel = this.nextIndex++;
		this.cmd("CreateLabel", movingLabel, subProb + 1,  xPos, this.currentY);
		this.cmd("Move", movingLabel, this.tableXPos[x+1][y+1], this.tableYPos[x+1][y+1]);
		this.cmd("Step");
		this.cmd("Delete", movingLabel);
		
		
		
		this.tableVals[x+1][y+1] = subProb + 1;
		this.cmd("SetText", this.tableID[x+1][y+1], subProb + 1);
		
		return subProb + 1
	}
	else
	{
		var firstID = this.nextIndex++;
		var secondID = this.nextIndex++;
		this.currentY += DPLCS.RECURSIVE_DELTA_Y;
		this.cmd("SetForegroundColor", this.codeID[6][1], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[6][1], DPLCS.CODE_STANDARD_COLOR);
		
		var subProb1 = this.LCSMem(S1, S2, x-1, y, xPos + DPLCS.RECURSIVE_DELTA_X, firstID);
		this.currentY += DPLCS.RECURSIVE_DELTA_Y;
		this.cmd("SetForegroundColor", this.codeID[6][3], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[6][3], DPLCS.CODE_STANDARD_COLOR);
		
		var subProb2 = this.LCSMem(S1, S2, x, y-1, xPos + DPLCS.RECURSIVE_DELTA_X, secondID);
		
		this.cmd("SetForegroundColor", this.codeID[6][0], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][2], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][4], DPLCS.CODE_HIGHLIGHT_COLOR);
		this.cmd("Step");
		this.cmd("SetForegroundColor", this.codeID[6][0], DPLCS.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][2], DPLCS.CODE_STANDARD_COLOR);
		this.cmd("SetForegroundColor", this.codeID[6][4], DPLCS.CODE_STANDARD_COLOR);
		this.cmd("Delete", firstID);
		this.cmd("Delete", secondID);
		this.currentY -= 2*DPLCS.RECURSIVE_DELTA_Y;
		var best = Math.max(subProb1, subProb2);
		this.cmd("SetText", ID, best);
		this.cmd("Delete", ID2);


		
		var movingLabel = this.nextIndex++;
		this.cmd("CreateLabel", movingLabel, best,  xPos, this.currentY);
		this.cmd("Move", movingLabel, this.tableXPos[x+1][y+1], this.tableYPos[x+1][y+1]);
		this.cmd("Step");
		this.cmd("Delete", movingLabel);
		
		
		
		// TODO:  Animate moving value into table here
		this.tableVals[x+1][y+1] = best;
		this.cmd("SetText", this.tableID[x+1][y+1], best);
		
		
		
		this.cmd("step");
		return best;		
	}
}


DPLCS.prototype.memoizedLCS = function(value)
{
	this.commands = [];
	
	this.clearOldIDs();
	var sequences=value.split(";");
	
	this.buildTable(sequences[0], sequences[1]);


	var functionCallID = this.nextIndex++;
	this.currentY = DPLCS.RECURSIVE_START_Y;
	
	this.oldIDs.push(functionCallID);
	
	
	var final = this.LCSMem(sequences[0], sequences[1], sequences[0].length - 1, sequences[1].length - 1, DPLCS.RECURSIVE_START_X, functionCallID);
		
	this.cmd("SetText", functionCallID, "LCS(" + sequences[0] + ", " + sequences[1] + ", " +  String(sequences[0].length - 1) + ", " +  String(sequences[1].length - 1) + ") = " + String(final));


	this.buildLCSFromTable(sequences[0], sequences[1]);
	
	return this.commands;
}

DPLCS.prototype.enableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
	
	
}
DPLCS.prototype.disableUI = function(event)
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
	currentAlg = new DPLCS(animManag, canvas.width, canvas.height);
}



</=></=></=y;></=x;></copyright></copyright>