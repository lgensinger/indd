// function definition
function prescreen(version) {
    
    // set up needed variables
    var bookCount = app.books.length;
    var docCount = app.documents.length;
    var appVersion = parseInt(app.version);

    // check for open books or documents
    if (bookCount == 0 && app.documents.length == 0) {

        alert("Please open a document or book and re-run the script.", "No documents or books found");

    };

    // check InDesign version against param
    if (appVersion < version) {

        alert("Please upgrade to at least InDesign 5.5 and re-run the script.", "InDesign 5.5 or 6 required");

    };

    // ensure at least 1 document is open
    if (docCount > 0) {

        // check for read only status of documents
        if (app.activeDocument.readOnly) {

            alert('File is "Read Only" and can not be processed.', "File is Read Only");

        };

        // return document object
        return app.activeDocument;

    // ensure at least 1 book open
    } else if (bookCount > 0) {

        // return boo object
        return app.activeBook;

    };
    
};

// run function
// version expects an integer
// function returns active document or active book object
prescreen(7);