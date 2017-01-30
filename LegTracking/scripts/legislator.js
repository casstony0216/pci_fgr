var committeeMemberDataSource = null;

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
            label: "Surveys",
            url: "views/surveys.html?legislatorId="
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
            url: "views/legislatorcommittees.html?uid="
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
                tap: legislatorTap
            }
        );
}

function legislatorListViewDataShow(e) 
{
    if (legislatorReference === "legislators")
    {
        legislatorUid = e.view.params.uid;
        legislatorModel = legislatorsDataSource.getByUid(legislatorUid);
    }
    else
    {
        var legislatorId = e.view.params.legislatorId;

        setCommitteeMemberDataSource(legislatorId);

        committeeMemberDataSource.read();
        legislatorModel = committeeMemberDataSource.data()[0];
    }
    
    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);

    e.view.scroller.reset();
}

function legislatorTap(e) 
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
        surveysReference = "legislator";

        app.navigate(url + legislatorId);
    }
    else
    {
        app.navigate(url + legislatorId);
    }
}

function setCommitteeMemberDataSource(legislatorId)
{
    committeeMemberDataSource = null;

    committeeMemberDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "legislator?legislatorId=" + legislatorId,
                    type: "get",
                    dataType: "json",
                    async: false, // Work-around for now to get datasource sync to complete before show event finishes... 
                                  // This is being deprecated and another approach will need to be developed in the near future.
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                }
            },
            batch: true,
            schema:
            {
                model:
                {
                    id: "LegislatorId",
                    fields:
                    {
                        LegislatorId: "LegislatorId",
                        BioguideId: "BioguideId",
                        Birthdate: "Birthdate",
                        Chamber: "Chamber",
                        FullName: "FullName",
                        CrpId: "CrpId",
                        District: "District",
                        FacebookId: "FacebookId",
                        Fax: "Fax",
                        FirstName: "FirstName",
                        LastName: "LastName",
                        MiddleName: "MiddleName",
                        NameSuffix: "NameSuffix",
                        Nickname: "Nickname",
                        Gender: "Gender",
                        GovtrackId: "GovtrackId",
                        IcpsrId: "IcpsrId",
                        InOffice: "InOffice",
                        OcEmail: "OcEmail",
                        OcdId: "OcdId",
                        Office: "Office",
                        Party: "Party",
                        PartyName: "PartyName",
                        Phone: "Phone",
                        State: "State",
                        StateName: "StateName",
                        StateRank: "StateRank",
                        TermStart: "TermStart",
                        TermEnd: "TermEnd",
                        ThomasId: "ThomasId",
                        Title: "Title",
                        TitleName: "TitleName",
                        TwitterId: "TwitterId",
                        VotesmartId: "VotesmartId",
                        Website: "Website",
                        YouTubeUrl: "YouTubeUrl",
                        Bio: "Bio",
                        ImageUrl: "PictureUrl",
                        Description: "Description"
                    }
                }
            }
        }
    );
}