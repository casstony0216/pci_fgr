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

    if (profileType === "legislator") // profileType is declared and set in the profiles.js
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