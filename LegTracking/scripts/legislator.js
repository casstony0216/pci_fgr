// The following is used to store the master UID for the detail record so references can be made back to the original datasource.
var parentUid;
var parentModel;

var legislatorData = 
    [
        {
            id: 1,
            name: "meetings",
            label: "Meetings",
            url: "views/meetings.html?uid="
        },
        {
            id: 2,
            name: "tiers",
            label: "PCI Initiative Tiers",
            url: "views/initiativetiers.html?uid="
        },
        {
            id: 3,
            name: "surveys",
            label: "Initiative Surveys",
            url: "views/initiativesurveys.html?uid="
        },
        {
            id: 4,
            name: "relationships",
            label: "PCI Relationships",
            url: "views/legislatorPciRelations.html?uid="
        },
        {
            id: 5,
            name: "bio",
            label: "Bio",
            url: "views/bio.html?uid="
        },
        {
            id: 6,
            name: "committees",
            label: "Committees",
            url: "views/committees.html?uid="
        }
    ];

var legislatorDataSource = new kendo.data.DataSource
(
    {
		data: legislatorData,
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
                    Label: "label",
                    Url: "url"
                }
            }
        }
	}
);

function legislatorListViewDataShow(e) 
{
    e.view.element.find("#legislatorListView")
        .kendoMobileListView
        (
           {
               dataSource: legislatorDataSource,
               template: $("#legislatorListViewTemplate").html()
           }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: legislatorTouchStart,
                tap: legislatorNavigate,
                swipe: legislatorSwipe
            }
        );

    parentUid = e.view.params.uid;
    parentModel = legislatorsDataSource.getByUid(parentUid);
    
    kendo.bind(e.view.element, parentModel, kendo.mobile.ui);
}

function legislatorListViewDataInit(e) 
{
    
}

function legislatorTouchStart(e) 
{
    
}

function legislatorNavigate(e) 
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = legislatorDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var legislatorId = parentModel.LegislatorId;
    
	kendo.mobile.application.navigate(url + legislatorId);
}

function legislatorSwipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}