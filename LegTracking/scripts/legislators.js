//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

var apiBaseServiceUrl = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/";
var personId = "47561"; // Will need to pull this out of the login token when that gets wired up.

var legislatorsDataSource = null;
var legislatorUid;
var legislatorModel;
var initiativeSurveysReference = null;

function legislatorsListViewDataInit(e) 
{
    e.view.element.find("#legislatorsListView")
        .kendoMobileListView
        (
            { 
                dataSource: legislatorsDataSource,
                template: $("#legislatorsListViewTemplate").html(),
                filterable: 
                {
                    field: "FullName",
                    operator: "contains"
                },
                endlessScroll: true,
                pullToRefresh: true
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: legislatorsTouchStart,
                tap: legislatorsNavigate,
                swipe: legislatorsSwipe
            }
        );
}

function legislatorsListViewDataShow(e)
{
    setLegislatorsDataSource();

    $("#legislatorsListView").data("kendoMobileListView").setDataSource(legislatorsDataSource);
}

function legislatorsNavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("views/legislator.html?uid=" + itemUID);
}

function legislatorsSwipe(e) 
{
    if (e.direction === "left")
    {
        var detailbutton = $(e.touch.currentTarget).find("[data-role=detailbutton]");
        var tabstrip = kendo.fx($(e.touch.currentTarget).find("div.swipeButtons"));
        
        detailbutton.hide();
        tabstrip.expand().duration(200).play();
    }
}

function legislatorsTouchStart(e) 
{
    var target = $(e.touch.initialTouch)
    var listview = $("#legislatorsListView").data("kendoMobileListView")
    var model = legislatorsDataSource.getByUid($(e.touch.target).attr("data-uid"));
    var detailbutton = $(e.touch.target).find("[data-role=detailbutton]")
    var tabstrip = $(e.touch.target).find("div.swipeButtons:visible");

    if (target.closest("div.swipeButtons")[0]) 
    {
        var button = target.closest("[data-role=button]")[0];
        var buttonIcon = button.attributes["data-icon"].value;
        var legislatorId = model.LegislatorId;

        switch(buttonIcon)
        {
            case "add":
                //detailbutton.show();
                //tabstrip.hide();

                kendo.mobile.application.navigate("views/meeting.html?isAdd=Y&legislatorId=" + legislatorId);

                break;

            case "meeting-e":
                //detailbutton.show();
                //tabstrip.hide();

                kendo.mobile.application.navigate("views/meetings.html?reference=legislator&legislatorId=" + legislatorId);

                break;

            default:
                // Do nothing...

        }

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } 
    else if (tabstrip[0]) 
    {
        tabstrip.hide();
        detailbutton.show();

        //prevent `swipe`
        this.events.cancel();
    } 
    else 
    {
        listview.items().find("[data-role=detailbutton]").show();
        listview.items().find("div.swipeButtons:visible").hide();
    }
}

function setLegislatorsDataSource()
{
    legislatorsDataSource = null;

    legislatorsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "legislatorfilter",
                    type: "get",
                    dataType: "json",
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                },
                parameterMap: function (options)
                {
                    return {
                        filter: options.filter ? options.filter.filters[0].value : '',
                        page: options.page,
                        pageSize: options.pageSize
                    };
                }
            },
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
                        Phone: "Phone",
                        State: "State",
                        StateName: "StateName",
                        StateRank: "StateRank",
                        TermStart: "TermStart",
                        TermEnd: "TermEnd",
                        ThomasId: "ThomasId",
                        Title: "Title",
                        TwitterId: "TwitterId",
                        VotesmartId: "VotesmartId",
                        Website: "Website",
                        YouTubeUrl: "YouTubeUrl",
                        Bio: "Bio",
                        ImageUrl: "PictureUrl",
                        Description: "Description"
                    }
                },
                parse: function (data)
                {
                    // assign top level array to property
                    data.data = data;
                    // assign the count off one of the fields to a new total field
                    data.total = data.data[0].Total;

                    return data;
                },
                total: function (data)
                {
                    return data.total;
                }
            },
            serverPaging: true,
            serverFiltering: true,
            pageSize: 50
        }
    );
}