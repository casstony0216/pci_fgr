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
var app;
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
    var useTouchId = localStorage.getItem("UseTouchId");
    var rememberMe = localStorage.getItem("RememberMe");
    var email = null;
    var password = null;
    
    if (useTouchId === "true")
    {
        if (window.navigator.simulator === true)
        {
            // Running in Simulator, so can NOT use TouchID.
            if (rememberMe === "true")
            {
                email = localStorage.getItem("Email");
                password = localStorage.getItem("Password");

                $("#email").val(email);
                $("#password").val(password);
                $("#rememberme").data("kendoMobileSwitch").check(true);
            }
        }
        else if (window.plugins === undefined || window.plugins.touchid === undefined)
        {
            // Plugin NOT found, so can NOT use TouchID.
            if (rememberMe === "true")
            {
                email = localStorage.getItem("Email");
                password = localStorage.getItem("Password");

                $("#email").val(email);
                $("#password").val(password);
                $("#rememberme").data("kendoMobileSwitch").check(true);
            }
        }
        else
        {
            // Using TouchID.
            window.plugins.touchid.verifyFingerprint
            (
                // The message shown in the fingerprint window.
                'Log on to view legislator information',
                // success callback, invoked when the users input was accepted
                function (msg)
                {
                    email = localStorage.getItem("Email");
                    password = localStorage.getItem("Password");

                    submitLoginRequest(email, password);
                },
                // error callback, invoked when there was no match,
                // essentially meaning the dialog was closed by pressing 'cancel'
                function (msg)
                {
                    if (rememberMe === "true")
                    {
                        email = localStorage.getItem("Email");
                        password = localStorage.getItem("Password");

                        $("#email").val(email);
                        $("#password").val(password);
                        $("#rememberme").data("kendoMobileSwitch").check(true);
                    }
                }
            );
        }
    }
    else
    {
        if (rememberMe === "true")
        {
            email = localStorage.getItem("Email");
            password = localStorage.getItem("Password");

            $("#email").val(email);
            $("#password").val(password);
            $("#rememberme").data("kendoMobileSwitch").check(true);
        }
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

        if (rememberme.check())
        {
            // Update email & password in local storage, in case of update.
            localStorage.setItem("Email", email);
            localStorage.setItem("Password", password);
        }

        submitLoginRequest(email, password);
    }
}

function submitLoginRequest(email, password)
{
    var $msg = $("#login-message");
    
    if (window.navigator.simulator !== true)
    {
        if (window.plugins.spinnerDialog !== undefined)
        {
            window.plugins.spinnerDialog.show();
        }
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
                    
                    var useTouchId = localStorage.getItem("UseTouchId");

                    if (useTouchId === undefined || useTouchId === null || useTouchId ==="" || useTouchId === "false")
                    {
                        if (confirm("Would you like to use the fingerprint scanner to log on in the future?"))
                        {
                            localStorage.setItem("UseTouchId", "true");
                        }
                        else
                        {
                            localStorage.setItem("UseTouchId", "false");
                        }
                    }

                    app.navigate("views/legislators.html");
                }
                else
                {
                    if (window.navigator.simulator !== true)
                    {
                        if (window.plugins !== undefined && window.plugins.spinnerDialog !== undefined)
                        {
                            window.plugins.spinnerDialog.hide();
                        }
                    }

                    $msg.html("<br />ERROR: \"Unauthorized user account.\"").show();
                }
            }
            else
            {
                if (window.navigator.simulator !== true)
                {
                    if (window.plugins !== undefined && window.plugins.spinnerDialog !== undefined)
                    {
                        window.plugins.spinnerDialog.hide();
                    }
                }

                $msg.html("<br />ERROR: \"Null access token returned.\"").show();
            }
        },
        error: function (xhr, status, error)
        {
            if (window.navigator.simulator !== true)
            {
                if (window.plugins !== undefined && window.plugins.spinnerDialog !== undefined)
                {
                    window.plugins.spinnerDialog.hide();
                }
            }

            $msg.html("<br />ERROR: " + xhr.responseText).show();
        }
    });
}

function loginRememberMeSwitchChange(e)
{
    if (e.checked)
    {
        var email = $("#email").val();
        var password = $("#password").val();

        localStorage.setItem("RememberMe", "true");
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
    }
    else
    {
        localStorage.setItem("UseTouchId", "false");
        localStorage.setItem("RememberMe", "false");
        localStorage.setItem("Email", null);
        localStorage.setItem("Password", null);
    }
}