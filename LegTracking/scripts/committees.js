var committeesDataSource = null;

function committeesListViewDataShow(e)
{
    var legislatorId = e.view.params.uid;

    committeesDataSource = new kendo.data.DataSource
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

    e.view.element.find("#committeesListView")
        .kendoMobileListView
        (
            {
                dataSource: committeesDataSource,
                template: $("#committeesListViewTemplate").html(),
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
}