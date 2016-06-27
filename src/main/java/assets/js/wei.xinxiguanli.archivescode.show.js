//$(function () {
    function getDocumentUrl(document) {
        return "/assets/vendor/FlexPaper/php/services/view.php?doc={doc}&format={format}&page={page}".replace("{doc}", document);
    }

    function getContentPath() {
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var path = pathName.substr(0, index + 1);
        return path;
    }

    console.log(getContentPath())
    var startDocument = "Paper";
$('#documentViewer').FlexPaperViewer(
    { config : {
        SWFFile : '/assets/swf/Paper.pdf.swf',
        Scale : 0.8,
        ZoomTransition : 'easeOut',
        ZoomTime : 0.5,
        ZoomInterval : 0.2,
        FitPageOnLoad : true,
        FitWidthOnLoad : false,
        FullScreenAsMaxWindow : false,
        ProgressiveLoading : false,
        MinZoomSize : 0.2,
        MaxZoomSize : 5,
        SearchMatchAll : false,
        InitViewMode : 'Portrait',
        RenderingOrder : 'flash',
        StartAtPage : '',
        ViewModeToolsVisible : true,
        ZoomToolsVisible : true,
        NavToolsVisible : true,
        CursorToolsVisible : true,
        SearchToolsVisible : true,
        WMode : 'window',
        localeChain: 'en_US'
    }}
);

//});


