var committeesDataSource = null;

function committeesListViewDataInit(e)
{
    e.view.element.find("#committeesListView")
        .kendoMobileListView
        (
            {
                dataSource: committeesDataSource,
                template: $("#committeesListViewTemplate").html(),
                filterable:
                {
                    field: "CommitteeName",
                    operator: "contains"
                },
                endlessScroll: true
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: committeesTap
            }
        );

    $("#committeesForm input").keyup
    (
        function (e)
        {
            if (e.keyCode === 13)
            {
                $(this).blur(); //iOS likes to keep the keyboard open ... so remove focus to close it
            }
        }
    );
}

function committeesListViewDataShow(e)
{
    if (window.navigator.simulator !== true)
    {
        if (window.plugins !== undefined && window.plugins.spinnerDialog !== undefined)
        {
            window.plugins.spinnerDialog.hide();
        }
    }

    app.showLoading();

    var committeesListView = $("#committeesListView").data("kendoMobileListView");
    committeesListView.scroller().reset(); //reset the scroller

    setCommitteesDataSource();
    
    committeesListView.setDataSource(committeesDataSource);
    
    e.view.scroller.reset();
}

function committeesTap(e)
{
    // Close the keyboard.
    $('input[type="search"]').blur();

    var uid = $(e.touch.currentTarget).data("uid");

    app.navigate("views/committeemembers.html?uid=" + uid);
}

function setCommitteesDataSource()
{
    committeesDataSource = null;

    committeesDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "committeesfilter",
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
            change: function (data)
            {
                app.hideLoading();
            },
            schema:
            {
                model:
                {
                    id: "CommitteeId",
                    fields:
                    {
                        CommitteeId: "CommitteeId",
                        CommitteeName: "CommitteeName",
                        ParentCommitteeId: "ParentCommitteeId",
                        SubcommitteeId: "SubcommitteeId",
                        SubcommitteeName: "SubcommitteeName",
                        IsSubcommittee: "IsSubcommittee",
                        ChamberId: "ChamberId",
                        Chamber: "Chamber",
                        Office: "Office",
                        Phone: "Phone",
                        Website: "Website",
                        FullName: "FullName",
                        Title: "Title"
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