var legislatorsData = 
    [ 
        {
            id: 1,
            name: "Bonnie Watson Coleman", 
            description: "Representative from NJ",
            imageurl: "http://www.congressmerge.com/onlinedb/pictures/NJ12.jpg",
            youtubeurl: "http://www.youtube.com/channel/UCrxEaX0VKZKwg3930du2D5A",
            websiteurl: "http://watsoncoleman.house.gov/",
            facebookurl: "http://m.facebook.com/RepBonnieWatsonColeman?fref=ts",
            twitterurl: "http://twitter.com/BWatsonColeman",
            bio: "WATSON COLEMAN, Bonnie, a Representative from New Jersey; born in Camden, Camden County, N.J., February 6, 1945; B.A., Thomas Edison State College, Trenton, N.J., 1985; member of the New Jersey state assembly, 1998-2014; New Jersey state assembly majority leader, 2006-2009; member, New Jersey state democratic committee, 2002-2006; elected as a Democrat to the One Hundred Fourteenth Congress (January 3, 2015-present)."            
        }, 
        {
            id: 2,
            name: "Donald W. Norcross", 
            description: "Representative from NJ",
            imageurl: "http://www.congressmerge.com/onlinedb/pictures/NJ01.jpg",
            youtubeurl: "http://www.youtube.com/channel/UCA4EkFYrSl7sk6RMHST2v1Q",
            websiteurl: "http://norcross.house.gov/",
            facebookurl: "http://m.facebook.com/DonaldNorcrossNJ",
            twitterurl: "http://twitter.com/DonNorcrossNJ1",
            bio: "NORCROSS, Donald, a Representative from New Jersey; born in Camden, Camden County, N.J., December 13, 1958; graduated from Pennsauken High School, Pennsauken, N.J., 1977; A.S., Camden County College, Camden, N.J., 1979; electrician; union representative; member of the New Jersey state assembly, 2010; member of the New Jersey state senate, 2010-2014; elected simultaneously as a Democrat to the One Hundred Thirteenth and One Hundred Fourteenth Congress, by special election, to fill the vacancy caused by the resignation of United States Representative Robert Andrews (November 4, 2014-present)."
        }, 
        {
            id: 3,
            name: "Cory A. Booker", 
            description: "Senator from NJ",
            imageurl: "http://www.congressmerge.com/onlinedb/pictures/NJJR.jpg",
            youtubeurl: "http://www.youtube.com/channel/UC6FlymqNS1VettnVZa7goPA",
            websiteurl: "http://booker.senate.gov/",
            facebookurl: "http://m.facebook.com/corybooker",
            twitterurl: "http://twitter.com/CoryBooker",
            bio: "BOOKER, Cory Anthony, a Senator from New Jersey; born on April 27, 1969, in Washington, D.C.; graduated Northern Valley Regional High School, Old Tappan, N.J., 1987; B.A., Stanford University, 1991; M.A., Stanford University, 1992; attended The Queen’s College, University of Oxford, Oxford, England, as a Rhodes Scholar and received a graduate degree in 1994; J.D., Yale Law School, 1997; worked as an attorney in the non-profit sector; Newark City Council 1998-2002; Mayor of Newark, N.J. 2006-2013; elected as a Democrat to the United States Senate in a special election on October 16, 2013, to fill the vacancy caused by the death of Frank Lautenberg, a seat subsequently held by appointed senator Jeffrey Chiesa, and took the oath of office on October 31, 2013; reelected in 2014 for the term ending January 3, 2021."
        }, 
        {
            id: 4,
            name: "Scott Joyner", 
            description: "Senator from IL",
            imageurl: "http://www.pciaa.net/pciwebsite/Common/StreamImage.ashx?personId=11916",
            youtubeurl: "http://www.youtube.com/channel/UC6FlymqNS1VettnVZa7goPA",
            websiteurl: "http://booker.senate.gov/",
            facebookurl: "http://m.facebook.com/corybooker",
            twitterurl: "http://twitter.com/CoryBooker",
            bio: "To be added..."
        }, 
        {
            id: 5,
            name: "Dorene Lehmann", 
            description: "Representative from IL",
            imageurl: "https://www.pciaa.net/pciwebsite/Common/StreamImage.ashx?personId=5019",
            youtubeurl: "http://www.youtube.com/channel/UC6FlymqNS1VettnVZa7goPA",
            websiteurl: "http://booker.senate.gov/",
            facebookurl: "http://m.facebook.com/corybooker",
            twitterurl: "http://twitter.com/CoryBooker",
            bio: "To be added..."
        } 
    ];

var legislatorsDataSource = new kendo.data.DataSource
(
    {
		data: legislatorsData,
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
                    Description: "description",
                    ImageUrl: "imageurl",
                    YouTubeUrl: "youtubeurl",
                    WebsiteUrl: "websiteurl",
                    FacebookUrl: "facebookurl",
                    TwitterUrl: "twitterurl",
                    Bio: "bio"
                }
            }
        }
	}
);

function legislatorsListViewDataBindInit(e) 
{
    e.view.element.find("#legislators-listview")
        .kendoMobileListView
        (
            { 
                dataSource: legislatorsDataSource,
                template: $("#legislatorsListViewTemplate").html(),
                filterable: 
                {
                    field: "name",
                    operator: "contains"
                }
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: legislatorstouchstart,
                tap: legislatorsnavigate,
                swipe: legislatorsswipe
            }
        );
}

function legislatorsnavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("views/legislator.html?uid=" + itemUID);
}

function legislatorsswipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function legislatorstouchstart(e) 
{
    var target = $(e.touch.initialTouch),
        listview = $("#legislators-listview").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) 
    {
        model = legislatorsDataSource.getByUid($(e.touch.target).attr("data-uid"));
        legislatorsDataSource.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } 
    else if (button[0]) 
    {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    } 
    else 
    {
        listview.items().find("[data-role=button]:visible").hide();
    }
}