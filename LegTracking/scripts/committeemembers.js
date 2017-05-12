var committeeMembersDataSource = null;

function committeeMembersListViewDataInit(e)
{
    e.view.element.find("#committeeMembersListView")
        .kendoMobileListView
        (
            {
                dataSource: committeeMembersDataSource,
                template: $("#committeeMembersListViewTemplate").html()
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: committeeMembersTap
            }
        );
}

function committeeMembersListViewDataShow(e)
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

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

function committeeMembersTap(e)
{
    var committeeMemberUid = $(e.touch.currentTarget).data("uid");
    var committeeMemberModel = committeeMembersDataSource.getByUid(committeeMemberUid);
    var legislatorId = committeeMemberModel.LegislatorId;

    legislatorReference = "committeeMembers";

    app.navigate("views/legislator.html?legislatorId=" + legislatorId);
}