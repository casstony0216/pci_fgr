var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';

var legislatorsDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            // the remote service url
            url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/list",

            // the request type
            type: "get",

            // the data type of the returned result
            dataType: "json",
            
            
                 // crossDomain: true, // enable this,
             beforeSend: function (xhr) {
                          xhr.setRequestHeader("Authorization", token);
             },
            
            
             error: function (xhr, ajaxOptions, thrownError) {
                    alert("error " + xhr.responseText);
             },

            // additional custom parameters sent to the remote service
          //  data: {
          //      lat: 42.42,
          //      lon: 23.20,
          //      cnt: 10
           // }
        }
    },
    batch: true,
   	schema: 
        {
			model: 
            {
				Id: "LegislatorId",
				fields: 
                {
                    LegislatorId: "LegislatorId",
                    Name: "FullName",
                    Description: "Description",
                    ImageUrl: "PictureUrl",
                    YouTubeUrl: "YouTubeUrl",
                    WebsiteUrl: "WebsiteUrl",
                    FacebookUrl: "FacebookId",
                    TwitterUrl: "TwitterId",
                    Bio: "Bio"
                }
            }
        }
});

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
                    field: "Name",
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