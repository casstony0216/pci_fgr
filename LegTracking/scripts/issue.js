function taskDetailShow(e) 
{
	var model = dataSourceTasks.getByUid(e.view.params.uid);
	kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function taskDetailInit(e) 
{
	var view = e.view;
    view.element.find("#done")
    	.data("kendoMobileButton")
    		.bind
    		(
        		"click", function() 
                {
                    dataSourceTasks.one
                    (
                        "change", function() 
                        {
                            view.loader.hide();
                            kendo.mobile.application.navigate("#:back");
                        }
                   );

                    view.loader.show();
                    
                    dataSourceTasks.sync();
                }
         	);

	view.element.find("#cancel")
    	.data("kendoMobileBackButton")
    		.bind
    		(
        		"click", function(e) 
        		{
            		e.preventDefault();
                    
            		dataSourceTasks.one
                    (
                        "change", function() 
                        {
                			view.loader.hide();
                			kendo.mobile.application.navigate("#:back");
            			}
                    );

            		view.loader.show();
                    
           			dataSourceTasks.cancelChanges();
        		}
    		);
        
	//add touch event to the list view at the bottom
}