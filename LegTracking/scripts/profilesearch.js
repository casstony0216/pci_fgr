//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

var profileSearchDataSource = null;

function profileSearchViewDataInit(e)
{
    e.view.element.find("#profileSearchListView")
        .kendoMobileListView
        (
            {
                dataSource: profileSearchDataSource,
                template: $("#profileSearchListViewTemplate").html(),
                filterable:
                {
                    field: "FullName",
                    operator: "contains"
                },
                endlessScroll: true,
                pullToRefresh: true
            }
        );
}

function profileSearchViewDataShow(e)
{
    var uid = e.view.params.uid;
    var dataTitle = null;

    if (profileType == "legislator") // profileType is declared and set in the profiles.js
    {
        dataTitle = "Profile Search";
    }
    else
    {
        dataTitle = "PCI Attendee Search";
    }

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    profileSearchDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "profilerelationshipfilter",
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
                update:
                {
                    url: apiBaseServiceUrl + "insertdeleteprofilerelationship",
                    type: "post",
                    dataType: "json",
                    // crossDomain: true, // enable this,
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                },
                parameterMap: function (options, operation)
                {
                    if (operation === "read")
                    {
                        return {
                            relationalType: profileType,
                            relationalId: uid,
                            filter: options.filter ? options.filter.filters[0].value : '',
                            page: options.page,
                            pageSize: options.pageSize
                        };
                    }
                    else if (operation !== "read")
                    {
                        return options;
                    }
                }
            },
            schema:
            {
                model:
                {
                    id: "PersonId",
                    fields:
                    {
                        RelationalType: { editable: false },
                        RelationalId: { editable: false },
                        PersonId: { editable: false },
                        FullName: { editable: false },
                        Company: { editable: false },
                        Title: { editable: false },
                        WorkPhone: { editable: false },
                        EmailAddress: { editable: false },
                        Notes: { editable: false },
                        Checked: { editable: true },
                        Total: { editable: false }
                    }
                },
                parse: function (data)
                {
                    if (data.Total)
                    {
                        data.total = data.Total;
                    }
                    else
                    {
                        // assign top level array to property
                        data.data = data;
                        // assign the count off one of the fields to a new total field
                        data.total = data.data[0].Total;
                    }

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

    $("#profileSearchListView").data("kendoMobileListView").setDataSource(profileSearchDataSource);
}

function profileSearchSwitchChange(e)
{
    var listItem = e.sender.element.parent().parent();
    var uid = listItem.attr("data-uid");
    var profileSearchModel = profileSearchDataSource.getByUid(uid);

    profileSearchModel.set("Checked", e.checked);

    profileSearchDataSource.sync();
}