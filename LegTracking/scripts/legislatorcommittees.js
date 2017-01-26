var legislatorCommitteesDataSource = null;

function legislatorCommitteesListViewDataShow(e)
{
    var legislatorId = e.view.params.uid;

    legislatorCommitteesDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "committees?legislatorId=" + legislatorId,
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
                    id: "CommitteeId",
                    fields:
                    {
                        CommitteeId: "CommitteeId",
                        Name: "Name",
                        Phone: "Phone",
                        ChamberId: "ChamberId",
                        Chamber: "Chamber",
                        ParentCommitteeId: "ParentCommitteeId",
                        Subcommittee: "Subcommittee",
                        Rank: "Rank",
                        Title: "Title"
                    }
                }
            }
        }
    );

    e.view.element.find("#legislatorCommitteesListView")
        .kendoMobileListView
        (
            {
                dataSource: legislatorCommitteesDataSource,
                template: $("#legislatorCommitteesListViewTemplate").html(),
                dataBound: function (e)
                {
                    e.sender.element.find('div[id="indentProperty"]').each(function ()
                    {
                        var divElement = $(this);
                        var subcommittee = divElement.find('input[id="subcommittee"]');

                        if (subcommittee[0].value === "True")
                        {
                            divElement.css("margin-left", "1em");
                        }
                    });
                }
            }
        );

    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);

    e.view.scroller.reset();
}