var legislatorId=null;
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
            url: "views/tiers.html?uid="
        },
        {
            id: 3,
            name: "surveys",
            label: "Initiative Surveys",
            url: "views/surveys.html?uid="
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
        //{
        //    id: 1,
        //    name: "bio", 
        //    label: "Bio",
        //    url: "views/bio.html?uid=",
        //    icon: "bio-e"
        //}, 
        ///*{
        //    id: 2,
        //    name: "votes", 
        //    label: "Bills & Votes",
        //    url: "views/votes.html",
        //    icon: "vote-e"
        //}, */
        //{
        //    id: 3,
        //    name: "committees", 
        //    label: "Committees",
        //    url: "views/committees.html?uid=",
        //    icon: "committees-e"
        //}, 
        //{
        //    id: 4,
        //    name: "relationships", 
        //    label: "PCI Relationships",
        //    url: "views/legislatorPciRelations.html?uid=",
        //    icon: "featured"
        //},
        //{
        //    id: 5,
        //    name: "youtube", 
        //    label: "YouTube Videos",
        //    url: "YouTubeUrl",
        //    icon: "youtube-e"
        //}, 
        //{
        //    id: 6,
        //    name: "website", 
        //    label: "Website",
        //    url: "WebsiteUrl",
        //    icon: "website-e"
        //}, 
        //{
        //    id: 7,
        //    name: "facebook", 
        //    label: "Facebook",
        //    url: "FacebookUrl",
        //    icon: "facebook-e"
        //}, 
        //{
        //    id: 8,
        //    name: "twitter", 
        //    label: "Twitter",
        //    url: "TwitterUrl",
        //    icon: "twitter-e"
        //}
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
                    Url: "url",
            		Icon: "icon"
                }
            }
        }
	}
);

// The following is used to store the master UID for the detail record so references can be made back to the original datasource.
var masterUid;
//var youtubeUrl;
//var websiteUrl;
//var facebookUrl;
//var twitterUrl;

function legislatorListViewDataBindShow(e) 
{
    masterUid = e.view.params.uid;

    var model = legislatorsDataSource.getByUid(masterUid);
    
    //youtubeUrl = model.YouTubeUrl;
    //websiteUrl = model.WebsiteUrl;
    //facebookUrl = model.FacebookUrl;
    //twitterUrl = model.TwitterUrl;
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function legislatorListViewDataBindInit(e) 
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
    
    e.view.element.find("#legislator-listview")
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
}

function legislatorTouchStart(e) 
{
    
}

function legislatorNavigate(e) 
{
	var url = e.touch.currentTarget.childNodes[1].value;
	var filter = '[id=id]';

	kendo.mobile.application.navigate(url + masterUid);

    //if (url.toLowerCase().indexOf("/") >= 0)
    //{
	//	kendo.mobile.application.navigate(url + masterUid);
    //}
   	//else
    //{
    //    switch(url.toLowerCase())
    //    {
    //        case "youtubeurl":
    //            window.open(youtubeUrl);
                
    //            break;
                
    //        case "websiteurl":
    //            window.open(websiteUrl);
                
    //            break;
                
    //        case "facebookurl":
    //            window.open(facebookUrl);
                
    //            break;
                
    //        case "twitterurl":
    //            window.open(twitterUrl);
                
    //            break;
                
    //        default:
    //            window.open(websiteUrl);
                
    //            break;
                
    //    }
    //}
}

function legislatorSwipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}