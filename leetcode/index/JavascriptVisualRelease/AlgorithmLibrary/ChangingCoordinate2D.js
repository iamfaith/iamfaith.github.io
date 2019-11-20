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



function ChangeCoordinate2D(am, w, h)
{
	this.init(am, w, h);
}


ChangeCoordinate2D.prototype = new Algorithm();
ChangeCoordinate2D.prototype.constructor = ChangeCoordinate2D;
ChangeCoordinate2D.superclass = Algorithm.prototype;

ChangeCoordinate2D.XAxisYPos = 300;
ChangeCoordinate2D.XAxisStart = 100;
ChangeCoordinate2D.XAxisEnd = 700;

ChangeCoordinate2D.MATRIX_ELEM_WIDTH = 50;
ChangeCoordinate2D.MATRIX_ELEM_HEIGHT = 15;


ChangeCoordinate2D.MATRIX_MULTIPLY_SPACING = 10;
ChangeCoordinate2D.EQUALS_SPACING = 30;

ChangeCoordinate2D.ROBOT_MATRIX_START_X = 10 + 2 * ChangeCoordinate2D.MATRIX_ELEM_WIDTH + ChangeCoordinate2D.MATRIX_MULTIPLY_SPACING;
ChangeCoordinate2D.ROBOT_MATRIX_START_Y = 30;

ChangeCoordinate2D.HAND_MATRIX_START_X = 10 +2 * ChangeCoordinate2D.MATRIX_ELEM_WIDTH + ChangeCoordinate2D.MATRIX_MULTIPLY_SPACING;
ChangeCoordinate2D.HAND_MATRIX_START_Y = 10 + 25 + 20 + 3*ChangeCoordinate2D.MATRIX_ELEM_HEIGHT;


ChangeCoordinate2D.ROBOT_POSITION_START_X = ChangeCoordinate2D.ROBOT_MATRIX_START_X + 4*ChangeCoordinate2D.MATRIX_ELEM_WIDTH + 100;
ChangeCoordinate2D.HAND_POSITION_START_X = ChangeCoordinate2D.HAND_MATRIX_START_X + 4*ChangeCoordinate2D.MATRIX_ELEM_WIDTH + 100;


ChangeCoordinate2D.ROBOT_POSITION_START_Y = ChangeCoordinate2D.ROBOT_MATRIX_START_Y;
ChangeCoordinate2D.HAND_POSITION_START_Y = ChangeCoordinate2D.HAND_MATRIX_START_Y;


ChangeCoordinate2D.YAxisXPos = 400;
ChangeCoordinate2D.YAxisStart = 100;
ChangeCoordinate2D.YAxisEnd = 500;

ChangeCoordinate2D.ROBOT_POINTS = [[-15,100],[15,100],[15,80],[30,80],[30,-10],[15,-10], [15, -100], [0,-100],[0,-30],[0,-100], [-15, -100],
								   [-15, -10], [-30, -10], [-30, 80],[-15, 80]];


ChangeCoordinate2D.HAND_POINTS = [[0,0],[-10,0],[-10,10], [-6, 10], [-6, 6], [6, 6], [6, 10], [10, 10], [10, 0]];

ChangeCoordinate2D.ROBOT_HAND_ATTACH_POINT = [0, 40];



ChangeCoordinate2D.ROBOT_MATRIX_VALUES = [[[Math.cos(Math.PI / 8), Math.sin(Math.PI / 8)],[-Math.sin(Math.PI / 8), Math.cos(Math.PI / 8)]],
										   [[Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)],[-Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)]],
										  [[Math.cos(0), Math.sin(0)],[-Math.sin(0), Math.cos(0)]],
										  [[Math.cos(3*Math.PI / 4), Math.sin(3*Math.PI/4)],[-Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4)]]];


ChangeCoordinate2D.ROBOT_POSITION_VALUES = [[75, 50], [200,100],[100,100], [100, 200]];


ChangeCoordinate2D.HAND_MATRIX_VALUES = [[[Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)],[-Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6)]],
										 [[Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)],[-Math.sin(Math.PI / 4), Math.cos(-Math.PI / 4)]],
										 [[Math.cos(0), Math.sin(0)],[-Math.sin(0), Math.cos(0)]],
										 [[Math.cos(Math.PI/2), Math.sin(Math.PI/2)],[-Math.sin(Math.PI/2), Math.cos(Math.PI/2)]]];


ChangeCoordinate2D.HAND_POSITION_VALUES = [[80,30],[30,90],[100,100],[-50, -20]];


//ChangeCoordinate2D.ROBOT_POINTS = [[-20, 40], [20,40],[
									


ChangeCoordinate2D.AXIS_CENTER = [[750,470],[750,150],[100, 550]]; 

ChangeCoordinate2D.AXIS_COLOR_0 = "#990000"
ChangeCoordinate2D.AXIS_COLOR_1 = "#009900"
ChangeCoordinate2D.AXIS_COLOR_2 = "#000099"

ChangeCoordinate2D.LOCAL_VERTEX_FOREGORUND_COLOR = "#000000";
ChangeCoordinate2D.LOCAL_VERTEX_BACKGROUND_COLOR = ChangeCoordinate2D.LOCAL_VERTEX_FOREGORUND_COLOR;
ChangeCoordinate2D.LOCAL_EDGE_COLOR = "#000000";

ChangeCoordinate2D.GLOBAL_VERTEX_FOREGORUND_COLOR = "#00FF00";
ChangeCoordinate2D.GLOBAL_VERTEX_BACKGROUND_COLOR = ChangeCoordinate2D.GLOBAL_VERTEX_FOREGORUND_COLOR;
ChangeCoordinate2D.GLOBAL_EDGE_COLOR = "#00FF00";



ChangeCoordinate2D.TRANSFORMED_VERTEX_FOREGORUND_COLOR = "#66FF66";
ChangeCoordinate2D.TRANSFORMED_VERTEX_BACKGROUND_COLOR = ChangeCoordinate2D.VERTEX_FOREGORUND_COLOR;
ChangeCoordinate2D.TRANSFORMED_EDGE_COLOR = "#66FF66";


ChangeCoordinate2D.TRANSFORMED_POINT_COLORS = ["#990000", "#009900", "#000099"]


ChangeCoordinate2D.VECTOR_COLOR = "#FF0000";

ChangeCoordinate2D.VERTEX_WIDTH = 3;
ChangeCoordinate2D.VERTEX_HEIGHT = ChangeCoordinate2D.VERTEX_WIDTH;

ChangeCoordinate2D.prototype.init = function(am, w, h)
{
	var sc = ChangeCoordinate2D.superclass.init.call(this, am, w, h);
	this.rowMajor = true;
	this.posYUp = true;
	this.rotateFirst = true;
	this.addControls();
	this.currentShape = 0;
	
	this.commands = [];
	this.nextIndex = 0;
	
	this.PositionIndex = 0;
	
	this.RobotPositionValues = ChangeCoordinate2D.ROBOT_POSITION_VALUES[this.PositionIndex];
	this.RobotMatrixValues = ChangeCoordinate2D.ROBOT_MATRIX_VALUES[this.PositionIndex];
	this.HandPositionValues = ChangeCoordinate2D.HAND_POSITION_VALUES[this.PositionIndex];
	this.HandMatrixValues = ChangeCoordinate2D.HAND_MATRIX_VALUES[this.PositionIndex];

	this.setupAxis();

	this.robotLabel1ID = this.nextIndex++;
	this.handLabel1ID = this.nextIndex++;
	this.robotLabel2ID = this.nextIndex++;
	this.handLabel2ID = this.nextIndex++;
	
	this.cmd("CreateLabel", this.robotLabel1ID, "Robot Space to World Space\n(Orientation)", ChangeCoordinate2D.ROBOT_MATRIX_START_X, ChangeCoordinate2D.ROBOT_MATRIX_START_Y - 25, 0);
	this.cmd("SetForegroundColor", this.robotLabel1ID, "#0000FF");

	this.cmd("CreateLabel", this.robotLabel2ID, "Robot Space to World Space\n(Position)", ChangeCoordinate2D.ROBOT_POSITION_START_X, ChangeCoordinate2D.ROBOT_MATRIX_START_Y - 25, 0);
	this.cmd("SetForegroundColor", this.robotLabel2ID, "#0000FF");
	
	
	
	this.RobotMatrix = this.createMatrix(this.RobotMatrixValues, ChangeCoordinate2D.ROBOT_MATRIX_START_X, ChangeCoordinate2D.ROBOT_MATRIX_START_Y);
	this.resetMatrixLabels(this.RobotMatrix);
	this.HandMatrix = this.createMatrix(this.HandMatrixValues, ChangeCoordinate2D.HAND_MATRIX_START_X, ChangeCoordinate2D.HAND_MATRIX_START_Y);
	this.resetMatrixLabels(this.HandMatrix);

	this.cmd("CreateLabel", this.handLabel1ID, "Hand Space to Robot Space\n(Orientation)", ChangeCoordinate2D.HAND_MATRIX_START_X, ChangeCoordinate2D.HAND_MATRIX_START_Y - 25, 0);
	this.cmd("SetForegroundColor", this.handLabel1ID, "#0000FF");

	this.cmd("CreateLabel", this.handLabel2ID, "Hand Space to Robot Space\n(Position)", ChangeCoordinate2D.HAND_POSITION_START_X, ChangeCoordinate2D.HAND_MATRIX_START_Y - 25, 0);
	this.cmd("SetForegroundColor", this.handLabel2ID, "#0000FF");
	
	
	
	this.RobotPosition = this.createMatrix([this.RobotPositionValues], ChangeCoordinate2D.ROBOT_POSITION_START_X, ChangeCoordinate2D.ROBOT_POSITION_START_Y);
	this.resetMatrixLabels(this.RobotMatrix);
	this.HandPosition = this.createMatrix([this.HandPositionValues], ChangeCoordinate2D.HAND_POSITION_START_X, ChangeCoordinate2D.HAND_POSITION_START_Y);
	this.resetMatrixLabels(this.HandMatrix);
	
	
	var i;
	this.RobotPointWorldIDs = new Array(ChangeCoordinate2D.ROBOT_POINTS.length);
	this.RobotPointRobotIDs = new Array(ChangeCoordinate2D.ROBOT_POINTS.length);
	this.HandPointWorldIDs = new Array(ChangeCoordinate2D.HAND_POINTS.length);
	this.HandPointRobotIDs = new Array(ChangeCoordinate2D.HAND_POINTS.length);
	this.HandPointHandIDs = new Array(ChangeCoordinate2D.HAND_POINTS.length);
	this.RobotHandAttachRobotID = this.nextIndex++;
	this.RobotHandAttachWorldID = this.nextIndex++;
	for (i = 0; i < ChangeCoordinate2D.ROBOT_POINTS.length; i++)
	{
		this.RobotPointWorldIDs[i] = this.nextIndex++;		
		this.RobotPointRobotIDs[i] = this.nextIndex++;		
	}
	for (i = 0; i < ChangeCoordinate2D.HAND_POINTS.length; i++)
	{
		this.HandPointWorldIDs[i] = this.nextIndex++;
		this.HandPointRobotIDs[i] = this.nextIndex++;
		this.HandPointHandIDs[i] = this.nextIndex++;		
	}
	
	this.savedNextIndex = this.nextIndex;
	this.setupObjects();
	this.setupObjectGraphic();

	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	this.clearHistory();
	this.animationManager.setAllLayers([0, 1]);
	this.lastLocalToGlobal = true;
	this.oldIDs = [];
	
	
}

ChangeCoordinate2D.prototype.addAxis = function(origin, x1, x2, y1, y2, color)
{
	var idArray = [];
	var originID = this.nextIndex++;
	idArray.push(originID);
	this.cmd("CreateRectangle", originID, "", 0, 0, origin[0], origin[1]);
	this.cmd("SetAlpha", originID, 0);
	
	var axisID = this.nextIndex++;
	this.cmd("CreateRectangle", axisID, "", 0, 0, x1[0], x1[1]);
	this.cmd("SetAlpha", axisID, 0);
	this.cmd("Connect", originID, axisID, color, 0, 1, "");
	idArray.push(axisID);
	
	axisID = this.nextIndex++;
	this.cmd("CreateRectangle", axisID, "", 0, 0, x2[0], x2[1]);
	this.cmd("SetAlpha", axisID, 0);
	this.cmd("Connect", originID, axisID, color, 0, 1, "");
	idArray.push(axisID);

	axisID = this.nextIndex++;
	this.cmd("CreateRectangle", axisID, "", 0, 0, y1[0], y1[1]);
	this.cmd("SetAlpha", axisID, 0);
	this.cmd("Connect", originID, axisID, color, 0, 1, "");
	idArray.push(axisID);
	
	axisID = this.nextIndex++;
	this.cmd("CreateRectangle", axisID, "", 0, 0, y2[0], y2[1]);
	this.cmd("SetAlpha", axisID, 0);
	this.cmd("Connect", originID, axisID, color, 0, 1, "");
	idArray.push(axisID);
	

	var labelID = this.nextIndex++;
	this.cmd("CreateLabel", labelID, "+y", y2[0] - 10, y2[1] + 10);
	this.cmd("SetForegroundColor", labelID, color);
	idArray.push(labelID);


	labelID = this.nextIndex++;
	this.cmd("CreateLabel", labelID, "+x", x2[0] - 10, x2[1] + 10);
	this.cmd("SetForegroundColor", labelID, color);
	idArray.push(labelID);
	return idArray;
}


ChangeCoordinate2D.prototype.transformPoint = function(point, matrix, position)
{
	return this.add(this.multiply([point], matrix), [position])[0];
}


ChangeCoordinate2D.prototype.setupExtraAxes =  function()
{
	var robotOrigin = this.RobotPositionValues;
	var x1 = this.transformPoint([-150, 0], this.RobotMatrixValues, this.RobotPositionValues);
	var x2 = this.transformPoint([150, 0], this.RobotMatrixValues, this.RobotPositionValues);
	var y1 = this.transformPoint([0, -150], this.RobotMatrixValues, this.RobotPositionValues);
	var y2 = this.transformPoint([0, 150], this.RobotMatrixValues, this.RobotPositionValues);
	
	this.otherAxes = [];
	
	var tmpAxis = this.addAxis(this.worldToScreenSpace(robotOrigin, 2),
							   this.worldToScreenSpace(x1, 2),
							   this.worldToScreenSpace(x2, 2),
							   this.worldToScreenSpace(y1, 2),
							   this.worldToScreenSpace(y2, 2),
							   ChangeCoordinate2D.AXIS_COLOR_1);
	
	this.otherAxes.push(tmpAxis);
	
	for (var i = 0; i < tmpAxis.length; i++)
	{
		this.cmd("SetLayer", tmpAxis[i], 1);
	}
	this.setAxisAlpha(tmpAxis, 0.5);
	
	
	var handOrigin = this.HandPositionValues;
	x1 = this.transformPoint([-150, 0], this.HandMatrixValues, this.HandPositionValues);
	x2 = this.transformPoint([150, 0], this.HandMatrixValues, this.HandPositionValues);
	y1 = this.transformPoint([0, -150], this.HandMatrixValues, this.HandPositionValues);
	y2 = this.transformPoint([0, 150], this.HandMatrixValues, this.HandPositionValues);
	
	
	tmpAxis = this.addAxis(this.worldToScreenSpace(handOrigin, 1),
						   this.worldToScreenSpace(x1, 1),
						   this.worldToScreenSpace(x2, 1),
						   this.worldToScreenSpace(y1, 1),
						   this.worldToScreenSpace(y2, 1),
						   ChangeCoordinate2D.AXIS_COLOR_0);
	
	for (var i = 0; i < tmpAxis.length; i++)
	{
		this.cmd("SetLayer", tmpAxis[i], 1);
	}	
	this.setAxisAlpha(tmpAxis, 0.5);
	
	
	this.otherAxes.push(tmpAxis);

	
	handOrigin = this.transformPoint(handOrigin, this.RobotMatrixValues, this.RobotPositionValues);
	x1 = this.transformPoint(x1, this.RobotMatrixValues, this.RobotPositionValues);
	x2 = this.transformPoint(x2, this.RobotMatrixValues, this.RobotPositionValues);
	y1 = this.transformPoint(y1, this.RobotMatrixValues, this.RobotPositionValues);
	y2 = this.transformPoint(y2, this.RobotMatrixValues, this.RobotPositionValues);
	
	
	tmpAxis = this.addAxis(this.worldToScreenSpace(handOrigin, 2),
						   this.worldToScreenSpace(x1, 2),
						   this.worldToScreenSpace(x2, 2),
						   this.worldToScreenSpace(y1, 2),
						   this.worldToScreenSpace(y2, 2),
						   ChangeCoordinate2D.AXIS_COLOR_0);
	for (var i = 0; i < tmpAxis.length; i++)
	{
		this.cmd("SetLayer", tmpAxis[i], 1);
	}
	
	this.setAxisAlpha(tmpAxis, 0.5);
	
	this.otherAxes.push(tmpAxis);

}


ChangeCoordinate2D.prototype.setupAxis =  function()
{
	
	this.axisHand = 	this.addAxis(this.worldToScreenSpace([0,0], 0), 
									 this.worldToScreenSpace([-150, 0], 0),
									 this.worldToScreenSpace([150,0],  0),
									 this.worldToScreenSpace([0, -150], 0),
									 this.worldToScreenSpace([0, 150], 0),
									 ChangeCoordinate2D.AXIS_COLOR_0);
	this.setAxisAlpha(this.axisHand, 0.5);

	this.axisRobot = 	this.addAxis(this.worldToScreenSpace([0,0], 1), 
									 this.worldToScreenSpace([-150, 0], 1),
									 this.worldToScreenSpace([150,0],  1),
									 this.worldToScreenSpace([0, -150], 1),
									 this.worldToScreenSpace([0, 150], 1),
									 ChangeCoordinate2D.AXIS_COLOR_1);
	this.setAxisAlpha(this.axisRobot, 0.5);

	this.axisWorld = 	this.addAxis(this.worldToScreenSpace([0,0], 2), 
									 this.worldToScreenSpace([-50, 0], 2),
									 this.worldToScreenSpace([400,0],  2),
									 this.worldToScreenSpace([0, -50], 2),
									 this.worldToScreenSpace([0, 400], 2),
									 ChangeCoordinate2D.AXIS_COLOR_2);
	this.setAxisAlpha(this.axisWorld, 0.5);
	
	this.setupExtraAxes();
	
	

	
	
}


ChangeCoordinate2D.prototype.setAxisAlpha =  function(axisList, newAlpha)
{
	for (var i = 0; i < axisList.length; i++)
	{
		this.cmd("SetAlpha", axisList[i], newAlpha);
		if (i > 0)
		{
			this.cmd("SetEdgeAlpha", axisList[0], axisList[i], newAlpha);
		}
	}
	
}

ChangeCoordinate2D.prototype.setupObjects =  function()
{
		
	var i;
	for (i = 0; i < ChangeCoordinate2D.ROBOT_POINTS.length; i++)
	{
		
		
		var point = this.worldToScreenSpace(ChangeCoordinate2D.ROBOT_POINTS[i], 1);
		this.cmd("CreateRectangle", this.RobotPointRobotIDs[i], "", 0, 0, point[0], point[1]);
		if (i > 0)
		{
			this.cmd("Connect", this.RobotPointRobotIDs[i-1], this.RobotPointRobotIDs[i], "#000000", 0, 0);
		}
		
		point = this.transformPoint(ChangeCoordinate2D.ROBOT_POINTS[i], this.RobotMatrixValues, this.RobotPositionValues);
		point = this.worldToScreenSpace(point, 2);

		this.cmd("CreateRectangle", this.RobotPointWorldIDs[i], "", 0, 0, point[0], point[1]);
		if (i > 0)
		{
			this.cmd("Connect", this.RobotPointWorldIDs[i-1], this.RobotPointWorldIDs[i], "#000000", 0, 0);
		}		
	}
	this.cmd("Connect", this.RobotPointRobotIDs[this.RobotPointRobotIDs.length - 1], this.RobotPointRobotIDs[0], "#000000", 0, 0);
	this.cmd("Connect", this.RobotPointWorldIDs[this.RobotPointWorldIDs.length - 1], this.RobotPointWorldIDs[0], "#000000", 0, 0);

	
	for (i = 0; i < ChangeCoordinate2D.HAND_POINTS.length; i++)
	{
		
		
		var point = this.worldToScreenSpace(ChangeCoordinate2D.HAND_POINTS[i], 0);
		this.cmd("CreateRectangle", this.HandPointHandIDs[i], "", 0, 0, point[0], point[1]);
		if (i > 0)
		{
			this.cmd("Connect", this.HandPointHandIDs[i-1], this.HandPointHandIDs[i], "#000000", 0, 0);
		}
		
		point = this.transformPoint(ChangeCoordinate2D.HAND_POINTS[i], this.HandMatrixValues, this.HandPositionValues);
		var point2 = this.worldToScreenSpace(point, 1);
		
		this.cmd("CreateRectangle", this.HandPointRobotIDs[i], "", 0, 0, point2[0], point2[1]);
		if (i > 0)
		{
			this.cmd("Connect", this.HandPointRobotIDs[i-1], this.HandPointRobotIDs[i], "#000000", 0, 0);
		}
		
		point = this.transformPoint(point, this.RobotMatrixValues, this.RobotPositionValues);
		point = this.worldToScreenSpace(point,2);
		
		this.cmd("CreateRectangle", this.HandPointWorldIDs[i], "", 0, 0, point[0], point[1]);
		if (i > 0)
		{
			this.cmd("Connect", this.HandPointWorldIDs[i-1], this.HandPointWorldIDs[i], "#000000", 0, 0);
		}
		
		
	}
	this.cmd("Connect", this.HandPointHandIDs[this.HandPointHandIDs.length - 1], this.HandPointHandIDs[0], "#000000", 0, 0);
	this.cmd("Connect", this.HandPointRobotIDs[this.HandPointRobotIDs.length - 1], this.HandPointRobotIDs[0], "#000000", 0, 0);
	this.cmd("Connect", this.HandPointWorldIDs[this.HandPointWorldIDs.length - 1], this.HandPointWorldIDs[0], "#000000", 0, 0);
	
	
	point = this.worldToScreenSpace(ChangeCoordinate2D.ROBOT_HAND_ATTACH_POINT, 1);
	this.cmd("CreateRectangle", this.RobotHandAttachRobotID, "", 0, 0, point[0], point[1]);
	this.cmd("Connect", this.RobotHandAttachRobotID, this.HandPointRobotIDs[0], "#000000", 0, 0);

	point = this.transformPoint(ChangeCoordinate2D.ROBOT_HAND_ATTACH_POINT, this.RobotMatrixValues, this.RobotPositionValues);
	point = this.worldToScreenSpace(point, 2);
	this.cmd("CreateRectangle", this.RobotHandAttachWorldID, "", 0, 0, point[0], point[1]);
	this.cmd("Connect", this.RobotHandAttachWorldID, this.HandPointWorldIDs[0], "#000000", 0, 0);
}


ChangeCoordinate2D.prototype.worldToScreenSpace = function(point, space)
{
	var transformedPoint = new Array(2);
	
	return [point[0] + ChangeCoordinate2D.AXIS_CENTER[space][0],
			-point[1] + ChangeCoordinate2D.AXIS_CENTER[space][1]];
}




ChangeCoordinate2D.prototype.removeOldIDs = function()
{
	var i;
	for (i = 0; i < this.oldIDs.length; i++)
	{
		this.cmd("Delete", this.oldIDs[i]);
	}
	this.oldIDs = [];
}



ChangeCoordinate2D.prototype.setupObjectGraphic =  function()
{
	var i;
	

	

}

ChangeCoordinate2D.prototype.addControls =  function()
{
	this.controls = [];
	
	addLabelToAlgorithmBar("x");
						   
	this.xField = addControlToAlgorithmBar("Text", "");
	this.xField.onkeydown = this.returnSubmitFloat(this.xField,  this.transformPointCallback.bind(this), 4, true);
	this.controls.push(this.xField);
	
	addLabelToAlgorithmBar("y");
	
	this.yField = addControlToAlgorithmBar("Text", "");
	this.yField.onkeydown = this.returnSubmitFloat(this.yField,  this.transformPointCallback.bind(this), 4, true);
	this.controls.push(this.yField);

	var transformButton = addControlToAlgorithmBar("Button", "Transform Point");
	transformButton.onclick = this.transformPointCallback.bind(this);
	this.controls.push(transformButton);
	
	
	
	
	var radioButtonList = addRadioButtonGroupToAlgorithmBar(["Hand Space -> World Space", 
															 "World Space -> Hand Space", 
															 ], 
															"Transform Type");
	this.handToWorldButton = radioButtonList[0];
	this.handToWorldButton.onclick = this.transformTypeChangedCallback.bind(this, false);
	this.controls.push(this.handToWorldButton);
	
	
	this.worldToHandButton = radioButtonList[1];
	this.worldToHandButton.onclick = this.transformTypeChangedCallback.bind(this, true);
	this.controls.push(this.worldToHandButton);
	
	this.worldToHandButton.checked = this.lastLocalToGlobal;
	this.handToWorldButton.checked = !this.lastLocalToGlobal;

	
	
	
	var radioButtonList = addRadioButtonGroupToAlgorithmBar(["Row Major", 
															 "Column Major", 
															 ], 
															"RankType");
	this.rowMajorButton = radioButtonList[0];
	this.rowMajorButton.onclick = this.changeRowColMajorCallback.bind(this, true);
	this.controls.push(this.rowMajorButton);

	this.colMajorButton = radioButtonList[1];
	this.colMajorButton.onclick = this.changeRowColMajorCallback.bind(this, false);
	this.controls.push(this.colMajorButton);
	
	this.rowMajorButton.checked = this.rowMajor;
	this.colMajorButton.checked = !this.rowMajor;
	
	
	this.showAxisBox = addCheckboxToAlgorithmBar("Show all axes");
	this.showAxisBox.onclick = this.showAllAxesCallback.bind(this);
	this.showAxisBox.checked = true;
	
	//this.controls.push(this.showAxisBox);
	
	

	var moveObjectsButton = addControlToAlgorithmBar("Button", "Move Objects");
	moveObjectsButton.onclick = this.moveObjectsCallback.bind(this);
	
	this.controls.push(moveObjectsButton);
	
}



ChangeCoordinate2D.prototype.showAllAxesCallback = function()
{
	if (this.showAxisBox.checked)
	{
		this.animationManager.setAllLayers([0,1]);		
	}
	else
	{
		this.animationManager.setAllLayers([0]);				
	}
	
	
}


ChangeCoordinate2D.prototype.reset = function()
{
	this.rowMajor = true;
	this.rowMajorButton.checked = this.rowMajor;
	this.nextIndex = this.savedNextIndex;
}


ChangeCoordinate2D.prototype.enableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
	
	
}
ChangeCoordinate2D.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}


ChangeCoordinate2D.prototype.transformTypeChangedCallback = function(globalToLocal)
{
	if (this.lastLocalToGlobal == globalToLocal)
	{
		this.implementAction(this.changeTransformType.bind(this,globalToLocal));			
	}
}


							 

ChangeCoordinate2D.prototype.changeRowColMajorCallback = function(rowMajor) 
{
	if (this.rowMajor != rowMajor)
	{
		this.implementAction(this.changeRowCol.bind(this),  rowMajor);
	}
}

ChangeCoordinate2D.prototype.transposeVisual = function(matrix)
{
	if (matrix.data.length == matrix.data[0].length)
	{
		var matrixSize = matrix.data.length;
		var i, j, tmp, moveLabel1, moveLabel2;
		var moveLabels = [];
		for (i = 1; i < matrixSize; i++)
		{
			for (j = 0; j <= 2="" 3="" i;="" j++)="" {="" this.cmd("settext",="" matrix.dataid[i][j],="" "");="" matrix.dataid[j][i],="" movelabel1="this.nextIndex++;" movelabel2="this.nextIndex++;" movelabels.push(movelabel1);="" movelabels.push(movelabel2);="" this.cmd("createlabel",="" movelabel1,="" matrix.data[i][j],="" matrix.x="" +="" changecoordinate2d.matrix_elem_width="" 2+="" i="" *="" changecoordinate2d.matrix_elem_width,="" matrix.y="" changecoordinate2d.matrix_elem_height="" j="" changecoordinate2d.matrix_elem_height);="" movelabel2,="" matrix.data[j][i],="" this.cmd("move",="" tmp="matrix.data[i][j];" matrix.data[i][j]="matrix.data[j][i];" matrix.data[j][i]="tmp;" }="" this.cmd("step");="" for="" (i="0;" <="" movelabels.length;="" i++)="" this.cmd("delete",="" movelabels[i]);="" this.resetmatrixlabels(matrix);="" return="" matrix;="" else="" var="" saveddata="matrix.data;" newdata="new" array(saveddata[0].length);="" i,j;="" saveddata[0].length;="" newdata[i]="[];" saveddata.length;="" (j="0;" newdata[j][i]="savedData[i][j];" newmatrix="this.createMatrix(newData," matrix.x,="" matrix.y);="" this.deletematrix(matrix);="" newmatrix;="" changecoordinate2d.prototype.changerowcol="function(rowMajor)" this.commands="new" array();="" this.rowmajor="rowMajor;" if="" (this.rowmajorbutton.checked="" !="this.rowMajor)" this.rowmajorbutton.checked="this.rowMajor;" (this.colmajorbutton.checked="=" this.rowmajor)="" this.colmajorbutton.checked="!this.rowMajor;" this.removeoldids();="" this.robotmatrix="this.transposeVisual(this.RobotMatrix);" this.robotposition="this.transposeVisual(this.RobotPosition);" this.handmatrix="this.transposeVisual(this.HandMatrix);" this.handposition="this.transposeVisual(this.HandPosition);" this.commands;="" changecoordinate2d.prototype.fixnumber="function(value," defaultval)="" (value="=" ""="" ||="" value="=" "-"="" "."="" "-."="" isnan(parsefloat(value)))="" changecoordinate2d.prototype.transformpointcallback="function()" this.xfield.value="this.fixNumber(this.xField.value," "0");="" this.yfield.value="this.fixNumber(this.yField.value," this.implementaction(this.dopointtransform.bind(this),="" ";"="" this.yfield.value);="" changecoordinate2d.prototype.dopointtransform="function(params)" (this.lastlocaltoglobal)="" this.localtoglobal(params);="" this.globaltolocal(params);="" changecoordinate2d.prototype.rotatepoint="function(point," matrix,="" xpos,="" ypos,="" fromspace,="" tospace)="" logicalpoint;="" descriptlabel="this.nextIndex++;" this.oldids.push(descriptlabel);="" descriptlabel,="" "",="" xpos="" changecoordinate2d.equals_spacing,="" ypos="" 2*changecoordinate2d.matrix_elem_height="" 3,="" 0);="" inertialpositionmatrix;="" (this.rowmajor)="" inertialpositionmatrix="this.createMatrix([[" ","="" ""]],="" ypos);="" [""]],="" changecoordinate2d.equals_spacing="" changecoordinate2d.matrix_multiply_spacing,="" equallabel1="this.nextIndex++;" this.oldids.push(equallabel1);="" opx="xPos" 2;="" opy="yPos" changecoordinate2d.matrix_multiply_spacing;="" changecoordinate2d.matrix_elem_height;="" equallabel1,="" "=", opX , opY);
	if (this.rowMajor)
	{
		this.multiplyMatrix(point, matrix, inertialPositionMatrix, descriptLabel);
		
	}
	else
	{
		this.multiplyMatrix(matrix, point, inertialPositionMatrix, descriptLabel);
		
	}
	this.addMatrixIDsToList(inertialPositionMatrix, this.oldIDs);
	this.cmd(" delete",="" descriptlabel);="" inertialpositionid="this.nextIndex++;" logicalpoint="inertialPositionMatrix.data[0].slice(0);" inertialpositionmatrix.data[1][0]];="" screenpoint="this.worldToScreenSpace(logicalPoint," fromspace);="" this.cmd("createcircle",="" inertialpositionid,="" screenpoint[0],="" screenpoint[1]);="" this.cmd("setwidth",="" changecoordinate2d.vertex_width);="" originid="this.nextIndex++;" this.oldids.push(originid);="" origin="this.worldToScreenSpace([0,0]," this.cmd("createrectangle",="" originid,="" 0,="" origin[0],="" origin[1]);="" this.cmd("connect",="" changecoordinate2d.transformed_point_colors[tospace],="" 1,="" [inertialpositionmatrix,="" originid];="" changecoordinate2d.prototype.translatepoint="function(point," transvector,="" tospace,="" pointid)="" array(2);="" robotpositionmatrix;="" logicalpoint[0]="point.data[0][0]" transvector.data[0][0];="" logicalpoint[1]="point.data[0][1]" transvector.data[0][1];="" robotpositionmatrix="this.createMatrix([[" 2*changecoordinate2d.matrix_elem_width="" transvector.data[1][0];="" addlabel1="this.nextIndex++;" equallabel3="this.nextIndex++;" this.oldids.push(addlabel1);="" this.oldids.push(equallabel3);="" op2x,="" op2y;="" op2x="xPos" -="" op2y="yPos" equallabel3,="" createlabel",="" addlabel1,="" "+",op2x="" ,="" op2y);="" this.addmatrix(point,="" robotpositionmatrix);="" this.addmatrixidstolist(robotpositionmatrix,="" this.oldids);="" robotpositionid="this.nextIndex++;" robotpositionid,="" this.cmd("connect",pointid,="" this.cmd("step")="" this.cmd("setalpha",="" this.cmd("connect",originid,="" [robotpositionmatrix,="" changecoordinate2d.prototype.addmultiply="function(position," rotmatrix,="" transx,="" transy,="" rotx,="" roty,="" initialpointid,="" posmatrixandpointid="this.translatePoint(position," initialpointid);="" newposition="posMatrixAndPointID[0];" pointid="posMatrixAndPointID[1];" this.cmd("disconnect",="" pointid);="" this.movematrix(newposition,="" rotx="" changecoordinate2d.matrix_multiply_spacing,transy)="" transy)="" tospace);="" movingoriginid="posMatrixAndPointID[2];" movingoriginid,="" robotpositionmatrix.data[1][0]];="" this.oldids.push(robotpositionid);="" ];="" changecoordinate2d.prototype.multiplyadd="function(position," this.movematrix(inertialpositionmatrix,="" transx="" changecoordinate2d.equals_spacing,transy)="" inertialpositionid);="" changecoordinate2d.prototype.localtoglobal="function" (params)="" paramlist="params.split(" ;");"="" x="parseFloat(paramList[0]);" y="parseFloat(paramList[1]);" opx,="" opy;="" pointinhandspaceid="this.nextIndex++;" this.oldids.push(pointinhandspaceid);="" pointinhandspaceid,="" this.axishand[0],="" changecoordinate2d.transformed_point_colors[0],="" initialpointmatrix;="" initialpointmatrix="this.createMatrix([[x," y]],="" changecoordinate2d.hand_matrix_start_x="" changecoordinate2d.hand_matrix_start_y);="" [y]],="" this.addmatrixidstolist(initialpointmatrix,="" this.handmatrix,="" this.handposition,="" changecoordinate2d.hand_matrix_start_x,="" changecoordinate2d.hand_matrix_start_y,="" changecoordinate2d.hand_position_start_x,="" changecoordinate2d.hand_position_start_y,="" 1);="" this.movematrix(robotpositionmatrix,="" changecoordinate2d.robot_matrix_start_x="" changecoordinate2d.robot_matrix_start_y);="" 2*="" this.multiplyadd(robotpositionmatrix,="" this.robotmatrix,="" this.robotposition,="" changecoordinate2d.robot_matrix_start_x,="" changecoordinate2d.robot_matrix_start_y,="" changecoordinate2d.robot_position_start_x,="" changecoordinate2d.robot_position_start_y,="" 2);="" changecoordinate2d.prototype.changetransformtype="function(globalToLocal)" this.lastlocaltoglobal="!globalToLocal;" (globaltolocal)="" this.robotlabel1id,="" "world="" space="" to="" robot="" space\n(orientation)");="" "robot="" world="" this.robotlabel2id,="" space\n(position)");="" this.negatematrixvisual(this.robotposition);="" this.handlabel1id,="" hand="" "hand="" this.handlabel2id,="" this.negatematrixvisual(this.handposition);="" changecoordinate2d.robot_position_start_y="" 25);="" this.movematrix(this.robotmatrix,="" changecoordinate2d.robot_position_start_y)="" changecoordinate2d.robot_matrix_start_x+="" changecoordinate2d.robot_matrix_start_y="" this.movematrix(this.robotposition,="" changecoordinate2d.robot_matrix_start_y)="" changecoordinate2d.hand_position_start_y="" this.movematrix(this.handmatrix,="" changecoordinate2d.hand_position_start_y);="" changecoordinate2d.hand_matrix_start_x+="" changecoordinate2d.hand_matrix_start_y="" this.movematrix(this.handposition,="" changecoordinate2d.prototype.negatematrixvisual="function(matrix)" i,j="" matrix.data.length;="" matrix.data[i].length;="" changecoordinate2d.prototype.globaltolocal="function(params)" pointinworldspaceid="this.nextIndex++;" this.oldids.push(pointinworldspaceid);="" pointinworldspaceid,="" this.axisworld[0],="" changecoordinate2d.transformed_point_colors[2],="" positionandid="this.addMultiply(initialPointMatrix," 2,="" newpositionid="positionAndID[1];" this.addmultiply(robotpositionmatrix,="" newpositionid,="" changecoordinate2d.prototype.moveobjectscallback="function()" this.implementaction(this.moveobjects.bind(this),="" changecoordinate2d.prototype.moveobjects="function()" i,="" j;="" this.otheraxes.length;="" this.otheraxes[i].length;="" this.otheraxes[i][j]);="" changecoordinate2d.robot_points.length;="" this.robotpointrobotids[i]);="" this.robotpointworldids[i]);="" changecoordinate2d.hand_points.length;="" this.handpointhandids[i]);="" this.handpointrobotids[i]);="" this.handpointworldids[i]);="" this.robothandattachrobotid);="" this.robothandattachworldid);="" this.positionindex+="1;" (this.positionindex="">= ChangeCoordinate2D.ROBOT_POSITION_VALUES.length)
	{
		this.PositionIndex = 0;		
	}
	
	this.RobotPositionValues = ChangeCoordinate2D.ROBOT_POSITION_VALUES[this.PositionIndex];
	this.RobotMatrixValues = ChangeCoordinate2D.ROBOT_MATRIX_VALUES[this.PositionIndex];
	this.HandPositionValues = ChangeCoordinate2D.HAND_POSITION_VALUES[this.PositionIndex];
	this.HandMatrixValues = ChangeCoordinate2D.HAND_MATRIX_VALUES[this.PositionIndex];
	
	this.setupExtraAxes();
	this.setupObjects();
	
	
	this.RobotPosition.data = [this.RobotPositionValues];
	this.RobotMatrix.data = this.RobotMatrixValues;
	this.HandPosition.data = [this.HandPositionValues];
	this.HandMatrix.data =this.HandMatrixValues;
	if (!this.rowMajor)
	{
		this.RobotPosition.transpose();
		this.RobotMatrix.transpose();
		this.HandPosition.transpose();
		this.HandMatrix.transpose();
	}
	this.resetMatrixLabels(this.RobotMatrix);
	this.resetMatrixLabels(this.RobotPosition);
	this.resetMatrixLabels(this.HandMatrix);
	this.resetMatrixLabels(this.HandPosition);
		
	
	return this.commands;
}


function toRadians(degrees)
{
	return (degrees * 2 * Math.PI) / 360.0; 	
}


ChangeCoordinate2D.prototype.addMatrix = function(mat1, mat2, mat3)
{
	var i;
	var j;
	for (i = 0; i < mat1.data.length; i++)
	{
		for (j = 0; j < mat1.data[i].length; j++)
		{
			explainText = "";
			var value = 0;
			this.cmd("SetHighlight", mat1.dataID[i][j], 1);	
			this.cmd("SetHighlight", mat2.dataID[i][j], 1);	
			this.cmd("Step");
			mat3.data[i][j] = this.standardize(mat1.data[i][j] + mat2.data[i][j]);
			this.cmd("SetHighlight", mat1.dataID[i][j], 0);	
			this.cmd("SetHighlight", mat2.dataID[i][j], 0);	
			this.cmd("SetText", mat3.dataID[i][j], mat3.data[i][j]);
			this.cmd("Step");
		}
	}
}




ChangeCoordinate2D.prototype.multiplyMatrix = function(mat1, mat2, mat3, explainID)
{
	var i;
	var j;
	var explainText = "";
	for (i = 0; i < mat1.data.length; i++)
	{
		for (j = 0; j < mat2.data[0].length; j++)
		{
			var explainText = "";
			var value = 0;
			for (k = 0; k < mat2.data.length; k++)
			{
				this.cmd("SetHighlight", mat1.dataID[i][k], 1);	
				this.cmd("SetHighlight", mat2.dataID[k][j], 1);	
				if (explainText != "")
				{
						explainText = explainText + " + ";
				}
				value = value + mat1.data[i][k] * mat2.data[k][j];
				explainText = explainText + String(mat1.data[i][k]) + " * " + String(mat2.data[k][j]);
				this.cmd("SetText", explainID, explainText);
				this.cmd("Step");
				this.cmd("SetHighlight", mat1.dataID[i][k], 0);	
				this.cmd("SetHighlight", mat2.dataID[k][j], 0);				
			}
			value = this.standardize(value);
			explainText += " = " + String(value);
			this.cmd("SetText", explainID, explainText);
			mat3.data[i][j] = value;
			this.cmd("SetText", mat3.dataID[i][j], value);
			this.cmd("Step");
		}
	}
	this.cmd("SetText", explainID, "");
	
	
}

ChangeCoordinate2D.prototype.standardize = function(lab)
{
	var newLab =  Math.round(lab * 1000) / 1000;
	if (isNaN(newLab))
	{
		return lab;
	}
	else
	{
		return newLab;
	}
}


ChangeCoordinate2D.prototype.resetMatrixLabels = function(mat)
{
	var i,j;
	for (i = 0; i < mat.data.length; i++)
	{
		for (j = 0; j < mat.data[i].length; j++)
		{
			mat.data[i][j] = this.standardize(mat.data[i][j]);
			this.cmd("SetText", mat.dataID[i][j], mat.data[i][j]);
		}		
	}
}



ChangeCoordinate2D.prototype.moveMatrix = function(mat, x, y)
{
	var height = mat.data.length;
	var width = 0;
	
	var i, j;
	for (i = 0; i < mat.data.length; i++)
	{
		width = Math.max(width, mat.data[i].length);
	}	
	
	
	this.cmd("Move", mat.leftBrack1, x, y);
	this.cmd("Move", mat.leftBrack2, x, y);
	this.cmd("Move", mat.leftBrack3, x, y +  height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT);
	
	this.cmd("Move", mat.rightBrack1,  x + width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y);
	this.cmd("Move", mat.rightBrack2,   x + width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y);
	this.cmd("Move", mat.rightBrack3,  x+ width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y +  height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT);
	
	for (i = 0; i < mat.data.length; i++)
	{
		for (j = 0; j < mat.data[i].length; j++)
		{
			this.cmd("Move", mat.dataID[i][j], 
					 x + j*ChangeCoordinate2D.MATRIX_ELEM_WIDTH + ChangeCoordinate2D.MATRIX_ELEM_WIDTH / 2,
					 y + i*ChangeCoordinate2D.MATRIX_ELEM_HEIGHT + ChangeCoordinate2D.MATRIX_ELEM_HEIGHT / 2);
		}		
	}
	mat.x = x;
	mat.y = y;
}




ChangeCoordinate2D.prototype.addMatrixIDsToList = function(mat, list)
{
	list.push(mat.leftBrack1);
	list.push(mat.leftBrack2);
	list.push(mat.leftBrack3);
	list.push(mat.rightBrack1);
	list.push(mat.rightBrack2);
	list.push(mat.rightBrack3);
	var i,j;
	for (i = 0; i < mat.data.length; i++)
	{
		for (j = 0; j < mat.data[i].length; j++)
		{
			list.push(mat.dataID[i][j]);
		}		
					  
	}
}

ChangeCoordinate2D.prototype.deleteMatrix = function(mat)
{
	var IDList = [];
	this.addMatrixIDsToList(mat, IDList);
	var i;
	for (i = 0; i < IDList.length; i++)
	{
		this.cmd("Delete", IDList[i]);
	}
}

				 
				 
				 
ChangeCoordinate2D.prototype.aplyFunctionToMatrixElems = function(mat, command, value)
{
	this.cmd(command, mat.leftBrack1, value);
	this.cmd(command, mat.leftBrack2, value);
	this.cmd(command, mat.leftBrack3, value);
	this.cmd(command, mat.rightBrack1, value);
	this.cmd(command, mat.rightBrack2, value);
	this.cmd(command, mat.rightBrack3, value);
	var i,j;
	for (i = 0; i < mat.data.length; i++)
	{
		for (j = 0; j < mat.data[i].length; j++)
		{
			this.cmd(command, mat.dataID[i][j], value);
		}		
	}
}



// Multiply two (data only!) matrices (not complete matrix object with graphics, just
// the data
ChangeCoordinate2D.prototype.multiply = function(lhs, rhs)
{
	var resultMat = new Array(lhs.length);
	var i, j, k;
	
	for (i = 0; i < lhs.length; i++)
	{
		resultMat[i] = new Array(rhs[0].length);		
	}
	for (i = 0; i < lhs.length; i++)
	{
		for (j = 0; j < rhs[0].length; j++)
		{
			var value = 0;
			for (k = 0; k < rhs.length; k++)
			{
				value = value + lhs[i][k] * rhs[k][j];
			}
			resultMat[i][j] = value;
		}
	}
	return resultMat;
}

// Add two (data only!) matrices (not complete matrix object with graphics, just
// the data)
ChangeCoordinate2D.prototype.add = function(lhs, rhs)
{
	var resultMat = new Array(lhs.length);
	var i,j;
	
	for (i = 0; i < lhs.length; i++)
	{
		resultMat[i] = new Array(lhs[i].length);
		for (j = 0; j < lhs[i].length; j++)
		{
			resultMat[i][j] = lhs[i][j] + rhs[i][j];
			
		}
	}
	return resultMat;
}


ChangeCoordinate2D.prototype.createMatrix = function(contents, x, y)
{
	var mat = new Matrix(contents, x, y);
	mat.leftBrack1 = this.nextIndex++;
	mat.leftBrack2 = this.nextIndex++;
	mat.leftBrack3 = this.nextIndex++;
	mat.rightBrack1 = this.nextIndex++;
	mat.rightBrack2 = this.nextIndex++;
	mat.rightBrack3 = this.nextIndex++;
	
	var height = mat.data.length;
	var width = 0;
	
	var i, j;
	mat.dataID = new Array(mat.data.length);
	for (i = 0; i < mat.data.length; i++)
	{
		width = Math.max(width, mat.data[i].length);
		mat.dataID[i] = new Array(mat.data[i].length);
		for (j = 0; j < mat.data[i].length; j++)
		{
			mat.dataID[i][j] = this.nextIndex++;			
		}
	}
		
	this.cmd("CreateRectangle", mat.leftBrack1, "", 5, 1,  x, y, "left","center");
	this.cmd("CreateRectangle", mat.leftBrack2, "", 1, height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT,  x, y, "center","top");
	this.cmd("CreateRectangle", mat.leftBrack3, "", 5, 1,  x, y +  height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT , "left","center");

	this.cmd("CreateRectangle", mat.rightBrack1, "", 5, 1,  x + width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y, "right","center");
	this.cmd("CreateRectangle", mat.rightBrack2, "", 1, height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT,  x + width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y, "center","top");
	this.cmd("CreateRectangle", mat.rightBrack3, "", 5, 1,  x+ width * ChangeCoordinate2D.MATRIX_ELEM_WIDTH, y +  height * ChangeCoordinate2D.MATRIX_ELEM_HEIGHT , "right","center");
	
	for (i = 0; i < mat.data.length; i++)
	{
		for (j = 0; j < mat.data[i].length; j++)
		{
			this.cmd("CreateLabel", mat.dataID[i][j], mat.data[i][j], 
					 x + j*ChangeCoordinate2D.MATRIX_ELEM_WIDTH + ChangeCoordinate2D.MATRIX_ELEM_WIDTH / 2,
					 y + i*ChangeCoordinate2D.MATRIX_ELEM_HEIGHT + ChangeCoordinate2D.MATRIX_ELEM_HEIGHT / 2);
		}		
	}
	return mat;
}

var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new ChangeCoordinate2D(animManag, canvas.width, canvas.height);
}

function Matrix(contents, x, y)
{
	this.data = contents;
	this.x = x;
	this.y = y;
}

Matrix.prototype.transpose = function()
{
	var newData = new Array(this.data[0].length);
	var i,j;
	for (i = 0; i < this.data[0].length; i++)
	{
		newData[i] = new Array(this.data.length);		
	}
	for (i = 0; i < this.data.length; i++)
	{
		for (j = 0; j < this.data[i].length; j++)
		{
			newData[j][i] = this.data[i][j];			
		}
	}
	this.data = newData;
}





</=>