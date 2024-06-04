function openPdfWindow(){ 
    var adobeDCView = new AdobeDC.View({clientId: "901e63321788421c9b8cd317a58496cd"});
    adobeDCView.previewFile({
                            content:{location: {url: "https://vishaldhatrika.me/assets/docs/VishalDhatrika-Resume.pdf"}},
                            metaData:{fileName: "VishalDhatrika-Resume.pdf"}
                            }, 
                            {embedMode: "LIGHT_BOX", defaultViewMode: "FIT_WIDTH", exitPDFViewerType: "RETURN"}
                        );        
}
