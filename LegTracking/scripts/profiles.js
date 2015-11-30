var profilesDataSource = null;
var profileType = null;

function profilesViewDataInit(e)
{
    e.view.element.find("#profilesListView")
        .kendoMobileListView
        (
            {
                dataSource: profilesDataSource,
                template: $("#profilesListViewTemplate").html()
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: profilesTouchStart,
                tap: profilesNavigate,
                swipe: profilesSwipe
            }
        );
}

function profilesViewDataShow(e)
{
    var apiReadUrl = null;
    var apiUpdateUrl = null;
    var apiDestroyUrl = null;
    var uid = e.view.params.uid;
    var dataTitle = null;

    profileType = e.view.params.type;

    if (profileType === "legislator")
    {
        dataTitle = "PCI Relationships";
    }
    else
    {
        dataTitle = "PCI Attendees";
    }

    apiReadUrl = apiBaseServiceUrl + "profilerelationships?relationalType=" + profileType + "&relationalId=" + uid;
    apiUpdateUrl = apiBaseServiceUrl + "updateprofilerelationship";
    apiDestroyUrl = apiBaseServiceUrl + "insertdeleteprofilerelationship";

    profilesDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiReadUrl,
                    type: "get",
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
                update:
                {
                    url: apiUpdateUrl,
                    type: "post",
                    dataType: "json"
                },
                destroy:
                {
                    url: apiDestroyUrl,
                    type: "post",
                    dataType: "json"
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
                        MailTo: { editable: false },
                        Notes: { editable: true },
                        Checked: { editable: true },
                        Total: { editable: false }
                    }
                }
            }
        }
    );
    
    var addButton = e.view.element.find("#add-button").data("kendoMobileButton");

    addButton.unbind("click");
    addButton.bind
    (
        "click",
        function (e)
        {
            app.navigate("views/profilesearch.html?uid=" + uid);
        }
    );

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    $("#profilesListView").data("kendoMobileListView").setDataSource(profilesDataSource);

    if (profileType === "legislator")
    {
        kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);
    }
    else
    {
        kendo.bind(e.view.element, meetingModel, kendo.mobile.ui);
    }
}

function profilesNavigate(e)
{
    var uid = $(e.touch.currentTarget).data("uid");

    app.navigate("views/profile.html?type=" + profileType + "&uid=" + uid);
}

function profilesSwipe(e)
{
    if (e.direction === "left")
    {
        var detailbutton = $(e.touch.currentTarget).find("[data-role=detailbutton]");
        var tabstrip = kendo.fx($(e.touch.currentTarget).find("div.swipeButtons"));

        detailbutton.hide();
        tabstrip.expand().duration(200).play();
    }
}

function profilesTouchStart(e)
{
    var target = $(e.touch.initialTouch);
    var listview = $("#profilesListView").data("kendoMobileListView");
    var model = profilesDataSource.getByUid($(e.touch.target).attr("data-uid"));
    var detailbutton = $(e.touch.target).find("[data-role=detailbutton]");
    var tabstrip = $(e.touch.target).find("div.swipeButtons:visible");

    if (target.closest("div.swipeButtons")[0])
    {
        var button = target.closest("[data-role=button]")[0];
        var buttonIcon = button.attributes["data-icon"].value;

        switch (buttonIcon)
        {
            case "delete-e":
                model.set("Checked", false);

                profilesDataSource.remove(model);
                profilesDataSource.sync();

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