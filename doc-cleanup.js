// doc expects a document object
function cleanDoc(doc) {
    
    // unlock and remove items
    unlockRemove (doc.layers);
    unlockRemove (doc.pageItems);
    unlockRemove (doc.guides);

    // override all master pages
    // reflowed text frames have to be tagged
    // and flowed after override
    overrideReflow (doc, "master");
    
    alert("Done.");
    
};

// element expects an INDD element
function unlockRemove(element) {
    
    // set up needed variables
    var items = element.everyItem();
    
    // unlock all items
    items.locked = false;
    
    // loop through elements
    for (var i = element.length-1; i >= 0; i--) {
        
        // set up needed variables
        var currentItem = element[i];
        var currentItemName = currentItem.constructor.name;
        
        // check if a guide
        if (currentItemName == "Guide") {

            currentItem.remove();

        // hidden elements
        } else if (!element[i].visible) {

            // remove
            currentItem.remove();

        // check if layer and does not belong to a parent page
        } else if (currentItemName != "Layer" && currentItem.parentPage == null) {

            currentItem.remove ();

        };
        
    };

};

// container expects a INDD object
// label expects a string
function tagMasterReflow(container, label) {
    
    // set up needed variables
    var pageCount = container.allPageItems.length;
    
    // loop through pages in container
    for (var i = 0; i < pageCount; i++) {

        // set up needed variables
        var item = container.allPageItems[i];
        var type = item.constructor.name;
        var parent = item.parentPage;

        // check that item belongs to a page
        if (parent != null) {

            // set up needed variables
            var pageType = item.parentPage.parent.constructor.name;
            var next = item.nextTextFrame;
            var prev = item.previousTextFrame;

            // check for reflowed text frames on the master page
            if (pageType == "MasterSpread" && (type == "TextFrame" && next != null && prev == null)) {
                
                // set up needed variables
                var textContainers = item.parentStory.textContainers;
                var tcCount = textContainers.length;

                // loop through text frame containers
                for (var j = 0; j < tcCount; j++) {

                    // set up needed variables
                    var frame = textContainers[j];
                    var data = {};

                    data["story"] = i;
                    data["index"] = j;
                    data["count"] = tcCount;

                    // assign custom label to text frame to access later
                    frame.insertLabel (label, data.toSource());

                };

            };

        };

    };

};

// container expects a INDD object
// label expects a string
function overrideReflow (container, label) {
    
    // set up needed variables
    var pageCount = container.pages.length;
    
    // loop through container pages
    for (var i = 0; i < pageCount; i++) {
        
        // set up needed variables
        var page = container.pages[i];
        var items = page.masterPageItems;
        var allitems = page.allPageItems;
        
        // loop through items on page
        for (var j = 0; j < items.length; j++) {
                    
            // override all the items on page in a batch
            items[j].override(page);
            
        };
        
        // loop through
        for (var j = 0; j < allitems.length; j++) {
            
            // set up needed variables
            var item = allitems[j];
            var obj = eval(item.extractLabel(label));
            
            // if the text frame has a valid label
            if (obj != undefined && obj.index == 0) {
                
                // set up needed variables
                var storyIndex = obj.story;

                // loop through tags in the label
                for (var k = 0; k < obj.count-1; k++) {
                    
                    // select the frame by label
                    var frame = getItemByLabel(page, label, storyIndex, k);
                    
                    // if there is a valid frame to link to
                    if (frame.nextTextFrame == null) {
                        
                        // relink the frame by finding the next frame based on stored label
                        frame.nextTextFrame = getItemByLabel(page, label, storyIndex, k+1);
                        
                    };
                    
                };
                                        
            };
                    
        };
        
    };
    
};

// container expects a INDD object
// label expects a string
// storyNum expects an integer
// indexNum expects an integer
// returns an INDD object
function getItemByLabel (container, label, storyNum, indexNum) {
    
    // set up needed variables
    var allItems = container.allPageItems;
    
    // loop through all items
    for (var i = 0; i < allItems.length; i++) {
        
        // set up needed variables
        var item = allItems[i];
        var obj = eval (item.extractLabel (label));
        
        // check for valid object and matches between params and current item values
        if (obj != undefined && obj.story == storyNum && obj.index == indexNum) {
            
            return item;
            
        };
        
    };
    
};

// run function
cleanDoc(app.activeDocument);