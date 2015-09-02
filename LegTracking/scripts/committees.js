var committeesViewModel = kendo.observable({
    LegislatorId: 0,
    dataSource: new kendo.data.DataSource({
        transport: {
            read: function (options) {
                // get the id from wherever it is stored (e.g. your list view)
                // var resourceId = getResourceId(); 

                $.ajax({
                    url: 'http://dev.pciaa.net/pciwebsite/congressapi/legislators/committees?LegislatorId=8',
                    dataType: "json",
                    success: function (result) {
                        options.success(result);
                        alert(result);
                    },
                    error: function (result) {
                        options.error(result);
                        alert(result);
                    }
                });
            }
        }
    })
});

var committeesViewModelNew = kendo.observable({
    LegislatorId: 0,
    dataSource: new kendo.data.DataSource({
        serverFiltering: true,
        transport: {
            read: {
                type: "get",
                url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/committees",
                dataType: "json",
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error " + xhr.responseText);
                },
            },
            parameterMap: function (options, type) {
                if (type === 'read') {
                    return {
                        LegislatorId: committeesViewModelNew.LegislatorId
                    };
                }
            }
        },
       
        schema:
                {
                    model:
                    {
                        id: "CommitteeId",
                        fields:
                        {
                            Id: "CommitteeId",
                            Name: "Name",
                            //Type: "Type",
                            //SubcommitteeCount: "subcommitteecount"
                            Subcommittee: "Subcommittee",
                            Rank: "Rank",
                            Title: "Title"
                        }
                    }
                }
    })
});



// The following is used to store the master UID for the detail record so references can be made back to the original datasource.
var masterUid;

function committeesListViewDataBindShow(e) {
    masterUid = e.view.params.uid;

    var model = legislatorsDataSource.getByUid(masterUid);

    committeesViewModelNew.set("LegislatorId", model.LegislatorId);
    committeesViewModelNew.dataSource.read();


    //$("#committees-listview").kendoMobileListView({dataSource:committeesViewModelNew.dataSource});
    $("#committees-listview").kendoMobileListView({ dataSource: committeesViewModelNew.dataSource, template: $("#committeesListViewTemplate").html() });

    // kendo.bind(e.view.element, committeesViewModelNew, kendo.mobile.ui);
}



function committeesListViewDataBindInit(e) {
    e.view.element.find("#back")
    	.data("kendoMobileBackButton")
    		.bind
    		(
        		"click", function (e) {
        		    e.preventDefault();

        		    legislatorDataSource.one
                    (
                        "change", function () {
                            e.view.loader.hide();
                            kendo.mobile.application.navigate("#:back");
                        }
                    );

        		    e.view.loader.show();

        		    legislatorDataSource.cancelChanges();
        		}
			);

    e.view.element.find("#committees-listview")
        .kendoMobileListView
        (
           {
               // dataSource: committeesViewModel.dataSource,
               //template: $("#committeesListViewTemplate").html()
           }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: false
               // touchstart: committeesTouchStart,
               // tap: committeesNavigate,
               // swipe: committeesSwipe
            }
        );
}
function committeesTouchStart(e) {

}
function committeesNavigate(e) {
    var url = e.touch.currentTarget.childNodes[1].value;
    var filter = '[id=id]';

    kendo.mobile.application.navigate('views/subcommittees.html');

}

function committeesSwipe(e) {
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));

    button.expand().duration(200).play();
}