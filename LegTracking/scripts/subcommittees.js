var subcommitteesData = 
    [ 
        {
            id: 1,
            name: "Federal Workforce, U.S. Postal Service and the Census"
        }, 
        {
            id: 2,
            name: "Government Operations"
        }, 
        {
            id: 3,
            name: "National Security"
        }, 
        {
            id: 4,
            name: "Health Care, Benefits and Administrative Rules"
        }, 
        {
            id: 5,
            name: "Economic Growth, Job Creation and Regulatory Affairs"
        }
    ];

var subcommitteesDataSource = new kendo.data.DataSource
(
    {
		data: subcommitteesData,
		batch: true,
		schema: 
        {
			model: 
            {
				id: "id",
				fields: 
                {
                    Id: "id",
                    Name: "name"
                }
            }
        }
	}
);

// The following is used to store the master UID for the detail record so references can be made back to the original datasource.
var masterUid;

function subcommitteesListViewDataBindShow(e) 
{
    masterUid = e.view.params.uid;

    var model = legislatorsDataSource.getByUid(masterUid);
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function subcommitteesListViewDataBindInit(e) 
{
    e.view.element.find("#back")
    	.data("kendoMobileBackButton")
    		.bind
    		(
        		"click", function(e) 
            	{
        			e.preventDefault();
        			
        			committeesDataSource.one
                    (
                        "change", function() 
                        {
            				e.view.loader.hide();
            				kendo.mobile.application.navigate("#:back");
        				}
                    );

        			e.view.loader.show();
        			committeesDataSource.cancelChanges();
    			}
			);
    
    e.view.element.find("#subcommittees-listview")
        .kendoMobileListView
        (
           { 
                dataSource: subcommitteesDataSource,
                template: $("#subcommitteesListViewTemplate").html()
            }
        );
}