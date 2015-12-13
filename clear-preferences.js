// function definition
function clearPrefs(doc) {
    
    // clear app preferences
    app.pageItemDefaults.appliedGraphicObjectStyle = app.objectStyles.item ("[None]");
    app.pageItemDefaults.appliedGridObjectStyle = app.objectStyles.item ("[None]");
    app.pageItemDefaults.appliedTextObjectStyle = app.objectStyles.item ("[None]");

    // clear document preferences
    doc.pageItemDefaults.appliedGraphicObjectStyle = app.objectStyles.item ("[None]");
    doc.pageItemDefaults.appliedGridObjectStyle = app.objectStyles.item ("[None]");
    doc.pageItemDefaults.appliedTextObjectStyle = app.objectStyles.item ("[None]");
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.INCHES;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.INCHES;
    
};

// run function
// doc expects a document object
clearPrefs(app.activeDocument);