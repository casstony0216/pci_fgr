var committeeMembersDataSource = null;

function committeeMembersListViewDataShow(e)
{
    var committeeUid = e.view.params.uid;
    var committeeModel = committeesDataSource.getByUid(committeeUid);
    var committeeId;

    if (committeeModel.SubcommitteeId !== "")
    {
        committeeId = committeeModel.SubcommitteeId;
    }
    else
    {
        committeeId = committeeModel.CommitteeId;
    }

    committeeMembersDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "committeemembers?committeeId=" + committeeId,
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
                        Subcommittee: "Subcommittee",
                        Side: "Side",
                        Rank: "Rank",
                        BioGuideId: "BioGuideId",
                        LegislatorId: "LegislatorId",
                        FullName: "FullName",
                        Title: "Title"
                    }
                }
            }
        }
    );

    e.view.element.find("#committeeMembersListView")
        .kendoMobileListView
        (
            {
                dataSource: committeeMembersDataSource,
                template: $("#committeeMembersListViewTemplate").html()
            }
        );

    if (committeeModel.SubcommitteeName !== "")
    {
        committeeModel.CommitteeName = committeeModel.SubcommitteeName + " Subcommittee";
    }

    kendo.bind(e.view.element, committeeModel, kendo.mobile.ui);

    e.view.scroller.reset();
}