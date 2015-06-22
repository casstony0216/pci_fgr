
function issueDetailShow(e) {
        var model =dataSourceIssues.getByUid(e.view.params.uid);
        kendo.bind(e.view.element, model, kendo.mobile.ui);
    }

    function issueDetailInit(e) {
        var view = e.view;
        view.element.find("#done").data("kendoMobileButton").bind("click", function() {
            dataSourceIssues.one("change", function() {
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
            });

            view.loader.show();
            dataSourceIssues.sync();
        });

        view.element.find("#cancel").data("kendoMobileBackButton").bind("click", function(e) {
            e.preventDefault();
            dataSourceIssues.one("change", function() {
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
            });

            view.loader.show();
           dataSourceIssues.cancelChanges();
        });
        
        //add touch event to the list view at the bottom
 
    }