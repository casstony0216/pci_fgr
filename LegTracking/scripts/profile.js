var profileModel = kendo.data.Model.define
    (
        {
            id: "PersonId"   
        }
    );

var profileViewModel = kendo.observable
    (
        {
            dataSource: new kendo.data.DataSource
            (
                {
                    serverFiltering: true,
                    batch: false,
                    autobind: false,
                    transport:
                    {
                        read:
                        {
                            type: "get",
                            url: "http://dev.pciaa.net/pciwebsite/congressapi/profile/list",
                            dataType: "json",
                            error: function (xhr, ajaxOptions, thrownError)
                            {
                                alert("error " + xhr.responseText);
                    
                            },
                            complete: function (jqXhr, textStatus)
                            {
                                // alert('Lookup Complete'); 
                            },
                            // crossDomain: true, // enable this,
                            beforeSend: function (xhr)
                            {
                                xhr.setRequestHeader("Authorization", token);
                            },
                        },
                        parameterMap: function (options, type)
                        {
                            if (type === 'read')
                            {
                                var parameters =
                                {
                                    search: options.filter ? options.filter.filters[0].value : 'AAAAAAA',
                                };

                                return parameters;
                            }
                
                            // Pass the model to the url
                            //if (type !== "read") {
                                //return kendo.stringify(options);
                            //}
                        }
                    },
                    schema: 
                    {
			            model: profileModel
                    }
                }
            )
        }
    );

var profileData = 
    [ 
        {
            id: 1,
            name: "Gerald Albanese", 
            company: "Markel Corporation Group",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 2,
            name: "Bud Albright", 
            company: "",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 3,
            name: "Kristina Baldwin", 
            company: "PCI",
            phone: "518-443-2220",
            email: "kristina.baldwin@pciaa.net",
            imageurl: "http://www.pciaa.net/pciwebsite/Common/StreamImage.ashx?personId=93063"
        }, 
        {
            id: 4,
            name: "John Barbagallo", 
            company: "Progressive Insurance Group",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 5,
            name: "Robert Bateman", 
            company: "COUNTRY Financial",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 6,
            name: "David Bell", 
            company: "ALPS Property & Casualty Insurance Company",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 7,
            name: "Eric Berger", 
            company: "The Gray Insurance Company",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }
    ];

var profileDataSource = new kendo.data.DataSource
(
    {
		data: profileData,
		batch: true,
		schema: 
        {
			model: 
            {
				id: "id",
				fields: 
                {
                    Id: "id",
                    Name: "name",
                    Company: "company",
                    Phone: "phone",
                    Email: "email",
                    ImageUrl: "imageurl"                        
                }
            }
        }
	}
);

function profileListViewDataBindInit(e) 
{
    e.view.element.find("#profile-listview")
        .kendoMobileListView
        (
            { 
                dataSource: profileDataSource,
                template: $("#profileListViewTemplate").html(),
                filterable: 
                {
                    field: "name"
                }
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: profiletouchstart,
                tap: profilenavigate,
                swipe: profileswipe
            }
        );
}

function profilenavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("#profile-detailview?uid=" + itemUID);
}

function profileswipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function profiletouchstart(e) 
{
    var target = $(e.touch.initialTouch),
        listview = $("#profile-listview").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) 
    {
        model = profileDataSource.getByUid($(e.touch.target).attr("data-uid"));
        profileDataSource.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } 
    else if (button[0]) 
    {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    } 
    else 
    {
        listview.items().find("[data-role=button]:visible").hide();
    }
}

function profileDetailShow(e) 
{
    var model = profileDataSource.getByUid(e.view.params.uid);
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function profileDetailInit(e) 
{
    var view = e.view;
    
    view.element.find("#back").data("kendoMobileBackButton").bind("click", function(e) 
    {
        e.preventDefault();
        
        profileDataSource.one
        (
            "change", function() 
			{
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
        	}
        );

        view.loader.show();
        profileDataSource.cancelChanges();
    });
}