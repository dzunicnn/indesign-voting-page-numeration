
function deleteTextBoxesOnPage(page) {
    for (var i = page.textFrames.length - 1; i >= 0; i--) {
        page.textFrames[i].remove();
    }
}

function deleteTextBoxesInDocument() {
    for (var i = 0; i < doc.pages.length; i++) {
        var currentPage = doc.pages[i];
        deleteTextBoxesOnPage(currentPage);
    }
}

function exportPDF(batchNumber) {
    var doc = app.activeDocument;

    var filePath = new File("C:/Exports/Document" + batchNumber + ".pdf");

    var pdfPreset = app.pdfExportPresets[0];

    doc.exportFile(ExportFormat.PDF_TYPE, filePath, false, pdfPreset);
}

function addFormattedPageNumber() {

    var totalNumberOfPages = doc.pages.length;
    for (var i = 0; i < totalNumberOfPages; i++) {
        var currentPage = doc.pages[i];

        // alert(app.activeDocument.pages[i].name);

        var formattedPageNumber = ("000000" + app.activeDocument.pages[i].name).slice(-7);

        var textFrame = currentPage.textFrames.add();

        textFrame.geometricBounds = [235, 38, 256, 55]; // [y1, x1, y2, x2]

        textFrame.contents = formattedPageNumber;

        textFrame.texts[0].appliedFont = "Minion Pro";
        textFrame.texts[0].pointSize = 12;
        textFrame.texts[0].justification = Justification.RIGHT_ALIGN;
    }
}

if (app.documents.length > 0) {
    alert("Start")
    var doc = app.activeDocument;

    var totalPagesToAdd = 999;
    for (var i = 0; i < totalPagesToAdd; i++) {
        doc.pages.add(LocationOptions.AT_END);
    }

    addFormattedPageNumber();

    alert("Script completed. 999 pages added with formatted page numbers.");

    var firstSection = doc.sections[0];

    exportPDF(1);

    firstSection.continueNumbering = false;
    firstSection.pageNumberStart = 1001;

    deleteTextBoxesInDocument();

    addFormattedPageNumber();

    exportPDF(2);

    firstSection.pageNumberStart = 2001;

    deleteTextBoxesInDocument();

    addFormattedPageNumber();

    exportPDF(3);

    for (var index = 4; index < 101; index++) {
        firstSection.pageNumberStart = firstSection.pageNumberStart + 1000;

        deleteTextBoxesInDocument();

        addFormattedPageNumber();

        exportPDF(index);
    }

} else {
    alert("No active document. Please create or open a document first.");
}
