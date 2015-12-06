var initiativeTiersDataSource = null;

function initiativeTiersListViewDataShow(e)
{
    var legislatorId = e.view.params.uid;

    initiativeTiersDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "initiativestances?legislatorId=" + legislatorId,
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
                }
            },
            batch: true,
            schema:
            {
                model:
                {
                    id: "InitiativeId",
                    fields:
                    {
                        InitiativeId: "InitiativeId",
                        Initiative: "Initiative",
                        LegislatorId: "LegislatorId",
                        Legislator: "Legislator",
                        Tier: "Tier",
                        IssueStanceId: "IssueStanceId",
                        IssueStance: "IssueStance"
                    }
                }
            }
        }
    );

    e.view.element.find("#initiativeTiersListView")
        .kendoMobileListView
        (
            {
                dataSource: initiativeTiersDataSource,
                template: $("#initiativeTiersListViewTemplate").html()
            }
        );

    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);
}