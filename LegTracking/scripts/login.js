// Dev, test, prod urls
var apiLoginUrlDev = "https://sts-dev.pciaa.net/api/pci/signin/issue";
var apiLoginUrlTest = "https://sts-test.pciaa.net/api/pci/signin/issue";
var apiLoginUrlProd = "https://sts.pciaa.net/api/pci/signin/issue";
var apiBaseServiceUrlDev = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/";
var apiBaseServiceUrlTest = "http://test.pciaa.net/pciwebsite/congressapi/legislators/";
var apiBaseServiceUrlProd = "http://www.pciaa.net/pciwebsite/congressapi/legislators/";
var scopeDev = "http://dev.pciaa.net/";
var scopeTest = "http://test.pciaa.net/";
var scopeProd = "http://www.pciaa.net/";

// Define all global variables used throughout the entire solution.
var apiLoginUrl = apiLoginUrlProd;
var apiBaseServiceUrl = apiBaseServiceUrlProd;
var scope = scopeProd;
var token = null;
var personId = null;
var isPci = false;
var isCongressUser = false;

function loginListViewDataInit(e)
{
    $("#loginForm input").keyup
    (
        function (e)
        { //inputs on login view should call authenticateUser() method on 'enter'
            if (e.keyCode === 13)
            {
                authenticateUser();

                $(this).blur(); //iOS likes to keep the keyboard open ... so remove focus to close it
            }
        }
    );
}

function loginListViewDataShow(e)
{
    var rememberMe = localStorage.getItem("RememberMe");
    var email = null;
    
    if (rememberMe === "true")
    {
        email = localStorage.getItem("Email");

        $("#email").val(email);
        $("#rememberme").data("kendoMobileSwitch").check(true);
    }
}

function authenticateUser()
{
    var allValid = true;
    var isValid = true;
    var validator = $("#loginForm").kendoValidator
        (
            {
                validateOnBlur: false
            }
        ).data("kendoValidator");

    $('#loginForm input').each
            (
                function ()
                {
                    $(this).parent().parent().find("li").find("span").removeClass('invalid');

                    isValid = validator.validateInput($(this));

                    if (!isValid)
                    {
                        if (allValid)
                        {
                            allValid = false;
                        }

                        $(this).parent().parent().find("li").find("span").addClass('invalid');

                        //return isValid;
                    }
                }
            );

    if (allValid)
    {
        var rememberme = $("#rememberme").data("kendoMobileSwitch");
        var email = $("#email").val();
        var password = $("#password").val();
        var $msg = $("#login-message");

        if (rememberme.check())
        {
            // Update email in local storage, in case of update.
            localStorage.setItem("Email", email);
        }

        $.ajax({
            url: apiLoginUrl,
            data: { EmailAddress: email, Password: password, Scope: scope },
            dataType: "json",
            type: "POST",
            success: function (data)
            {
                if (data.AccessToken !== null)
                {
                    token = data.AccessToken;

                    var pciEveryonePosition = token.toLowerCase().indexOf("pci.everyone");

                    if (pciEveryonePosition > 0)
                    {
                        isPci = true;
                    }

                    var congressUserPosition = token.toLowerCase().indexOf("congress+user");
                    var congressAdminPosition = token.toLowerCase().indexOf("congress+admin");

                    if (congressUserPosition > 0 || congressAdminPosition > 0)
                    {
                        isCongressUser = true;
                    }

                    if (isCongressUser)
                    {
                        var personIdPosition = token.toLowerCase().indexOf("&personid=") + 10;
                        var firstNamePosition = token.toLowerCase().indexOf("&firstname=");

                        personId = token.slice(personIdPosition, firstNamePosition);

                        $msg.hide();

                        legislatorsOptionsDataSource.read();
                        attendeeTypesOptionsDataSource.read();
                        meetingLocationsOptionsDataSource.read();
                        supportLevelsOptionsDataSource.read();

                        app.navigate("views/legislators.html");
                    }
                    else
                    {
                        $msg.html("<br />ERROR: \"Unauthorized user account.\"").show();
                    }
                }
                else
                {
                    $msg.html("<br />ERROR: \"Null access token returned.\"").show();
                }
            },
            error: function (xhr, status, error)
            {
                $msg.html("<br />ERROR: " + xhr.responseText).show();
            }
        });
    }
}

function loginRememberMeSwitchChange(e)
{
    if (e.checked)
    {
        var email = $("#email").val();

        localStorage.setItem("RememberMe", "true");
        localStorage.setItem("Email", email);
    }
    else
    {
        localStorage.setItem("RememberMe", "false");
        localStorage.setItem("Email", null);
    }
}