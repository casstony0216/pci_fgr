var relationData = 
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
   
    ];

var  relationDataDataSource = new kendo.data.DataSource
(
    {
		data:  relationData,
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

function relationListViewDataBindInit(e) 
{
    e.view.element.find("#relation-listview")
        .kendoMobileListView
        (
            { 
                dataSource:  relationDataDataSource,
                template: $("#relationListViewTemplate").html(),
             }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: relationtouchstart,
                tap: relationnavigate,
                swipe: relationswipe
            }
        );
}

function relationnavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("views/legislatorPciRelation.html?uid=" + itemUID);
}

function relationswipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function relationtouchstart(e) 
{
    var target = $(e.touch.initialTouch),
        listview = $("#relation-listview").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) 
    {
        model =  relationDataDataSource.getByUid($(e.touch.target).attr("data-uid"));
         relationDataDataSource.remove(model);

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

function relationDetailShow(e) 
{
    var model =  relationDataDataSource.getByUid(e.view.params.uid);
    
    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function relationDetailInit(e) 
{
    var view = e.view;
    
    view.element.find("#back").data("kendoMobileBackButton").bind("click", function(e) 
    {
        e.preventDefault();
        
         relationDataDataSource.one
        (
            "change", function() 
			{
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
        	}
        );

        view.loader.show();
         relationDataDataSource.cancelChanges();
    });
}


    function save(e) {
        e.context; // 1
        e.target; // $("#myButton")
        alert('save');
    }


    function del(e) {
        e.context; // 1
        e.target; // $("#myButton")
        alert('delete');
    }

