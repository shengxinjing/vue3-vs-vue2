void function() {
    Othello = {};
    Othello.OthelloViewer = OthelloViewer;
    Othello.OthelloPattern = OthelloPattern;
    Othello.OthelloGame = OthelloGame;
    Othello.OthelloBoard = OthelloBoard;
    //Othello.OthelloEditor = OthelloEditor;


    function OthelloPattern() {
        this.pattern = new Array(100);
        for (var i = 0; i < 100; i++) this.pattern[i] = 0;
        with (this) {
            this.clone = function() {
                var ret = new OthelloPattern();
                ret.pattern = pattern.slice();
                return ret;
            };
            this.makeMove = function(x, y, c) {
                var d = [-11, -10, -9, -1, 1, 9, 10, 11];
                var turningPieces = [];
                if (pattern[10 * x + y] == 0) {
                    for (i = 0; i < 8; i++) {
                        var p = 10 * x + y + d[i];
                        if (pattern[p] == 3 - c) {
                            while (pattern[p] != 0) {
                                p += d[i];
                                if (pattern[p] == c) {
                                    turningPieces.push([p % 10, Math.floor(p / 10)])
                                    while (p != 10 * x + y) {
                                        p += -d[i];
                                        pattern[p] = c;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (turningPieces.length > 0) { pattern[10 * x + y] = c; }
                }
                return turningPieces;
            };
            this.getNextMovePattern = function(x, y) {

            }
            this.canMakeMove = function(c) {
                var d = [-11, -10, -9, -1, 1, 9, 10, 11];
                for (var y = 1; y <= 8; y++) {
                    for (var x = 1; x <= 8; x++) {
                        if (pattern[y * 10 + x] == 0) {
                            for (i = 0; i < 8; i++) {
                                var p = 10 * y + x + d[i];
                                if (pattern[p] == 3 - c) {
                                    while (pattern[p] != 0) {
                                        p += d[i];
                                        if (pattern[p] == c) {
                                            return true;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                return false;
            };

            this.toString = function() {
                var str = "";
                for (var i = 1; i <= 8; i++) {
                    for (var j = 1; j <= 8; j++) {
                        if (pattern[i * 10 + j] == 0) str += " _";
                        if (pattern[i * 10 + j] == 1) str += " o";
                        if (pattern[i * 10 + j] == 2) str += " x";
                    }
                    str += "\n";
                }
                return str;
            };
        }
    }
    OthelloPattern.start = new OthelloPattern();
    OthelloPattern.start.pattern[44] = 2;
    OthelloPattern.start.pattern[45] = 1;
    OthelloPattern.start.pattern[54] = 1;
    OthelloPattern.start.pattern[55] = 2;


    function OthelloGame(startPattern, moves) {
        if (arguments.length == 0)
            startPattern = OthelloPattern.start.clone();
        else
            startPattern = startPattern.clone();

        this.patterns = new Array(startPattern);
        this.moves = new Array;
        this.colors = [1];
        this.current = 0;


        with (this) {
            this.makeMove = function(x, y) {

                var currentPattern = patterns[current];

                var c;


                c = colors[current];

                var newPattern = currentPattern.clone();
                if (c && newPattern.makeMove(x, y, c).length) {
                    current++;
                    this.moves.splice(current, Infinity);
                    this.patterns.splice(current, Infinity);
                    this.colors.splice(current, Infinity);
                    moves.push([x, y]);
                    patterns.push(newPattern);

                    if (newPattern.canMakeMove(3 - c)) {
                        colors.push(3 - c);
                    }
                    else if (newPattern.canMakeMove(c)) {
                        colors.push(c);
                    }
                    else {
                        colors.push(0);
                    }
                    return true;
                }
                else return false;

            };
            this.moveBackward = function(x, y) {
                if (current > 0) current--;
            }
            this.moveForward = function() {
                if (current < patterns.length - 1) current++;
            };
            this.moveToStart = function() {
                current = 0;
            };
            this.moveToEnd = function() {
                current = patterns.length - 1;
            };
            this.toString = function() {

            };
        }
        if (moves && ((moves instanceof String) || (typeof moves == "string"))) {
            for (var i = 0; i < moves.length; i++) {
                var y = moves.charCodeAt(i++) - "a".charCodeAt(0) + 1;
                var x = moves.charCodeAt(i) - "1".charCodeAt(0) + 1;
                this.makeMove(x, y);
            }
        }
    }

    function OthelloBoard() {
        var rootElement = null;
        var pieceElements = [[], [], [], [], [], [], [], []];
        with (this) {
            this.getRootElement = function() {
                return rootElement;
            };
            this.onBeforeRenderingPiece = function(x, y, element) {

            };
            this.applyToHTMLElement = function(div) {
                rootElement = null;
            };
            this.createHTMLElement = function() {
                rootElement = document.createElement("canvas");
                rootElement.width = "297";
                rootElement.height = "297";
                rootElement.style.width = "297px";
                rootElement.style.height = "297px";
                rootElement.style.position = "relative";
                rootElement.style.background = "black";
                rootElement.onclick=function(e) {
                      e = e || window.Event;
                      //alert([Math.floor((e.offsetX-21)/32), Math.floor((e.offsetY-21)/32)]);
                      //alert(onSquareClick);
                      return onSquareClick(Math.floor((e.offsetX-21)/32)+1, Math.floor((e.offsetY-21)/32)+1);
                }
                return rootElement;
            };
            this.onSquareClick = function(x, y) {
                //to be override
            }
            this.loadOthelloPattern = function(game) {
                var context=rootElement.getContext("2d");
                context.fillStyle   = '#000000'; 
                context.fillRect(0,0,297,297);
                //alert(context);

                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        context.fillStyle   = '#007700'; 
                        context.fillRect(21+32*i,21+32*j,31,31);
                        switch (game.pattern[(i + 1) * 10 + j + 1]) {
                            case 1:
                                context.fillStyle   = '#000000'; 
                                context.beginPath();
                                context.moveTo(21+i*32+16,21+j*32+16);
                                context.arc(21+i*32+15,21+j*32+15, 14, 2*Math.PI, 0, true)
                                context.closePath();
                                context.fill();
                                break;
                            case 2:
                                context.fillStyle   = '#ffffff'; 
                                context.beginPath();
                                context.moveTo(21+i*32+16,21+j*32+16);
                                context.arc(21+i*32+15,21+j*32+15, 14, 2*Math.PI, 0, true)
                                context.closePath();
                                context.fill();
                                break;
                            default:
                                //context.fillStyle   = '#007700'; 
                                //context.fillRect(32*i-32,32*j-32,32,32);
                                break;
                        }
                    }
                }

            };
            this.putPiece = function(x, y) {

            };
            this.turnPiece = function(x, y) {

            };
            this.turnPieces = function(pieces) {

            };
        }
    }
    function OthelloViewer(game) {
        this.board = new OthelloBoard(this);
        if (!(game && game instanceof OthelloGame))
            game = new OthelloGame();
        var color = 1;
        var rootElement = null;
        game.moveToStart();
        with (this) {
            this.getRootElement = function() {
                return rootElement;
            };
            this.createHTMLElement = function() {
                rootElement = document.createElement("div");
                rootElement.style.width = "297px";
                rootElement.style.height = "327px";
                rootElement.style.position = "relative";
                this.boardElement = board.createHTMLElement();
                board.loadOthelloPattern(game.patterns[game.current]);
                rootElement.appendChild(boardElement);

                this.controlElement = document.createElement("div");
                controlElement.style.width = "297px";
                controlElement.style.height = "30px";
                controlElement.style.background = "#cccccc";
                controlElement.style.position = "relative";
                controlElement.style.textAlign = "center"
                rootElement.appendChild(controlElement);

                this.toStartButton = document.createElement("a");
                toStartButton.innerHTML = "&lt;&lt;";
                toStartButton.style.margin = "20px";
                toStartButton.href = "javascript:void 0;";
                toStartButton.onclick = function() {
                    game.moveToStart();
                    board.loadOthelloPattern(game.patterns[game.current]);
                }
                this.backwardButton = document.createElement("a");
                backwardButton.innerHTML = "&lt;";
                backwardButton.style.margin = "20px";
                backwardButton.href = "javascript:void 0;";
                backwardButton.onclick = function() {
                    game.moveBackward();
                    board.loadOthelloPattern(game.patterns[game.current]);
                }
                this.forwardButton = document.createElement("a");
                forwardButton.innerHTML = "&gt;";
                forwardButton.style.margin = "20px";
                forwardButton.href = "javascript:void 0;";
                forwardButton.onclick = function() {
                    game.moveForward();
                    board.loadOthelloPattern(game.patterns[game.current]);
                }
                this.toEndButton = document.createElement("a");
                toEndButton.innerHTML = "&gt;&gt;";
                toEndButton.style.margin = "20px";
                toEndButton.href = "javascript:void 0;";
                toEndButton.onclick = function() {
                    game.moveToEnd();
                    board.loadOthelloPattern(game.patterns[game.current]);
                }
                controlElement.appendChild(toStartButton);
                controlElement.appendChild(backwardButton);
                controlElement.appendChild(forwardButton);
                controlElement.appendChild(toEndButton);
                return rootElement;
            }
            this.loadOthelloGame = function() {
            }
        }
    }



} ();