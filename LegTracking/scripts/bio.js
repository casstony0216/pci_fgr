function bioListViewDataBindShow(e) 
{
    var model = legislatorsDataSource.getByUid(e.view.params.uid);
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function bioListViewDataBindInit(e) 
{
    e.view.element.find("#back")
    	.data("kendoMobileBackButton")
    		.bind
    		(
        		"click", function(e) 
            	{
        			e.preventDefault();
        			
        			legislatorsDataSource.one
                    (
                        "change", function() 
                        {
            				e.view.loader.hide();
            				kendo.mobile.application.navigate("#:back");
        				}
                    );

        			e.view.loader.show();
        			legislatorsDataSource.cancelChanges();
    			}
			);
}
