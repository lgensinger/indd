// doc expects an INDD document
// label expects a string
// outputs expects an array of strings
// depts expects an array of strings
// pubs expects pathInfo expects a data object
function dialogRequired (doc, label, outputs, depts, pubs, pathInfo) {
    
    // set needed variables
    var settings = eval(doc.extractLabel(label));
    var titleColumn = [110, 20];
    var valueColumn = [140, 20];
    var spacerSize = [260, 0];
    
    //window
    var w = new Window ('dialog', "Required Settings");
    w.alignChildren = 'left';
    w.spacing = 35;
    
    //main
    var mainContainer = w.add ('group');
    mainContainer.alignChildren = 'left';
    mainContainer.orientation = 'column';
    mainContainer.spacing = 15;
    
    //output
    var outputContainer = mainContainer.add ('group');
    
    var outputTitleBox = outputContainer.add ('group');
    outputTitleBox.alignChildren = ['left', 'top'];
    outputTitleBox.preferredSize = [110, 70];
    
    var outputTitle = outputTitleBox.add ('statictext', undefined, "Output Type");
    outputTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    
    var outputBox = outputContainer.add ('group');
    outputBox.alignChildren = 'left';
    outputBox.orientation = 'column';
    
    //standard
    var standard = outputBox.add ('radiobutton', undefined, outputs[0]);
    standard.enabled = true;
    standard.value = false;
    standard.onClick = function () {
        
        center.enabled = true;
        metaContainer.visible = false;
        prodpubContainer.visible = true;
        
        if (center.selection != null && pub.selection != null) {
            
            ok.enabled = true;
            
            } else {
                
                ok.enabled = false;
                
                };
        
        };
    
    //archive
    var archive = outputBox.add ('radiobutton', undefined, outputs[2]);
    archive.enabled = false;
    archive.value = false;
    archive.onClick = function () {
        
        metaContainer.visible = false;
        prodpubContainer.visible = false;
        ok.enabled = false;
        
        };
    
    //spacer
    var spacer = mainContainer.add ('panel');
    spacer.preferredSize = spacerSize;
    
    //info
    var infoContainer = mainContainer.add ('group');
    infoContainer.orientation = 'stack';
    infoContainer.alignChildren = 'left';
    
    //meta
    var metaContainer = infoContainer.add ('group');
    metaContainer.visible = false;
    metaContainer.alignChildren = 'left';
    metaContainer.orientation = 'column';
    metaContainer.spacing = 2;
    
    //track
    var trackContainer = metaContainer.add ('group');
    trackContainer.alignChildren = 'left';
    
    var trackTitle = trackContainer.add ('statictext', undefined, "Tracking #");
    trackTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    trackTitle.preferredSize = titleColumn;
    
    var trackLabel = trackContainer.add ('statictext', undefined, "track");
    
    var track = trackContainer.add ('edittext', undefined, "");
    track.characters = 11;
    track.text = 1234;
    track.onChanging = function () {
        
        enableOK ();
            
        };
    
    //name
    var nameContainer = metaContainer.add ('group');
    nameContainer.alignChildren = 'left';
    
    var nameTitle = nameContainer.add ('statictext', undefined, "Name");
    nameTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    nameTitle.preferredSize = titleColumn;
    
    var name = nameContainer.add ('edittext', undefined, "");
    name.characters = 15;
    name.text = "name";
    name.onChanging = function () {
        
        enableOK ();
            
        };
    
    //number
    var numContainer = metaContainer.add ('group');
    numContainer.alignChildren = 'left';
    
    var numTitle = numContainer.add ('statictext', undefined, "Contact #");
    numTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    numTitle.preferredSize = titleColumn;
    
    var ext = numContainer.add ('statictext', undefined, "x-");
    
    var num = numContainer.add ('edittext', undefined, "");
    num.characters = 11;
    num.text = "12345";
    num.onChanging = function () {
        
        enableOK ();
            
        };
    
    //prodpub
    var prodpubContainer = infoContainer.add ('group');
    prodpubContainer.alignChildren = 'left';
    prodpubContainer.orientation = 'column';
    
    //production
    var prodContainer = prodpubContainer.add ('group');
    
    var prodTitleBox = prodContainer.add ('group');
    prodTitleBox.alignChildren = 'left';
    prodTitleBox.preferredSize = titleColumn;
    
    var prodTitle = prodTitleBox.add ('statictext', undefined, "Office");
    prodTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    
    var prodBox = prodContainer.add ('group');
    prodBox.alignChildren = 'left';
    prodBox.orientation = 'column';
    
    //depts
    var center = prodBox.add ('dropdownlist', undefined, depts);
    
    if (standard.value) {
        
        center.enabled = true;
        
        } else {
            
            center.enabled = false;
            
            };

    center.preferredSize = valueColumn;
    center.selection = null;
    center.onChange = function () {
        
        if (center.selection != null) {
            
            pub.enabled = true;
            
            } else {
                
                pub.enabled = false;
                
                };
        
        };
    
    //publication
    var pubContainer = prodpubContainer.add ('group');
    
    var pubTitleBox = pubContainer.add ('group');
    pubTitleBox.alignChildren = 'left';
    pubTitleBox.preferredSize = titleColumn;
    
    var pubTitle = pubTitleBox.add ('statictext', undefined, "Publication Type");
    pubTitle.graphics.font = ScriptUI.newFont ("dialog", "Bold", 12);
    
    var pubBox = pubContainer.add ('group');
    pubBox.alignChildren = 'left';
    pubBox.orientation = 'column';
    
    //publications
    var pub = pubBox.add ('dropdownlist', undefined, pubs);
    
    if (center.selection != null) {
        
        pub.enabled = true;
        
        } else {
            
            pub.enabled = false;
            
            };

    pub.preferredSize = valueColumn;
    pub.selection = null;
    pub.onChange = function () {
        
        if (center.selection != null && pub.selection != null && (standard.value || archive.value)) {
            
            ok.enabled = true;
            
            } else {
                
                ok.enabled = false;
                
                };
        
        };
    
    //spacer
    var spacer = mainContainer.add ('panel');
    spacer.preferredSize = spacerSize;
    
    //footer
    var footerContainer = mainContainer.add ('group');
    
    var buttons = footerContainer.add ('group');
    
    var ok = buttons.add ('button', undefined, "OK");
    ok.enabled = false;
    
    var cancel = buttons.add ('button', undefined, "Cancel");
    
    var reset = buttons.add ('button', undefined, "Reset");
    reset.onClick = function () { w.close (3) };
    
    if (settings != undefined) {
        
        reset.enabled = true;
        ok.enabled = true;
        
        } else {
            
            reset.enabled = false;
            ok.enabled = false;
            
            };

    w.center ();
    
    var res = w.show ();
    
    if (res == 1) {
        
        var data = {};
        
        data["standard"] = standard.value;
        data["archive"] = archive.value;
        data["track"] = track.text;
        data["name"] = name.text;
        data["contact"] = num.text;
        
        if (center.selection == null) {
            
            var deptselect = undefined;
            
            } else {
                
                var deptselect = center.selection.index;
                
                };
            
        if (pub.selection == null) {
            
            var pubSelect = undefined;
            
            } else {
                
                var pubSelect = pub.selection.index;
                
                };
            
        data["center"] = deptselect;
        data["pub"] = pubSelect;
        
        doc.insertLabel (label, data.toSource ());
        
        } else if (res == 3) {
            
            doc.insertLabel (label, "");
            
            } else {
                
                revert (doc, pathInfo);
                
                exit ();
                
                };
    
    return data;
    
    function enableOK () {
        
        if (track.text != "" && name.text != "" && num.text != "") {
            
            ok.enabled = true;
            
            } else {
                
                ok.enabled = false;
                
                };
        
        };

    };

// doc expects an INDD document
// pathInfo expects a data object
function revert (doc, pathInfo) {
    
    // close current doc without saving
    doc.close (SaveOptions.NO);
    
    // reopen the same file
    var doc = app.open (pathInfo.path);
    
    var roCount = 0;
    
    // set up loop to keep trying in case the
    // server has latency issues and the file opens
    // as read-only
    while (doc.readOnly) {
        
        doc.close (SaveOptions.NO);
        
        var doc = app.open (pathInfo.path);
        
        roCount++
        
    };
    
// return the document object
return doc;
    
};

// run function
dialogRequired(app.activeDocument, "test", ["jpg", "pdf"], ["dept1", "dept2"], {"path": "~/Desktop/"});