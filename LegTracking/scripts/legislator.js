var legislatorData = 
    [
        {
            id: 1,
            name: "meetings",
            label: "Meetings",
            url: "views/meetings.html?reference=legislator&legislatorId="
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
            url: "views/initiativesurveys.html?legislatorId="
        },
        {
            id: 4,
            name: "relationships",
            label: "PCI Relationships",
            url: "views/profiles.html?type=legislator&uid="
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

function legislatorListViewDataInit(e)
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
                tap: legislatorNavigate
            }
        );
}

function legislatorListViewDataShow(e) 
{
    legislatorUid = e.view.params.uid;
    legislatorModel = legislatorsDataSource.getByUid(legislatorUid);
    
    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);
}

function legislatorNavigate(e) 
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = legislatorDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var legislatorId = legislatorModel.LegislatorId;
    
    if (currentRecord.Name === "bio")
    {
        app.navigate(url + legislatorUid);
    }
    else if (currentRecord.Name === "surveys")
    {
        initiativeSurveysReference = "legislator";

        app.navigate(url + legislatorId);
    }
    else
    {
        app.navigate(url + legislatorId);
    }
}