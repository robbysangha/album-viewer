// Code that runs as the html is ready,
$( document ).ready(function() {
	var html = "";
	
	// Descriptions for the albums(respective folders) in '/images/albums'. 
	// Order must match the numbered folders in that directory.
	var descriptions = [
											"Animals",

										  "Black and White"
										 ];
	
	var totalAlbums = descriptions.length;
	
	for (var i = 1; i < (totalAlbums + 1); i++) {
		var album = "<div class='albums' id='album" + i + 
		"'><img src='images/albums/";
		album += i + "/1.jpg' alt='Album " + i + "' class='album-picture'><h2>" +
		 				descriptions[i - 1] + "</h2></div>";
		html += album;
	}
	// Adds the html code for albums that have a description defined.
	$("#album-viewer").append(html);
});


// Functions that may be triggered after the document is loaded.
$(window).load(function() {

	// List of picture descriptions of all albums, available to all functions. 
	// Order of descriptions must match the numbered images in the respective 
	// album folders.
	var allPicDescriptions = [

		[
		 "Owl out in the Day", 
		 "Wait, I thought that did'nt happen", 
		 "Decent Picture Though", 
		 "Robin sans Batman",
		 "I'm going to guess Falcon",
		 "Winter Squirrel",
		 "Praise The Lord!",
		 "Cat on The Fence",
		 "Might be Ready for some Action",
		 "Cat with Friends",
		 "Snowball",
		 "This one's Chill",
		 "Cat with other Friends",
		 "Black Cat",
		 "Black and White Cat",
		 "Why the Long Face?",
		 "Yorkie York",
		 "Do not know the Breed",
		 "Dog in the Fields",
		 "Dog in the Studio",
		 "And we're Tired"
		],

		[
		 "Opening Score",
		 "Passage of Time",
		 "Diagnosis",
		 "Peril",
		 "Going Away",
		 "Documentation",
		 "The End"
		]
	];

	// Returns the appropriate html code, given the album and stack number of 
	// the pictures.
	function loadPictureStack(albumNumber, stackNumber) {

		// The size of a stack of pictures that can be displayed at a time.
		var stackSize = 10;

		var html = "<table id='picture-table'><tr>";
		var totalAlbumPhotos = (allPicDescriptions[albumNumber - 1]).length;
		var totalStacks = Math.ceil((totalAlbumPhotos / stackSize));

		if ((stackNumber == 1) && (totalAlbumPhotos <= stackSize)) {
			var end = totalAlbumPhotos - 1;
			var start = 0;
		} else {
			generateStackNav(stackNumber, totalStacks);
			var startEnd = findListIndex(stackNumber, stackSize, totalAlbumPhotos);
			var start = startEnd[0];
			var end = startEnd[1];
		}

		var picDescriptions = allPicDescriptions[albumNumber - 1];

		for (var i = start; i < (end + 1); i++) {
			var picture = "<td><img src='images/albums/" + albumNumber + "/" + 
				(i + 1) + ".jpg' alt='" + picDescriptions[i] + "' title='" + 
				picDescriptions[i] + "' class='picture'></td>";
			html += picture;
		}

		return html + "</tr></table><div id='page-num'><p>" + stackNumber + "/" + 
			totalStacks +"</p></div>";
	}

	// Returns the beginning and terminating indeces of the photos, given thier
	// stack number, stack and album size.
	function findListIndex(stackNumber, stackSize, albumSize) {
		var potentialSize = stackNumber * stackSize;

		if (albumSize < potentialSize) {
			var end = albumSize - 1;
		} else {
			var end = potentialSize - 1;
		}

		var start = potentialSize - stackSize;

		return [start, end];
	}

	// Clears the entire Album Container element or simply the picture table,
	// given the command.
	function clearAlbumContainer(command) {
		var container = document.getElementById("album-container");

		if (container.firstChild) {

			if (command == "all") {
				$("h2").remove("#album-desc");
				deactivatePhotoNav("both", "stack");
			}

			$("div").remove("#page-num");
			$("table").remove("#picture-table");
		}
	}

	// Authorizes the correct combination of stack navigation buttons, given 
	// thier stack number and total stacks.
	function generateStackNav(stackNumber, totalStacks) {

		if (stackNumber == 1) {
			activatePhotoNav("right", "stack");
			deactivatePhotoNav("left", "stack");

		} else if (stackNumber < totalStacks) {
			activatePhotoNav("both", "stack");

		} else if (stackNumber == totalStacks) {
			activatePhotoNav("left", "stack");
			deactivatePhotoNav("right", "stack");
		}
	}

	// Authorizes the correct combination of picture navigation buttons, given
	// picture number and total pictures in album.
	function generatePicNav(picNum, totalPics) {
		if (totalPics != 1) {

			if (picNum == 1) {
				activatePhotoNav("right", "pic");
				deactivatePhotoNav("left", "pic");

			} else if (picNum < totalPics) {
				activatePhotoNav("both", "pic");

			} else if (picNum == totalPics) {
				activatePhotoNav("left", "pic");
				deactivatePhotoNav("right", "pic");
			}
		}
	}

	// Displays the appropriate combination of stack navigation buttons, given 
	// the command.
	function activatePhotoNav(command, tag) {

		if (command == "both") {
			$("#prev-" + tag + "-box").css("display", "block");
			$("#next-" + tag + "-box").css("display", "block");

		} else if (command == "right") {
			$("#next-" + tag + "-box").css("display", "block");

		} else if (command == "left") {
			$("#prev-" + tag + "-box").css("display", "block");
		}
	}		

	// Hides the appropriate combination of stack navigation buttons, given 
	// the command.
	function deactivatePhotoNav(command, tag) {

		if (command == "both") {
			$("#prev-" + tag + "-box").css("display", "none");
			$("#next-" + tag + "-box").css("display", "none");

		} else if (command == "right") {
			$("#next-" + tag + "-box").css("display", "none");

		} else if (command == "left") {
			$("#prev-" + tag + "-box").css("display", "none");
		}
	}

	// Returns the current stack number of the photos being displayed.
	function getStackNumber() {

		var pageNumText = $("#page-num p").first().text();
		var totalStacks = parseInt(pageNumText.slice(2, 3));
		var currentStack = parseInt(pageNumText.slice(0, 1));

		return [totalStacks, currentStack];
	}

	// Returns the Album number currently being displayed.
	function getActiveAlbumNumber() {
		var albumNumber = parseInt(($("#album-desc").attr("class")).slice(9, 10));

		return albumNumber;
	}

	// Populates the new stack of pictures, given the current stack number
	// according to the command given.
	function putStack(currentStack, command) {
		var albumNumber = getActiveAlbumNumber();
		clearAlbumContainer("only picture-table");
		if (command == "prev") {
			var newStack = currentStack - 1;
		} else if (command == "next") {
			var newStack = currentStack + 1;
		}

		var html = loadPictureStack(albumNumber, newStack);
		$("#album-container").append(html);
	}

	// Populates the big picture container according to the command recieved.
	function putBigPicture(command) {
		var picDescriptions = allPicDescriptions[getActiveAlbumNumber() -1];
		var sourceList = ($("#big-picture").attr("src")).split("/");
		var totalPics = picDescriptions.length;
		if (command == "prev") {
			var picNum = (parseInt(sourceList[3])) - 1;
		} else if (command == "next") {
			var picNum = (parseInt(sourceList[3])) + 1;
		}
		
		generatePicNav(picNum, totalPics);

		var source = sourceList[0] + "/" + sourceList[1] + "/" + sourceList[2] +
				 					"/" + picNum + ".jpg";
		$("#pic-desc").text(picDescriptions[picNum - 1]);
		$("#big-picture").attr("src", source);
	}
	
	// Hides the big picture container.
	function hideBigPicture() {
		$("img").remove("#big-picture");
		$("h2").remove("#pic-desc");
		deactivatePhotoNav("both", "pic");
		$("#big-picture-container").css("display", "none");
	}

	// Displays the first stack of photos from the clicked album.
	$(".albums").on("click", function() {

		clearAlbumContainer("all");
		var albumDescription = this.childNodes[1].textContent;
		var albumNumber = parseInt($(this).attr('id')[5]);
		var html = "<h2 id='album-desc' class='for-album" + albumNumber + "'>" + 
			albumDescription + "</h2>";

		html += loadPictureStack(albumNumber, 1);
		$("#album-container").append(html);
	});

	// Displays the next stack of photos, if they exist.
	$("#next-stack-box").on("click", function() {
		var stackNumberList = getStackNumber();

		if (stackNumberList[0] > stackNumberList[1]) {
			putStack(stackNumberList[1], "next");
		}
	});

	// Displays the previous stack of photos, if they exist.
	$("#prev-stack-box").on("click", function() {
		var stackNumberList = getStackNumber();

		if ((stackNumberList[1] != 1) && 
			(stackNumberList[1] <= stackNumberList[0])) {
			putStack(stackNumberList[1], "prev");
		}
	});

	// Enlarges the picture being clicked.
	$(document).on("click",".picture", function() {
		var html = "<h2 id='pic-desc'>" + $(this).attr('title') + 
		"</h2><img src='" + $(this).attr('src') + 
		"' alt='Large Picture' id='big-picture'>";

		$("#big-picture-container").append(html);
		$("#big-picture-container").position().top;
		$("#big-picture-container").css("display", "block");

		var totalPics = (allPicDescriptions[getActiveAlbumNumber() - 1]).length;
		var picNum = parseInt(($(this).attr("src")).split("/")[3]);
		generatePicNav(picNum, totalPics);
	});

	// Shows the next picture when clicked.
		$("#next-pic-box").on("click", function() {
			putBigPicture("next");
		});

	// Shows the previous picture when clicked.
		$("#prev-pic-box").on("click", function() {
			putBigPicture("prev");
		});

	// When close button is clicked, hides the big picture container.
	$("#close-button").on("click", function() {
		hideBigPicture();
	});
});