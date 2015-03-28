//set active document  
var doc = app.activeDocument;  

//set document name  
var docName = doc.name.split(".")[0];  

//set destination folder  
var destFolder = "~/Desktop/test/";  

//count links  
var linkCount = doc.links.length;


//loop through links  
for (i=linkCount-1; i>=0; i--) {  

	//get current link name
	var currentLink = doc.links[i];
	var clFullName = currentLink.name;
	var clFullNameCount = clFullName.length;
	var clName = clFullName.split(".")[0];

	//get current link file path
	var clFilePath = currentLink.filePath;
	var clFilePathCount = clFilePath.length;
	var clFilePathSplitList = clFilePath.split (":");//<--- the colon is specific to mac file paths change to / for windows
	var clFilePathListCount = clFilePathSplitList.length;
	var clFileName = clFilePathSplitList[clFilePathListCount-1];
	var clFileNameCount = clFileName.length;

	//check for link status
	if (currentLink.status == LinkStatus.NORMAL) {

		//set filename without document name
		var clNameNoPrefix = clFullName;

		//set relink destination folder & filename
		var reLinkDest = destFolder + docName + "_" + clNameNoPrefix;

		//set relink destination file
		var relinkDestFile = File (reLinkDest);

		//check if link is named and relinked
		if (!relinkDestFile.exists) {

			//relink file
			currentLink.copyLink (new File (reLinkDest));

		//relink to already existing file
		} else if (reLinkDest != clFilePath && relinkDestFile.exists) {

			//relink file
			currentLink.relink (relinkDestFile);

		};

	//alert user link is inaccessible
	} else if (currentLink.status == LinkStatus.LINK_INACCESSIBLE || currentLink.status == LinkStatus.LINK_MISSING || currentLink.status == LinkStatus.LINK_OUT_OF_DATE) {

	//alert user
	alert (clFullName + "\n\nThis link is missing, out of date, or inaccessible and can not be updated.")

	};

};

alert ("Done.");
