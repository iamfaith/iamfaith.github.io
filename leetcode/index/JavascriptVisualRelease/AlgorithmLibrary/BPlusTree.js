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

var FIRST_PRINT_POS_X = 50;
var PRINT_VERTICAL_GAP = 20;
var PRINT_MAX = 990;
var PRINT_HORIZONTAL_GAP = 50;

var MIN_MAX_DEGREE = 3;
var MAX_MAX_DEGREE = 7;

var HEIGHT_DELTA  = 50;
var NODE_SPACING = 15; 
var STARTING_Y = 30;
var WIDTH_PER_ELEM = 40;
var NODE_HEIGHT = 20;

var MESSAGE_X = 5;
var MESSAGE_Y = 10;

var LINK_COLOR = "#007700";
var HIGHLIGHT_CIRCLE_COLOR = "#007700";
var FOREGROUND_COLOR = "#007700";
var BACKGROUND_COLOR = "#EEFFEE";
var PRINT_COLOR = FOREGROUND_COLOR;



function BPlusTree(am, w, h)
{
	this.init(am, w, h);

}

BPlusTree.prototype = new Algorithm();
BPlusTree.prototype.varructor = BPlusTree;
BPlusTree.superclass = Algorithm.prototype;





BPlusTree.prototype.init = function(am, w, h)
{
	BPlusTree.superclass.init.call(this, am, w, h);
	this.nextIndex = 0;
	
	this.preemptiveSplit = false
	
	this.starting_x = w / 2;

	this.addControls();
	
	
	this.max_keys = 2;
	this.min_keys = 1;
	this.split_index = 1;
	
	this.max_degree = 3;
	
	
	
	
	this.messageID = this.nextIndex++;
	this.cmd("CreateLabel", this.messageID, "", MESSAGE_X, MESSAGE_Y, 0);
	this.moveLabel1ID = this.nextIndex++;
	this.moveLabel2ID = this.nextIndex++;
	
	animationManager.StartNewAnimation(this.commands);
	animationManager.skipForward();
	animationManager.clearHistory();
	this.commands = new Array();
	
	this.first_print_pos_y = h - 3 * PRINT_VERTICAL_GAP;

	
	this.xPosOfNextLabel = 100;
	this.yPosOfNextLabel = 200;
}

BPlusTree.prototype.addControls =  function()
{
	this.controls = [];
	
	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), 4);
	this.controls.push(this.insertField);
	
	this.insertButton = addControlToAlgorithmBar("Button", "Insert");
	this.insertButton.onclick = this.insertCallback.bind(this);
	this.controls.push(this.insertButton);
	
	this.deleteField = addControlToAlgorithmBar("Text", "");
	this.deleteField.onkeydown = this.returnSubmit(this.deleteField,  this.deleteCallback.bind(this), 4);
	this.controls.push(this.deleteField);
	
	this.deleteButton = addControlToAlgorithmBar("Button", "Delete");
	this.deleteButton.onclick = this.deleteCallback.bind(this);
	this.controls.push(this.deleteButton);
	
	this.findField = addControlToAlgorithmBar("Text", "");
	this.findField.onkeydown = this.returnSubmit(this.findField,  this.findCallback.bind(this), 4);
	this.controls.push(this.findField);
	
	this.findButton = addControlToAlgorithmBar("Button", "Find");
	this.findButton.onclick = this.findCallback.bind(this);
	this.controls.push(this.findButton);
	
	this.printButton = addControlToAlgorithmBar("Button", "Print");
	this.printButton.onclick = this.printCallback.bind(this);
	this.controls.push(this.printButton);
	
	this.clearButton = addControlToAlgorithmBar("Button", "Clear");
	this.clearButton.onclick = this.clearCallback.bind(this);
	this.controls.push(this.clearButton);
	
	var i;
	radioButtonNames = [];
	for (i = MIN_MAX_DEGREE; i <= max_max_degree;="" i++)="" {="" radiobuttonnames.push("max.="" degree=" + String(i));
	}
	
	this.maxDegreeRadioButtons = addRadioButtonGroupToAlgorithmBar(radioButtonNames, " maxdegree");="" this.maxdegreeradiobuttons[0].checked="true;" for(i="0;" i="" <="" this.maxdegreeradiobuttons.length;="" this.maxdegreeradiobuttons[i].onclick="this.maxDegreeChangedHandler.bind(this,i+MIN_MAX_DEGREE);" }="" this.premptivesplitbox="addCheckboxToAlgorithmBar(" preemtive"="" split="" merge="" (even="" max="" only)");="" this.premptivesplitbox.onclick="this.premtiveSplitCallback.bind(this);" other="" buttons="" ...="" bplustree.prototype.reset="function()" this.nextindex="3;" this.max_degree="3;" this.max_keys="2;" this.min_keys="1;" this.split_index="1;" note:="" the="" order="" of="" these="" last="" two="" this.commands="" matters!="" this.treeroot="null;" this.ignoreinputs="true;" maxdegreebuttonarray[this.max_degree].selected="true;" bplustree.prototype.enableui="function(event)" var="" i;="" for="" (i="0;" this.controls.length;="" this.controls[i].disabled="false;" this.maxdegreeradiobuttons[i].disabled="false;" bplustree.prototype.disableui="function(event)" (var="" todo:="" fix="" me!="" bplustree.prototype.maxdegreechangedhandler="function(newMaxDegree," event)="" if="" (this.max_degree="" !="newMaxDegree)" this.implementaction(this.changedegree.bind(this),="" newmaxdegree);="" bplustree.prototype.insertcallback="function(event)" insertedvalue;="" insertedvalue="this.normalizeNumber(this.insertField.value," 4);="" (insertedvalue="" )="" this.insertfield.value="" ;="" this.implementaction(this.insertelement.bind(this),insertedvalue);="" bplustree.prototype.deletecallback="function(event)" deletedvalue="this.deleteField.value;" (deletedvalue="" this.deletefield.value="" this.implementaction(this.deleteelement.bind(this),deletedvalue);="" bplustree.prototype.clearcallback="function(event)" this.implementaction(this.cleartree.bind(this),="" "");="" bplustree.prototype.premtivesplitcallback="function(event)" (this.preemptivesplit="" this.implementaction(this.changepreemtivesplit.bind(this),="" this.premptivesplitbox.checked);="" bplustree.prototype.changepreemtivesplit="function(newValue)" array();="" this.cmd("step");="" this.preemptivesplit="newValue;" (this.premptivesplitbox.checked="" this.premptivesplitbox.checked="this.preemptiveSplit;" return="" this.commands;="" bplustree.prototype.printcallback="function(event)" this.implementaction(this.printtree.bind(this),"");="" bplustree.prototype.printtree="function(unused)" this.cmd("settext",="" this.messageid,="" "printing="" tree");="" firstlabel="this.nextIndex;" (this.treeroot="" this.xposofnextlabel="FIRST_PRINT_POS_X;" this.yposofnextlabel="this.first_print_pos_y;" tmp="this.treeRoot;" this.cmd("sethighlight",="" tmp.graphicid,="" 1);="" while="" (!tmp.isleaf)="" this.cmd("setedgehighlight",="" tmp.children[0].graphicid,="" 0);="" (tmp!="null)" tmp.numkeys;="" nextlabelid="this.nextIndex++;" this.cmd("createlabel",="" nextlabelid,="" tmp.keys[i],="" this.getlabelx(tmp,="" i),="" tmp.y);="" this.cmd("setforegroundcolor",="" print_color);="" this.cmd("move",="" this.xposofnextlabel,="" this.yposofnextlabel);="" +="PRINT_HORIZONTAL_GAP;" (this.xposofnextlabel=""> PRINT_MAX)
				{
					this.xPosOfNextLabel = FIRST_PRINT_POS_X;
					this.yPosOfNextLabel += PRINT_VERTICAL_GAP;
				}
			}
			if (tmp.next != null)
			{
				this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.next.graphicID, 1);
				this.cmd("Step");
				this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.next.graphicID, 0);
			}
			this.cmd("SetHighlight", tmp.graphicID, 0);
			tmp = tmp.next;
		}
		this.cmd("Step");
		for (var i = firstLabel; i < this.nextIndex; i++)
		{
			this.cmd("Delete", i);
		}
		this.nextIndex = firstLabel;
	}
	this.cmd("SetText", this.messageID, "");
	return this.commands;
}








BPlusTree.prototype.clearTree = function(ignored)
{
	this.commands = new Array();
	this.deleteTree(this.treeRoot);
	this.treeRoot = null;
	this.nextIndex = 3;		
	return this.commands;
}

BPlusTree.prototype.deleteTree = function(tree)
{
	if (tree != null)
	{
		if (!tree.isLeaf)
		{
			for (var i = 0; i <= 2="" tree.numkeys;="" i++)="" {="" this.cmd("disconnect",="" tree.graphicid,="" tree.children[i].graphicid);="" this.deletetree(tree.children[i]);="" tree.children[i]="=" null;="" }="" this.cmd("delete",="" tree.graphicid);="" bplustree.prototype.changedegree="function(degree)" this.commands="new" array();="" this.deletetree(this.treeroot);="" this.treeroot="null;" this.nextindex="3;" var="" newdegree="degree;" this.ignoreinputs="true;" todo:="" check="" me!="" this.maxdegreeradiobuttons[newdegree="" -="" min_max_degree].checked="true;" this.max_degree="newDegree;" this.max_keys="newDegree" 1;="" this.min_keys="Math.floor((newDegree" +="" 1)="" 2)="" this.split_index="Math.floor((newDegree)" 2);="" if="" (this.commands.length="=" 0)="" this.cmd("step");="" (newdegree="" %="" !="0" &&="" this.preemptivesplit)="" this.preemptivesplit="false;" this.premptivesplitbox.checked="false;" return="" this.commands;="" bplustree.prototype.findcallback="function(event)" findvalue;="" findvalue="this.normalizeNumber(this.findField.value," 4);="" this.findfield.value="" ;="" this.implementaction(this.findelement.bind(this),findvalue);="" bplustree.prototype.findelement="function(findValue)" this.cmd("settext",="" this.messageid,="" "finding="" "="" findvalue);="" this.findintree(this.treeroot,="" bplustree.prototype.findintree="function(tree," val)="" (tree="" this.cmd("sethighlight",="" 1);="" i;="" for="" (i="0;" i="" <="" tree.numkeys="" tree.keys[i]="" val;="" i++);="" tree.numkeys)="" (!tree.isleaf)="" this.cmd("setedgehighlight",="" tree.children[tree.numkeys].graphicid,="" 0);="" this.findintree(tree.children[tree.numkeys],="" val);="" else="" "element="" val="" is="" not="" in="" the="" tree");="" (tree.keys[i]=""> val)
		{
			if (!tree.isLeaf)
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 0);					
				this.findInTree(tree.children[i], val);
			}
			else
			{
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetText", this.messageID, "Element " + val + " is not in the tree");
			}
		}
		else
		{
			if (tree.isLeaf)
			{
				this.cmd("SetTextColor", tree.graphicID, "#FF0000", i);
				this.cmd("SetText", this.messageID, "Element " + val + " found");
				this.cmd("Step");
				this.cmd("SetTextColor", tree.graphicID, FOREGROUND_COLOR, i);
				this.cmd("SetHighlight", tree.graphicID, 0);
				
				this.cmd("Step");
			}
			else
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 0);					
				this.findInTree(tree.children[i+1], val);				
			}
		}
	}
	else
	{
		this.cmd("SetText", this.messageID, "Element " + val + " is not in the tree");
	}
}


BPlusTree.prototype.insertElement = function(insertedValue)
{
	this.commands = new Array();
	
	this.cmd("SetText", this.messageID, "Inserting " + insertedValue);
	this.cmd("Step");
	
	if (this.treeRoot == null)
	{
		this.treeRoot = new BTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",this.treeRoot.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, 1, this.starting_x, STARTING_Y, BACKGROUND_COLOR,  FOREGROUND_COLOR);
		this.treeRoot.keys[0] = insertedValue;
		this.cmd("SetText", this.treeRoot.graphicID, insertedValue, 0);
	}
	else
	{
		this.insert(this.treeRoot, insertedValue);					
		if (!this.treeRoot.isLeaf)
		{
			this.resizeTree();
		}
	}
	
	this.cmd("SetText", this.messageID, "");
	
	return this.commands;
	
}




BPlusTree.prototype.insert  = function(tree, insertValue)
{
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("Step");
	if (tree.isLeaf)
	{
		this.cmd("SetText", this.messageID, "Inserting " + insertValue + ".  Inserting into a leaf");
		tree.numKeys++;
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
		var insertIndex = tree.numKeys - 1;
		while (insertIndex > 0 && tree.keys[insertIndex - 1] > insertValue)
		{
			tree.keys[insertIndex] = tree.keys[insertIndex - 1];
			this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
			insertIndex--;
		}
		tree.keys[insertIndex] = insertValue;
		this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
		this.cmd("SetHighlight", tree.graphicID, 0);
		if (tree.next != null)
		{
			this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
			this.cmd("Connect", tree.graphicID, 
				tree.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				tree.numKeys);
			
			
		}
		this.resizeTree();
		this.insertRepair(tree);
	}
	else
	{
		var findIndex = 0;
		while (findIndex < tree.numKeys && tree.keys[findIndex] < insertValue)
		{
			findIndex++;					
		}				
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 1);
		this.cmd("Step");
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 0);
		this.cmd("SetHighlight", tree.graphicID, 0);
		this.insert(tree.children[findIndex], insertValue);				
	}
}

BPlusTree.prototype.insertRepair = function(tree) 
{
	if (tree.numKeys <= 1="" this.max_keys)="" {="" return;="" }="" else="" if="" (tree.parent="=" null)="" this.treeroot="this.split(tree);" var="" newnode="this.split(tree);" this.insertrepair(newnode);="" bplustree.prototype.split="function(tree)" this.cmd("settext",="" this.messageid,="" "node="" now="" contains="" too="" many="" keys.="" splittig="" ...");="" this.cmd("sethighlight",="" tree.graphicid,="" 1);="" this.cmd("step");="" 0);="" rightnode="new" btreenode(this.nextindex++,="" tree.x="" +="" 100,="" tree.y);="" risingnode="tree.keys[this.split_index];" i;="" parentindex="" !="null)" currentparent="tree.parent;" for="" (parentindex="0;" <="" currentparent.numkeys="" &&="" currentparent.children[parentindex]="" parentindex++);="" 1)="" throw="" new="" error("couldn't="" find="" which="" child="" we="" were!");="" this.cmd("setnumelements",="" currentparent.graphicid,="" (i="currentParent.numKeys;" i=""> parentIndex; i--)
		{
			currentParent.children[i+1] = currentParent.children[i];
			this.cmd("Disconnect", currentParent.graphicID, currentParent.children[i].graphicID);
			this.cmd("Connect", currentParent.graphicID,  currentParent.children[i].graphicID, FOREGROUND_COLOR, 
				0, // Curve
				0, // Directed
				"", // Label
				i+1);
			
			currentParent.keys[i] = currentParent.keys[i-1];
			this.cmd("SetText", currentParent.graphicID, currentParent.keys[i] ,i);
		}
		currentParent.numKeys++;
		currentParent.keys[parentIndex] = risingNode;
		this.cmd("SetText", currentParent.graphicID, "", parentIndex);
		this.cmd("CreateLabel", this.moveLabel1ID, risingNode, this.getLabelX(tree, this.split_index),  tree.y)
		this.cmd("Move", this.moveLabel1ID,  this.getLabelX(currentParent, parentIndex),  currentParent.y)
		
		
		
		
		currentParent.children[parentIndex+1] = rightNode;
		rightNode.parent = currentParent;
		
	}
	
	var rightSplit;
	
	if (tree.isLeaf)
	{
		rightSplit = this.split_index;
		rightNode.next = tree.next;
		tree.next = rightNode;
	}
	else
	{
		rightSplit = this.split_index + 1;
	}
	
	rightNode.numKeys = tree.numKeys - rightSplit;
	
	this.cmd("CreateBTreeNode",rightNode.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, tree.numKeys -rightSplit, tree.x, tree.y,  BACKGROUND_COLOR, FOREGROUND_COLOR);
	
	if (tree.isLeaf)
	{
		if (rightNode.next != null)
		{
			
			this.cmd("Disconnect", tree.graphicID, rightNode.next.graphicID);
			this.cmd("Connect", rightNode.graphicID, 
				rightNode.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				rightNode.numKeys);
			
			
		}
		this.cmd("Connect", tree.graphicID, 
			rightNode.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			this.split_index);				
	}
	
	
	for (var i = rightSplit; i < tree.numKeys + 1; i++)
	{
		rightNode.children[i - rightSplit] = tree.children[i];
		if (tree.children[i] != null)
		{
			rightNode.isLeaf = false;
			this.cmd("Disconnect", tree.graphicID, tree.children[i].graphicID);
			
			this.cmd("Connect", rightNode.graphicID, 
				rightNode.children[i - rightSplit].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i - rightSplit);
			if (tree.children[i] != null)
			{
				tree.children[i].parent = rightNode;
			}
			tree.children[i] = null;
			
		}
	}
	for (i =rightSplit; i < tree.numKeys; i++)
	{
		rightNode.keys[i - rightSplit] = tree.keys[i];
		this.cmd("SetText", rightNode.graphicID, rightNode.keys[i -rightSplit], i - rightSplit);
	}
	var leftNode = tree;
	leftNode.numKeys = this.split_index;
	// TO MAKE UNDO WORK -- CAN REMOVE LATER VV
	for (i = this.split_index; i < tree.numKeys; i++)
	{
		this.cmd("SetText", tree.graphicID, "", i); 
	}
	// TO MAKE UNDO WORK -- CAN REMOVE LATER ^^
	this.cmd("SetNumElements", tree.graphicID, this.split_index);
	
	if (tree.parent != null)
	{
		this.cmd("Connect", currentParent.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			parentIndex + 1);
		this.resizeTree();
		this.cmd("Step")
		this.cmd("Delete", this.moveLabel1ID);				
		this.cmd("SetText", currentParent.graphicID, risingNode, parentIndex);
		return tree.parent;
	}
	else //			if (tree.parent == null)
	{
		this.treeRoot = new BTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",this.treeRoot.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, 1, this.starting_x, STARTING_Y,BACKGROUND_COLOR,  FOREGROUND_COLOR);
		this.treeRoot.keys[0] = risingNode;
		this.cmd("SetText", this.treeRoot.graphicID, risingNode, 0);
		this.treeRoot.children[0] = leftNode;
		this.treeRoot.children[1] = rightNode;
		leftNode.parent = this.treeRoot;
		rightNode.parent = this.treeRoot;
		this.cmd("Connect", this.treeRoot.graphicID, leftNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			0);	// Connection Point
		this.cmd("Connect", this.treeRoot.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			1); // Connection Point
		this.treeRoot.isLeaf = false;
		return this.treeRoot;
	}
	
	
	
}

BPlusTree.prototype.deleteElement = function(deletedValue)
{
	this.commands = new Array();
	this.cmd("SetText", 0, "Deleting "+deletedValue);
	this.cmd("Step");
	this.cmd("SetText", 0, "");
	this.cmd("SetText", 0, "");
	this.doDelete(this.treeRoot, deletedValue);
	if (this.treeRoot.numKeys == 0)
	{
		this.cmd("Delete", this.treeRoot.graphicID);
		this.treeRoot = this.treeRoot.children[0];
		this.treeRoot.parent = null;
		this.resizeTree();
	}
	return this.commands;						
}




BPlusTree.prototype.doDelete = function(tree, val)
{
	if (tree != null)
	{
		this.cmd("SetHighlight", tree.graphicID, 1);
		this.cmd("Step");
		var i;
		for (i = 0; i < tree.numKeys && tree.keys[i] < val; i++);
		if (i == tree.numKeys)
		{
			if (!tree.isLeaf)
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 0);
				this.doDelete(tree.children[tree.numKeys], val);
			}
			else
			{
				this.cmd("SetHighlight", tree.graphicID, 0);
			}
		}
		else if (!tree.isLeaf && tree.keys[i] == val)
		{
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 1);
			this.cmd("Step");
			this.cmd("SetHighlight", tree.graphicID, 0);
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 0);					
			this.doDelete(tree.children[i+1], val);
		}
		else if (!tree.isLeaf)
		{
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 1);
			this.cmd("Step");
			this.cmd("SetHighlight", tree.graphicID, 0);
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 0);					
			this.doDelete(tree.children[i], val);			
		}
		else if (tree.isLeaf && tree.keys[i] == val)
		{
			this.cmd("SetTextColor", tree.graphicID, 0xFF0000, i);
			this.cmd("Step");
			this.cmd("SetTextColor", tree.graphicID, FOREGROUND_COLOR, i);
			for (var j = i; j < tree.numKeys - 1; j++)
			{
				tree.keys[j] = tree.keys[j+1];
				this.cmd("SetText", tree.graphicID, tree.keys[j], j);
			}
			tree.numKeys--;
			this.cmd("SetText", tree.graphicID, "", tree.numKeys);
			this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
			this.cmd("SetHighlight", tree.graphicID, 0);
			
			if (tree.next != null)
			{
				this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
				this.cmd("Connect", tree.graphicID, 
					tree.next.graphicID,
					FOREGROUND_COLOR,
					0, // Curve
					1, // Directed
					"", // Label
					tree.numKeys);
			}
			
			// Bit of a hack -- if we remove the smallest element in a leaf, then find the *next* smallest element
			//  (somewhat tricky if the leaf is now empty!), go up our parent stack, and fix index keys
			if (i == 0 && tree.parent != null)
			{
				var nextSmallest = "";
				var parentNode = tree.parent;
				var parentIndex;
				for (parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
				if (tree.numKeys == 0)
				{
					if (parentIndex == parentNode.numKeys)
					{
						nextSmallest == "";
					}
					else
					{
						nextSmallest = parentNode.children[parentIndex+1].keys[0];			
					}
				}
				else
				{
					nextSmallest = tree.keys[0];
				}
				while (parentNode != null)
				{
					if (parentIndex > 0 && parentNode.keys[parentIndex - 1] == val)
					{
						parentNode.keys[parentIndex - 1] = nextSmallest;
						this.cmd("SetText", parentNode.graphicID, parentNode.keys[parentIndex - 1], parentIndex - 1);								
					}
					var grandParent = parentNode.parent;
					for (parentIndex = 0; grandParent != null && grandParent.children[parentIndex] != parentNode; parentIndex++);
					parentNode = grandParent;
					
				}
				
			}
			this.repairAfterDelete(tree);
			
		}
		else
		{
			this.cmd("SetHighlight", tree.graphicID, 0);
		}
		
	}
}



BPlusTree.prototype.mergeRight = function(tree) 
{
	this.cmd("SetText", this.messageID, "Merging node");
	
	var parentNode = tree.parent;
	var parentIndex = 0;
	for (parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
	var rightSib = parentNode.children[parentIndex+1];
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("SetHighlight", parentNode.graphicID, 1);
	this.cmd("SetHighlight", rightSib.graphicID, 1);
	
	this.cmd("Step");
	if (tree.isLeaf)
	{
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys + rightSib.numKeys);
	}
	else
	{
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys + rightSib.numKeys + 1);
		this.cmd("SetText", tree.graphicID, "", tree.numKeys);
		this.cmd("CreateLabel", this.moveLabel1ID, parentNode.keys[parentIndex],  this.getLabelX(parentNode, parentIndex),  parentNode.y);
		tree.keys[tree.numKeys] = parentNode.keys[parentIndex];
	}
	tree.x = (tree.x + rightSib.x) / 2
	this.cmd("SetPosition", tree.graphicID, tree.x,  tree.y);
	
	
	var fromParentIndex = tree.numKeys;
	
	
	for (var i = 0; i < rightSib.numKeys; i++)
	{
		var insertIndex =  tree.numKeys + 1 + i;
		if (tree.isLeaf)
		{
			insertIndex -= 1;
		}
		tree.keys[insertIndex] = rightSib.keys[i];
		this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
		this.cmd("SetText", rightSib.graphicID, "", i);
	}
	if (!tree.isLeaf)
	{
		for (i = 0; i <= 1="" rightsib.numkeys;="" i++)="" {="" this.cmd("disconnect",="" rightsib.graphicid,="" rightsib.children[i].graphicid);="" tree.children[tree.numkeys="" +="" i]="rightSib.children[i];" i].parent="tree;" this.cmd("connect",="" tree.graphicid,="" i].graphicid,="" foreground_color,="" 0,="" curve="" directed="" "",="" label="" tree.numkeys="" i);="" }="" rightsib.numkeys="" 1;="" else="" tree.next="rightSib.next;" if="" (rightsib.next="" !="null)" tree.next.graphicid,="" 1,="" tree.numkeys);="" parentnode.graphicid,="" rightsib.graphicid);="" for="" (i="parentIndex+1;" i="" <="" parentnode.numkeys;="" parentnode.children[i+1].graphicid);="" parentnode.children[i]="parentNode.children[i+1];" parentnode.children[i].graphicid,="" parentnode.keys[i-1]="parentNode.keys[i];" this.cmd("settext",="" parentnode.keys[i-1],="" i-1);="" parentnode.numkeys="" -="" 1);="" parentnode.numkeys--;="" this.cmd("setnumelements",="" parentnode.numkeys);="" this.cmd("sethighlight",="" 0);="" this.cmd("delete",="" (!tree.isleaf)="" this.cmd("move",="" this.movelabel1id,="" this.getlabelx(tree,="" fromparentindex),="" tree.y);="" this.cmd("step");="" this.movelabel1id);="" tree.keys[fromparentindex],="" fromparentindex);="" this.resizetree();="" this.messageid,="" "");="" return="" tree;="" bplustree.prototype.stealfromright="function(tree," parentindex)="" steal="" from="" right="" sibling="" var="" parentnode="tree.parent;" tree.numkeys+1);="" "stealing="" sibling");="" rightsib="parentNode.children[parentIndex" 1];="" tree.numkeys++;="" (tree.isleaf)="" tree.next.graphicid);="" parentindex);="" this.cmd("createlabel",="" rightsib.keys[1],="" this.getlabelx(rightsib,="" 1),="" rightsib.y)="" this.movelabel2id,="" rightsib.keys[0],="" 0),="" tree.keys[tree.numkeys="" 1]="rightSib.keys[0];" parentnode.keys[parentindex]="rightSib.keys[1];" parentnode.keys[parentindex],="" this.getlabelx(parentnode,="" parentindex),="" parentnode.y)="" parentnode.y);="" this.cmd("step")="" this.movelabel2id);="" 1],="" tree.children[tree.numkeys]="rightSib.children[0];" tree.children[tree.numkeys].parent="tree;" rightsib.children[0].graphicid);="" tree.children[tree.numkeys].graphicid,="" todo::checkme!="" (var="" rightsib.children[i-1]="rightSib.children[i];" rightsib.children[i-1].graphicid,="" rightsib.keys[i-1]="rightSib.keys[i];" rightsib.keys[i-1],="" rightsib.numkeys-1);="" rightsib.numkeys--;="" rightsib.numkeys);="" rightsib.next.graphicid);="" rightsib.next.graphicid,="" bplustree.prototype.stealfromleft="function(tree," left="" (tree.isleaf="" &&="" "node="" has="" too="" few="" keys.="" stealing="" sibling.");=""> 0; i--)
	{
		tree.keys[i] = tree.keys[i-1];
		this.cmd("SetText", tree.graphicID, tree.keys[i], i);
	}
	var leftSib = parentNode.children[parentIndex -1];
	
	this.cmd("SetText", tree.graphicID, "", 0);
	this.cmd("SetText", parentNode.graphicID, "", parentIndex - 1);
	this.cmd("SetText", leftSib.graphicID, "", leftSib.numKeys - 1);
	
	
	if (tree.isLeaf)
	{
		this.cmd("CreateLabel", this.moveLabel1ID, leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID,leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		tree.keys[0] = leftSib.keys[leftSib.numKeys - 1];
		parentNode.keys[parentIndex-1] = leftSib.keys[leftSib.numKeys - 1];
	}
	else
	{
		this.cmd("CreateLabel", this.moveLabel1ID, leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID, parentNode.keys[parentIndex - 1], this.getLabelX(parentNode, parentIndex - 1),  parentNode.y)
		tree.keys[0] = parentNode.keys[parentIndex - 1];
		parentNode.keys[parentIndex-1] = leftSib.keys[leftSib.numKeys - 1];				
	}
	this.cmd("Move", this.moveLabel1ID, this.getLabelX(parentNode, parentIndex - 1),  parentNode.y);
	this.cmd("Move", this.moveLabel2ID, this.getLabelX(tree, 0), tree.y);
	
	this.cmd("Step")
	this.cmd("Delete", this.moveLabel1ID);
	this.cmd("Delete", this.moveLabel2ID);
	
	
	if (!tree.isLeaf)
	{
		for (var i = tree.numKeys; i > 0; i--)
		{
			this.cmd("Disconnect", tree.graphicID, tree.children[i-1].graphicID);
			tree.children[i] =tree.children[i-1];
			this.cmd("Connect", tree.graphicID, 
				tree.children[i].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i);
		}
		tree.children[0] = leftSib.children[leftSib.numKeys];
		this.cmd("Disconnect", leftSib.graphicID, leftSib.children[leftSib.numKeys].graphicID);
		this.cmd("Connect", tree.graphicID, 
			tree.children[0].graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			0, // Directed
			"", // Label
			0);
		leftSib.children[leftSib.numKeys] = null;
		tree.children[0].parent = tree;
		
	}
	
	this.cmd("SetText", tree.graphicID, tree.keys[0], 0);						
	this.cmd("SetText", parentNode.graphicID, parentNode.keys[parentIndex - 1], parentIndex - 1);
	this.cmd("SetText", leftSib.graphicID,"", leftSib.numKeys - 1);
	
	leftSib.numKeys--;
	this.cmd("SetNumElements", leftSib.graphicID, leftSib.numKeys);
	this.resizeTree();
	this.cmd("SetText", this.messageID, "");
	
	
	if (tree.isLeaf)
	{
		this.cmd("Disconnect", leftSib.graphicID, tree.graphicID);
		this.cmd("Connect", leftSib.graphicID, 
			tree.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			leftSib.numKeys);
		
	}
	
	
	return tree;
}


BPlusTree.prototype.repairAfterDelete = function(tree)
{
	if (tree.numKeys < this.min_keys)
	{
		if (tree.parent == null)
		{
			if (tree.numKeys == 0)
			{
				this.cmd("Delete", tree.graphicID);
				this.treeRoot = tree.children[0];
				if (this.treeRoot != null)
					this.treeRoot.parent = null;
				this.resizeTree();
			}
		}
		else 
		{
			var parentNode = tree.parent;
			for (var parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
			
			
			if (parentIndex > 0 && parentNode.children[parentIndex - 1].numKeys > this.min_keys)
			{
				this.stealFromLeft(tree, parentIndex);
				
			}
			else if (parentIndex < parentNode.numKeys && parentNode.children[parentIndex + 1].numKeys > this.min_keys)
			{
				this.stealFromRight(tree,parentIndex);
				
			}
			else if (parentIndex == 0)
			{
				// Merge with right sibling
				var nextNode = this.mergeRight(tree);
				this.repairAfterDelete(nextNode.parent);			
			}
			else
			{
				// Merge with left sibling
				nextNode = this.mergeRight(parentNode.children[parentIndex-1]);
				this.repairAfterDelete(nextNode.parent);			
				
			}
			
			
		}
	}
	else if (tree.parent != null)
	{
		
		
	}
}









BPlusTree.prototype.getLabelX = function(tree, index) 
{
	return tree.x - WIDTH_PER_ELEM * tree.numKeys / 2 + WIDTH_PER_ELEM / 2 + index * WIDTH_PER_ELEM;
}

BPlusTree.prototype.resizeTree = function()
{
	this.resizeWidths(this.treeRoot);
	this.setNewPositions(this.treeRoot, this.starting_x, STARTING_Y);
	this.animateNewPositions(this.treeRoot);
}

BPlusTree.prototype.setNewPositions = function(tree, xPosition, yPosition)
{
	if (tree != null)
	{
		tree.y = yPosition;
		tree.x = xPosition;
		if (!tree.isLeaf)
		{
			var leftEdge = xPosition - tree.width / 2;
			var priorWidth = 0;
			for (var i = 0; i < tree.numKeys+1; i++)
			{
				this.setNewPositions(tree.children[i], leftEdge + priorWidth + tree.widths[i] / 2, yPosition+HEIGHT_DELTA);
				priorWidth += tree.widths[i];
			}
		}				
	}			
}

BPlusTree.prototype.animateNewPositions = function(tree)
{
	if (tree == null)
	{
		return;
	}
	var i;
	for (i = 0; i < tree.numKeys + 1; i++)
	{
		this.animateNewPositions(tree.children[i]);
	}
	this.cmd("Move", tree.graphicID, tree.x, tree.y);
}

BPlusTree.prototype.resizeWidths = function(tree) 
{
	if (tree == null)
	{
		return 0;
	}
	if (tree.isLeaf)
	{
		for (var i = 0; i < tree.numKeys + 1; i++)
		{
			tree.widths[i] = 0;
		}
		tree.width = tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING;
		return tree.width;				
	}
	else
	{
		var treeWidth = 0;
		for (i = 0; i < tree.numKeys+1; i++)
		{
			tree.widths[i] = this.resizeWidths(tree.children[i]);
			treeWidth = treeWidth + tree.widths[i];
		}
		treeWidth = Math.max(treeWidth, tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING);
		tree.width = treeWidth;
		return treeWidth;
	}
}
	



function BTreeNode(id, initialX, initialY)
{
	this.widths = [];
	this.keys = [];
	this.children = [];
	this.x = initialX;
	this.y = initialY;
	this.graphicID = id;
	this.numKeys = 1;
	this.isLeaf = true;
	this.parent = null;
	
	this.leftWidth = 0;
	this.rightWidth = 0;
	// Could use children for next pointer, but I got lazy ...
	this.next = null;
	
	
}





var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new BPlusTree(animManag, canvas.width, canvas.height);
}
</=></=></=></=></copyright></copyright>