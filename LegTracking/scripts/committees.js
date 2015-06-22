var committeesData = 
    [ 
        {
            id: 1,
            name: "House Committee on Oversight and Government Reform", 
            type: "House",
            subcommitteecount: "5"
        }, 
        {
            id: 2,
            name: "House Committee on Homeland Security", 
            type: "House",
            subcommitteecount: "6"
        }
    ];

var committeesDataSource = new kendo.data.DataSource
(
    {
		data: committeesData,
		batch: true,
		schema: 
        {
			model: 
            {
				id: "id",
				fields: 
                {
                    Id: "id",
                    Name: "name",
                    Type: "type",
                    SubcommitteeCount: "subcommitteecount"
                }
            }
        }
	}
);

// The following is used to store the master UID for the detail record so references can be made back to the original datasource.
var masterUid;

function committeesListViewDataBindShow(e) 
{
    masterUid = e.view.params.uid;

    var model = legislatorsDataSource.getByUid(masterUid);
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function committeesListViewDataBindInit(e) 
{
    e.view.element.find("#back")
    	.data("kendoMobileBackButton")
    		.bind
    		(
        		"click", function(e) 
            	{
        			e.preventDefault();
        			
        			legislatorDataSource.one
                    (
                        "change", function() 
                        {
            				e.view.loader.hide();
            				kendo.mobile.application.navigate("#:back");
        				}
                    );

        			e.view.loader.show();
        			legislatorDataSource.cancelChanges();
    			}
			);
    
    e.view.element.find("#committees-listview")
        .kendoMobileListView
        (
           { 
                dataSource: committeesDataSource,
                template: $("#committeesListViewTemplate").html()
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: committeesTouchStart,
                tap: committeesNavigate,
                swipe: committeesSwipe
            }
        );
}

function committeesTouchStart(e) 
{
    
}

function committeesNavigate(e) 
{
	var url = e.touch.currentTarget.childNodes[1].value;
    var filter = '[id=id]';

    kendo.mobile.application.navigate('views/subcommittees.html');

}

function committeesSwipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}