/*
=================== 
## Global functions
1. Structuring with bootstrap classes
2. Global Changes
3. Job Board Design
4. Plugin calls
5. Supporting function
6. Click Methods & related function calls
7. Ajax Feeds
8. System pages changes
9. News page changes
*/

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Edge",
            identity: "MS Edge"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }, {
            string: navigator.userAgent,
            subString: "OPR",
            identity: "Opera"
        },

        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        }
    ]
};

BrowserDetect.init();
if (BrowserDetect.browser == 'MS Edge') {
    $('html').addClass('browser-edge');
}
if (BrowserDetect.browser == 'Explorer') {
    $('html').addClass('browser-MSIE');
    if (BrowserDetect.version <= 11) {
        $('html').addClass('version-IE-' + BrowserDetect.version);
    }
}

//set commas for the currency number
function formatPrice(num) {
    var amt = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return amt;
}

function shortPrice(amt){
    if( amt > 999 ){
        amt = Math.floor(amt / 1000);
        if( amt > 999 ){
            amt = Math.floor(amt / 1000);
            amt += "m";
        }else{
            amt += "k";
        }
    }
    return amt;
}

//get ramdom number
function randNum(){
    var d = new Date();
    return d.getDate() + '-' +Math.round(Math.random() * 10000);
}

//randomize
$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();
  
    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });
  
    return this;
};

function afterPostback(){
    var currentPage = window.location.pathname.toLowerCase();
        //dashboard page
        if( currentPage.indexOf('member/default.aspx') > -1 ){
            $('.db_section-header h2:contains(Saved Jobs)').html('<span>Saved</span><br><span>Jobs</span>');
            $('.db_section-header h2:contains(Job Application)').html('<span>Application</span><br><span>Tracker</span>');
            $('.db_section-header h2:contains(Favourite)').html('<span>Favourite</span><br><span>Searches & Alerts</span>');
            $('.switch-label').attr('data-on','On').data('data-off','Off');
        }
}
function fitFontSize(obj,refObj,parentObj){
    if( obj.width() > refObj.width() - 30 ){
        var wdiff = obj.width() - refObj.width() + 30;
        if( wdiff > 20 ){
            wdiff = 20;
        }
        var ftz = parseInt(obj.css('font-size'));
        ftz = ftz - (wdiff/2);
        parentObj.css('font-size',ftz);
        obj.addClass('txt-ellipsis');
    }
}
function checkEmpty(obj){
    if( obj== undefined || obj== null || obj=='' ){
        return false;
    }else{
        return true;
    }
}

//check and replace /(slash) or |(pipeline) with space on headings
function repSlashPipe(obj) {
    var newTitle = obj.replace(/[\/+|]/g, " $& ");
    return newTitle;
}

function wrapCustomSelect(obj){
    if ($(document).width() > 767) {
        obj.selectpicker({
            size: 5,
            selectOnTab: true,
            dropupAuto: false   
        });
    }else{
        if( !obj.parent().hasClass('select-on') ){
            obj.wrap('<div class="custom-select select-on"></div>');
        }
    }
}


!(function($) {
    var monthListShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthListFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //obj for profession id mapping with news category for the news lising query in job detail page
    var profMapNewsCat = {
        '3': '1884', //Finance & Law    - Accounting    
        '5': '1887', //Marketing, Media & The Arts  - Advert/Media
        '8': '1886', //Manufacturing, Transport & Logistics  - Automotive
        '10': '1884', //Finance & Law  - Banking & Finance
        '11': '1856', //Sales & Retail  - Sales
        '12': '1889', //Community Services & Government   - Community
        '14': '1858', //Engineering & Construction  - Construction
        '18': '1888', //Education  - Education
        '19': '1858', //Engineering & Construction - Engineering
        '21': '1889', //Community Services & Government  - Government Defence
        '23': '1857', //Health, Sport & Science  - Healthcare
        '24': '1855', //Hospitality & Tourism  - Hospitality
        '26': '1885', //IT & Technology   - IT
        '27': '1884', //Finance & Law  - Insurance
        '28': '1884', //Finance & Law  - Legal
        '30': '1886', //Manufacturing, Transport & Logistics  - Manufacturing
        '31': '1887', //Marketing, Media & The Arts  - Marketing 
        '33': '1890', //Farming & Primary Industry  - Mining
        '35': '1890', //Farming & Primary Industry  - Primary Industry
        '39': '1856', //Sales & Retail  - Retail & Fashion
        '41': '1856', //Sales & Retail  - Sales
        '48': '1857', //Health, Sport & Science - Science  
        '49': '1891', //Small Business & Startups  - Self Employment
        '51': '1886', //Manufacturing, Transport & Logistics - Transport shipping
        '52': '1889', //Community Services & Government  - Voluntering
    };
    //news: 235
    //inspiration: 237
    //opinion: 239



    // RSS feed publish date format
    function formatDate(pubDate) {
        //var dateObj = new Date(Date.parse(pubDate));
        var dateObj = pubDate.split('/'),
            mnth = monthListShort[parseInt(dateObj[1]) - 1],
            myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ",
            myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ",
            myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2] + "</span> ";
        return myDay + '<br>' + myMonth;
    }

    function formatDate2(pubDate) {

        var dateObj = '';
        var myDay, myMonth, myYear, mnth;
        dateObj = pubDate.trim().split('/');
        if (dateObj.length > 2) {
            mnth = monthListFull[parseInt(dateObj[1]) - 1];
            myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
            myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
            myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
        } else {
            return pubDate.trim();
        }
        return myDay + myMonth + ',' + ' ' + myYear;
    }

    //value passed as parameter is in date timestamp
    function formatDate3(dateObj) {
        var regex = /^\/Date\((\d+)(?:-(\d+))?\)\/$/;
        var timestamp = regex.exec(dateObj);
        var date = new Date(parseInt(timestamp[1]));
        return "<span class='rss-item-pubDate-date'>" + date.getDate() + "</span><span class='rss-item-pubDate-month'> " + monthListShort[date.getMonth()] + "</span>";
    }
    //value passed as parameter is in date timestamp
    function formatDate4(dateObj) {
        var regex = /^\/Date\((\d+)(?:-(\d+))?\)\/$/;
        var timestamp = regex.exec(dateObj);
        var date = new Date(parseInt(timestamp[1]));
        return "<span class='rss-item-pubDate-date'>" + date.getDate() + "</span><span class='rss-item-pubDate-month'> " + monthListFull[date.getMonth()] + "</span>, <span class='rss-item-pubDate-year'> " + date.getFullYear() + "</span>";
    }

    var domain = window.location.protocol + '//' + window.location.hostname;

    // jquery
    $(function() {

        $("form :input").each(function(index, elem) {
            var eId = $(elem).attr("id");
            var label = null;
            if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length == 1) {
                $(elem).attr("placeholder", $(label).text().replace(/  +/g, ''));
                //             $(label).remove();
            }
        });

        //search bar
        $("#job-dynamic-container").wrap("<div class='job-parent'></div>");
        // 1. Structuring with bootstrap classes
        // ========================================
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        // Content column
        if ($.trim($('#dynamic-side-left-container, #side-left').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-sm-8 col-md-8');
            $('#dynamic-side-left-container, #side-left').addClass('col-sm-4 col-md-4 hidden-xs hidden-sm');
        } else {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
            $('#dynamic-side-left-container, #side-left').addClass("hidden");
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');
        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');
        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

        $('.navbar .navbar-collapse > ul > li.dropdown > a.disabled').click(function(e) {
            e.preventDefault();
        });

        $('.navbar .navbar-collapse li a').focus(function(e) {
            $('.navbar .navbar-collapse li.dropdown').removeClass('focused');
            $(this).parents('.dropdown').addClass('focused');
        });

        $('a:not(.navbar .navbar-collapse li a)').focus(function(e) {
            $('.navbar .navbar-collapse li.dropdown').removeClass('focused');
        });
        $('.navbar .navbar-collapse li a').hover(function(e) {
            $('.navbar .navbar-collapse li.dropdown').removeClass('focused');
        });

        

        $('.navbar .navbar-collapse > ul > li > ul.dropdown-menu').each(function() {
            if ($(this).find('li').length > 10) {
                $(this).addClass('lg-menu');
            }
            // else if( $(this).find('li').length>5 ){
            //     $(this).addClass('md-menu');
            // }

        });
        
        // 2. Global Changes
        // ========================================
        // add placeholder for search widget text field
        $('#widget-search #keywords1, .innerbanner-search #keywords1, #footer-widget #keywords1').attr('placeholder', 'Job Title or Keyword...');
        $('#advanced_search-holder #keywords, #content #search-keyword input').attr('placeholder', 'Job Title, Keyword or Company');

        $('.jxt-salary-bands #txtSalaryLowerBand').attr('placeholder', 'Min.');
        $('.jxt-salary-bands #txtSalaryUpperBand').attr('placeholder', 'Max.');
        $('.jxt-salary-submit #ctl00_ContentPlaceHolderLeftNav_ucJobSearchFilter1_btnSalaryRefine').attr('value', 'Apply Salary');
        $('.jxt-salary-submit').prepend('<small class="help-block">Will include jobs where no min/max salary has been supplied</small>');

        //after salary search
        if( $('.search-query-filter-Salary').length ){
            $('.search-query-filter-Salary').parent().after('<small class="help-block">Includes jobs where no min/max salary has been supplied</small>');
        }
        
        // Adding a aria-label for accessabilty (Temp fix ONLY)
        $('#keywords1').attr('aria-label', 'Keyword search box');
        $('#professionID1').attr('aria-label', 'Professions');
        $('#locationID1').attr('aria-label', 'Locations');
        $('link[href*="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();
        var currentPage = window.location.pathname.toLowerCase();
        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();
        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }
        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $("li li.active").parent().parent().addClass("active");
        // add last-child class to navigation 
        $("#prefix_navigation > ul > li:last").addClass("last-child");
        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".button a").addClass("btn btn-default");
        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
            $("body").on('keypress',function(e){
                if ( 13 == e.which ){
                    $('#advanced_search-holder .mini-new-buttons').click();
                }
            });
        }
        else if( $('.job-ad-mini').length ){ //job detail page
            if( $('#job-advertiser-logo .img-holder img, #job-company-logo .img-holder img').length < 1 ){
                $('#job-advertiser-logo .img-holder, #job-company-logo .img-holder').addClass('no-image');
            }
            else if( $('#job-advertiser-logo .img-holder img, #job-company-logo .img-holder img').attr('src').trim() == ""  ){
                $('#job-advertiser-logo .img-holder, #job-company-logo .img-holder').addClass('no-image');
                $('#job-advertiser-logo .img-holder img, #job-company-logo .img-holder img').remove();

            }
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?search") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        else if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        else if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        // Contact - Google map
        $("#footer").prepend($("#contact-map"));
        // generate select navigation from sidebar Dynamic menu
        // $("#dynamic-content").convertNavigation({
        //     title: "Related Pages",
        //     links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        // });
        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        $('#side-drop-menu >li > a').click(function(e){
            e.preventDefault();
        });
        $('#AdvancedSearchFilter_PnlSalary a').click(function(){
           $('.jxt-salary-bands, .jxt-salary-submit').slideToggle('normal');
        });

        
    });

    $(document).ready(function() {
        
        if (window.location.pathname.toLowerCase().indexOf('/news/') >= 0 || window.location.pathname.toLowerCase().indexOf('/news.aspx') >= 0 || window.location.pathname.toLowerCase().indexOf('/salarysurvey') >= 0) {
            $('.navbar-nav li a[href="/news"]').parent().addClass('active').parents('li').addClass('active');
        }

        $('.select-category option[value="-1"]').text('What you do...');
        $('.select-location option[value="-1"]').text('Where...');
        $('.footer-selectinput').attr('placeholder', 'Job Title or Keyword...');

		if($("#jobsTable").length )
		{
			$("#jobsTable").footable();
		}
        // Equal Height 
        $.fn.eqHeights = function(options) {
            var defaults = {
                child: false
            };
            var options1 = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            var elmtns;
            if (options1.child && options1.child.length > 0) {
                elmtns = $(options1.child, this);
            } else {
                elmtns = $(this).children();
            }
            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {
                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });
            $(elements).height(max_height);
        };
        // Equal Height - Usage
        $('.service-holder').eqHeights();
        // 5. Supporting function
        // ========================================
        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        var pattern = new RegExp("[A-Za-z0-9]");
        if (pattern.test(window.location.hash)) {
            if ($(window.location.hash).length) {
                if ($(window.location.hash))
                    $("html, body").animate({
                        scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
                    }, 100);
            }
        }
        // 6. Click Methods & related function calls
        // ========================================
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function() {
            $(this).hide();
        });
        $(".boardy-GroupStatus-withMenu a").click(function() {
            $('.boardy-GroupStatus-btn').last().text('Employer');
        });
        $(".boardy-GroupStatus-withMenu .GroupStatus-logInBefore a").click(function() {
            $('.boardy-poptitle h2').text('Login as a');
        });
        $(".boardy-GroupStatus-withMenu .GroupStatus-registerBefore a").click(function() {
            $('.boardy-poptitle h2').text('Register as a');
        });
        
        // 8. System pages changes
        // ========================================
        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        // [Custom Upload]
        $("input:file:not(#CV-content input)").each(function() {
            $(this).wrap('<div class="custom-upload"><span class="lbl-upload"></span></div>');
            $(this).parent().append('<span class="cus-lbl">Choose file</span><span class="place-holder"></span>');
        });
        $("input:file").on("change", function() {
            $(this).parent('.lbl-upload').children('.place-holder').text($(this).val().replace(/C:\\fakepath\\/i, ''));
            
            // Alternate
            //$(this).parent('label').next(".upload-file").children('span').text($(this).val().split('\\').pop());
        });

        // Mobile & Tablet
        if ($(window).width() <= 767) {
            $('.navbar-fixed-top .navbar-collapse').addClass('fullht');
        } else if ($(window).width() <= 992) {
            $('body').on('click touchstart', function(event) {
                // if (!$(event.target).closest('.navbar-collapse').length) {
                //     if ($('.navbar-collapse').hasClass('in')) {
                //         $('.navbar-toggle').addClass('collapsed');
                //         $('.navbar-collapse').removeClass('in');
                //     }
                // }
                if (!$(event.target).is("#keywords1")) {
                    $("#keywords1").blur();
                }
            });
        }

        /*1-click homepage module*/
       if( $('.onetouch-jobbrowse').length ) {
            $('.onetouch-jobbrowse #tab-1').addClass('loading');
            //API call for job sectors & job location
            $.ajax({
                type: "GET",
                url: '/job/rss.aspx',
                dataType: "xml",
                error: function(request, type, errorThrown) {
                    console.log("<div>An error occurred. Please try again later. " + errorThrown + "</div>");
                    return;
                },
                success: function(xml) {
                    var outputText = "";
                    var repeatTag = "item";
                    var xmlCat = $(xml).find('profession');
                    var xmlLoc = $(xml).find('location');
                    var xmlWork = $(xml).find('worktype');
                    //get & sort profession idustries
                    xmlCat = xmlCat.find(repeatTag).sort(compare);
                    xmlCat.each(function(itemIndex) {
                        var xmlElement = $(this);
                        outputText += '<li><a href="/advancedsearch.aspx?search=1&professionid='+ xmlElement.find("id").text() +'">'+ xmlElement.find('label').text() +'<small class="job-count">('+ xmlElement.find('count').text() +')</small></a></li>';
                    });
                    $('.onetouch-jobbrowse #tab-1').removeClass('loading');
                    $('.onetouch-jobbrowse #tab-1 ul').html(outputText);
                    //get & sort location
                    outputText ="";
                    xmlLoc = xmlLoc.find(repeatTag).sort(compare);
                    xmlLoc.each(function(itemIndex) {
                        var xmlElement = $(this);
                        outputText += '<li><a href="/advancedsearch.aspx?search=1&locationid='+ xmlElement.find("id").text() +'">'+ xmlElement.find('label').text() +'<small class="job-count">('+ xmlElement.find('count').text() +')</small></a></li>';
                    });
                    $('.onetouch-jobbrowse #tab-2 ul').html(outputText);
                    //getting total jobs on the basis of worktype
                    var totalJob = 0;
                    var partTimeJob = 0;
                    xmlWork.find(repeatTag).each(function (itemIndex) {
                        var xmlElement = $(this);
                        totalJob += parseInt(xmlElement.find('count').text());
                        if (xmlElement.find('label').text().toLowerCase() == 'part time') {
                            partTimeJob += parseInt(xmlElement.find('count').text());
                        }
                    });
                    $('.onetouch-jobbrowse .count-num').text(totalJob);
                    $('.onetouch-jobbrowse .link-wrap .ptjob .job-count').text('(' + partTimeJob + ')');
                    //setting height for all tabs except career hub
                    $('.tab-pane-wrap').each( function(){
                        if($(this).parent().attr('id') == 'tab-1' || $(this).parent().attr('id') == 'tab-2') {
                            if( $(this).find('ul').height() < 200 ){
                                $(this).css('height','auto');
                                $(this).parent().find('.toggle-btn').addClass('hidden');
                            }else{
                                $(this).removeAttr('style');
                                $(this).parent().find('.toggle-btn').removeClass('hidden');
                            }
                        }
                    });
                }
            }); 
            //API call for populare searches
            $.ajax({
                type: "GET",
                url: '/job/ajaxcalls/ajaxMethods.asmx/GetPopularSearchkeywordJson',
                dataType: "json",
                error: function(request, type, errorThrown) {
                    $('.onetouch-jobbrowse #tab-3 ul').html("<div>An error occurred. Please try again later. " + errorThrown + "</div>");
                    return;
                },
                success: function(data) {
                    data.sort(function(a, b){
                        var a1= a.KeyWord.toLowerCase(), b1= b.KeyWord.toLowerCase();
                        if(a1== b1) return 0;
                        return a1> b1? 1: -1;
                    });
                    outputText ="";
                    var nmbrOfRecs = 1;
                    $.each(data, function(index, element) {
                        if(element.Total_Job > 0) {
                            outputText += '<li><a href="/advancedsearch.aspx?search=1&keywords='+ element.KeyWord +'">'+ element.KeyWord +'<small class="job-count">('+ element.Total_Job +')</small></a></li>';
                            if(nmbrOfRecs >= 30) {
                                return false;
                            }
                            nmbrOfRecs++;
                        }
                    });
                    $('.onetouch-jobbrowse #tab-3 ul').html(outputText);
                    //setting height for all tabs except career hub
                    $('.tab-pane-wrap').each( function(){
                        if($(this).parent().attr('id') == 'tab-3') {
                            if( $(this).find('ul').height() < 200 ){
                                $(this).css('height','auto');
                                $(this).parent().find('.toggle-btn').addClass('hidden');
                            }else{
                                $(this).removeAttr('style');
                                $(this).parent().find('.toggle-btn').removeClass('hidden');
                            }
                        }
                    });
                }
            }); 
            //API call for career hub articles
            $.ajax({
                type: "GET",
                url: '/job/ajaxcalls/ajaxMethods.asmx/GetNumberOfNewsByCategoryJson',
                dataType: "json",
                error: function(request, type, errorThrown) {
                    $('.onetouch-jobbrowse #tab-4 ul').html("<div>An error occurred. Please try again later. " + errorThrown + "</div>");
                    return;
                },
                success: function(data) {
                    data.sort(function(a, b){
                        var a1= a.NewsCategoryName.toLowerCase(), b1= b.NewsCategoryName.toLowerCase();
                        if(a1== b1) return 0;
                        return a1> b1? 1: -1;
                    });
                    outputText = "";
                    $.each(data, function(index, element) {
                        if(element.PageFriendlyName != "career-advice") {
                            var page_slug = element.PageFriendlyName;
                            if(page_slug == "finance-and-law") {
                                page_slug = page_slug.replace('finance-and-law','finance-law-corporate');
                            }
                            if(page_slug == "health-sport-and-science") {
                                page_slug = page_slug.replace('health-sport-and-science','health-sport-science');
                            }
                            var total_nmbr_of_articles = element.Total_Posted;
                            if(element.NewsCategoryID == 1889 || element.NewsCategoryID == 1884 ||element.NewsCategoryID == 1857) {
                                //total_nmbr_of_articles = total_nmbr_of_articles - 1;      
                            }
                            outputText += '<li><a href="/'+ page_slug +'">'+ element.NewsCategoryName +'<small class="job-count">('+ total_nmbr_of_articles +' articles)</small></a></li>';
                        }
                    });
                    $('.onetouch-jobbrowse #tab-4 ul').html(outputText);
                    //setting height for all tabs except career hub
                    $('.tab-pane-wrap').each( function(){
                        if($(this).parent().attr('id') == 'tab-4') {
                            //for career hub tab only
                            $(this).parent().addClass('expand');
                        }
                    });
                }
            });
            //API call for entry level keywords count
            $.ajax({
                type: "GET",
                url: '/job/rss.aspx?keywords=entry%20level',
                dataType: "xml",
                error: function(request, type, errorThrown) {
                    console.log("<div>An error occurred. Please try again later. " + errorThrown + "</div>");
                    return;
                },
                success: function(xml) {
                    var entryLevelXML = $(xml).find("worktype");
                    var TotalEntryLevelJobs = 0;
                    var entryLevelXMLItem = $(entryLevelXML).find("item");
                    entryLevelXMLItem.each(function(index, element) {
                        var jobCount = parseInt($(this).find('count').text()) || 0;
                        TotalEntryLevelJobs = TotalEntryLevelJobs + parseInt(jobCount);
                    });
                    $('.onetouch-jobbrowse .link-wrap .eljob .job-count').text('(' + TotalEntryLevelJobs + ')');
                }
            });
            //View more/view less toggle button 
            $('.onetouch-jobbrowse .toggle-btn').click(function (e) {
                $(this).parent().toggleClass('expand');
                if ($(this).parent().hasClass('expand')) {
                    $(this).text('View less');
                } else {
                    $(this).text('View more');
                   if (window.innerWidth < 480) {
                        var navDivHeight = document.getElementById("Top-nav-sticky").offsetHeight;
                        navDivHeight = navDivHeight + 35;
                        $('html,body').animate({
                            scrollTop: $(this).parent('.active').offset().top - navDivHeight
                        }, 1000);
                    }
                }
            });
            //tab controls: multi tab head control in mobile
            function setTabs(){
                var t = $('.top-tab li.active').index();
                $('.top-tab li:lt('+ t +')').removeClass('hidden-xs');
                $('.top-tab li:eq('+ t +')').removeClass('hidden-xs');
                $('.top-tab li:gt('+ t +')').addClass('hidden-xs');
                 var s = $('.mobile-tab li.active').index();
                $('.mobile-tab li:lt('+ s +')').addClass('hidden-xs');
                $('.mobile-tab li:eq('+ s +')').removeClass('hidden-xs');
                $('.mobile-tab li:gt('+ s +')').removeClass('hidden-xs');
                
            }
            if( $('.mobile-tab').length ){
                setTabs();
                $('.onetouch-jobbrowse .nav-tabs li a').on('shown.bs.tab', function(e) {
                    var t = e.target.attributes['href'].value;
                    $('.onetouch-jobbrowse .nav-tabs li').removeClass('active');
                    $('.onetouch-jobbrowse .nav-tabs').find('a[href="'+ t +'"]').parent().addClass('active');
                    setTabs();
                });
                $('.onetouch-jobbrowse .nav-tabs li a').on('click', function(e){
                    $("#tab-1").addClass('fade');
                    $("#tab-2").addClass('fade');
                    $("#tab-3").addClass('fade');
                    $("#tab-4").addClass('fade');
                     if( $(this).parent().hasClass('active') ){
                        e.stopPropagation(); 
                        e.stopImmediatePropagation();
                        e.stopPropagation();
                        e.preventDefault();
                        var t = e.target.attributes['href'].value;
                        $(this).parent().removeClass('active');
                        $(t).removeClass('active in');
                        if($(this).attr('href') == '#tab-4') {
                            $('.onetouch-jobbrowse .tab-content').css('padding-bottom','5px');
                        }
                        else {
                            $('.onetouch-jobbrowse .tab-content').css('margin-bottom','32px');
                        }
                        return false;
                    }else{
                        $('.onetouch-jobbrowse .tab-content').removeAttr('style');
                    }
                    //setting smooth scroll on tab click
                    if (window.innerWidth < 480) {
                        var navDivHeight = document.getElementById("Top-nav-sticky").offsetHeight;
                        navDivHeight = navDivHeight + 35;
                        $('html,body').animate({
                            scrollTop: 390
                        }, 1000);
                    }
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).tab('show');
                    //return false;
                });
            }
        }
        function compare(a,b) {
            if ($(a).find('label').text() < $(b).find('label').text())
              return -1;
            if ($(a).find('label').text() > $(b).find('label').text())
              return 1;
            return 0;
        } 
        /*1-click homepage module*/

        // Custom Function
        CustomFunction();
       
        function limitString(str, len) {
            var strLen = str.length;
            if (strLen > len + 5) {
                str = str.substr(0, len) + '...';
            }
            return str;
        }

        function checkStrLen(obj, len) {
            var objLen = obj.length;
            if ($(window).width() > 479 && $(window).width() < 768) {
                len = len * 1.5;
            }
            if (objLen > len + 5) {
                return 'ellipsis';
            } else {
                return '';
            }
        }

        function checkEllipsis(obj) {
            if (obj.height() > obj.parent().height() + 5) {
                obj.addClass('ellipsis');
            } else {
                obj.removeClass('ellipsis');
            }
        }

        function updateSaveJob(jobObj){
            $.ajax({
                type: "POST",
                async: true,
                url: domain + "/jxtmethods.asmx/GetSavedJobs",                
                success: function (msg) {
                    var result = $.parseJSON(msg);
                    //console.log(result);
                    var saveValue = $.parseJSON(result.Data[0].Value); 
                    jobObj.find('.job-block').each( function(){
                        var curJobItem = $(this);
                        var curJobId = curJobItem.data('jobid');
                        if( saveValue.length ){
                            $.each(saveValue, function (j, param){
                                if( param.JobId == curJobId ){
                                    $('.job-block[data-jobid="'+ curJobId +'"]').addClass('savedJob').removeClass('notSavedJob');
                                    $('.job-block[data-jobid="'+ curJobId +'"] .job-fav a').attr('title','Unsave this job');
                                }
                            });
                        }
                    });
                    
                }
            });
        }
        
        function getJobs(queryString, jobObj) {
            if (queryString != undefined && jobObj != undefined) {
                jobObj.addClass('loading');
                $.ajax({
                    type: "GET",
                    cache: true,
                    url: domain + "/jobsfeed.aspx" + queryString,
                    dataType: "json",
                    contentType: "application/json",
                    success: function(result) {
                            //console.log(result);
                            if (jobObj.hasClass('slick-initialized') && result != "Jobs Not Found") {
                                jobObj.slick('unslick');
                            }
                            if (result != "Jobs Not Found") {
                                var lenTitleCls = '';
                                $.each(result, function(i, item) {
                                    var jTitle = item.JobName,
                                        advertName = item.AdvertiserName,
                                        advertLogo = '',
                                        styAutoSize = '',
                                        jLink = item.JobFriendlyName + '/' + item.JobId,
                                        jCat = item.SiteProfessionName,
                                        jCatId = item.ProfessionId,
                                        jRole = item.SiteRoleName,
                                        jDatePost = item.DatePosted,
                                        jDesc = '',
                                        jBullet1 = item.BulletPoint1,
                                        jBullet2 = item.BulletPoint2,
                                        jBullet3 = item.BulletPoint3,
                                        jShowSalaryRange = item.ShowSalaryRange,
                                        jSalary = item.SalaryText,
                                        salType = item.SalaryTypeId,
                                        salUB = item.SalaryUpperBand,
                                        salLB = item.SalaryLowerBand,
                                        jWorkType = item.WorkTypeName,
                                        jCountry = item.CountryName,
                                        jLocation = item.LocationName,
                                        jArea = item.AreaName,
                                        jAddress = item.Address,
                                        jMoreLink = item.BreadCrumbNavigation;

                                    //logo empty check
                                    if( item.AdvertiserJobTemplateLogo !='' ){
                                        advertLogo = domain + item.AdvertiserJobTemplateLogo;
                                        styAutoSize = 'background-size:auto';
                                    }
                                    else if (item.AdvertiserLogo != '') {
                                        advertLogo = domain + item.AdvertiserLogo;
                                        styAutoSize = 'background-size:auto';
                                    } else {
                                        advertLogo = '/media/yudu-site/images/job-placeholder.jpg';
                                    }

                                    //concatinating area and location
                                    if (jArea != '') {
                                        jLocation = jArea + ', ' + jLocation;
                                    }

                                    //limiting job title                                        
                                    //jTitle = limitString(jTitle,30);
                                    //lenTitleCls = checkStrLen(jTitle, 30);

                                    //get bullet points
                                    if (jBullet1 != '' || jBullet2 != '' || jBullet3 != '') {
                                        jDesc = '<ul>';
                                        if (jBullet1 != '') {
                                            jBullet1 = limitString(jBullet1, 42);
                                            jDesc += '<li>' + jBullet1 + '</li>';
                                        }
                                        if (jBullet2 != '') {
                                            jBullet2 = limitString(jBullet2, 42);
                                            jDesc += '<li>' + jBullet2 + '</li>';
                                        }
                                        if (jBullet3 != '') {
                                            jBullet3 = limitString(jBullet3, 42);
                                            jDesc += '<li>' + jBullet3 + '</li>';
                                        }
                                        jDesc += '</ul>';
                                    } else {
                                        jDesc = '<p>' + item.Description + '</p>';
                                        //description length limiting
                                        // var jobDescLen = jDesc.length;
                                        // if (jobDescLen > 180) {
                                        //     jDesc = jDesc.substr(0, 170) + '...';
                                        // }
                                        //jDesc = limitString(jDesc, 120);
                                    }

                                    //assuming annual salary will always be greater than 9k
                                    var unit = 'per year';

                                    salLB = shortPrice(salLB);
                                    salUB = shortPrice(salUB);
                                   
                                    if (salType != 1) {
                                        unit = 'per hour';
                                    }
                                    var hideSalaryCls = '';
                                    var nosalaryFlagCls = '';
                                    if (jShowSalaryRange == false) {
                                        hideSalaryCls = 'hidden';
                                    }else{
                                        nosalaryFlagCls = ' fit';
                                    }

                                    //formatting date
                                    var jdate = formatDate3(jDatePost);

                                    //more jobs link    
                                    jMoreLink = $(jMoreLink)[2].href;
                                    var saveJobOnclick = "aSaveJob" + item.JobId;
                                    ///member/mysavedjobs.aspx?id=" + item.JobId + "
                                    //<a href='#' onclick='return SaveJob(this, &#39;"+ saveJobOnclick +"&#39;," + item.JobId + ");' class='favourite hover "+ saveJobOnclick +"' title='Save this job for later'>

                                    var jobTemp = "<div class='job-block notSavedJob' data-jobid='"+ item.JobId +"'><div class='jobbg'><a href='" + jLink + "' title='" + jTitle + "' class='imgwrap'><img src='"+ advertLogo +"' alt='"+ jTitle +"'></a><div class='job-fav'><a href='#" + item.JobId + "' class='favourite hover " + saveJobOnclick + "' title='Save this job for later' rel='nofollow'><i class='fa fa-heart'></i></a></div></div><div class='jobcontent'><p><a href='" + jLink + "' title='Job under " + jCat + "'>" + jCat + "</a></p><div class='data-content'><div class='job-title'><h3><a href='" + jLink + "' title='" + jTitle + "' class='" + lenTitleCls + "'>" + jTitle + "</a></h3><div>" + advertName + "</div></div><div class='jobdate'><span>Posted</span>" + jdate + "</div></div><div class='job-desc'>" + jDesc + "</div></div><div class='jobcontent-footer'><div class='job-location"+ nosalaryFlagCls +"'><span class='jobloc'>" + jLocation + "</span><span class='jobwork'>" + jWorkType + "</span></div><div class='job-salary "+ hideSalaryCls +"'><span class='sal-amt sal_lb'>" + salLB + "</span> - <span class='sal-amt sal_ub'>" + salUB + "<br>" + unit + "</span></div></div><p><a href='" + jMoreLink + "' title='FIND MORE LIKE THIS'><i class='fa fa-search'></i>FIND MORE LIKE THIS</a></p></div>";

                                    jobObj.append(jobTemp);

                                });


                                //adding the carousel
                                if (jobObj.find('.job-block').length) {
                                    $(".count-slides").show();

                                    //check for the save job
                                    //first check if member is logged in
                                    if( $('#miniMemberLoggedIn').length ){
                                        
                                        updateSaveJob(jobObj);

                                    }
                                }
                                if (jobObj.find('.job-block').length > 1) {
                                    jobObj.removeClass("autoslide");
                                    //console.log($(this));
                                      
                                    // randomize the slides and then call slick
                                    jobObj.randomize('.job-block');

                                    jobObj.on('init', function(event, slick) {
                                        $(".count-slides .current-slide").text(1);
                                        $(".count-slides .total-slides").text(slick.$slides.length);
                                    });

                                    jobObj.slick({
                                        slidesToShow: 3,
                                        slidesToScroll: 1,
                                        //  asNavFor: '.slider-for',
                                        dots: true,
                                        centerMode: true,
                                        arrows: true,
                                        focusOnSelect: true,
                                        centerPadding: '91px',
                                        autoplay: true,
                                        autoplaySpeed: 4000,
                                        prevArrow: '<button onclick="TJgtagPush(\'left-arrow-click\');" class="slick-prev slick-arrow" aria-label="Previous Job" type="button" style="display: block;">Previous Job</button>',
                                        nextArrow: '<button onclick="TJgtagPush(\'right-arrow-click\');" class="slick-next slick-arrow" aria-label="Next Job" type="button" style="display: block;">Next Job</button>',
                                        // infinite: false,
                                        responsive: [{
                                            breakpoint: 1500,
                                            settings: {
                                                centerMode: true,
                                                centerPadding: '35px',
                                                slidesToShow: 3,
                                            }
                                        }, {
                                            breakpoint: 1200,
                                            settings: {
                                                centerMode: true,
                                                centerPadding: '35px',
                                                slidesToShow: 3,
                                            }
                                        }, {
                                            breakpoint: 1026,
                                            settings: {
                                                centerMode: false,
                                                centerPadding: 0,
                                                slidesToShow: 3,
                                            }
                                        }, {
                                            breakpoint: 992,
                                            settings: {
                                                centerMode: true,
                                                centerPadding: '20px',
                                                slidesToShow: 2,
                                            }
                                        }, 
                                        {
                                            breakpoint: 768,
                                            settings: {
                                                centerMode: true,
                                                centerPadding: '27px',
                                                slidesToShow: 2
                                            }
                                        }, 
                                        {
                                            breakpoint: 600,
                                            settings: {
                                                centerMode: true,
                                                centerPadding: '27px',
                                                slidesToShow: 1,
                                            }
                                        }]
                                    });

                                    jobObj.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                                        $(".count-slides .current-slide").text(nextSlide + 1);
                                        $(".count-slides .total-slides").text(slick.$slides.length);
                                    });

                                    jobObj.find('.job-block').each(function() {
                                        var jobTitle = $(this).find('.job-title h3 a');
                                        var jobDescription = $(this).find('.job-desc p');
                                        checkEllipsis(jobTitle);
                                        checkEllipsis(jobDescription);
                                         $(this).click( function(e) {
                                            var str_info = $(this).find('.jobcontent p a').attr('href');
                                            if(str_info) {
                                                var arr_info = str_info.split('/');
                                                TJgtagPush('listing click',arr_info[1],arr_info[2],arr_info[3]);
                                            }
                                            else {
                                                TJgtagPush('listing click');
                                            }
                                        });
                                    });
                                    
                                    $(".job-title h3 a").each(function (i) {
                                        len = $(this).text().length;
                                        if (len > 40) {
                                            $(this).text($(this).text().substr(0, 40) + '...');
                                        }
                                    });

                                } else {
                                    jobObj.addClass("autoslide");
                                    if (parseInt($('.total-slides').text()) < 1) {
                                        $(".count-slides").hide();
                                    }
                                }
                            } else {
                                if (parseInt($('.total-slides').text()) < 1) {
                                    $(".count-slides").hide();
                                }
                            }
                            jobObj.removeClass('loading');
                        } //end of success
                });
            }
        }

        /*homepage job*/
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $('.home-job').remove();
            $('.jobcounter span strong').text($('#jobsearch-top .searchresult-number').text());
            $('#divFavSearchSave small:contains("search in Sydney"), #divCreateAlertSave small:contains("search in Sydney")').text('e.g. Accounting job search in Auckland');
        } else {
            // Job feed for homepage other pages which has data-string as filter query string value
            var topJob = $("#myJobsList");
            $("<span class='count-slides'><span class='current-slide'>0</span> of <span class='total-slides'>0</span></span>").insertAfter(topJob);
            var queryStrJob = topJob.data('string');
            if (queryStrJob == undefined) {
                queryStrJob = '?max=50';
            }

            // job feed for the Career hub pages
            //check if tag(based on global setting Career Types field)
            if (topJob.data('tag') != undefined && topJob.data('tag') != '') {
                var carrerTag = encodeURIComponent(topJob.data('tag'));
                queryStrJob = '?max=50&tags=' + carrerTag;

                getJobs(queryStrJob, topJob);
            }
            //check if category ids are present
            else if (topJob.data('catids') != undefined && topJob.data('catids') != '') {
                var catIdArr = [];
                var catIdLen = 0;
                if (topJob.data('catids').toString().indexOf(',') < 0) {
                    catIdArr[0] = topJob.data('catids');
                } else {
                    catIdArr = topJob.data('catids').toString().split(',');
                }

                for (var j = 0; j < catIdArr.length; j++) {

                    queryStrJob = '?professionid=' + catIdArr[j] + '&max=50&carouseltype=careerhub';

                    getJobs(queryStrJob, topJob);

                }
            } else {
                //For the news single pages
                if( $('.jxt-single-item').length ){
                    // var curCat = $('.jxt-news-item-category dd').text().trim();
                    // $('.jxt-news-filter-multiple li a:contains("'+ curCat + '")').addClass('active');
                    // var catVal = $('.jxt-news-filter-multiple li a:contains("'+ curCat + '")').prev('input').val();
                    // if( catVal!= undefined && catVal!='' ){
                    //    Object.keys(profMapNewsCat).forEach(function eachKey(key) { 
                            
                    //         if( profMapNewsCat[key] === catVal) {
                    //             curCat = key;
                    //             return false;
                    //         }
                    //     });
                    //     queryStrJob += '&professionid=' + curCat;
                    // }
                    queryStrJob = '?carouseltype=homepage&max=50';
                }else if( $('.jxt-news-container').length && $('.jxt-news-filter-multiple li a.active').length < 1 ){
                    //for news listing pages when not filtered
                    queryStrJob += '&carouseltype=homepage';
                }
                else if( $('#aspnetForm[action*="/?advertiserid="]').length || $('#aspnetForm[action*="/?companyid="]').length ){
                    var advertId = $('#aspnetForm').attr('action');
                    advertId = advertId.substr(advertId.indexOf('=') + 1, advertId.length);
                    queryStrJob += '&advertiserid=' + advertId;
                }

                if( !$('.jxt-single-item').length && $('.jxt-news-container').length && $('.jxt-news-filter-multiple li a.active').length ){
                    //do nothing
                }else{
                    getJobs(queryStrJob, topJob);
                }
 
            }

            //for category filter news listing pages
            if(  !$('.jxt-single-item').length && $('.jxt-news-container').length && $('.jxt-news-filter-multiple li a.active').length ){
                // var selPid ='';
                // var qStrJob = '';
                // var filteredCatTag = $('.jxt-news-filter-multiple li a.active');
                // if( filteredCatTag!= undefined && filteredCatTag.length ){
                //     filteredCatTag.each( function(){
                //         var cTag = $(this).text();
                //         if( cTag != ""){
                //             cTag = encodeURIComponent(cTag);
                //             qStrJob = '?max=50&tags=' + cTag;
                //             getJobs(qStrJob, topJob);
                //         }
                //     });                    
                // }
                qStrJob = '?max=50&carouseltype=homepage';
                getJobs(qStrJob, topJob);
            }
        }

        //save and unsave the job on its click event
        
        //for unsaving the saved job
        $('body').on('click', '.savedJob .job-fav a.favourite', function(e){
            e.preventDefault();
            //check if member is logged in
            if( $('#miniMemberLoggedIn').length ){
                var savedJobId = $(this).parents('.savedJob').data('jobid');
                $.ajax({
                    type: "POST",
                    async: true,
                    url: domain + "/jxtmethods.asmx/UnsaveJob",
                    data: {"jobid": savedJobId},
                    success: function (msg) {
                        var result = $.parseJSON(msg);
                        //console.log(result);
                        if( result.Success ){
                            $('.savedJob[data-jobid="'+ savedJobId +'"]').removeClass('savedJob').addClass('notSavedJob');
                            $('.notSavedJob[data-jobid="'+ savedJobId +'"] .job-fav a').attr('title','Save this job for later');
                            $('.notSavedJob[data-jobid="'+ savedJobId +'"]').append('<div class="save-notification">Job unsaved.</div>');
                            setTimeout( function(){
                                $('.save-notification').fadeOut('slow',function(){
                                    $(this).remove();
                                });
                            }, 2000);
                        }
                    }
                });
            }
        });

        //for saving the unsaved job
        $('body').on('click', '.notSavedJob .job-fav a.favourite', function(e){
            e.preventDefault();
            //check if member is logged in
            if( $('#miniMemberLoggedIn').length ){
                var notSavedJobId = $(this).parents('.notSavedJob').data('jobid');
                $.ajax({
                    type: "POST",
                    async: true,
                    url: domain + "/jxtmethods.asmx/SaveJob",
                    data: {"jobid": notSavedJobId},
                    success: function (msg) {
                        var result = $.parseJSON(msg);
                        //console.log(result);
                        if( result.Success ){
                            $('.notSavedJob[data-jobid="'+ notSavedJobId +'"]').removeClass('notSavedJob').addClass('savedJob');
                            $('.savedJob[data-jobid="'+ notSavedJobId +'"] .job-fav a').attr('title','Unsave this job');

                            $('.savedJob[data-jobid="'+ notSavedJobId +'"]').append('<div class="save-notification">Job saved.</div>');
                            setTimeout( function(){
                                $('.save-notification').fadeOut('slow', function(){
                                    $(this).remove();
                                });
                            }, 1000);
                        }
                    }
                });
            }else{
                $(this).parents('.job-block').append('<div class="save-notification">Please login to save this job.</div>');
                setTimeout( function(){
                    $('.save-notification').fadeOut('slow',function(){
                        $(this).remove();
                    });
                }, 3000);
            }
        });
        

        //preventing from scrolling whole page on scrolling fixed div element
        // $('body').on('mousewheel DOMMouseScroll', '.sbOptions', function(e) {
        //     var e0 = e.originalEvent;
        //     //var delta = e0.wheelDelta || -e0.detail;
        //     if (BrowserDetect.browser != 'Firefox') {
        //         var delta = e0.deltaY;
        //         //console.log(delta);
        //         this.scrollTop += (delta < 0 ? -1 : 1) * 10;
        //         e.preventDefault();
        //     }else{
        //         if( this.scrollTop == 0 && e0.detail == -1 ){
        //             e.preventDefault();
        //         }
        //     }
            
        // });

        //navigation show hide on scrolling
        var updated = 0,
            st;
            //mousewheel DOMMouseScroll touchmove touchstart
        $(window).on('scroll', function(e) {
            if( $(window).width() < 767 && e.originalEvent!= undefined){
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;

                // if( delta < 0 ){ //scrolling down
                //     $('#Top-nav-sticky').addClass('hideMenu');
                // }else{ //scrolling up
                //     $('#Top-nav-sticky').removeClass('hideMenu');
                // }
                e.stopPropagation();
                st = $(window).scrollTop();
                //console.log(st);
                //console.log($(window).scrollTop());
                if (st >= updated && st > 45) {
                    if( !$('#Top-nav-sticky').hasClass('hideMenu') ){
                        $('#Top-nav-sticky').addClass('hideMenu');
                    }
                } else {
                    $('#Top-nav-sticky').removeClass('hideMenu');
                }
                updated = st;
            }
        });

        $(window).scroll(function() {
            var sticky = $('#Top-nav-sticky'),
                scroll = $(window).scrollTop();
            if (scroll) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });
        /*------------ sticky header -----------*/
        if ($(".full-width-banner").length > 0) {
            $("#dynamic-container").parent().addClass('full-width-container');
        }
        if ($(".error-section").length > 0) {
            $("body").addClass('full-width-container');
        }

        if ($(".error-section").length > 0) {
            $("body").addClass('remove-error');
        }

        $('.banner-top').appendTo('.inner-banner .container');
        $('.service-listslide').slick({
            centerMode: true,
            centerPadding: '60px',
            dots: true,
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
        //adding-page title
        var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            $("body").addClass(pageTitle);
        }
        if( $('#blue-blank-template').length ){
            $('body').addClass('blue-blank-template');
        }

        if ($("body").hasClass('advancedsearch.aspx')) {
            $('body').addClass('advance-filter');

        } else if ($('.jxt-single-item').length) { //news article page
            $('body').addClass('news-single-page');
            var backNewsLink = $('.jobdetail-top a').last();
            backNewsLink.text('back to results');
            $('.jobdetail-top').html(backNewsLink);
            $('.jobdetail-top').prependTo($('#content-container'));
            $('.jxt-news-item-image').removeClass('hidden');

            var newsItem = $('.jxt-news-item'),
                newsDate = newsItem.find('.jxt-news-item-date-published'),
                newsAuthor = newsItem.find('.jxt-news-item-author'),
                newsSocial = newsItem.find('.jxt-news-item-share');

            newsItem.find('.jxt-news-item-title').after(newsAuthor);
            newsItem.find('.jxt-news-item-title').after(newsDate);

            var newNewsFormat = formatDate2(newsDate.find('dd span').text());
            newsDate.find('dd span').html(newNewsFormat);

            if ($('.jxt-news-item-image').length) {
                $('.jxt-news-item-image').after('<div class="news-meta"></div>');
            } else {
                $('.jxt-news-item-author').after('<div class="news-meta"></div>');
            }

            $('.news-meta').append(newsSocial);
            newsSocial.find('ul').addClass('footer-media');

            //news captions
            //for the featured image
            if ($('.jxt-news-item-image').length && newsItem.find('h6').length) {
                $('.news-meta').prepend(newsItem.find('h6').first());
            }
            //for the other image captions
            if (newsItem.find('img:not(#newsInnerThumbnailImage)').length) {
                newsItem.find('img:not(#newsInnerThumbnailImage)').each(function() {
                    var imgCaption = $(this).attr('longdesc');
                    if (imgCaption != undefined) {
                        $(this).after('<h6 class="imgCaption">' + imgCaption + '</h6>');
                    }
                });
            }

            //adding the email icon
            $('.jxt-news-item-share .fa-google-plus').parent().parent('li').hide();
            var emailBody = window.location.href;
            emailBody = encodeURIComponent(emailBody);
            $('.jxt-news-item-share ul').append('<li><a class="email-image" href="mailto:?subject=' + $(".jxt-news-item-title").text().trim() + '&body=' + emailBody + '"><i class="fa fa-envelope"></i></a></li>');



        } else if ($('.jxt-news-rss').length) { //news listing page
            $('body').addClass('news-result-page');
            $('.system-banner .container').html($('.jxt-news-container h1').first());
            $('.system-banner h1').html('<span>NEWS, ADVICE</span><br><span>&amp; MORE...</span>');
            $('.system-banner .container').append('<span class="subtitle">A point of view on what you do.</span>');


            $('.jxt-news-item').each(function() {
                var newsItem = $(this),
                    newsHead = newsItem.find('.jxt-news-item-title'),
                    newsCat = newsItem.find('.jxt-news-item-category'),
                    newsDate = newsItem.find('.jxt-news-item-date-published'),
                    newsLink = newsItem.find('.jxt-news-item-title a').attr('href');

                if (newsItem.hasClass('jxt-has-image')) {
                    var newsImg = newsItem.find('.jxt-news-item-image');
                    newsItem.prepend(newsImg);
                    newsImg.wrap('<a href="' + newsLink + '"></a>');
                }

                newsCat.insertBefore(newsHead);
                newsItem.find('.jxt-news-item-title').after(newsDate);

                var newNewsFormat = formatDate2(newsDate.find('dd span').text());
                newsDate.find('dd span').html(newNewsFormat);

            });

            $('.jxt-news-next').appendTo($('.jxt-news-pagination nav'));
        }

        //entire news pages
        if ($('.jxt-news-container').length) {
            $('.jxt-news-filter-container h2').html('<span>Refine your</span><br><span>search</span>');
            $('#tbKeywords').attr('placeholder', 'Search News');
            $('<div class="news-search"><a href="#refine" title="Keyword for news search" class="btn btn-primary">Search</a></div>').insertAfter($(".jxt-news-filter-input"));
            $('#jxt-news-filter-category-heading').text('Career Hubs');
            $('.jxt-news-search .button .btn').text('Refine your results');
            $('#jxt-news-filter-industry-heading').text('Collections');
            $('.jxt-news-filter-type').after($('.jxt-news-filter-industry'));

            $('.news-search .btn').click(function(e) {
                e.preventDefault();
                $('.jxt-news-search a').trigger('click');
            });

            //making career advice page active
            if( $('.jxt-news-item .jxt-news-item-category dd[itemprop="keywords"] a').first().text().trim().toLowerCase() == 'career advice' ){
                $('.navbar-nav li a[href*="'+ window.location.search +'"]').parent().addClass('active').parents('li').addClass('active');
            }

            //$('#jxt-news-filter-type-heading').text('Industries');
            // $('.jxt-news-filter-type').append('<span class="toggle-secHt">View <span class="cng-span">all</span> Industries</span>');
            // $('.toggle-secHt').click(function() {
            //     $(this).parent().toggleClass('open');
            //     if ($(this).parent().hasClass('open')) {
            //         $(this).find('.cng-span').text('less');
            //     } else {
            //         $(this).find('.cng-span').text('all');
            //     }
            // });


            //adding collapse toggle button for responsive
            $('.jxt-news-filter-container h2').after($('<span class="toggle-sidebar visible-xs visible-sm">Open</span>'));
            $('.toggle-sidebar').click(function() {
                $('.jxt-news-filter-refinements').slideToggle('fast');
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).text('Close');
                } else {
                    $(this).text('Open');
                }
            });

            //getting the ad block & career tool block from footer
            $('.home-job').removeClass('hidden');
            $('.ad-sec, .widget-block').removeClass('hidden');
            if ($(window).width() > 991) {
                $('.ad-sec, .widget-block').appendTo($('#side-left'));
            } else {
                $('.ad-sec, .widget-block').appendTo($('.content-holder'));
            }

            //collapsing the refine block
            $('.jxt-news-filter-refinements h3').click(function() {
                $(this).parent().find('.jxt-news-filter-options').slideToggle();
                $(this).toggleClass('collapsed');
                $(this).closest('.jxt-news-filter').toggleClass('collapsed');
            });

            //disabling the prev & next button if current page is first or last page resp.
            if( $('.jxt-news-pagination').length ){
                //removing the empty li first
                $('.jxt-news-pagination li').each( function(){
                    if( $(this).text().trim() == '' ){
                        $(this).remove();
                    }
                });
                //for the first page
                if( $('.jxt-news-pagination li').first().hasClass('active') ){
                    $('.jxt-news-pagination a.jxt-news-previous').attr('disabled',true).removeAttr('href');
                }
                //for the last page
                if( $('.jxt-news-pagination li').last().hasClass('active') ){
                    $('.jxt-news-pagination a.jxt-news-next').attr('disabled',true).removeAttr('href');
                }
            }

        } else if ($('#side-left').length) {
            //getting the ad block & career tool block from footer
            $('.ad-sec, .widget-block').removeClass('hidden');

            if ($(window).width() > 1025) {
                $('.ad-sec, .widget-block').prependTo($('#side-left .leftnavigate'));
            } else {
                $('.ad-sec, .widget-block').appendTo($('.content-holder, .border-container'));
            }
        }

        if ($(".jxt-news-container").length > 0) {
            if (window.innerWidth < 992) {
                $('.ad-sec, .widget-block').appendTo($('.content-holder'));
            } else {
                $('.ad-sec, .widget-block').appendTo($('#side-left'));
            }
        }

        /*changing job page  headingd*/
        //$('#AdvancedSearchFilter_PnlClassification a:first').text('Sub-classification');
        $('a:contains("Create As Alert")').text("Create as an Alert");
        // $("#AdvancedSearchFilter_PnlClassification").append("<a class='title-top' href='#' class='jobleft-link'>view all sub-categories</a>");
        $("<div class='jobtype-search'></div>").insertAfter("#side-left #hfCurrency");
        $("<h2 class='left-head'><span>REFINE YOUR </span><br><span>JOB SEARCH</span><span class='cta-open-search'>OPEN SEARCH</span></h2>").insertAfter(".jobtype-search");
        $("#side-drop-menu").prepend("<li id='AdvancedSearchFilter_PnlKeywords'><h4 href='#'>KEYWORDS</h4><div class='jxt-keywords-input'><input type='text' id='sidebar-keyword-box' class='form-textbox form-control' placeholder='Job Title or Keyword…'><input type='submit' value='FIND' id='btn-find-keywords' class='mini-find-buttons'></div></li>");

        $(".favourite-search-button").appendTo(".jobtype-search");
        $(".create-alert-button").appendTo(".jobtype-search");
        /*left navigation news */

        if ($(".left-industry").length) {
            var newsBlock = $(".left-industry");
            var queryStrNews = '?max=3';

            //for the job detail page
            if ($('.job-ad-mini').length) {
                var pid = $('.pid-data').data('pid');
                if (pid != undefined && pid != '') {
                    queryStrNews += '&categories=' + profMapNewsCat[pid];
                }
                //splitting word with / or | if found within, to prevent being long word
                var jp = $('#job-ad-title span').text();
                jp = repSlashPipe(jp);
                $('#job-ad-title span').text(jp);
                
            }else if( document.URL.indexOf("/advancedsearch.aspx?") > -1 ){
                if( $('.search-query-filter-Classification').length && $('.job-breadcrumbs a').length && $('.job-breadcrumbs a').first().attr('href').indexOf('professionid=')>-1 ){
                    var pid2 = $('.job-breadcrumbs a').first().attr('href').split('professionid=')[1];
                    queryStrNews += '&categories=' + profMapNewsCat[pid2];
                }

                $('.search-query h3:contains("Annual Salary Salary")').text('Annual Salary');

                //removing the link from the pagination if disabled
                $('#tnt_pagination .disabled_tnt_pagination').removeAttr('href');
            }

            $('.left-industry').addClass('loading');
            $.ajax({
                type: "GET",
                cache: true,
                url: domain + "/newsfeed.aspx" + queryStrNews,
                dataType: "json",
                contentType: "application/json",
                success: function(result) {
                    if (result != "News Not Found") {
                        var newsFeedArr = result;
                        var nTitle, nImageURL, newsLink, categoryName, catLink, nDesc;
                        var newsTemp = '';
                        var lenTitleCls = '';

                        //bottom news list block
                        if (newsFeedArr.length > 0) {
                            for (var i = 0; i < newsFeedArr.length; i++) {

                                nTitle = newsFeedArr[i].Subject;
                                if (newsFeedArr[i].ImageURL != null) {
                                    nImageURL = newsFeedArr[i].ImageURL;
                                } else {
                                    nImageURL = '';
                                }
                                newsLink = '/news/' + newsFeedArr[i].PageFriendlyName + '/' + newsFeedArr[i].NewsId + '/';
                                categoryName = newsFeedArr[i].NewsCategoryName;
                                catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[i].NewsCategoryId;
                                nDesc = newsFeedArr[i].MetaDescription;
                                nDesc = nDesc != null ? nDesc : '';


                                //limiting job title
                                //nTitle = limitString(nTitle,80);
                                lenTitleCls = checkStrLen(nTitle, 80);

                                //description length limiting
                                nDesc = limitString(nDesc, 170);

                                newsTemp += "<div class='left-industrylist'><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3></div></div>";
                            }

                            $('.left-industry').html(newsTemp);


                        }
                    }
                    $('.left-industry').removeClass('loading');
                }
            });
        }

        var pid_AdvSearch = 0; //used for the news feed for advancedsearch result
        /* added */
        /*job page jobs*/
        /*bannerjob advanced search page job*/
        if ((document.URL.indexOf("/advancedsearch.aspx") <= 0)) {
            $('.banner-job').remove();
            /*  $('.jobcounter span strong').text($('#jobsearch-top .searchresult-number').text());*/
        } else {
            // Job feed for Advanced search result page only
            var topJob2 = $(".bannerjob-list");
            $("<span class='count-slides'><span class='current-slide'>0</span> of <span class='total-slides'>0</span></span>").insertBefore(topJob2);
            var queryStrJob = topJob2.data('string');
            if (queryStrJob == undefined) {
                queryStrJob = '?max=50&carouseltype=jobresults';
            }

            topJob2.addClass('loading');


            //getting the search criteria only in the advancedsearch result when filter applied
            $.ajax({
                type: "GET",
                cache: true,
                url: domain + "/jxtmethods.asmx/GetJobSearchValues",
                success: function(result) {
                    if (result) {
                        var jobSearchJson = $.parseJSON(result);
                        if (jobSearchJson.Success) {
                            var searchResults = jobSearchJson.Data[0].Text;
                            searchResults = $.parseJSON(searchResults);
                            $.each(searchResults, function(key, value) {
                                if (key == "Keywords" && value != "" && value != null) {
                                    queryStrJob += '&keywords=' + value;
                                } else if (key == "ProfessionID" && value != "" && value != null) {
                                    queryStrJob += '&professionid=' + value;
                                } else if (key == "RoleIDs" && value != "" && value != null) {
                                    queryStrJob += '&roleids=' + value;
                                } else if (key == "LocationID" && value != "" && value != null) {
                                    queryStrJob += '&locationid=' + value;
                                } else if (key == "AreaIDs" && value != "" && value != null) {
                                    queryStrJob += '&areaIDs=' + value;
                                } else if (key == "WorkTypeID" && value != "" && value != null) {
                                    queryStrJob += '&worktypeid=' + value;
                                } else if (key == "AdvertiserID" && value != "" && value != null) {
                                    queryStrJob += '&advertiserid=' + value;
                                } else if (key == "SalaryTypeID" && value != "" && value != null) {
                                    queryStrJob += '&salarytypeid=' + value;
                                } else if (key == "SalaryLowerBand" && value != "" && value != null) {
                                    queryStrJob += '&salarylowerband=' + value;
                                } else if (key == "SalaryUpperBand" && value != "" && value != null) {
                                    queryStrJob += '&salaryupperband=' + value;
                                }
                            });

                            //after getting the filtered parameter then run the ajax for jobfeed
                            $.ajax({
                                type: "GET",
                                cache: true,
                                url: domain + "/jobsfeed.aspx" + queryStrJob,
                                dataType: "json",
                                contentType: "application/json",
                                success: function(result) {
                                    //console.log(result);
                                    if (result != "Jobs Not Found") {
                                        var lenTitleCls = '';
                                        $.each(result, function(i, item) {
                                            var jTitle = item.JobName,
                                                advertName = item.AdvertiserName,
                                                jobTempLogoId = item.AdvertiserJobTemplateLogoId,
                                                advertLogo = '',
                                                styAutoSize = '',
                                                jLink = item.JobFriendlyName + '/' + item.JobId,
                                                jCat = item.SiteProfessionName,
                                                jCatId = item.ProfessionId,
                                                jRole = item.SiteRoleName,
                                                jDatePost = item.DatePosted,
                                                jDesc = '',
                                                jBullet1 = item.BulletPoint1,
                                                jBullet2 = item.BulletPoint2,
                                                jBullet3 = item.BulletPoint3,
                                                jShowSalaryRange = item.ShowSalaryRange,
                                                jSalary = item.SalaryText,
                                                salType = item.SalaryTypeId,
                                                salUB = item.SalaryUpperBand,
                                                salLB = item.SalaryLowerBand,
                                                jWorkType = item.WorkTypeName,
                                                jCountry = item.CountryName,
                                                jLocation = item.LocationName,
                                                jArea = item.AreaName,
                                                jAddress = item.Address,
                                                jMoreLink = item.BreadCrumbNavigation;

                                            //logo empty check
                                            if (item.AdvertiserJobTemplateLogo != '') {
                                                advertLogo = domain + item.AdvertiserJobTemplateLogo ;
                                            }
                                            else if (item.AdvertiserLogo != '') {
                                                advertLogo = domain + item.AdvertiserLogo;
                                                //styAutoSize = 'background-size:100% auto';
                                            } else {
                                                advertLogo = '/media/yudu-site/images/job-placeholder.jpg';
                                            }

                                            if (jArea != '') {
                                                jLocation = jArea + ', ' + jLocation;
                                            }

                                            //limiting job title                                        
                                            //jTitle = limitString(jTitle,30);
                                            if ($(window).width() > 1199) {
                                                //lenTitleCls = checkStrLen(jTitle, 50);
                                            } else {
                                                //lenTitleCls = checkStrLen(jTitle, 30);
                                            }
 

                                            //get bullet points
                                            if (jBullet1 != '' || jBullet2 != '' || jBullet3 != '') {
                                                jDesc = '<ul>';
                                                if (jBullet1 != '') {
                                                    //jBullet1 = limitString(jBullet1, 50);
                                                    jDesc += '<li>' + jBullet1 + '</li>';
                                                }
                                                if (jBullet2 != '') {
                                                    //jBullet2 = limitString(jBullet2, 50);
                                                    jDesc += '<li>' + jBullet2 + '</li>';
                                                }
                                                if (jBullet3 != '') {
                                                    //jBullet3 = limitString(jBullet3, 50);
                                                    jDesc += '<li>' + jBullet3 + '</li>';
                                                }
                                                jDesc += '</ul>';
                                            } else { //else short description
                                                jDesc = '<p>' + item.Description + '</p>';
                                                //jDesc = limitString(jDesc, 120);
                                            }

                                            //assuming annual salary will always be greater than 9k
                                            var unit = 'per year';
                                            salLB = shortPrice(salLB);
                                            salUB = shortPrice(salUB);

                                            if (salType != 1) {
                                                unit = 'per hour';
                                            }
                                            var hideSalaryCls = '';
                                            var nosalaryFlagCls = '';
                                            if (jShowSalaryRange == false) {
                                                hideSalaryCls = 'hidden';
                                            }else{
                                                nosalaryFlagCls = ' fit';
                                            }

                                            //formatting date
                                            var jdate = formatDate3(jDatePost);

                                            //more jobs link    
                                            jMoreLink = $(jMoreLink)[2].href;

                                            var jobTemp = "<div class='flex-container'><div class='job-block notSavedJob' data-jobid='"+ item.JobId +"'><div class='jobbg'><a href='" + jLink + "' title='" + jTitle + "' class='imgwrap'><img src='"+ advertLogo +"' alt='"+ jTitle +"'></a><div class='job-fav'><a href='/member/mysavedjobs.aspx?id=" + item.JobId + "' class='favourite hover' title='Save this job for later'><i class='fa fa-heart'></i></a></div></div><div class='jobcontent'><p><a href='" + jLink + "' title='Job under " + jCat + "'>" + jCat + "</a></p><div class='data-content'><div class='job-title'><h3><a href='" + jLink + "' title='" + jTitle + "' class='" + lenTitleCls + "'>" + jTitle + "</a></h3><div>" + advertName + "</div></div><div class='jobdate'><span>Posted</span>" + jdate + "</div></div><div class='job-desc'>" + jDesc + "</div><div class='job-foot'><div class='foot-left'><span class='job-tag'><span class='rssLocation'><!-- --></span></span><span class='job-tag'><span class='rssWorktype'></span></span></div></div><div class='foot-right'><span class='job-tagdata'><span class='rssSalary'></span></span></div><div class='jobcontent-footer'><div class='job-location"+ nosalaryFlagCls +"'><span class='jobloc'>" + jLocation + "</span><span class='jobwork'>" + jWorkType + "</span></div><div class='job-salary "+ hideSalaryCls +"'><span class='sal-amt sal_lb'>" + salLB + "</span> - <span class='sal-amt sal_ub'>" + salUB + "<br>" + unit + "</span></div></div></div></div></div>";

                                            topJob2.append(jobTemp);
                                            topJob2.removeClass('loading');

                                        });//end of adding data

                                        //adding the carousel
                                        if (result.length) {
                                           
                                            //check for the save job
                                            //first check if member is logged in
                                            if( $('#miniMemberLoggedIn').length ){
                                                
                                                // topJob2.find('.job-block').each( function(){
                                                //     var jobId = $(this).data('jobid');
                                                //     updateSaveJob(topJob2);
                                                // });
                                                updateSaveJob(topJob2);

                                            }
                                        }//end of implementing save job feature

                                        //adding the carousel
                                        if (result.length > 1) {
                                            
                                            topJob2.randomize('.flex-container');

                                            topJob2.on('init', function(event, slick) {
                                                $(".count-slides .current-slide").text(1);
                                                $(".count-slides .total-slides").text(slick.$slides.length);
                                            });
                                            //topJob.removeClass("autoslide");
                                            //console.log($(this));
                                            topJob2.slick({
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                                //  asNavFor: '.slider-for',
                                                arrows: true,
                                                focusOnSelect: true,
                                                autoplay: true,
                                                autoplaySpeed: 4000,
                                                prevArrow: '<button onclick="TJgtagPush(\'left-arrow-click\');" class="slick-prev slick-arrow" aria-label="Previous Job" type="button" style="display: block;">Previous Job</button>',
                                                nextArrow: '<button onclick="TJgtagPush(\'right-arrow-click\');" class="slick-next slick-arrow" aria-label="Next Job" type="button" style="display: block;">Next Job</button>',
                                                responsive: [{
                                                    breakpoint: 1500,
                                                    settings: {
                                                        slidesToShow: 1,
                                                    }
                                                }, {
                                                    breakpoint: 1200,
                                                    settings: {
                                                        slidesToShow: 1,
                                                    }
                                                }, {
                                                    breakpoint: 992,
                                                    settings: {
                                                        slidesToShow: 1,
                                                    }
                                                }, {
                                                    breakpoint: 768,
                                                    settings: {
                                                        centerMode: true,
                                                        centerPadding: '27px',
                                                        slidesToShow: 1,
                                                        arrows: false,
                                                    }
                                                }, {
                                                    breakpoint: 480,
                                                    settings: {
                                                        centerMode: true,
                                                        centerPadding: '27px',
                                                        slidesToShow: 1,
                                                        arrows: false,
                                                    }
                                                }]
                                            });//end of slick
                                            topJob2.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                                                $(".count-slides .current-slide").text(nextSlide + 1);
                                                $(".count-slides .total-slides").text(slick.$slides.length);
                                            });

                                            topJob2.find('.job-block').each(function() {
                                                var jobTitle = $(this).find('.job-title h3 a');
                                                var jobDescription = $(this).find('.job-desc p');
                                                checkEllipsis(jobTitle);
                                                checkEllipsis(jobDescription);
                                                $(this).click( function() {
                                                    var str_info = $(this).find('.jobcontent p a').attr('href');
                                                    if(str_info) {
                                                        var arr_info = str_info.split('/');
                                                        TJgtagPush('listing click',arr_info[1],arr_info[2],arr_info[3]);
                                                    }
                                                    else {
                                                        TJgtagPush('listing click');
                                                    }
                                                });
                                            });

                                        } else {
                                            //topJob.addClass("autoslide");
                                            $(".count-slides").hide();
                                        }//end of length condition for slider
                                    } else {

                                        $('.banner-job').addClass('no-results');

                                        topJob2.append('<p class="jxt-error">There are no jobs listed under Top Jobs</p>').removeClass('loading');
                                    }
                                    

                                }//end of ajax success function
                            });//end of ajax call

                        } //end of search value sucess

                    }
                }
            }); //end of ajax call for getJobSearchValue



        }
        /*jobpage job ends here*/

        //getting values to the custom made job search widget
        var classificationOptions = $('#professionID1 option').clone();
        var locationOptions = $('#locationID1 option').clone();
        $('#professionID2').html(classificationOptions);
        $('#locationID2').html(locationOptions);

        //advance search widget function
        if ($('#footer-widget').length) {
            $('#footer-widget #btn-widget-search2').click(function (e) {
                e.preventDefault();
                //get the values
                var keywordVal = $('#footer-widget #keywords2').val();
                var clsId = $('#footer-widget #professionID2').val();
                var locId = $('#footer-widget #locationID2').val();
                jobSearch(keywordVal, clsId, locId);
            });
        }
        //keyword job search widget function
        // if ($('.sitetop-head').length) {
        //     $('.searchbar').click(function (e) {
        //         var keywordVal = $(this).parent().find('input.form-control[type="text"]').val();
        //         e.preventDefault();
        //         jobSearch(keywordVal);
        //     });
        // }
        //custom job search widget to prevent from duplicate id when added multiple widget in a page
        function jobSearch(keyword, classificationId, locationId) {
            var queryStr = '/advancedsearch.aspx?search=1';
            if (keyword != undefined && keyword != '') {
                queryStr += '&keywords=' + keyword;
            }
            if (classificationId != undefined && classificationId > 0 && classificationId != '') {
                queryStr += '&professionid=' + classificationId;
            }
            if (locationId != undefined && locationId > 0 && locationId != '') {
                queryStr += '&locationid=' + locationId;
            }
            window.location = queryStr;
        }


        customMarkup();

        $(".banner-job").insertBefore($(".sorting-button"));
        $(".sorting-button select option[value='']").text('Recent Listings');
        $(".sorting-button select option[value='Old']").text('Oldest Listings');
        /* remove extra brackets in breadcrumbs */
        $(".red-remove").each(function(index, el) {
            $(el).html($(el).children());
        });
        /* sort by filter - custom markup change */
        $(".sorting-button select option").each(function() {
            var txt = $(this).text();
            //console.log(txt.split(" – ")[1])
            $(this).text(txt.split(" – ")[1]);
        });
        

        $("<div class='select-title'>Arrange by: </div>").insertBefore($(".sorting-button"));
        if ($(document).width() > 767) {
            // $(".form-dropdown").selectbox({
            //     hide_duplicate_option: true
            // });
            $("select.form-dropdown, select.form-control").selectpicker({
                size: 5,
                //mobile: true,
                selectOnTab: true,
                dropupAuto: false 
            });
            $("select.form-dropdown, select.form-control").on('loaded.bs.select', function (e){
                if( $(this).val() > 0 || $(this).val() != "" ){
                    if( $(this).parent().find('button span.filter-option').length ){
                        $(this).parent().find('button span.filter-option').text( $(this).parent().find('button').attr('title') );
                    }else{
                        $(this).parent().find('button').text( $(this).parent().find('button').attr('title') );
                    }
                    
                }
            });
            $("select.form-dropdown, select.form-control").on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
                //console.log(clickedIndex);
                $(this).find('option').removeAttr('selected');
                $(this).find('option').eq(clickedIndex).attr('selected','selected');
                $(this).val($(this).find('option').eq(clickedIndex).val());
            });

            //not to apply for profile with multiselect
            if( (document.URL.indexOf("/member/profile.aspx") > -1 ) && $("select.multiselect").length  ) {
                //remove it
                $("select.multiselect").selectpicker('destroy');
            }

            if ($('#professionID').val() > 0) {
                $('#professionID').trigger('change');
            }
           
            $('#locationID').change(function() {
                /*setTimeout(function() {
                    $("#areaIDs").selectpicker({
                        size: 5,
                        selectOnTab: true,
                        dropupAuto: false 
                    });
                }, 800);*/
                $('#salaryID').selectpicker('refresh');
            });
            $('#professionID').change(function() {
                setTimeout(function() {
                    // $("#roleIDs").selectbox({
                    //     hide_duplicate_option: true
                    // });
                    $("#roleIDs").selectpicker({
                        size: 5,
                        selectOnTab: true,
                        dropupAuto: false 
                    });
                }, 500);
            });

        }else{
            $("select").wrap('<div class="custom-select select-on"></div>');
            $('#locationID').change(function() {
                setTimeout(function() {
                    $("#areaIDs").wrap('<div class="custom-select select-on"></div>');
                }, 800);
            });
            $('#professionID').change(function() {
                setTimeout(function() {
                    $("#roleIDs").wrap('<div class="custom-select select-on"></div>');
                }, 500);
            });
        }
       
        $('body').on('change','#ctl00_ContentPlaceHolder1_ddlUpsellPackages', function(){
            setTimeout( function(){
                wrapCustomSelect( $("#ctl00_ContentPlaceHolder1_ddlUpsellPackages") );
                
                $('#ctl00_ContentPlaceHolder1_upUpsellPackages h2').text('Promote & Save With A Boost Package');
            },1000);
        });
        $('body').on('change','#ctl00_ContentPlaceHolder1_ddlProductPackages', function(){
            setTimeout( function(){
                wrapCustomSelect( $("#ctl00_ContentPlaceHolder1_ddlProductPackages") );
                
                $('#ctl00_ContentPlaceHolder1_upProductPackages h2').text('Posting over 5 jobs? Select a package');
            },1000);
        });
        

        $(".sorting-button .btn-default").text($(".sorting-button select option").eq(0).text());
        /* text change for search results */
        $(".side-left-header").text("YOU SEARCHED FOR:").append('<a class="sidebar-btn">Edit and Refine Search</a>');

        //custom selectbox look without plugin
        // $('select').each( function(){
        //     if( !$(this).parents('.custom-select').length ){
        //         if( $(this).is(':visible') ){
        //             $(this).wrap('<div class="custom-select select-on"></div>');
        //         }
        //     }
        // });

        $('.sidebar-btn').click(function() {
            //event.preventDefault();
            var link = $(this);
            $('#side-drop-menu').slideToggle('fast', function() {
                if ($(this).is(':visible')) {
                    link.html('Close Refine Search');
                } else {
                    link.html('Edit and Refine Search');
                }
            });
        });


        /*categorypage news*/
        var bottomNewsList = $(".homenewslist");
        var queryStrNews = '?max=50';
        if (window.location.pathname.toLowerCase() == '/') {
            queryStrNews = bottomNewsList.data('string');
        } 
        if (queryStrNews == undefined) {
            queryStrNews = '?max=50';
        }
        bottomNewsList.addClass('loading');

        $.ajax({
            type: "GET",
            cache: true,
            url: domain + "/newsfeed.aspx" + queryStrNews,
            dataType: "json",
            contentType: "application/json",
            success: function(result) {
                if (result != "News Not Found") {
                    var newsFeedArr = result;
                    var nTitle, nImageURL, newsLink, categoryName, catLink, nDesc, nDatePost, ndate;
                    var newsTemp = '';
                    var lenTitleCls = '';

                    //For the bottom 4-15 news list block
                    if (newsFeedArr.length > 3) {
                        newsTemp = '';
                        var lenTitleCls = '';
                        var startPos = 0;
                        if ($('#careernews').length) { //indication of the career hub page
                            startPos = 3;
                        }
                        for (var n = startPos; n < newsFeedArr.length; n++) {

                            nTitle = newsFeedArr[n].Subject;
                            if (newsFeedArr[n].ImageURL != '' && newsFeedArr[n].ImageURL != null) {
                                nImageURL = "background-image:url(" + newsFeedArr[n].ImageURL + ")";
                            } else {
                                nImageURL = '';
                            }
                            newsLink = '/news/' + newsFeedArr[n].PageFriendlyName + '/' + newsFeedArr[n].NewsId + '/';
                            categoryName = newsFeedArr[n].NewsCategoryName;
                            catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[n].NewsCategoryId;
                            nDesc = newsFeedArr[n].MetaDescription;
                            nDesc = nDesc != null ? nDesc : '';
                            nDatePost = newsFeedArr[n].PostDate;
                            ndate = formatDate4(nDatePost);
                            //nTitle = limitString(nTitle,80);
                            lenTitleCls = checkStrLen(nTitle, 80);
                            nDesc = limitString(nDesc, 120);
                            newsTemp += "<div class='newsblock'><a href='" + newsLink + "' title='" + nTitle + "' class='newsbg' style='" + nImageURL + "'></a><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><!--<div class='news-date'>" + ndate + "</div>--><div class='news-cont'>" + nDesc + "</div></div></div>";

                        }
                        bottomNewsList.append(newsTemp);
                        //adding caruousel
                        bottomNewsList.slick({
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            dots: true,
                            focusOnSelect: false,
                            autoplay: false,
                            autoplaySpeed: 3000,
                            prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous News" type="button" style="display: block;">Previous News</button>',
                            nextArrow: '<button class="slick-next slick-arrow" aria-label="Next News" type="button" style="display: block;">Next News</button>',
                            responsive: [{
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    centerMode: true,
                                    centerPadding: '40px'
                                }
                            }, {
                                breakpoint: 480,
                                settings: {
                                    centerMode: true,
                                    centerPadding: '40px',
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]
                        });

                    }
                }
                bottomNewsList.removeClass('loading');
            }
        });

        /*about page testimonilas*/
        if ($(".inner-testimonial").length) {
            $(".inner-testimonial").each(function() {
                
                if ($(this).children().length > 1) {
                    //console.log($(this));
                    $(this).slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        focusOnSelect: true,
                        autoplay: false,
                        autoplaySpeed: 3000,
                        responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,

                            }
                        }, {
                            breakpoint: 480,
                            settings: {

                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });
                }
              
            });
        }

        /*INNERBANNER RESPONSIVE SEARCH WIDGET TOGGLE*/
 
        $('.site-search a').click(function(e) { 
            e.preventDefault();
            $('.sitesearch-head').toggleClass('open-search');
            if( $('.sitesearch-head').hasClass('open-search') ){
                setTimeout(function() { $('.sitesearch-head input').focus(); }, 1000);
            }
            $(this).addClass('hidden');
        });
        $('#searchhead-toggle').click( function(){
            $('.sitesearch-head').removeClass('open-search');
            $('.site-search a').removeClass('hidden');
        });
        $(document).on('keydown', function(e){
            if( $('.sitesearch-head').hasClass('open-search') ){
                if( e.keyCode === 27 ){ //ESC
                    $('.sitesearch-head').removeClass('open-search');
                    $('.site-search a').removeClass('hidden');
                }
            }
        });

        $('#search-inner').click(function(e) {
            e.preventDefault();
            var link = $(this);
            $('.toogle-search, .companySearch-search-holder').toggle('fast', function() {

                if ($(this).is(':visible')) {
                    link.html('close search');
                } else {
                    link.html('open search');
                }
            });
        });


        /*smoothscroll*/
        if (window.location.pathname.toLowerCase().indexOf('member/profile.aspx') == -1) {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    var h = document.getElementById('Top-nav-sticky');
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - h.offsetHeight
                        }, 1000);
                        return false;
                    }
                }
            });
        }

        $('.jxt-salary-type .sbSelector a:first-child ').html('Pick One...');

        if ($(".company-area").length > 0) {
            $(".company-search").css('display', 'block');
            $(".inner-widget").css('display', 'none');
        }

        $('#search-company').click(function(e) {
            e.preventDefault();
            var link = $(this);
            $('.toogle-company-search').slideToggle('slow', function() {

                if ($(this).is(':visible')) {
                    link.html('close search');
                } else {
                    link.html('open search');
                }
            });
        });

        if ($(".company-detail").length > 0) {
            $("body").addClass('company-detail-page');
        }

        //popup video
        $('.play-btn, youtube-popup').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            preloader: false,
            overflowY: 'auto',
            removalDelay: 300,
            midClick: true,
            fixedBgPos: true,
            fixedContentPos: true
        });

        //coninf of save element
        $('.save-image').clone().addClass('clone-save').insertAfter('.apply-now-image2');
        if ($('.save-image a').text().toLowerCase().indexOf('unsave job') > -1) {
            $('.save-image a').text('Unsave this job');
        } else {
            $('.save-image a').text('Save this job for later');
        }
        $('.apply-now-link a').text('Apply with YUDU');
        $('#jobdetail-social-media h2').text('Share this position');
        $('.jobcontainer-right').insertAfter('.jobdetail-padding');
        $('#jobdetail-social-media ul').append($('#jobdetail-interested-in-job .email-image'));
        $('#jobdetail-social-media li a').text('');

        //getting advertiser logo
        $('#jobdetail-interested-in-job').after($('#job-advertiser-logo, #job-company-logo').removeClass('hidden'));
        $('.amt').each(function() {
            var newPrice = formatPrice($(this).text());
            $(this).text(newPrice);
        });

        /* custom html markup */

        $('.jobtype-search .favourite-search-button a').html('Favourite this Search');
        $('.jobtype-search .create-alert-button a').html('Create as an Alert');

        if ($('.search-query .search-query-filter-Keywords').length) {
            $('.search-query .search-query-filter-Keywords').parent().prev().text('Keywords');
        }

        $('#ctl00_ContentPlaceHolder1_updatePanel1').insertAfter('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration');
        $('label:contains("Classification")').text('Industry');


        //NEWS PAGE DESIGN IN TABLET
        $('#ctl00_ContentPlaceHolder1_Button1').attr('value', 'BACK TO SETTINGS');

        $('.jxt-news-container p').each(function() {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.remove();
        });
        /* custom type change for ctl00_ContentPlaceHolder1_txtUserName username */
        $("#ctl00_ContentPlaceHolder1_txtUserName").attr("type", "email");
        $('#ctl00_ContentPlaceHolder1_txtUserName').attr('placeholder','Email Address *');
        $('#ctl00_ContentPlaceHolder1_rvUserName.jxt-error').text('Email address is required');

        //reset password page
        //for advertiser
        var vmsg = $('#fp-message-field span.form-required').text().replace('username or','');
        if( vmsg.indexOf('No Advertiser') > -1 ){
            vmsg = 'The email address entered does not have a YUDU account';
        }
        $('#fp-message-field span.form-required').text(vmsg);

        //for memeber/candidate
        var memsg =  $('#member-fp-message-field span.form-required').text();
        if( memsg.indexOf('No Member') > -1 ){
            memsg = 'The email address entered does not have a YUDU account';
        }
        $('#member-fp-message-field span.form-required').text(memsg);

        $('#jobs-dateposted-field span, #jobs-expirydate-field span, #jobs-lastmodified-field span, #job-ad-options-bottom .job-ad-optional-text div[itemprop="datePosted"]').each( function(){
            var newDate = $(this).text().trim().substr(0,10);
            $(this).text(newDate);
        });

        /*changing heading text of forget password page */
        if ($("body").hasClass('member/forgetpassword.aspx')) {
            $('body').addClass('forget-header');

        }

        $('.forget-header h1,.forget-header .form-header-group h2').text('Reset Your Password');

        $(".navbar-toggle").click(function() {
            $("#Top-nav-sticky").toggleClass("opened");
            $(".boardy-GroupStatus-withMenu").toggleClass("active");
        });
        $('#salarylowerband,#txtSalaryLowerBand').attr('placeholder','$');
        $('#salaryupperband,#txtSalaryUpperBand').attr('placeholder','$');

    }); // end of document ready for general


    // Mergered from system.js
    // to prevent from variables defined conflict, all code has been put into another document ready
    $(function () {
        var oldXHR = window.XMLHttpRequest;
        var currentPage = window.location.pathname.toLowerCase();
        //dashboard page
        if( $('img.profilePic').length ){
            var profilePicSrc =  $('img.profilePic').attr('src');
            if( profilePicSrc.indexOf('/candidate/?v=') > -1 ){ //noimage condition
                $('img.profilePic').attr('src','/images/member/profile-placeholder.png');
                $('img.profilePic').parent().addClass('no-image');
            }
        }
        
        $('label:contains("Username")').each( function(){
            var reqTxt = $(this).find('span');
            $(this).html("Email Address").append(reqTxt);
        });
        $('#ctl00_ContentPlaceHolder1_txtEmail').attr('type','email');
        $('#aspnetForm[action*="login.aspx"] .login-main-holder input[type="submit"]').val("Login");
    
        $('a[href="/advertiser/edit.aspx?tab=1"], #aspnetForm[action="./edit.aspx?tab=1"] h1').text('Manage Users');
        $('a[href="/company/edit.aspx?tab=1"], #aspnetForm[action="./edit.aspx?tab=1"] h1').text('Manage Users');

        $('#aspnetForm[action="./edit.aspx?tab=1"] #tab2 h2').first().text('Users');
        $('#aspnetForm[action="./edit.aspx?tab=1"] #tab2 table th:contains("Newsletter")').addClass('hidden');
        $('#aspnetForm[action="./edit.aspx?tab=1"] #tab2 table input[type="checkbox"][id*="Newsletter"]').parents('td').addClass('hidden');

        $('a[href="/advertiser/advertiserjobtemplatelogo.aspx"],a[href="/company/advertiserjobtemplatelogo.aspx"], #aspnetForm[action="./advertiserjobtemplatelogo.aspx"] h1').text('Additional Logos');
        

        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            //setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\');', 0);
            if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) 
            {
                $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession").removeAttr("onchange");
                    //Profession dropdown onchange event to load specific roles 
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession').change(function() {
                    var professionID = "";
                    $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession option:selected").each(function() {
                        professionID += $(this).val();
                    });
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: "/job/ajaxcalls/ajaxmethods.asmx/getroles",
                        data: "{'ProfessionId':" + professionID + ", 'IsDynamicWidget':" + IsDynamicWidgetTemp + "}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(msg) {
                            $(".sub-classifications-container .bootstrap-select").replaceWith(msg.d);
                            $("#roleIDs").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                        },
                        fail: function() {
                            $(".sub-classifications-container .bootstrap-select").html("It didn't work");
                        }
                    });
                });
            }            
            
            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").removeAttr("onchange");
            
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
            $("<div id='acpttxt'><p>By saving and registering, I accept YUDU's <a href='//www.yudu.co.nz/terms-of-use' target='_blank'>terms of use</a> and <a href='//www.yudu.co.nz/privacy-policy' target='_blank'>privacy policy</a>.</p></div>").insertBefore('.buttonHolder');

            //by default checked
            $('.marktingCheckBox input[type="checkbox"]').attr('checked',"checked");
            var tempInput = $('.marktingCheckBox input[type="checkbox"]');
            $('.marktingCheckBox .mini-main-alert').html('<span>I would like to receive YUDU emails on industry info, career tips, updates and more.</span>').prepend(tempInput);
            //if member logged in hide it
            if( $('#miniMemberLoggedIn').length ){
                $('.marktingCheckBox, #acpttxt').addClass('hidden');
            }

            $(".uniForm").addClass("border-container");
            window.XMLHttpRequest = newXHR;

            if ( $('#ctl00_ContentPlaceHolder1_btnSearch').length ) {
                $('#ctl00_ContentPlaceHolder1_btnSearch').val('Search Saved Criteria');
                $('#ctl00_ContentPlaceHolder1_btnSearch').insertAfter( $('#ctl00_ContentPlaceHolder1_btnDelete'));
            }
        }
        
        else if (currentPage == "/advertiser/jobcreate.aspx" || currentPage == "/company/jobcreate.aspx" ) {
            $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession2').hide();
            $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlRole2').hide();
            $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession3').hide();
            $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlRole3').hide();

            $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlJobItemType option').each( function(){
                var v = $(this).text();
                var b = v.replace(/\((.+?)\)/g,'');
                $(this).text(b);
            });

            //temporary fix - need to remove after this get added from backend
            $('#jobs-boost-hometopjob-field').parent().addClass('boost-field-group').prepend( '<label class="col-sm-12 boost-heading">Boost Type</label>' );

            //adding extra notes
            $('#ctl00_ContentPlaceHolder1_ucJobFields_txtFriendlyUrl').parents('li').append('<span class="help-block">Click generate to create a job friendly url or choose your own using words and spaces only</span>');
            $('#jobs-salary-range').append('<span class="help-block">Include a min and max salary range to be included in more search results</span>');

            //changing copy note
            $('input[id*=_txtApplicationEmailAddress]').parents('li').find('.help-block').text('All applications for this job will be sent to this email address unless "URL - Link out" has been selected as application method.');
        }
        else if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
            $('#ctl00_ContentPlaceHolder1_txtState').insertBefore('#ctl00_ContentPlaceHolder1_Label1');
            $('#ctl00_ContentPlaceHolder1_Label6').insertBefore('#ctl00_ContentPlaceHolder1_txtState');
            $('#ctl00_ContentPlaceHolder1_Label6').text('Town/City');
            $('#ctl00_ContentPlaceHolder1_Label3').text('Street Address');
            $('p.label').hide();
            $('ul.blockLabels').hide();

            $('#ctl00_ContentPlaceHolder1_ckNewsletter').attr('checked','checked');
            $('label[for="ctl00_ContentPlaceHolder1_ckNewsletter"]').text('I would like to receive YUDU emails on industry info, career tips, updates and more.');

            $("<div id='acpttxt'><p>By registering, I accept YUDU's <a href='//www.yudu.co.nz/terms-of-use' target='_blank'>terms of use</a> and <a href='//www.yudu.co.nz/privacy-policy' target='_blank'>privacy policy</a>.</p></div>").insertBefore('.buttonHolder');
            
            // Changing vailidation message on 'member registration page'
            $("#ctl00_ContentPlaceHolder1_ctmEmailAddress").html("This email address has already been registered. Please log in <a href='/member/login.aspx' title='Please login'>here</a> or reset your password <a href='/member/forgetpassword.aspx' title='Reset your password'>here</a>.");
        }
        else if (currentPage == "/advertiser/edit.aspx" || currentPage == "/company/edit.aspx"){
            $('#adv-emailaddress-field span.form-hint').html('To change email address, please contact our <a href="/pages/enquiry.aspx">support team</a>');

            if( $('#tab3 .form-all > .form-required').text().trim()!="" ){
                $('#tab3 .form-all > .form-required').addClass('alert alert-success');
            }
        }
        else if (currentPage == "/member/changepassword.aspx"){
            if( $('#ctl00_ContentPlaceHolder1_ucMemberChangePassword1_lblMessage').text().trim()!="" ){
                $('#ctl00_ContentPlaceHolder1_ucMemberChangePassword1_lblMessage').addClass('alert alert-success');
            }
        }
        else if (currentPage == "/advertiser/login.aspx" || currentPage == "/company/edit.aspx"){
            if( $('.jxt-form-section-advertiser-login > p.form-required').text().trim()!="" ){
                if(  $('.jxt-form-section-advertiser-login > p.form-required').text().trim().indexOf('success') > -1 ){
                    $('.jxt-form-section-advertiser-login > p.form-required').addClass('alert alert-success');
                }
            }
        }
        else if(currentPage == "/advertiser/jobsarchived.aspx" || currentPage == "/advertiser/jobsdraft.aspx" || currentPage == "/company/jobsarchived.aspx" || currentPage == "/company/jobsdraft.aspx"){
            window.XMLHttpRequest = newXHR;
        }else if( currentPage == "/advertiser/jobtrackerapplications.aspx" || currentPage == "/company/jobtrackerapplications.aspx"){
            $('.hide-if-no-paging').addClass('TablePaginationFooter');
            $('.hide-if-no-paging .footable-visible > p').addClass('form-group');
            $('.pagination-wrap').wrap('<div class="form-group pull-left">');
        }
        
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
            $('.jxt-form-section-your-cart h2').text('Number of jobs selected');

        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }

        if( currentPage.indexOf('member/default.aspx') > -1 ){
            $('.member-dashboard-content > .col-md-8').removeClass().addClass('col-sm-12');
            $('#box-profile-info').parent().parent().removeClass('col-sm-6').addClass('pic-holder-cs');
            $('#box-profile-status').parent().removeClass().addClass('mem-top');
            $('#box-profile-details').parent().hide();
            $('.mem-top').prepend( $('#box-profile-details'));
            $('#box-profile-info .member-dashboard-candidatename').prependTo($('.mem-top'));
            $('.mem-top h2 >span').wrap('<span class="nwrap"></span>');
            $('.mem-top h2').attr('title', $('.mem-top h2 .first-name').text() + ' ' +$('.mem-top h2 .last-name').text() );
    
            fitFontSize( $('.member-dashboard-candidatename .first-name'), $('.mem-top'), $('.member-dashboard-candidatename'));
            fitFontSize( $('.member-dashboard-candidatename .last-name'), $('.mem-top'), $('.member-dashboard-candidatename'));
    
            $('.db_info-holder').after( $('.uncomplete-sec-list') );
    
            $('.uncomplete-sec-list').prepend( '<div class="tocomplete-head"><h2><span>Profile sections</span><br><span>to complete</span></h2></div>' );
    
            if( $('.uncomplete-sec-list .jxt_profile-sec-icon').length == 1 && $('#directorshipIcon').length ){
                $('.uncomplete-sec-list').addClass('profile-completed');
            }
    
            $('.db_section-content span.highlight:contains("Email address")').text('Email');
            $('.db_section-content span.highlight:contains("Phone number")').text('Mobile Phone (preferred)');
    
            $('.personal-detail-content .addCity').before( '<br>' );
            $('.personal-detail-content .addCountry').before( '<br>' );
            // afterPostback();
    
            // $(".action-cell input[type='checkbox']").each(function(){
            //        var x = $(this).attr("onClick");
            //        $(this).removeAttr("onClick").unbind("click");
            //        $(this).click(function(e){
            //            // do what you want here...
            //            eval(x); // do original action here...
            //            afterPostback();
            //        });
            //    });
    
        
            $('#owl-demo .jxt_profile-sec-icon').unwrap();
            $('.jxt_profile-sec-icon a').each( function(){
                $(this).after('<span>'+ $(this).attr('title') +'</span>');
            });
    
            $('a:contains(Edit Profile)').appendTo($('.tocomplete-head'));
            $('a.btn-primary:contains(Edit Details)').appendTo( $('.member-dashboard-candidatename') );
            $('.uncomplete-sec-list a.btn[href*="/member/profile.aspx"]').text('View/Edit Profile');
    
            //save job box: adding link to the title and removing the view buttons
            $('#box-table-saved tr').each( function(){
                var savedJobLink = $(this).find('td.action-cell a').attr('href');
                $(this).find('td.action-cell').hide();
                $(this).find('td').eq(0).find('p').wrap('<a href="'+ savedJobLink +'"></a>');
            });

            //2018-May-17 system upgrade : some new feature added to this page
            //close account button has been added
            $('#ctl00_ContentPlaceHolder1_lbCloseAccount').parent().addClass('close-acc-btn');
    
        }
        
        //advertiser dashboard pages
        else if (currentPage.indexOf('advertiser/default.aspx') > -1 || currentPage.indexOf('company/default.aspx') > -1){
            $('.profilePic').parent().removeClass().addClass('profilePic-holder').wrap('<div class="pic-holder-cs"></div>');
            $('.pic-holder-cs').parent().addClass('advertTop');
            $('.profilePic').show();
            $('.advertiser-dashboard-advertisername').parent().removeClass().addClass('mem-top');
        }
        //advertiser registration
        else if (currentPage.indexOf('advertiser/register.aspx') > -1 || currentPage.indexOf('company/register.aspx') > -1){
            // $('.jxt-form-account-type #rbAccount').removeAttr('checked');
            // $('.jxt-form-account-type #rbCreditCard').attr('checked','checked');
            var accInput = $('.jxt-form-account-type label[for="rbAccount"] input');
            $('.jxt-form-account-type label[for="rbAccount"]').text('Pay on Account').prepend( accInput );
            $('label:contains("User name / Email address")').html("Email address <span class='form-required'>*</span>");
            $('#ctl00_ContentPlaceHolder1_dataEmailAddressUsername[type="text"]').attr('type','email');
            
            //making the company logo compulsary
            // if( !$('.jxt-form-company-logo label .form-required').length ){
            //     $('.jxt-form-company-logo label').append('<span class="form-required">*</span>');
            //     $('.jxt-form-company-logo .jxt-form-field').append('<span id="ctl00_ContentPlaceHolder2_cvalDocument" class="jxt-error" style="color:Red;display:none;">Company logo is required</span>');
            // }
    
            $('.jxt-form-company-logo #helpBlock').html('File format supported: jpg, png<br>Max file size:1MB<br>Recommended size: 360px by 260px.<br>Logos will have a white background if required.');
            
            $('.jxt-form-submit').prepend('<div class="help-block text-right">By registering, I accept the <a href="/advertiser-terms-and-conditions" title="Terms and Conditions" target="_blank">Advertiser Terms and Conditions</a> and <a href="/privacy-policy" title="Privacy Policy" target="_blank">Privacy Policy</a>, and to receive emails from NZME.</div>');
            
            //applying the value from email to the application email field
            $('#ctl00_ContentPlaceHolder1_dataEmailAddressUsername').blur( function(){
                $('#ctl00_ContentPlaceHolder1_dataApplicationEmail').val( $(this).val() );
            });

            //validate on submit
            $('#ctl00_ContentPlaceHolder1_btnRegister').on('click',function(event){
                $(this).attr('disabled',true);
                
                // if( $('.jxt-form-company-logo input[type="file"]').val() == '' ){
    
                //     $('.jxt-form-company-logo .jxt-error').show();
                //     $(this).attr('disabled',false);
                //     // $("html, body").stop().animate({ scrollTop: $('.jxt-form-company-logo input[type="file"]').offset().top - 100 }, "fast");
                //     return false;
                    
                // }else{
                //     $('.jxt-form-company-logo .jxt-error').hide();
                // }
                if( $('.jxt-error').length ){
                    $(this).attr('disabled',false);
                }
            });
            if( $('.jxt-form-company-logo .fieldstar').is(':visible') ){
                $("html, body").stop().animate({ scrollTop: $('.jxt-form-company-logo input[type="file"]').offset().top - 100 }, "fast");
            }
            //new user registration
            if( window.location.search.indexOf('?action=add')>-1 ){
                $('h1').text('Manage Users');
                $('h1').siblings('p').remove();
                $('h1').after('<p>To edit the details of a user on your account select the user.  You can also add new users to your main account.</p><br>');
            }
        }
        
        //advertiser logo upload page
        $('#adv-selectDocument-field .custom-upload').append( '<span class="help-block">File format supported: jpg, png<br>Max file size:1MB<br>Recommended size: 360px by 260px<br>Logos will have a white background if required.</span>' );

        $('.candidateTermsDeletion').attr('href','/terms-of-use');

        if (window.innerWidth < 767) {
            if ($('.boardy-GroupStatus-loginBefore').length) {
            $('.navbar .navbar-collapse').prepend($('.boardy-GroupStatus-withMenu'));
            } else {
            $('.navbar-header').prepend($('.boardy-GroupStatus-withMenu'));
            }

        } else {
            $('.site-login').prepend($('.boardy-GroupStatus-withMenu'));
        }

        //if member logged in
        if( !$('#miniMemberLoggedIn').length ){
            $('h1:contains("Create Job Alert")').text('Register to Create Job Alert');

        }else{
            $('li a[href="/member/login.aspx"]').parent().hide();
            if( $("#pnlhubnews").val() != "true") {
                $('li a[href="/member/register.aspx"]').parent().hide();
            }
            $('.smart-left a[href="/member/register.aspx"]').attr('href','/advancedsearch.aspx?search=1').text('Browse Jobs');

            //getting the member profile image
            //store in cookie so in other pages also we can get the profile image.
            if( currentPage.indexOf('member/default.aspx') > -1 || currentPage.indexOf('member/profile.aspx') > -1 ){
                var pp = $('img.profilePic, img#profilePic').attr('src');
                $.cookie('profilePic', pp, { expires: 7, path: '/' });
            }
            
            if( $.cookie('profilePic') != "undefined" && $.cookie('profilePic') != ""){
                $('.GroupStatus-profilepic img').attr('src',$.cookie('profilePic'));
            }
        }

        if( $('#miniAdvertiserLoggedIn').length ){
            //getting the advertiser profile image
            if( currentPage.indexOf('advertiser/default.aspx') > -1 || currentPage.indexOf('company/default.aspx') > -1 ){
                var ppAdvrt = $('img.profilePic').attr('src');
                $.cookie('profilePic', ppAdvrt, { expires: 7, path: '/' });
            }
            if( $.cookie('profilePic') != "undefined" && $.cookie('profilePic') != ""){
                $('.GroupStatus-profilepic img').attr('src',$.cookie('profilePic'));
            }
        }
        //if Advertiser login
        if( $('#miniAdvertiserLoggedIn').length ){
            $('.nav-right .post-job a').attr('href','/company/jobcreate.aspx');
            if( currentPage.indexOf('advertiser/') > -1){
                $('.nav-right .post-job a').attr('href','/advertiser/jobcreate.aspx');
                $('a[href="/advertiser/login.aspx"]').hide();
                $('a[href="/advertiser/register.aspx"]').hide();
            }else if( currentPage.indexOf('company/') > -1 ){
                //
                $('.nav-right .post-job a').attr('href','/company/jobcreate.aspx');
                $('a[href="/company/login.aspx"]').hide();
                $('a[href="/company/register.aspx"]').hide();
            }
           
        }
        //advertiser login triggering login button
        $('.jxt-form-password #ctl00_ContentPlaceHolder1_txtPassword').keypress( function(e){
            if( e.which == 13 ){
                eval($('.jxt-form-submit #ctl00_ContentPlaceHolder1_btnLogin').attr('href'));
            }
        });
        
        
        //page/enquiry.aspx page ---pat
        if(currentPage.indexOf('pages/enquiry.aspx') > -1){

            $('.form-all').appendTo('.contact-form');
            $('#wrapper').toggleClass('clearfix full-width-container');
            $('#content').attr('class','col-xs-12');
            $('.innerbanner-search').hide();
            $('#side-left').hide();
            $('#side-right').hide();
            $('.system-banner').attr('class','inner-banner');
            $('.contact-form h2 span').css('text-transform','uppercase');
            $('#enquiry-phone').hide();
            $('#enquiry-name').wrap( '<div class="toptwo"></div>' );
            $('#enquiry-email').appendTo('.toptwo');
            $('#ctl00_ContentPlaceHolder1_txtName').attr('placeholder','Enter your name...');
            $('#ctl00_ContentPlaceHolder1_txtEmail').attr('placeholder','Enter your email...');
            $('#ctl00_ContentPlaceHolder1_txtContent').attr('placeholder','Leave us your comments...');

            //textarea and button
            $('#ctl00_ContentPlaceHolder1_txtContent').wrap( '<div class="undertwo"></div>' );
            $('#ctl00_ContentPlaceHolder1_btnSubmit').appendTo('.undertwo');

        }

        var matchUrl = window.location.href.substr( window.location.href.indexOf(window.location.pathname )+ window.location.pathname.length);
        if( matchUrl != "" ){
            matchUrl = window.location.pathname + matchUrl;
            $('.boardy-GroupStatus-ForAdvertiser .boardy-dropdown a[href*="'+ matchUrl +'"]').parent().addClass('active');
            $('.boardy-GroupStatus-ForAdvertiser .boardy-dropdown a[href="'+ window.location.pathname +'"]').parent().removeClass('active');
        }

        //job apply page
        if( $('.boardy-apply-content').length ){
            $('#pPasswordError').parent().removeClass().addClass('input-group');
            var p2 = $('h1 span').text();
            p2 = repSlashPipe(p2);
            $('h1 span').text(p2);

            //replacing the text copy
            var ja = $('#ctl00_ContentPlaceHolder1_cbSubscribeJobAlert');
            //making by default checked
            ja.attr('checked','checked');
            var j = ja.parent().html().replace('Subscribe to Job alert', 'I would like to receive a Job alert for Similar jobs');
            ja.parent().html(j);
            
        }       
        //create job page
        //$('#jobs-jobtemplateid-field').hide();
        $('label:contains("Location / Area")').text('Location / Region').append('<span class="form-required">*</span>');
        //$('label:contains("Application Method")').text('URL - Link to my website');
        $('label:contains("Profession / Role")').text('Classification / Sub-Classification').append('<span class="form-required">*</span>');
        $('h3:contains("Job Template Settings")').text('Job Logo Setting');
        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbAdvertiserJobTemplateLogo').text('Select Additional Logo (Not required if using existing default advertiser logo)');

        $('body').on('change','#ctl00_ContentPlaceHolder1_ucJobFields_ddlLocation',function() {
            setTimeout(function() {
                $('label:contains("Location / Area")').text('Location / Region').append('<span class="form-required">*</span>');
                wrapCustomSelect( $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobFields_ddlArea, #ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession1,#ctl00_ContentPlaceHolder1_ucJobFields_ddlRole1,#ctl00_ContentPlaceHolder1_ucJobFields_ddlApplicationMethod') );
            }, 700);
        });

        $('body').on('change','#ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession1',function() {
            setTimeout(function() {
                //$('label:contains("Profession / Role")').text('Classification / Sub-Classification').append('<span class="form-required">*</span>');
                wrapCustomSelect( $('#ctl00_ContentPlaceHolder1_ucJobFields_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobFields_ddlArea, #ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession1,#ctl00_ContentPlaceHolder1_ucJobFields_ddlRole1,#ctl00_ContentPlaceHolder1_ucJobFields_ddlApplicationMethod') );
            }, 700);
        });

        //adding the tooltip
        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbRefNo').append('<span class="fa fa-info-circle headingInfo" title="This is your internal reference number, if you have one."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_lbBulletPoint1').append('<span class="fa fa-info-circle headingInfo" title="Include the top 3 things about the job. This will be displayed as a preview of your job on the search results page. It will also appear in the Top Jobs sliders if you boost the job into one."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_lbDescription').append('<span class="fa fa-info-circle headingInfo" title="Summarise the job in a short paragraph. If you haven’t included the top 3 things above, this summary will appear in the preview of your job instead, as well as in the Top Jobs sliders if you boost the job into one."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_lbFullDescription').append('<span class="fa fa-info-circle headingInfo" title="Tell candidates everything they need to know about the job. You can also include a video to showcase your company if you paste a YouTube embed code."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbEnterCommaSeparated').append('<span class="fa fa-info-circle headingInfo" title="Enter keywords that candidates might use to search for your job, but that don&#39;t appear in the job description."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbAddress').append('<span class="fa fa-info-circle headingInfo" title="This is used by candidates searching for jobs by location. Enter the location of the job, not your head office."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbPublicTransport').append('<span class="fa fa-info-circle headingInfo" title="Enter modes of public transport available in the area that candidates could use to travel to work."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbShowLocation').append('<span class="fa fa-info-circle headingInfo" title="If ticked, location details will display on your job post. If unticked, the details will not display, but candidates can still search for your job by location."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbFromTo').append('<span class="fa fa-info-circle headingInfo" title="Enter the salary range, without symbols ($ or , )"></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbShowSalaryRange').append('<span class="fa fa-info-circle headingInfo" title="If ticked, the salary range will display on your job post. If unticked, the salary range will not display, but candidates can still search for your job by salary."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbSalaryText').append('<span class="fa fa-info-circle headingInfo" title="Enter details about the salary, for example OTE, bonus and inclusions - such as a company car."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbShowSalaryDetails').append('<span class="fa fa-info-circle headingInfo" title="If ticked, the salary details will display on your job post. If left unticked, the salary details will not display, but candidates can still search for your job by salary."></span>');

        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbAdvertiserJobTemplateLogo').append('<span class="fa fa-info-circle headingInfo" title="If different logo required then upload new additional logo. File format supported: jpg, png. Max file size: 1MB. Recommended size: 360px by 260px. Logos will have a white background if required."></span>');
        
        //advertiser purchase:credit card user
        if(currentPage.indexOf('advertiser/productselect.aspx') > -1 || currentPage.indexOf('company/productselect.aspx') > -1){
            $('#ctl00_ContentPlaceHolder1_btnContinue').val('Checkout');
            $('.jxt-form-section-select-package .jxt-form-add-to-cart input[type="submit"]').val('Add to cart');

            if( $('.availCredits label.credit-label[for="no-credits-available"]').length){
                var creditLbl = $('.availCredits label.credit-label[for="no-credits-available"] a');
                $('.availCredits label.credit-label[for="no-credits-available"]').text('Standard Jobs').after(creditLbl).after('<span>0</span>');
            }
            if( $('.availCredits label.credit-label[for="standard"]').length){
                $('.availCredits label.credit-label[for="standard"]').text('Standard Jobs');
            }
            
            $('#content h1').text('How many jobs are you posting?').after('<p>Post a job for free! All basic job listings are totally free of charge until further notice. Select the number of jobs you want to post, below, and your credit will be applied when you check out.</p><br><br>');

            $('#ddlProductSingle').parents('.jxt-form-section').find('h2').text('Posting less than 5 jobs?');
            $('#ctl00_ContentPlaceHolder1_upProductPackages h2').text('Posting over 5 jobs? Select a package');

            $('.jxt-form-section-your-cart h2').text('Number of jobs selected');

            $('#ddlBoostSingle').parents('.jxt-form-section').find('h2').text('Promote Your Job With A Boost');
            $('#ctl00_ContentPlaceHolder1_upUpsellPackages h2').text('Promote & Save With A Boost Package');
            

            $('.jxt-form-advertiser-select-product label:contains("Boost Type")').eq(0).append('<br><small><i><a href="/job-pricing">Find out more</a> about Boosts</i></small>');
        }   
 

        //making the checkbox and radio button custom style for IE/Edge only
        if( BrowserDetect.browser == 'MS Edge' || BrowserDetect.browser == 'Explorer' ){
            if( currentPage.indexOf('member/default.aspx') == -1 ){
                $('input[type="checkbox"]').each( function(){
                    if( !$(this).parents('.custom-checkbox').length ){
                        if( $(this).is(':visible') || currentPage.indexOf('member/profile.aspx') > -1 ){
                            $(this).wrap('<span class="custom-checkbox"></span>');
                            $(this).parent().append('<span></span>');
                        }
                    }
                });
            }
            $('input[type="radio"]').each( function(){
                if( !$(this).parents('.custom-radio').length ){
                    if( $(this).is(':visible') || currentPage.indexOf('member/profile.aspx') > -1 ){
                        $(this).wrap('<span class="custom-radio"></span>');
                        $(this).parent().append('<span></span>');
                    }
                }
            });
        }

        if( BrowserDetect.browser == 'Explorer' ){
            if( currentPage.indexOf('personality-') > -1 ){
                $('#dynamic-container').wrap('<div class="personality-wrap"></div>');
            }
        }

        //overriding the callback function of google drive
        var newpickerCallback = window.pickerCallback;
        window.pickerCallback = function(data){
            var id = '', filename = '';
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var doc = data[google.picker.Response.DOCUMENTS][0];
                id = doc[google.picker.Document.ID];
                filename = doc[google.picker.Document.NAME];
                //console.log('this is me: '+doc[google.picker.Document.MIME_TYPE]);
                if ($("#hfGoogleSelectedType").val() == "coverletter") {
                    $('#divCoverLetterFile').show();
                    $('#spdivCoverLetterFileName').text(filename);
                    $('.boardy-upload-coverletter .lbl-upload .place-holder').text('');
                }
                else {
                    $('#divResumeFile').show();
                    $('#spdivResumeFileName').text(filename);
                    $('#secExistingResume .lbl-upload .place-holder').text('');
                }
            }

            if ($("#hfGoogleSelectedType").val() == "coverletter") {
                clearFileInput('fileUploadCV');
                $("#hfDropBoxCLFileName").val("");
                $("#hfDropBoxCLFileURL").val("");
                $('#hfGoogleCLFileId').val(id);
                $('#hfGoogleCLFileName').val(filename);
                $('#divCoverLetterFormatNotValid').hide();
            }
            else {
                clearFileInput('fileUploadResume');
                $("#hfSeekResumeURL").val("");
                $("#hfDropBoxResumeFileName").val("");
                $("#hfDropBoxResumeFileURL").val("");
                $('#hfGoogleResumeFileId').val(id);
                $('#hfGoogleResumeFileName').val(filename);
                $('#pResumeRequired').hide();
            }
        };

        //dropbox method overriding
        if (document.getElementById("lnkResumeDropBox")) {
            if (Dropbox.isBrowserSupported()) {
                document.getElementById("lnkResumeDropBox").onclick = function () {
                    Dropbox.choose({
                        linkType: "direct",
                        success: function (files) {
                            clearFileInput('fileUploadResume');
                            $("#hfGoogleResumeFileId").val("");
                            $("#hfGoogleResumeFileName").val("");
                            $("#hfGoogleResumeToken").val("");

                            $('#hfDropBoxResumeFileName').val(files[0].name);
                            $('#hfDropBoxResumeFileURL').val(files[0].link);

                            $('#divResumeFile').show();
                            $('#spdivResumeFileName').text(files[0].name);
                            $('#pResumeRequired').hide();
                            $('#secExistingResume .lbl-upload .place-holder').text('');
                        },
                        extensions: ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.rtf']
                    });
                };
            }
        }

        if (document.getElementById("lnkCLDropBox")) {
            if (Dropbox.isBrowserSupported()) {
                document.getElementById("lnkCLDropBox").onclick = function () {
                    Dropbox.choose({
                        linkType: "direct",
                        success: function (files) {
                            clearFileInput('fileUploadCV');
                            $("#hfGoogleCLFileId").val("");
                            $("#hfGoogleCLFileName").val("");
                            $("#hfGoogleCLToken").val("");

                            $('#hfDropBoxCLFileName').val(files[0].name);
                            $('#hfDropBoxCLFileURL').val(files[0].link);

                            $('#divCoverLetterFile').show();
                            $('#spdivCoverLetterFileName').text(files[0].name);
                            $('#divCoverLetterFormatNotValid').hide();
                            $('.boardy-upload-coverletter .lbl-upload .place-holder').text('');
                        },
                        extensions: ['.txt', '.doc', '.docx', '.pdf', '.rtf']
                    });
                };
            }
        }

        function resetCompanyStyle(){
            $(".company-sorting select").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
            var link = $('.innerbanner-search #search-inner');
            if( $('.companySearch-search-holder').is(':visible')) {
                link.html('close search');
            } else {
                link.html('open search');
            }
            $('.companySearch-search-holder #search-keywords input').attr('placeholder','Company Name or Keyword...');
            $('.company-holder').each( function(){
                if( !$(this).find('.td-mid').length ){
                    $(this).find('img').wrap('<span class="td-mid"></span>');
                }
            });

            //addding the back to search
            if( $('.advertBasic').length < 1 && $('#ctl00_ContentPlaceHolder1_ucCompanySearch_tbKeyword').val() != ''){
                $('#ctl00_ContentPlaceHolder1_ucCompanySearch_pnlSearchResult').prepend('<div class="advertBasic clearfix"><div class="backtoresults"><a href="/companysearch.aspx" title="Back to company search" class="btn btn-default">BACK TO Company Search</a></div></div>');
            }
        }
        
        function newXHR() {
            var realXHR = new oldXHR();
            realXHR.addEventListener("readystatechange", function() {
                //console.log(realXHR);
                if(realXHR.readyState==4){
                    //console.log('request finished and response is ready');
                    if( $('.companySearch-search-holder').length && realXHR.response !='' && realXHR.response.indexOf('banner-top') > 0 ){
                        setTimeout(function(){
                            resetCompanyStyle();
                            $("html, body").stop().animate({ scrollTop: $('#content-container').offset().top - 120 }, "fast");
                            // $('.td-mid img').each( function(){
                            //     var imgSrc = $(this).attr('src');
                            //     imgSrc += '?v='+ randNum(); 
                            //     $(this).attr('src',imgSrc);
                            // });
                        },1);

                    }else if(currentPage.indexOf('member/createjobalert.aspx') > -1){
                        setTimeout(function() {
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole").selectpicker({
                                size: 5,
                                selectOnTab: true,
                                dropupAuto: false 
                            });
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").removeAttr("onchange");
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand").removeAttr("disabled"); 
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand").attr("placeholder","Minimum");
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand").removeAttr("disabled");
                            $("#ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand").attr("placeholder","Maximum");
                        }, 500);
                    }else if( $('.mini-new-buttons').length){
                        setTimeout(function(){
                            $('.mini-new-buttons').addClass('btn btn-primary');
                        },1);
                    }
                    else if( $('.box-table').length){
                        setTimeout(function(){
                            $('.box-table').addClass('table-bordered footable-loaded footable');
                            if( !$('.TablePaginationFooter .pagination').length ){
                                $('.box-table').addClass('no-paging');
                            }
                        },1);
                   }
                   else if( $('select#showRow').length ){
                        wrapCustomSelect($('select#showRow'));
                    }

                }
            }, false);
            return realXHR;
        }
        //Company search page
        if( $('.companySearch-search-holder').length  ){
            //heading section
            $('body').addClass('company-profiles');

            $('.innerbanner-search').parent().removeClass('innersearch-sec system-search');
            
            //search section
            $('.innerbanner-search .inner-head > span').text('Search Company');
            //$('.companySearch-search-holder .adv-searchbottom .btn').val('Find');
            $('.companySearch-search-holder #search-keywords input').attr('placeholder','Company Name or Keyword...');
            $('.company-holder').each( function(){
                $(this).find('img').wrap('<span class="td-mid"></span>');
            });
            
            window.XMLHttpRequest = newXHR;

            $("body").on("keypress","#search-keywords input", function(e){
                if ( 13 == e.which ){
                    $('.companySearch-search-holder .adv-searchbottom .mini-new-buttons').click();
                    
                    return false;
                }
            });
           
        }

        else if( $('#aspnetForm[action*="/?advertiserid="]').length || $('#aspnetForm[action*="/?companyid="]').length ){
            $('body').addClass('company-detail-page');
            $('.section-company-detail').addClass('loading');
            //getting advertiser informations
            var domain = window.location.protocol + '//' + window.location.hostname;
            var advertId = $('#aspnetForm').attr('action');
            advertId = advertId.substr(advertId.indexOf('=') + 1, advertId.length);
            
            $.ajax({
                type: "POST",
                cache: true,
                url: domain + "/jxtmethods.asmx/GetAdvertiserProfile",
                data: {"advertiserid": advertId},
                success: function (msg) {
                    //console.log(msg);
                    var result = $.parseJSON(msg);
                    var advDetail = $.parseJSON(result.Data[1].Text).CompanyProfileFields;
                    
                    var advOrgDetail = $.parseJSON(result.Data[0].Text);
                    var logoImg = advOrgDetail.AdvertiserLogoUrl;
                  
                    if( checkEmpty(logoImg) ){
                        if ( currentPage.indexOf('companies/')> -1 ) {
                            logoImg = logoImg.replace('Advertisers', 'Companies');
                        }
                    }
                    //var advLogo = '/media/companies/' + logoImg + '?ver=' + randNum();
                    if ( currentPage.indexOf('companies/')> -1 ) {
                        var advLogo = '/http_imagesjxtnetaus3/jxtco01-01-prod-images/media/companies/' + logoImg;
                    }else{
                        var advLogo = '/http_imagesjxtnetaus3/jxtco01-01-prod-images/media/advertisers/' + logoImg;
                    }
                    //console.log(advOrgDetail);
                    
                    if( checkEmpty(advDetail) ){
                        //@Start Basic detail
                        //spliting title
                        //change request: no need to split
                        var cmp_name_arr = '';
                        var cmp_name = '';
                        if( checkEmpty(advDetail.CompanyName) ){
                            cmp_name_arr = advDetail.CompanyName.split(' ');
                            if( cmp_name_arr.length ){
                                $.each(cmp_name_arr, function(i,val){
                                    cmp_name += '<span>' + val + '</span>';
                                    // if( i< cmp_name_arr.length ){
                                    //     cmp_name += '<br>';  
                                    // }
                                });
                            }else{
                                cmp_name = cmp_name_arr;
                            }
                        }
                    
    
                        var adv_basic = '<div class="advertBasic col-md-8 col-xs-12">';
        
                        adv_basic +='<header class="heading-section"><div class="backtoresults"><a href="/companysearch.aspx" title="Back to company search" class="btn btn-default">BACK TO RESULTS</a></div><br>'+
                        '<h1>'+ cmp_name +'</h1></header>';
        
                        adv_basic +='<div class="contact-section"><div class="row"><div class="col-md-6">';
                        
                        if( checkEmpty(advDetail.Phone) ){
                            adv_basic += '<label>PHONE:</label><p><a href="tel:'+ advDetail.Phone +'">'+ advDetail.Phone + '</a></p>';
                        }
                        if( checkEmpty(advDetail.Address1) || checkEmpty(advDetail.Address2) || checkEmpty(advDetail.AddressSuburb) ){
                            adv_basic += '<label>ADDRESS:</label><p>'+ advDetail.Address1;
                            if( advDetail.Address2!=''){
                                adv_basic += ' '+ advDetail.Address2;
                            } 
                            adv_basic += ', ' + advDetail.AddressSuburb + ' ' + advDetail.AddressPostcode;
                            if( advDetail.AddressState!='' ){
                                adv_basic += ', ' + advDetail.AddressState;
                            }
                            adv_basic += ', ' + advDetail.AddressCountry + '</p>';
                        }
                        adv_basic += '</div><div class="col-md-6">';

                        var webProtocol='';
                        if( checkEmpty(advDetail.Website) ){
                            //checking for value without http or //, as href value should have http or // to link properly
                            if( advDetail.Website.indexOf('http') == -1 && advDetail.Website.indexOf('www') == 0 ){
                                webProtocol = '//';
                            }
                            adv_basic += '<label>WEBSITE:</label><p><a href="'+ webProtocol + advDetail.Website +'" title="'+ cmp_name +'" target="_blank">'+ advDetail.Website + '</a></p>';
                        }
                        if( checkEmpty(advDetail.CompanyEmail) ){
                            adv_basic += '<label>EMAIL:</label><p><a href="mailto:'+ advDetail.CompanyEmail +'">'+ advDetail.CompanyEmail + '</a></p>';
                        }
                        adv_basic += '</div></div></div>';

                        //video section :: BrightcoveVideo
                        if( checkEmpty(advDetail.BrightcoveVideo) ){ 
                            adv_basic += '<div class="videoBlock hidden-xs">';
                            adv_basic += '<p>' + advDetail.BrightcoveVideo + '</p>';
                            adv_basic += '</div>';
                        }
                        
                        adv_basic += '</div>';
                        //@End of Basic Detail
        
                        //@Start of top right block: Company logo and social links
                        adv_basic +='<div class="col-md-4 col-xs-12 right-nav pull-right">';
                        // if( checkEmpty(advDetail.AdvertiserLogo) ){
                        //     var cmpLogo = advDetail.AdvertiserLogo;
                        //     adv_basic +='<p><a href="'+ webProtocol + advDetail.Website +'" title="'+ advDetail.CompanyName +'" target="_blank"><img src="'+ cmpLogo +'" alt="'+ advDetail.CompanyName +'"></a></p>';
                        // }
                        if( checkEmpty(advLogo) ){
                            adv_basic +='<p class="logo-holder"><a href="'+ webProtocol + advDetail.Website +'" title="'+ advDetail.CompanyName +'" target="_blank"><img src="'+ advLogo +'" alt="'+ advDetail.CompanyName +'"></a></p>';
                        }
    
                        //social media links
                        
                        adv_basic +='<div class="social-block"><h3>CONNECT WITH US ON...</h3>'+
                        '<ul class="social-media">';
                        if( checkEmpty(advDetail.Facebook) ){
                            adv_basic +='<li><a href="'+ advDetail.Facebook +'" target="_blank" title="Facebook"><i class="fa fa-facebook fa-fw"><!-- --></i></a></li>';
                        }
                        if( checkEmpty(advDetail.Twitter) ){
                            adv_basic +='<li><a href="'+ advDetail.Twitter +'" target="_blank" title="Twitter"><i class="fa fa-twitter fa-fw"><!-- --></i></a></li>';
                        }
                        if( checkEmpty(advDetail.LinkedIn) ){
                            adv_basic +='<li><a href="'+ advDetail.LinkedIn +'" target="_blank" title="LinkedIn"><i class="fa fa-linkedin fa-fw"><!-- --></i></a></li>';
                        }
                        if( checkEmpty(advDetail.Instagram) ){
                            adv_basic +='<li><a href="'+ advDetail.Instagram +'" target="_blank" title="Instagram"><i class="fa fa-instagram fa-fw"><!-- --></i></a></li>';
                        }
                        if( checkEmpty(advDetail.CompanyEmail) ){
                            adv_basic +='<li><a href="mailto:'+ advDetail.CompanyEmail +'" target="_blank" title="Email"><i class="fa fa-envelope fa-fw"><!-- --></i></a></li>';
                        }
                        adv_basic +='</ul></div>';
                    
                        //video section :: BrightcoveVideo
                        //this is for the mobile only
                        if( checkEmpty(advDetail.BrightcoveVideo) ){ 
                            adv_basic += '<div class="visible-xs">';
                            adv_basic += '<p>' + advDetail.BrightcoveVideo + '</p>';
                            adv_basic += '</div>';
                        }
                        //end of video section

                        //company value section
                        if( checkEmpty(advDetail.Characteristics) ){ 
                            adv_basic += '<h2>COMPANY CHARACTERISTICS</h2><ul>';
                            $.each(advDetail.Characteristics, function(i, val){
                                adv_basic += '<li>' + val + '</li>';
                            });
                            adv_basic += '</ul>';
                        }
                        //company benefits
                        if( checkEmpty(advDetail.CompanyBenefitsPredefined) ){ 
                            adv_basic += '<h2>COMPANY BENEFITS</h2><ul>';
                            $.each(advDetail.CompanyBenefitsPredefined, function(i, val){
                                adv_basic += '<li>' + val + '</li>';
                            });

                            if( checkEmpty(advDetail.CompanyBenefitsSelfDefined) ){ 
                                $.each(advDetail.CompanyBenefitsSelfDefined, function(i, val){
                                    adv_basic += '<li>' + val + '</li>';
                                });
                            }

                            adv_basic += '</ul>';
                        }

                        //Office location map
                        if( checkEmpty(advDetail.GoogleMapAddress) ){ 
                            var apikey ='key=AIzaSyCIxghdd2XT9iagb3j8hcB1MHn1SKABnVc';
                            $('head').find('script').each( function(){
                                var d = $(this).attr('src');
                                if( d != undefined && d.trim()!='' ){
                                    if( d.indexOf('maps/api')>-1){
                                        apikey = d.substring( d.indexOf('key='), d.indexOf('&v='));
                                        return false;
                                    }
                                }
                            });

                            var addarr = advDetail.GoogleMapAddress.split(' ');
                            var add = addarr.join('+');
                            add = add.replace(/,/g, '%2C');
                            adv_basic += '<h2>OFFICE LOCATION</h2>';
                            adv_basic += '<iframe src="https://www.google.com/maps/embed/v1/search?'+ apikey +'&q='+ add +'" height="350"></iframe>';
                        }

                        adv_basic +='</div>';
                        //@End of top right block

                        //profile copy
                        adv_basic += '<div class="profileCopy col-md-8 col-xs-12">';
                        adv_basic += advDetail.Profile;
                        adv_basic += '</div>';
    
                        //finally add the html
                        $('.section-company-detail .row').html(adv_basic);

                        fitFontSize( $('.advertBasic h1 span').eq(0), $('.advertBasic'), $('.advertBasic h1'));
                    }else{
                        var adv_basic_ = '<div class="advertBasic">';
        
                        adv_basic_ +='<header class="heading-section clearfix"><div class="backtoresults"><a href="/companysearch.aspx" title="Back to company search" class="btn btn-default">BACK TO RESULTS</a></div></header><br><br><p>Company profile content for <strong>'+ $.parseJSON(result.Data[0].Text).CompanyName +'</strong> has not been added yet!</p></div>';

                        $('.section-company-detail').append(adv_basic_);   
                    }
                    $('.section-company-detail').removeClass('loading');
                }
            });
            //@End of company ajax call

            $('.home-job').removeClass('hidden').insertBefore( $('.home-news') );
            $('.home-news').removeClass('hidden-xs');
            $('.home-job .heading-top').html('<span>Current</span><br><span>Vacancies</span>');

        }              

        /*content hub pages*/
        if( $("#pnlhubnews").val() == "true") {
            /* NEWS main section*/
            var domain = window.location.protocol + '//' + window.location.hostname;
            var mainNewsBlock = $(".categorynews-block");
            var mainNewsBlockCont = $(".top-categorynews-block");
            var leftNewsList = $(".rightnews-list");
            var bottomNewsList = $(".homenewslist");
            var queryStrNews = '?max=50';
            var mainNewsList;
            var totalnewscount = 0;
            var totalnewsloaded = 0;
            if (window.location.pathname.toLowerCase() == '/') {
                queryStrNews = bottomNewsList.data('string');
            } else if ($('.innerpage-news').length) { //careers hub pages
                queryStrNews = mainNewsBlock.data('string');
            }
            if (queryStrNews == undefined) {
                queryStrNews = '?max=50';
            }

            mainNewsBlock.addClass('loading');
            leftNewsList.addClass('loading');
            bottomNewsList.addClass('loading');

            $.ajax({
                type: "GET",
                cache: true,
                url: domain + "/newsfeed.aspx" + queryStrNews,
                dataType: "json",
                contentType: "application/json",
                success: function(result) {
                    if (result != "News Not Found") {
                        var newsFeedArr = result;
                        mainNewsList = newsFeedArr;
                        var nTitle, nImageURL, newsLink, categoryName, catLink, nDesc, nDatePost, ndate;
                        var newsTemp = '';
                        var lenTitleCls = '';

                        if (newsFeedArr.length) {
                             //For the first main block
                            totalnewscount = newsFeedArr.length;
                            nTitle = newsFeedArr[0].Subject;
                            if (newsFeedArr[0].ImageURL != '' && newsFeedArr[0].ImageURL != null) {
                                //nImageURL = "background-image:url(" + newsFeedArr[0].ImageURL + ")";
                                nImageURL = newsFeedArr[0].ImageURL;
                            } else {
                                nImageURL = '/media/yudu-site/images/job-placeholder.jpg';
                            }
                            newsLink = '/news/' + newsFeedArr[0].PageFriendlyName + '/' + newsFeedArr[0].NewsId + '/';
                            categoryName = newsFeedArr[0].NewsCategoryName;
                            catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[0].NewsCategoryId;
                            nDesc = newsFeedArr[0].MetaDescription;
                            nDesc = nDesc != null ? nDesc : '';
                            nDatePost = newsFeedArr[0].PostDate;
                            ndate = formatDate4(nDatePost);
                            //limiting job title
                            //nTitle = limitString(nTitle,130);
                            lenTitleCls = checkStrLen(nTitle, 130);
                            nTitle =  nTitle.replace(/'/g, "&apos;");
                            //description length limiting
                            nDesc = limitString(nDesc, 170);
                            newsTemp = "<div class='newsblock newsblockstrech'><a href='" + newsLink + "' title='" + nTitle + "' class='newsbg'>";
                            if( nImageURL.length ){
                                newsTemp += "<img src='"+ nImageURL +"' alt='"+ nTitle +"'>";
                            }
                            newsTemp +="</a><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + " '>" + categoryName + " </a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + " </a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                            mainNewsBlock.append(newsTemp);
                            totalnewsloaded = 1;
                            mainNewsBlock.removeClass('loading');

                            //For the single news on the right sidebar below AD
                            if (newsFeedArr.length > 1) {
                                newsTemp = '';
                                var lenTitleCls = '';
                                for (var i = 2; i < 3 && i < newsFeedArr.length; i++) {
                                    nTitle = newsFeedArr[i].Subject;
                                    nTitle =  nTitle.replace(/'/g, "&apos;");
                                    newsLink = '/news/' + newsFeedArr[i].PageFriendlyName + '/' + newsFeedArr[i].NewsId + '/';
                                    categoryName = newsFeedArr[i].NewsCategoryName;
                                    catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[i].NewsCategoryId;
                                    nDesc = newsFeedArr[i].MetaDescription;
                                    nDesc = nDesc != null ? nDesc : '';
                                    nDatePost = newsFeedArr[i].PostDate;
                                    ndate = formatDate4(nDatePost);
                                    //limiting job title
                                    //nTitle = limitString(nTitle,100);
                                    lenTitleCls = checkStrLen(nTitle, 100);
                                    //description length limiting
                                    nDesc = limitString(nDesc, 170);
                                    if(i==7) {
                                        nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                        if (newsFeedArr[i].ImageURL != '' && newsFeedArr[i].ImageURL != null) {
                                            nImageURL = newsFeedArr[i].ImageURL;
                                        }
                                        newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "' class='newsbg hubnewsbg'><img class='hub-news-img-sm' src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                        newsTemp += "<div id='hub-right-sidebar-news' class='left-industrylist'>"+newsfeaturedimg+"<div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    else {
                                        newsTemp += "<div id='hub-right-sidebar-news' class='left-industrylist'><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    totalnewsloaded++;
                                }
                                leftNewsList.append(newsTemp);
                            }
                            leftNewsList.removeClass('loading');

                            //adding six more news in the main content area
                            if (newsFeedArr.length > 1) {
                                newsTemp = '';
                                var lenTitleCls = '';
                                for (var i = 3; i <= 8 && i < newsFeedArr.length; i++) {
                                    nTitle = newsFeedArr[i].Subject;
                                    nTitle =  nTitle.replace(/'/g, "&apos;");
                                    newsLink = '/news/' + newsFeedArr[i].PageFriendlyName + '/' + newsFeedArr[i].NewsId + '/';
                                    categoryName = newsFeedArr[i].NewsCategoryName;
                                    catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[i].NewsCategoryId;
                                    nDesc = newsFeedArr[i].MetaDescription;
                                    nDesc = nDesc != null ? nDesc : '';
                                    nDatePost = newsFeedArr[i].PostDate;
                                    ndate = formatDate4(nDatePost);

                                    //limiting job title
                                    //nTitle = limitString(nTitle,100);
                                    lenTitleCls = checkStrLen(nTitle, 100);

                                    //description length limiting
                                    nDesc = limitString(nDesc, 170);
                                    hubnewsleftbox = "";
                                    if (i==6) {
                                       hubnewsleftbox = "clear-row";
                                    }
                                    if(i>5) {
                                        nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                        if (newsFeedArr[i].ImageURL != '' && newsFeedArr[i].ImageURL != null) {
                                            nImageURL = newsFeedArr[i].ImageURL;
                                        }
                                        newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "' class='newsbg hubnewsbg'><img class='hub-news-img-sm' src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                        newsTemp += "<div class='newsblock newsblockleft "+hubnewsleftbox+"'>"+newsfeaturedimg+"<div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    else {
                                        newsTemp += "<div class='newsblock  newsblockleft  "+hubnewsleftbox+"'><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    totalnewsloaded++;
                                }
                                mainNewsBlockCont.append(newsTemp);
                            }
                        }

                        /* More News section*/
                        if(totalnewsloaded <= totalnewscount) {
                            totalnewsloaded++;
                            if(mainNewsList[totalnewsloaded] !== undefined) {
                               //Main news block
                               var morenewsBlock = $(".more-news-strech");
                               nTitle = mainNewsList[totalnewsloaded].Subject;
                               if (mainNewsList[totalnewsloaded].ImageURL != '' && mainNewsList[totalnewsloaded].ImageURL != null) {
                                   nImageURL = mainNewsList[totalnewsloaded].ImageURL;
                               } else {
                                   nImageURL = '/media/yudu-site/images/job-placeholder.jpg';
                               }
                               newsLink = '/news/' + mainNewsList[totalnewsloaded].PageFriendlyName + '/' + mainNewsList[totalnewsloaded].NewsId + '/';
                               categoryName = mainNewsList[totalnewsloaded].NewsCategoryName;
                               catLink = '/news.aspx?sortby=lastest&categories=' + mainNewsList[totalnewsloaded].NewsCategoryId;
                               nDesc = mainNewsList[totalnewsloaded].MetaDescription;
                               nDesc = nDesc != null ? nDesc : '';
                               nDatePost = mainNewsList[totalnewsloaded].PostDate;
                               ndate = formatDate4(nDatePost);
                               lenTitleCls = checkStrLen(nTitle, 130);
                               nTitle =  nTitle.replace(/'/g, "&apos;");
                               nDesc = limitString(nDesc, 170);
                               newsTemp = "<div class='more-newsblock'><a href='" + newsLink + "' title='" + nTitle + "'>";
                               if( nImageURL.length ){
                                   newsTemp += "<img src='"+ nImageURL +"' alt='"+ nTitle +"'>";
                               }
                               newsTemp +="</a><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + " '>" + categoryName + " </a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + " </a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                               morenewsBlock.append(newsTemp);
                               totalnewsloaded++;
                            }
                        }
                        
                        /*for right side two news*/
                        if(totalnewsloaded <= totalnewscount) {
                            newsTemp = "";
                            var newstoload = totalnewsloaded + 2;
                            for (var i = totalnewsloaded; i < newstoload; i++) {
                                if(mainNewsList[i] !== undefined) {
                                    nTitle = mainNewsList[i].Subject;
                                    nTitle =  nTitle.replace(/'/g, "&apos;");
                                    newsLink = '/news/' + mainNewsList[i].PageFriendlyName + '/' + mainNewsList[i].NewsId + '/';
                                    categoryName = mainNewsList[i].NewsCategoryName;
                                    catLink = '/news.aspx?sortby=lastest&categories=' + mainNewsList[i].NewsCategoryId;
                                    nDesc = mainNewsList[i].MetaDescription;
                                    nDesc = nDesc != null ? nDesc : '';
                                    nDatePost = mainNewsList[i].PostDate;
                                    ndate = formatDate4(nDatePost);
                                    //limiting job title
                                    //nTitle = limitString(nTitle,100);
                                    lenTitleCls = checkStrLen(nTitle, 100);
                                    //description length limiting
                                    nDesc = limitString(nDesc, 170);
                                    if(i==7) {
                                        nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                        if (mainNewsList[i].ImageURL != '' && mainNewsList[i].ImageURL != null) {
                                            nImageURL = mainNewsList[i].ImageURL;
                                        }
                                        newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "' class='newsbg hubnewsbg'><img class='hub-news-img-sm' src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                        newsTemp += "<div id='hub-right-sidebar-news' class='left-industrylist'>"+newsfeaturedimg+"<div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    else {
                                        newsTemp += "<div id='more-hub-right-sidebar-news' class='left-industrylist'><div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    }
                                    totalnewsloaded++;
                                }
                            }
                            $(".more-news-right-sidebar").append(newsTemp);
                        }
                        /*for the remaining news, 9 per click*/
                        if(totalnewsloaded <= totalnewscount) {
                            newsTemp = "";
                            newscol=1;
                           var newstoload = totalnewsloaded + 6;
                            for (var i = totalnewsloaded; i < newstoload; i++) {
                                if(mainNewsList[i] !== undefined) {
                                    nTitle = mainNewsList[i].Subject;
                                    nTitle =  nTitle.replace(/'/g, "&apos;");
                                    newsLink = '/news/' + mainNewsList[i].PageFriendlyName + '/' + mainNewsList[i].NewsId + '/';
                                    categoryName = mainNewsList[i].NewsCategoryName;
                                    catLink = '/news.aspx?sortby=lastest&categories=' + mainNewsList[i].NewsCategoryId;
                                    nDesc = mainNewsList[i].MetaDescription;
                                    nDesc = nDesc != null ? nDesc : '';
                                    nDatePost = mainNewsList[i].PostDate;
                                    ndate = formatDate4(nDatePost);
                                    //limiting job title
                                    //nTitle = limitString(nTitle,100);
                                    lenTitleCls = checkStrLen(nTitle, 100);
                                    //description length limiting
                                    nDesc = limitString(nDesc, 170);
                                    nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                    if (mainNewsList[i].ImageURL != '' && mainNewsList[i].ImageURL != null) {
                                        nImageURL = mainNewsList[i].ImageURL;
                                    }
                                    hubnewsleftbox = "";
                                    if (newscol >=4) {
                                        hubnewsleftbox = "more-news-clear-row";
                                        newscol = 1;
                                    }
                                    newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "' class='newsbg hubnewsbg'><img class='hub-news-img-sm' src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                    newsTemp += "<div id='hub-more-main-news' class='more-news-block-left "+hubnewsleftbox+"'>"+newsfeaturedimg+"<div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                                    newscol++;
                                    totalnewsloaded++;
                                }
                            }
                            $("#load-more-news").append(newsTemp);
                        }
                        if(totalnewsloaded >= totalnewscount) {
                            $("#btnviewmore").css("display","none");
                        }
                    }
                }
            });
            //view more click event
            $("#btnviewmore").click(function(e){
                newsTemp = "";
                newscol=1;
                var newstoload = totalnewsloaded + 9;
                $("#load-more-news").addClass('loading');
                for (var i = totalnewsloaded; i < newstoload; i++) {
                    if(mainNewsList[i] !== undefined) {
                        nTitle = mainNewsList[i].Subject;
                        nTitle =  nTitle.replace(/'/g, "&apos;");
                        newsLink = '/news/' + mainNewsList[i].PageFriendlyName + '/' + mainNewsList[i].NewsId + '/';
                        categoryName = mainNewsList[i].NewsCategoryName;
                        catLink = '/news.aspx?sortby=lastest&categories=' + mainNewsList[i].NewsCategoryId;
                        nDesc = mainNewsList[i].MetaDescription;
                        nDesc = nDesc != null ? nDesc : '';
                        nDatePost = mainNewsList[i].PostDate;
                        ndate = formatDate4(nDatePost);
                        //limiting job title
                        //nTitle = limitString(nTitle,100);
                        lenTitleCls = checkStrLen(nTitle, 100);
                        //description length limiting
                        nDesc = limitString(nDesc, 170);
                        nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                        if (mainNewsList[i].ImageURL != '' && mainNewsList[i].ImageURL != null) {
                            nImageURL = mainNewsList[i].ImageURL;
                        }
                        hubnewsleftbox = "";
                        if (newscol == 1) {
                            hubnewsleftbox = "more-news-clear-row";
                        }
                        else {
                            if (newscol >=4) {
                                hubnewsleftbox = "more-news-clear-row";
                                newscol = 1;
                            }
                        }
                        newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "' class='newsbg hubnewsbg'><img class='hub-news-img-sm' src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                        newsTemp += "<div id='hub-more-main-news' class='more-news-block-left "+hubnewsleftbox+"'>"+newsfeaturedimg+"<div class='news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                        newscol++;
                        totalnewsloaded++;
                    }
                }
                $("#load-more-news").append(newsTemp);
                $("#load-more-news").removeClass('loading');
                if(totalnewsloaded >= totalnewscount) {
                    $("#btnviewmore").css("display","none");
                }
            });


            /* NEWS main section*/
            /* Career News section*/
            var careernewsBlock = $(".career-news-block");
            var queryStrNews = '?max=3';
            queryStrNews = careernewsBlock.data('string');
            var newsTemp = "";
            careernewsBlock.addClass('loading');
            
            $.ajax({
                type: "GET",
                cache: true,
                url: domain + "/newsfeed.aspx" + queryStrNews,
                dataType: "json",
                contentType: "application/json",
                success: function(result) {
                    if (result != "News Not Found") {
                        var newsFeedArr = result;
                        var nTitle, nImageURL, newsLink, categoryName, catLink, nDesc, nDatePost, ndate;
                        var newsTemp = '';
                        var lenTitleCls = '';
                        var hubnewsleftbox = "careernewsbox";
                        //Display only 3 news
                        if (newsFeedArr.length > 0) {
                            for (var i = 0; i < newsFeedArr.length; i++) {
                                nTitle = newsFeedArr[i].Subject;
                                nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                if (newsFeedArr[i].ImageURL != '' && newsFeedArr[i].ImageURL != null) {
                                    nImageURL = newsFeedArr[i].ImageURL;
                                }
                                newsLink = '/news/' + newsFeedArr[i].PageFriendlyName + '/' + newsFeedArr[i].NewsId + '/';
                                categoryName = newsFeedArr[i].NewsCategoryName;
                                catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[i].NewsCategoryId;
                                nDesc = newsFeedArr[i].MetaDescription;
                                nDesc = nDesc != null ? nDesc : '';
                                nDatePost = newsFeedArr[i].PostDate;
                                ndate = formatDate4(nDatePost);
                                lenTitleCls = checkStrLen(nTitle, 130);
                                nTitle =  nTitle.replace(/'/g, "&apos;");
                                //description length limiting
                                nDesc = limitString(nDesc, 170);
                                newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "'><img src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                newsTemp += "<div class='careerblockleft "+hubnewsleftbox+"'>"+newsfeaturedimg+"<div class='news-desc career-news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a id='career-news-title' href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                            }  
                            careernewsBlock.append(newsTemp);
                        }
                        careernewsBlock.removeClass('loading');
                    }
                }
            });
            /* Events News section*/
            var eventsnewsBlock = $(".events-news-block");
            var queryStrNews = '?max=3';
            queryStrNews = eventsnewsBlock.data('string');
            var newsTemp = "";
            eventsnewsBlock.addClass('loading');
            
            $.ajax({
                type: "GET",
                cache: true,
                url: domain + "/newsfeed.aspx" + queryStrNews,
                dataType: "json",
                contentType: "application/json",
                success: function(result) {
                    if (result != "News Not Found") {
                        var newsFeedArr = result;
                        var nTitle, nImageURL, newsLink, categoryName, catLink, nDesc, nDatePost, ndate;
                        var newsTemp = '';
                        var lenTitleCls = '';
                        var hubnewsleftbox = "careernewsbox";
                        //Display only 3 news
                        if (newsFeedArr.length > 0) {
                            for (var i = 0; i < newsFeedArr.length; i++) {
                                nTitle = newsFeedArr[i].Subject;
                                nImageURL = "/media/yudu-site/images/job-placeholder.jpg";
                                if (newsFeedArr[i].ImageURL != '' && newsFeedArr[i].ImageURL != null) {
                                    nImageURL = newsFeedArr[i].ImageURL;
                                }
                                newsLink = '/news/' + newsFeedArr[i].PageFriendlyName + '/' + newsFeedArr[i].NewsId + '/';
                                categoryName = newsFeedArr[i].NewsCategoryName;
                                catLink = '/news.aspx?sortby=lastest&categories=' + newsFeedArr[i].NewsCategoryId;
                                nDesc = newsFeedArr[i].MetaDescription;
                                nDesc = nDesc != null ? nDesc : '';
                                nDatePost = newsFeedArr[i].PostDate;
                                ndate = formatDate4(nDatePost);
                                lenTitleCls = checkStrLen(nTitle, 130);
                                nTitle =  nTitle.replace(/'/g, "&apos;");
                                //description length limiting
                                nDesc = limitString(nDesc, 170);
                                newsfeaturedimg = "<a href='" + newsLink + "' title='" + nTitle + "'><img src='"+ nImageURL +"' alt='"+ nTitle +"'></a>";
                                newsTemp += "<div class='careerblockleft "+hubnewsleftbox+"'>"+newsfeaturedimg+"<div class='news-desc career-news-desc'><p><a href='" + catLink + "' title='" + categoryName + "'>" + categoryName + "</a></p><h3><a id='career-news-title' href='" + newsLink + "' title='" + nTitle + "' class='" + lenTitleCls + "'>" + nTitle + "</a></h3><div class='news-cont'>" + nDesc + "</div></div></div>";
                            }  
                            eventsnewsBlock.append(newsTemp);
                        }
                    }
                    eventsnewsBlock.removeClass('loading');
                }
            });
        }

        function limitString(str, len) {
            var strLen = str.length;
            if (strLen > len + 5) {
                str = str.substr(0, len) + '...';
            }
            return str;
        }

        function checkStrLen(obj, len) {
            var objLen = obj.length;
            if ($(window).width() > 479 && $(window).width() < 768) {
                len = len * 1.5;
            }
            if (objLen > len + 5) {
                return 'ellipsis';
            } else {
                return '';
            }
        }

        function checkEllipsis(obj) {
            if (obj.height() > obj.parent().height() + 5) {
                obj.addClass('ellipsis');
            } else {
                obj.removeClass('ellipsis');
            }
        }
        /*content hub pages*/

    }); // end of document ready for system functions specific

    var resizeFun = function(){
        
        if (window.innerWidth < 767) {
            if ($('.boardy-GroupStatus-loginBefore').length) {
                $('.navbar-header').after($('.boardy-GroupStatus-withMenu'));
            } else {
                $('.navbar-header').prepend($('.boardy-GroupStatus-withMenu'));
            }
    
        } else {
            $('.site-login').prepend($('.boardy-GroupStatus-withMenu'));
        }
    
        if ($(".jxt-news-container").length > 0) {
            if (window.innerWidth < 992) {
                $('.widget-block').appendTo($('.content-holder'));
            } else {
                $('.widget-block').appendTo($('#side-left'));
            }
        }
    };

    //resize function for menu
    $(window).on("resize", function() {
        setTimeout( function(){
            resizeFun();
        },100);
    }).resize();

    //widget.js function
    $(function(){

        //header search widget
        var searchButtonSelector = ".innerbanner-search #btn-widget-search, #widget-search #btn-widget-search";
        var keywordsInputSelector = ".innerbanner-search #keywords1, #widget-search #keywords1";
        
        $(keywordsInputSelector).keypress(function(e){
            if ( 13 == e.which )
            {
                $(searchButtonSelector).click();
                return false;
            }
        });

        //footer search widget
        var searchButtonSelector_footer = "#footer-widget #btn-widget-search2";
        var keywordsInputSelector_footer = "#footer-widget #keywords2";

        $(keywordsInputSelector_footer).keypress(function(e){
            if ( 13 == e.which )
            {
                var keywordVal = $(this).val();
                //$('#widget-search #keywords1, .innerbanner-search #keywords1').val(keywordVal);
                $(searchButtonSelector_footer).click();
                return false;
            }
        });

        //change on dropdown for the footer job search widget should reflect to the top widget, since on search it always take the first search field parameters because of same id given from the backend
        //this is no longer used as footer widget is static build due multiple ids issue
        // $('#footer-widget #professionID1').change(function () {
        //      var catVal = $(this).val();
        //      $('#widget-search #professionID1, .innerbanner-search #professionID1').val(catVal);
        // });

        // $('#footer-widget #locationID1').change(function () {
        //      var locVal = $(this).val();
        //      $('#widget-search #locationID1, .innerbanner-search #locationID1').val(locVal);
        // });

        

        //news search widget
        var searchButtonSelector_news = ".sitesearch-head .searchbar";
        var keywordsInputSelector_news = ".sitesearch-head .form-control"; 

        $(keywordsInputSelector_news).keypress(function(e){
            if ( 13 == e.which )
            {
                e.preventDefault();
                var keyNewsVal = $(this).val();
                window.location = '/news.aspx?sortby=latest&keywords='+keyNewsVal;
            }
        });
        $(keywordsInputSelector_news).click( function(e){
            e.preventDefault();
            console.log(e.target);
            $(this).focus();
        });
        $(searchButtonSelector_news).click( function(e){
            e.preventDefault();
            console.log(e.target);
            var keyNewsVal = $(this).parent().find('.form-control').val();
            window.location = '/news.aspx?sortby=latest&keywords='+keyNewsVal;
        });

        // uniform 
        if ( $.fn.customSelect )
        {
            $("select").customSelect();
        }
       
    }); //@End of document ready for widget.js

})(jQuery);



function customMarkup() {
    var customMonthList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    $(".job-holder").each(function() {
        $(this).find(".job-breadcrumbs").prependTo($(this));
        $("<div class='foot-wrap'></div>").appendTo($(this)).append($(this).find(".search-result-save-job-link").add($(this).find(".jxt-result-salary")).add($(this).find(".jxt-result-worktype")));
        formatDateCustom($(this), $(this).find(".dateText").text());
        $(this).children().wrapAll('<div class="left-wrap"></div>');
        $('<div class="right-wrap"><div class="profile-pic"><a href="'+ $(this).find('.job-toplink a').attr('href') +'"></a></div></div>').appendTo($(this));

        //working with logo
        $(this).find(".jxt-result-loc").insertAfter($(this).find(".profile-pic"));
        var logo = $(this).find(".description-logo a img").attr('src');
        if (logo != '' && logo != undefined) {
            // $(this).find(".profile-pic").css({
            //     'background-image': 'url("'+ logo +'")',
            //     'background-size':'100% auto'
            // });    
            $(this).find(".profile-pic").addClass('hasLogo');
            $(this).find(".profile-pic a").html('<img src="' + logo + '" alt="' + $(this).find('.nameofcompany').text() + '">');
        }else{
            $(this).find(".profile-pic a").html('<img src="/media/yudu-site/images/job-placeholder.jpg" alt="' + $(this).find('.nameofcompany').text() + '">');
        }

    });

    $(".job-holder").each(function(index, el) {
        $(el).find('.nameofcompany').insertBefore($(el).find('.jxt-result-loc'));
        $(el).find('.jxt-result-salary').insertAfter($(el).find('.jxt-result-worktype'));
        if ($(el).find('.jxt-result-area').text().trim() != '') {
            $(el).find('.jxt-result-loc').prepend($(el).find('.jxt-result-area').text() + ', ');
        }

        //adding ellipsis to trucated text
        var titleInnerHt = $(el).find('.job-toplink a').height();
        if (titleInnerHt > $(el).find('.job-toplink').height() + 5) {
            $(el).find('.job-toplink a').addClass('ellipsis');
        }

        //splitting word with / or | if found within, to prevent being long word
        var p = $(this).find('.job-toplink a').text();
        p = repSlashPipe(p);
        $(this).find('.job-toplink a').text(p);

        var desc = $(el).find('.description-text');
        if (!desc.find('ul').length) {
            desc.wrapInner('<p></p>');
            if (desc.find('p').height() > desc.height() + 5) {
                desc.addClass('ellipsis');
            }
        }

        //salary
        var salLB = $(el).find('.salary-amount');
        if( salLB.length ){
            salLB.each( function(){
            
                var cs = $(this).find('.currency-symbol');
                $(this).find('.currency-symbol').remove();
                if( parseInt($(this).text()) > 0 ){
                    var pr = formatPrice(parseInt($(this).text()));
                    $(this).text( pr ).prepend(cs);
                }
      
            });
        }else{
            $(el).find('.jxt-result-salary').addClass('hidden');
            $(el).find('.jxt-result-worktype').addClass('no-sep');
        }

    });



    function formatDateCustom(elem, date) {
        var day = date.split("/")[0];
        var month = parseInt(date.split("/")[1]);
        month = customMonthList[month - 1];
        $("<div class='custom-date'>Posted</div>").insertAfter(elem.find('.job-toplink'));
        $("<span class='custom-day'>" + day + "</span>").appendTo(elem.find('.custom-date'));
        $("<span class='custom-month'>" + month + "</span>").appendTo(elem.find('.custom-date'));
    }
}

function CustomFunction() {
    //console.log('this is triggered before ' + pageurl);
    var pageurl = window.location.pathname.toLowerCase();
    if (pageurl == "/member/createjobalert.aspx") {
        //basicProfile section
        $('#search-salary label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary"]').text('Salary Type');
        $('#ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea').removeAttr('multiple size');
    }
    else if (pageurl.indexOf('member/profile.aspx') > -1) {
        $('.row > .col-md-6:not(#personalDetailsform .row .col-md-6)').removeClass('col-md-6');
        $('.CV-Builder-title').text('Your Profile');
        $('#ctl00_ContentPlaceHolder1_hfProfileEdit').appendTo( $('#candidate-name h3'));
        $('#section-3 .section_status').appendTo( $('#personalDetailsSlider') );
        $('#section-3 a[href="#personalDetailsform"]').appendTo($('#personalDetailsSlider'));
        $('.section-footer .add-btn').addClass('btn-primary');
        $('#ctl00_ContentPlaceHolder1_lbbPreferHomePhone, #ctl00_ContentPlaceHolder1_lbPreferMobilePhone').text('Preferred Number:');
        $('label:contains("State")').text("Region");

        $('#candidate-name h3 .first-name, #candidate-name h3 .last-name').wrap('<span class="nwrap"></span>');
        $('#candidate-name h3').attr('title', $('#candidate-name h3 .first-name').text() + ' ' +$('#candidate-name h3 .last-name').text() );
        fitFontSize( $('#candidate-name h3 .first-name'), $('#candidate-name'), $('#candidate-name h3'));
        fitFontSize( $('#candidate-name h3 .last-name'), $('#candidate-name'), $('#candidate-name h3'));
        $('#ctl00_ContentPlaceHolder1_tbProfileHeadline').attr('placeholder', 'A sentence about you that appears on your profile');
        
        var existingImg = $('#profilePic').attr('src');

        //profile picture
        $('.btnUploadImage').insertAfter( $('.profileImageHolder') );
        if( $('#profilePic').attr('src').indexOf('/member/profile-placeholder.png') > -1 ){
            //no profile image uploaded
            //$('.btnUploadImage .fileupload-new').text('Upload profile image');
        }else{
            $('.btnUploadImage .fileupload-new').text('Change your profile image');
        }
        $("#fuProfile").on('change',function (e) {
            var filename = $(this).val().replace(/C:\\fakepath\\/i, '');
            if( filename != "" ){
                $('#profilePic').attr('src',filename);
            }
        });

        $("#ctl00_ContentPlaceHolder1_LinkButton1").on('click',function (e) {
            $('#profilePic').attr('src',existingImg);
        });

        //on load: disabling all mailing address if same as above is ticked
        if( $('#ctl00_ContentPlaceHolder1_cbDetailsSameAsAbove').is(':checked') ){
            $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress1').attr('disabled',true);
            $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress2').attr('disabled',true);
            $('#ctl00_ContentPlaceHolder1_tbDetailsMailingSuburb').attr('disabled',true);
            $('#ctl00_ContentPlaceHolder1_tbDetailsMailingState').attr('disabled',true);
            $('#ctl00_ContentPlaceHolder1_tbDetailsMailingPostcode').attr('disabled',true); 
            $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').parent().addClass('disabled');
        }
        //due to custom select the save as above for mailing address is not coping over.
        //hence required reassigning the custom select plugin
        
        //same as above change:: disabling if primary address is empty
        $('#ctl00_ContentPlaceHolder1_cbDetailsSameAsAbove').change(function() {
            if( $(this).is(':checked') ){
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress1').attr('disabled',true);
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress2').attr('disabled',true);
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingSuburb').attr('disabled',true);
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingState').attr('disabled',true);
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingPostcode').attr('disabled',true); 
                /*Personal details same country dropdown disabling*/
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').parent().addClass('disabled');
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').attr('disabled',true);
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').siblings('.dropdown-toggle').addClass('disabled');
                /*Personal details same country dropdown disabling*/
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress1').val($('#ctl00_ContentPlaceHolder1_tbDetailsAddress1').val());      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress2').val($('#ctl00_ContentPlaceHolder1_tbDetailsAddress2').val());
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingSuburb').val($('#ctl00_ContentPlaceHolder1_tbDetailsSuburb').val());      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingState').val($('#ctl00_ContentPlaceHolder1_tbDetailsState').val());      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingPostcode').val($('#ctl00_ContentPlaceHolder1_tbDetailsPostcode').val());      
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').val($('#ctl00_ContentPlaceHolder1_ddlDetailsCountry').val());      
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').val($('#ctl00_ContentPlaceHolder1_ddlDetailsCountry').val());   
            }else{
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress1').removeAttr('disabled');
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress2').removeAttr('disabled');
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingSuburb').removeAttr('disabled');
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingState').removeAttr('disabled');
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingPostcode').removeAttr('disabled');
                /*Personal details same country dropdown enabling*/
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').parent().removeClass('disabled');
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').attr('disabled',false);
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').siblings('.dropdown-toggle').removeClass('disabled');
                /*Personal details same country dropdown enabling*/
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress1').val('');      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingAddress2').val('');      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingSuburb').val('');      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingState').val('');      
                $('#ctl00_ContentPlaceHolder1_tbDetailsMailingPostcode').val('');
                $('#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry').val('');
            }
            $("#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry").selectpicker('render');
           
            // $("#ctl00_ContentPlaceHolder1_ddlDetailsMailingCountry").selectpicker({
            //     size: 5,
            //     //mobile: true,
            //     selectOnTab: true,
            //     dropupAuto: false 
            // });
            
        });

        $('#sec-Skills .section-footer .btn').click( function(){
            $(this).addClass('hidden');
        });
        if( !$('#sec-Skills .edit-mode').hasClass('hidden')) {
            $('#sec-Skills .section-footer .btn').addClass('hidden');
        }
        $('#sec-Skills .cancel-btn').click( function(){
            $('#sec-Skills .section-footer .btn').removeClass('hidden');
        });

        if( $('.artLinks').length < 1 ){
            $('#sec-AttachResume .section-header').append('<a href="/news/top-tips-for-your-cv/29411/" class="artLinks"><em>Check out our tips for writing a CV</em></a>');
            $('#sec-AttachCoverletter .section-header').append('<a href="/news/5-top-things-for-your-cover-letter/29408/" class="artLinks"><em>Check out our Top 5 Must Haves in a Cover Letter</em></a>');
        }

        $('label[for*="GraduatedCredits"]').text('Graduation Credits:');

        //adding completed or not completed indicator text for each block
        $('.form-section').each( function(){
            if( $(this).find('.fa-check').length ){
                $(this).addClass('sec-yes');
                if( $(this).attr('id') == 'section-2' || $(this).attr('id') == 'section-3' ){
                    $(this).find('h3.section-title').after('<small class="status-note">Completed</small>'); 
                }else{
                    $(this).find('.section-header').append('<small class="status-note">Completed</small>');
                }
                
            }else{
                $(this).addClass('sec-no');
                if( $(this).attr('id') == 'section-2' || $(this).attr('id') == 'section-3' ){
                    $(this).find('h3.section-title').after('<small class="status-note">To Be Completed</small>');   
                }else{
                    $(this).find('.section-header').append('<small class="status-note">To Be Completed</small>');
                }
            }
        });

        //making empty fields on cancel button click
        $('.new-block-holder .cancel-btn').click( function(){
            var blockId = $(this).attr('href');
            if( $(blockId).length ){
                $(blockId).find('input, textarea').val('');

                $(blockId).find('select').each( function(){
                    $(this).find('option').first().attr('selected',true);
                });

                $(blockId).find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
                $(blockId).find('.filename-holder').text(''); //upload file
            }
        });
        
        $('#section-2 .section_status').appendTo( $('.summary') );
        $('#section-2 .fa-edit').appendTo( $('.summary') );

        if ($(document).width() > 767) {
             $(".custom-select select").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
             });
        }

        // if ($(document).width() > 767) {
        //      $(".form-dropdown, .custom-select select").selectbox({
        //          hide_duplicate_option: true
        //      });
        //    }

        //attch resume
        $('#sec-AttachResume .section-footer .add-btn, #sec-AttachCoverletter .section-footer .add-btn ').text('Upload');
        $('#resume_wrap').insertAfter( $('#ctl00_ContentPlaceHolder1_upResume'));


        $('.group-controls.end-date-wrap').removeClass('col-sm-5').addClass('col-sm-6');
        $('label[for*="LicenseExpiryMonth"]').parent().removeClass('col-sm-5').addClass('col-sm-6');

        $('#section-9 .section-header .fa-edit').appendTo( $('#section-9 .section-content-inner') );      
        $('#section-14 .section-header .fa-edit').appendTo( $('.qa-section .section-content-inner') );      

        $('#ctl00_ContentPlaceHolder1_lbDownloadPdf').parent().removeClass().addClass('form-section full-width');//prepend('<p>Create your CV with one click.</p>');

        $('label[for*="Graduated"]').parent().css('min-width','88px');
        $('label[for*="lLicenseAddExpiryMonth"]').parent().removeClass('col-sm-5').addClass('col-sm-6');

        $('#newLanguage .col-sm-3').addClass('col-sm-6').removeClass('col-sm-3');
        $('#newLanguage .col-sm-5').removeClass('col-sm-5');
    }

    if (pageurl.indexOf('advertiser/default.aspx') > -1 || pageurl.indexOf('company/default.aspx') > -1) {
        $('.profilePic').css('display','block!important');
    }

} //end of CustomFunction()


function setTabsAnimation(activeList, activeListChild, loadMore, parent, num, flag) {
    if (flag == 0) {
        $("body").on('click', parent + ' ' + loadMore, function(e) {
            e.preventDefault();
            $(parent).find(activeList).find('.team-animate').slice(0, num).removeClass('team-animate');
            if ($(parent).find(activeList).find('.team-animate').length <= 0) {
                $(parent + ' ' + loadMore).hide();
            }
        });
        // $("body").on('click', parent + ' [data-toggle]', function(event) {
        //     event.preventDefault();
        //     setCountOfItems(activeList, activeListChild, loadMore, parent, num);
        // });
    }
    setCountOfItems(activeList, activeListChild, loadMore, parent, num);
}

function setCountOfItems(activeList, activeListChild, loadMore, parent, num) {
    setTimeout(function() {
        $(activeList).find(activeListChild).slice(num, $(activeList).find(activeListChild).length).addClass('team-animate');
        if ($(activeList).find(activeListChild + ".team-animate").length > 0) {
            $(parent + ' ' + loadMore).show();
        } else {
            $(parent + ' ' + loadMore).hide();
        }
    }, 500);
}

$(document).ready(function() {
    if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
        var bsearch = getQParaByName('search');
        if(bsearch && bsearch.length > 0) {
            $(".banner-job").css('display','block');
        }
        else{
            $(".banner-job").css('display','none');
            setTimeout(function() {
                $("#areaIDs").selectpicker({
                    size: 5,
                    selectOnTab: true,
                    dropupAuto: false 
                });
            }, 800);
        }
    }
    //candidate profile min salary bug fix
    if (window.location.pathname.toLowerCase().indexOf('member/profile.aspx') >= 0) {
        //candidate profile min salary bug fix
        $("#ctl00_ContentPlaceHolder1_tbRolePreferenceSalaryMin").attr("placeholder", "Min");
        //candidate profile edit icon mouse-over fix
        $("#candidate-name > h3").removeAttr("title");
        //open help articles in new window
        $('.artLinks').each(function(i){
            $(this).attr('target', '_blank');
        });
        //Prefferred Roles dropdowns style fixes
        $('#ctl00_ContentPlaceHolder1_hfRolePreferencesEdit').click(function() {
            set_multiselect_dd_style_fix();
        });
        $( "#ctl00_ContentPlaceHolder1_ddlRolePreferenceWorkType" ).click(function(e) {
            $('#editRole .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
            $('#editRole .form-input .multiselect-group .btn-group').addClass('form-control');
            $('#ctl00_ContentPlaceHolder1_upProfession .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
            $('#ctl00_ContentPlaceHolder1_upProfession .form-input .multiselect-group .btn-group').addClass('form-control');
            $('#ctl00_ContentPlaceHolder1_upLocation .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
            $('#ctl00_ContentPlaceHolder1_upLocation .form-input .multiselect-group .btn-group').addClass('form-control');
            $('.multiselect').css('text-align','left');
            $('.multiselect').css('padding','0 59px 0 13px');
        });
        //candidate profile cv section scroll position resume
        $.fn.scrollPosReaload = function(){
            if (localStorage) {
                var posReader = localStorage["posStorage"];
                if (posReader) {
                    setTimeout(function() {
                        $(window).scrollTop(posReader);
                    }, 500);
                    localStorage.removeItem("posStorage");
                }
                $(this).click(function(e) {
                    var upperElemHeight = $("#section-1").outerHeight() + $("#Top-nav-sticky").outerHeight() + $("#ctl00_ContentPlaceHolder1_upSummary").outerHeight();
                    localStorage["posStorage"] = upperElemHeight;//$(window).scrollTop();
                });
                return true;
            }
            return false;
        }
        $('#ctl00_ContentPlaceHolder1_lbResumeSave').scrollPosReaload();
    }
    if (window.location.pathname.toLowerCase().indexOf('/member/default.aspx') >= 0) {
         //candidate dashboard profile edit icon mouse-over fix
        $(".member-dashboard-candidatename").removeAttr("title");
    }
    //news section header fix
    if (window.location.pathname.toLowerCase().indexOf('/news') >= 0) {
        $("#header").css('background','#021464');
        $("#header").css('background-color','#021464');
    }
    $("#footer-widget #keywords2").attr("placeholder", "Job Title or Keyword...");

    //hidding top search bar
    if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
        $(".innerbanner-search").css('display','none');
        setTimeout(function() {
            $("#areaIDs").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        }, 800);
    }
    //keyword search
    $('#btn-find-keywords').click(function (e) {
        e.preventDefault();
        //get the values
        var keywordVal = $('#sidebar-keyword-box').val();
        if(keywordVal != "") {
            var queryStr = '/advancedsearch.aspx?search=1';
            queryStr += '&keywords=' + keywordVal;
            window.location = queryStr;
        }
        else {
            $( "#sidebar-keyword-box" ).effect( "shake" );
        }
    });
    $('#sidebar-keyword-box').keypress(function (e) {
        if ( 13 == e.which ){
            e.preventDefault();
            var keywordVal = $('#sidebar-keyword-box').val();
            if(keywordVal != "") {
                var queryStr = '/advancedsearch.aspx?search=1';
                queryStr += '&keywords=' + keywordVal;
                window.location = queryStr;
            }
        }
    });
    $('.cta-open-search').click(function() {
        //event.preventDefault();
        var link = $(this);
        $('#side-drop-menu').slideToggle('fast', function() {
            if ($(this).is(':visible')) {
                link.html('CLOSE SEARCH');
            } else {
                link.html('OPEN SEARCH');
            }
        });
    });
    $(".search-query h3").each( function(){
        var itemP = $(this).next('p');
        $(this).wrap('<div class="search-query search-term-tag"></div>');
        $(this).parent().append( itemP );
    });
    /*dropdowns flickering bug fixes*/
    if ((document.URL.indexOf("/jobcreate.aspx") >= 0)) {
        $('#ctl00_ContentPlaceHolder1_ucJobFields_updatePanel').mouseover(function() {
            $("#ctl00_ContentPlaceHolder1_ucJobFields_ddlLocation").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
            $("#ctl00_ContentPlaceHolder1_ucJobFields_ddlArea").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        });
        $('#ctl00_ContentPlaceHolder1_ucJobFields_updatePanel1').mouseover(function() {
            $("#ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession1").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
            $("#ctl00_ContentPlaceHolder1_ucJobFields_ddlRole1").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
            
        });
        $('#ctl00_ContentPlaceHolder1_ucJobFields_updatePanelapplicationmethod').mouseover(function() {
            $("#ctl00_ContentPlaceHolder1_ucJobFields_ddlApplicationMethod").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        });
        $('#reg-bottom-button .form-input-wide').prepend('<p>Basic Job listings are free until further notice, TOP JOB Boosts will be charged at the <a href="/job-pricing" target="_blank">standard rate</a>.</p><p>Job Postings will take up to 1 minute to appear on search results pages. Boosted jobs will take up to 15 mins to appear in TOP JOBS.</p>');
        CKEDITOR.instances['ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_txtFullDescription'].on('blur', function() {
            $("#ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_txtFullDescription").val(CKEDITOR.instances['ctl00_ContentPlaceHolder1_ucJobFields_rptLanguagesPanel_ctl00_ucJobFieldsMultiLingual_txtFullDescription'].getData());
        });
    }
    if (window.location.pathname.toLowerCase().indexOf('advertiser/default.aspx') > -1 || window.location.pathname.toLowerCase().indexOf('company/default.aspx') > -1) {
        $("<p>New job postings and archiving of jobs will take up to 1 minute to update on the employer's dashboard.</p>").insertBefore('.content-holder h2:first');
    }
    $('#divAreaDropDown').mouseover(function() {
        $("#areaIDs").selectpicker({
            size: 5,
            selectOnTab: true,
            dropupAuto: false 
        });
    });
    //register page bug fixes
    var currentPage = window.location.pathname.toLowerCase();
    if (currentPage == "/member/register.aspx") {
        $('#ctl00_ContentPlaceHolder1_ddlClassification').selectpicker({
            size: 5,
            selectOnTab: true,
            dropupAuto: false   
        });

        $( "#ctl00_ContentPlaceHolder1_updatePanel1 .dropdown-menu > li" ).click(function(e) {
            e.preventDefault();
            
            $(this).closest('.bootstrap-select').removeClass("open");
            $('.dropdown-toggle[data-id="ctl00_ContentPlaceHolder1_ddlClassification"]').attr("title",$(e.target).text());
            $('.dropdown-toggle[data-id="ctl00_ContentPlaceHolder1_ddlClassification"]').attr("aria-expanded","false");
            $('.dropdown-toggle .filter-option').html($(e.target).text());
            $('#ctl00_ContentPlaceHolder1_updatePanel1 .bootstrap-select .dropdown-menu').removeClass("open");
            $('#ctl00_ContentPlaceHolder1_updatePanel1 .bootstrap-select > ul.dropdown-menu').attr("aria-expanded","false");
            //remove selected class from all list elements
            $("#ctl00_ContentPlaceHolder1_updatePanel1 .dropdown-menu > ul > li").each(function () {
                $(this).removeClass("selected"); 
            });
            //add selected class to clicked list element
            $(this).addClass("selected");
            var selValue = $(this).attr("data-original-index");
            //getting DD clicked list element text
            var selText =  $(e.target).text();
            //remove pre-select value from actual DD
            $("#ctl00_ContentPlaceHolder1_ddlClassification > option").each(function () {
                if(this.text == selText) {
                    $("#ctl00_ContentPlaceHolder1_ddlClassification > option").removeAttr("selected");
                    $(this).attr('selected', 'selected');
                }
            });
            return false;   
        });
    }
    /*dropdowns flickering bug fixes*/
    //apply job CV label fixes
    if (window.location.pathname.toLowerCase().indexOf('/applyjob/') >= 0) {
        $('.boardy-resume-options h3').html('CV');
        $('#secExistingResume .control-label:contains("Upload Resume")').html('Upload CV');
        $('#ctl00_ContentPlaceHolder1_cvUseExiting label').html('<input value="resume3" name="ctl00$ContentPlaceHolder1$cvRadios" type="radio" id="rbExistingResume">Use existing CV');
        $('#divNewsletter label').text("I WOULD LIKE TO RECEIVE YUDU EMAILS ON INDUSTRY INFO, CAREER TIPS, UPDATES AND MORE.");
        $('#ctl00_ContentPlaceHolder1_ckNewsletter').attr('checked','checked');
        $('#divNewsletter').css('visibility','visible');
        setTimeout(function() {
            $("#ctl00_ContentPlaceHolder1_ddlResume").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        }, 500);
        //adding privacy and TC links at the bottom of the page
        $('.boardy-captcha-alert-terms').append('<div id="acpttxt"><p>By registering, I accept YUDU\'s <a href="/terms-of-use" target="_blank">terms of use</a> and <a href="/privacy-policy" target="_blank">privacy policy</a>.</p></div>');
    }
    var cvTemp = $('#rbUploadResume');
    $('#cvUploadResume label').html('Upload a CV').prepend(cvTemp);
    $('#cvUploadResume input').wrap('<span class="custom-radio"></span>');
    $('#cvUploadResume input').parent().append('<span></span>');
    $('#ctl00_ContentPlaceHolder1_tbExperienceAddState').attr('Placeholder', 'Region');
    $('#ctl00_ContentPlaceHolder1_tbDetailsState').attr('Placeholder', 'Region');
    $('#ctl00_ContentPlaceHolder1_ucJobFields_lbFriendlyUrl').html('Job Friendly URL');
    $('#ctl00_ContentPlaceHolder1_ucJobFields_txtFriendlyUrl').attr('Placeholder', 'Job Friendly URL*');
    $('#txtSalaryLowerBand').attr('Placeholder', 'Min');
    $('#txtSalaryUpperBand').attr('Placeholder', 'Max');
    $('.boardy-resume-options').css('visibility','visible');
    $('#secExistingResume').css('visibility','visible');
    //profile multi-select style fixes
    function set_multiselect_dd_style_fix() {
        setTimeout(function() {
            var arr_saved_val = $('#ctl00_ContentPlaceHolder1_hfRolePreferenceWorkType').val();
            $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceWorkType').multiselect({
                maxHeight: 200,
                numberDisplayed: 2,
                buttonClass: 'form-control'
            });
            $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceJobSubClassification').multiselect({
                maxHeight: 200,
                numberDisplayed: 2,
                buttonClass: 'form-control'
            });
            $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceDesiredRegion').multiselect({
                maxHeight: 200,
                numberDisplayed: 2,
                buttonClass: 'form-control'
            });
            $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceEligibleToWorkIn').multiselect({
                maxHeight: 200,
                numberDisplayed: 2,
                buttonClass: 'form-control'
            });
            //restore values and style for work type dropdown
            if($.trim(arr_saved_val).length) {
                arr_saved_val = arr_saved_val.split(',');
                $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceWorkType').multiselect('select', arr_saved_val);
            }
            //restore values and style for sub-classification dropdown
            arr_saved_val = $('#ctl00_ContentPlaceHolder1_hfRolePreferenceJobSubClassification').val();
            if($.trim(arr_saved_val).length) {
                arr_saved_val = arr_saved_val.split(',');
                $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceJobSubClassification').multiselect('select', arr_saved_val);
            }
            //restore values and style for desired region dropdown
            arr_saved_val = $('#ctl00_ContentPlaceHolder1_hfRolePreferenceDesiredRegion').val();
            if($.trim(arr_saved_val).length) {
                arr_saved_val = arr_saved_val.split(',');
                $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceDesiredRegion').multiselect('select', arr_saved_val);
            } 
             //restore values and style for eligible to work dropdown
             arr_saved_val = $('#ctl00_ContentPlaceHolder1_hfRolePreferenceEligibleWorkIn').val();
             if($.trim(arr_saved_val).length) {
                arr_saved_val = arr_saved_val.split(',');
                $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceEligibleToWorkIn').multiselect('select', arr_saved_val);
             }
        }, 200);
        $('#editRole .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
        $('#editRole .form-input .multiselect-group .btn-group').addClass('form-control');
        $('#ctl00_ContentPlaceHolder1_upProfession .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
        $('#ctl00_ContentPlaceHolder1_upProfession .form-input .multiselect-group .btn-group').addClass('form-control');
        $('#ctl00_ContentPlaceHolder1_upLocation .form-input .multiselect-group .btn-group').addClass('bootstrap-select');
        $('#ctl00_ContentPlaceHolder1_upLocation .form-input .multiselect-group .btn-group').addClass('form-control');
        $('.multiselect').css('text-align','left');
        $('.multiselect').css('padding','0 59px 0 13px');
    }
    /* GATED SEARCH RESULTS WIDGET  */
    if (window.location.pathname.toLowerCase().indexOf('/search-widget') >= 0) {
        setTimeout(function() {
            /*display bootstrap dropdowns*/
            $("#professionID1").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
            $("#locationID1").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        }, 500);

        var bshowProfessions = 1;
        var bshowLocation = 1;
        //show/hide profession
        if(getQParaByName('dd1') == 0) {
            bshowProfessions = 0;
            $(".search-widget.select-category").css("display","none"); 
        }
         //show/hide location
         if(getQParaByName('dd2') == 0) {
            bshowLocation = 0;
            $(".search-widget.select-location").css("display","none"); 
        }
        //hide profession list items based on querystring
        if(bshowProfessions == 1) {
            //get all professions to list into dropdown
            var strAllowedPros = getQParaByName('xpro');
            if(strAllowedPros && strAllowedPros.length > 0) {
                strAllowedPros = strAllowedPros.toLowerCase();
                //replace custom querystring separator variables with actual ones
                /*
                space -> -
                & -> _
                , -> --
                Advert/Media/Comm/Ent & Design  => Advert/Media/Comm/Ent_Design 
                Apprenticeships & Traineeships  => Apprenticeships_Traineeships
                Banking & Finance  => Banking_Finance 
                Call Centre & Customer Service  => Call-Centre-_-Customer-Service
                Community & Sports  => Community_Sports
                Construction & Architecture  => Construction_Architecture
                Education & Training  => Education_Training
                Government, Defence, Emergency  => Government--Defence--Emergency
                Healthcare & Medical  => Healthcare_Medical
                Hospitality, Tourism & Travel  => Hospitality--Tourism_Travel
                HR & Recruitment  => HR_Recruitment
                I.T. & T  => IT_T
                Insurance & Superannuation  => Insurance_Superannuation
                Mining, Oil & Gas  => Mining--Oil_Gas
                Primary Industry  => Primary-Industry
                Records, Information and Archives  => Records--Information-and-Archives
                Retail & Fashion  => Retail_Fashion
                Trades & Services  => Trades_Services
                Transport, Shipping, Logistics  => Transport--Shipping--Logistics
                */
               strAllowedPros = strAllowedPros.replace(/\--/g, ", ");
               strAllowedPros = strAllowedPros.replace("-", " ");
               strAllowedPros = strAllowedPros.replace(/\-/g, " ");
               strAllowedPros = strAllowedPros.replace(/\_/g, " & ");
               strAllowedPros = strAllowedPros.replace(/\  &  /g, " & ");
               strAllowedPros = strAllowedPros.replace("itt", "i.t. & t");

                //create comma separated values into array
                var arrProfessions = new Array();
                arrProfessions = strAllowedPros.split(";");
                 //remove all list options from bootstrap dropdowns
                $(".search-widget.select-category .dropdown-menu > ul > li").each(function () {
                    //remove all options other than in the querystring
                    if(jQuery.inArray($(this).text().toLowerCase(), arrProfessions) == -1) {
                        if($(this).attr("data-original-index") != 0) {
                            $(this).remove(); 
                        }
                    }
                });
                //remove all options from select dropdowns
                $("#professionID1 > option").each(function () {
                    //remove all options other than in the querystring
                    if(jQuery.inArray(this.text.toLowerCase(), arrProfessions) == -1) {
                        if(this.value != "-1") {
                            $(this).css("display","none"); 
                        }
                    }
                });         
            }
        }
        //hide profession list items based on querystring
        if(bshowLocation == 1) {
            //get all locations to list into dropdown
            var strAllowedLocations = getQParaByName('xloc');
            if(strAllowedLocations && strAllowedLocations.length > 0) {
                strAllowedLocations = strAllowedLocations.toLowerCase();
                strAllowedLocations = strAllowedLocations.replace(/\-/g, " ");
                //create comma separated values into array
                var arrlocations = new Array();
                arrlocations = strAllowedLocations.split(";");
                //remove all list options from bootstrap dropdowns
                $(".search-widget.select-location .dropdown-menu > ul > li").each(function () {
                    //remove all options other than in the querystring
                    if(jQuery.inArray($(this).text().toLowerCase(), arrlocations) == -1) {
                        if($(this).attr("data-original-index") != 0) {
                            $(this).remove(); 
                        }
                    }
                });
                //remove all options from select dropdowns
                $("#locationID1 > option").each(function () {
                    //remove all options other than in the querystring
                    if(jQuery.inArray(this.text.toLowerCase(), arrlocations) == -1) {
                        if(this.value != "-1") {
                            $(this).css("display","none"); 
                        }
                    }
                });   
            }
        }
    }
    /* GATED SEARCH RESULTS WIDGET  */
    //get querystring variables
    function getQParaByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    //google translator hack
    $(".boardy-GroupStatus-withMenu .GroupStatus-registerBefore a").addClass("notranslate");
    $(".boardy-popcontent").addClass("notranslate");
    $('#rbUploadResume').click(function() {
        $('#secExistingResume').css("display","block");
         $('#secUploadResume').css("display","none");
    });
    $('#rbExistingResume').click(function() {
        $('#secUploadResume').css("display","block");
        $('#secExistingResume').css("display","none");
    });
    /*Lotame analytic code added*/
     if( $('.site-login .GroupStatus-profilepic').length ) {
        if( $('#lotamepx').length ) {
            if($('#lotamepx').attr("src") == "") {
                var strUserID_API_URL = "";
                var profile_img = $('.site-login .GroupStatus-profilepic img').attr("src");
                if (profile_img.indexOf("Profile_") >= 0) {
                    //For candidate account pixel tracking
                    var arr_profile_img = profile_img.split("Profile_");
                    var arr_proile_ID = arr_profile_img[1].split(".");
                    $('#lotamepx').attr("src","https://bcp.crwdcntrl.net/5/c=12052/tp=YUDU/tpid=000"+arr_proile_ID[0]+"/seg=YUDU_Candidate_LogIn");
                }
                if (profile_img.indexOf("Companies_") >= 0) {
                    //For advertiser account pixel tracking
                    var arr_profile_img = profile_img.split("Companies_");
                    var arr_proile_ID = arr_profile_img[1].split(".");
                    $('#lotamepx').attr("src","https://bcp.crwdcntrl.net/5/c=12052/tp=YUDU/tpid=000"+arr_proile_ID[0]+"/seg=YUDU_Employer_LogIn");
                }
            }
        }
    }
    //added list sorting on dropdown mouseover
    if (window.location.pathname.toLowerCase().indexOf('/productselect.aspx') <= 0) {
        $('.bootstrap-select').mouseover(function() {
            //for profession dropdowns only
            if($(".bootstrap-select").find("#professionID1").length || $(".bootstrap-select").find("#professionID2").length 
                || $(".bootstrap-select").find("#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession").length  
                || $(".bootstrap-select").find("#ctl00_ContentPlaceHolder1_ucJobFields_ddlProfession1").length ) {
                var elem = $(this).find("ul.dropdown-menu");
                sortProfessionList(elem);
            }
        });
    }
    //for candidate job alerts
    $('#search-classification').mouseover(function() {
        //for profession dropdowns only
        if($(this).find('#ctl00_ContentPlaceHolder1_ucJobAlert1_upProfession').length) {
            if($(this).find(".classifications-container").length) {
                var parElem = $(this).find(".classifications-container .bootstrap-select");
                var elem = parElem.find("ul.dropdown-menu");
                sortProfessionList(elem);
            }
        }
   });
   $("#ctl00_ContentPlaceHolder1_ucJobAlert1_lbProfession").text("Classification");
   /*to be removed*/
   if (window.location.pathname.toLowerCase().indexOf('test-1click-homepage-module') >= 0) {
        $("#dynamic-container").css("position","absolute");
   }
   /*to be removed*/
   /*Archived Jobs paging dropdown fixes*/
   if (window.location.pathname.toLowerCase().indexOf('/company/jobsarchived.aspx') >= 0) {
        $('.bootstrap-select').mouseover(function() {
            $("#Select1").selectpicker({
                size: 5,
                selectOnTab: true,
                dropupAuto: false 
            });
        });
        $('#ctl00_ContentPlaceHolder1_ucHistoricalJobStatistics1_ddlDuration').change(function() {
            if($(this).val()==1) {
                var selected_val = $('[data-id="ctl00_ContentPlaceHolder1_ucHistoricalJobStatistics1_ddlDuration"]').attr("title");
                var str_duration = 1;
                if(selected_val == '1 Week') {
                    str_duration = 7;
                }
                else if(selected_val == '1 Month') {
                    str_duration = 30;
                }
                else if(selected_val == '3 Months') {
                    str_duration = 90;
                }
                else if(selected_val == '6 Months') {
                    str_duration = 180;
                }
                $("#ctl00_ContentPlaceHolder1_ucHistoricalJobStatistics1_ddlDuration").val(str_duration);
            }
          });
    }
   /*Archived Jobs paging dropdown fixes*/
   /*Check-out page fixes to avoid multi-click on Order button*/
   if (window.location.pathname.toLowerCase().indexOf('orderpayment.aspx') >= 0) {
        $('#ctl00_ContentPlaceHolder1_btnCompleteOrder').click(function (e) {
            $('#ctl00_ContentPlaceHolder1_btnCompleteOrder').css("display","none");
            $('#ctl00_ContentPlaceHolder1_btnPrevious').css("display","none");
            $("section:nth-child(2)").prepend("<p class='mini-new-buttons jxt-form-previous pull-right btn btn-primary' style='float:right;'>Processing Order...</p>");
            $('#content').css("cursor","progress");
        });
    }

    //fix for drop-downs, safari browsers only
   if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)  {
       $("select").change(function() {
           DDctrl = $(this);
           $(this).find("option").each(function() {
               if($(this).attr('selected') == "selected") {
                   $(DDctrl).val($(this).val());
               }
           });
       });
   }
});
function TJgtagPush(action,classification,position,listingID) {
    var topJobType = "nzmeiframe";
    var str_info;
    var arr_info;
    //checking if top jobs are on YUDU homepage/iframe/search
    //set carousel parent page type
    if($("#myJobsList").length == 0) {
        if ((window.location.pathname.toLowerCase().indexOf("/advancedsearch.aspx") >= 0)) {
            topJobType = "searchpage";
        }
    }
    else {
        //get data-string to set carousel parent page type
        var carouselType = $("#myJobsList").attr("data-string");
        if(carouselType) {
            carouselType = carouselType.replace("?carouseltype=","").toLowerCase().trim();
            if(carouselType.indexOf("homepage")>=0) {
                topJobType = "homepage";
            }    
        }
        if (typeof $("#myJobsList").data('tag') !== 'undefined')  {
            topJobType = "careerhubpage";
        }
    }
    //setting delay so slider can prepare DOM in order to get correct analytics
    setTimeout(function() {
        if(classification === "" && position === "" & listingID === "") {
            if(topJobType == "searchpage") {
                str_info = $(".slick-current .jobcontent p a").attr('href');
                arr_info = str_info.split('/');
                action = action.replace('left-arrow-click','arrow click');
                action = action.replace('right-arrow-click','arrow click');
            }
            else {
                //slider previous arrow click
                if(action === 'left-arrow-click') {
                    $( ".slick-active .jobcontent p a" ).each(function( index ) {
                        if(index == 0) {
                            str_info = $(this).attr('href');
                            arr_info = str_info.split('/');
                        }
                    });
                    action = action.replace('left-arrow-click','arrow click');
                }
                else {
                    $( ".slick-active .jobcontent p a" ).each(function( index ) {
                        str_info = $(this).attr('href');
                        arr_info = str_info.split('/');
                    });
                    action = action.replace('right-arrow-click','arrow click');
                }
            }
            if(classification === "") {
                classification = arr_info[1];
            }
            position = arr_info[2];
            listingID = arr_info[3];
        }
        //push all informaiton to gTag manager
        dataLayer.push({
            "event":"top-jobs-impression" , 
            "top_job_type": topJobType, 
            "imp_type":  action, 
            "classification": classification, 
            "position": position , 
            "listingid": listingID
        });
    }, 500);
}
function sortArrayByValue(Arr,ToSortBy){
    Arr.sort(function(a, b){
        var a1= a[ToSortBy].toLowerCase(), b1= b[ToSortBy].toLowerCase();
        if(a1== b1) return 0;
        return a1> b1? 1: -1;
    });
}
function sortProfessionList($elem) {
    var $li = $elem.find('li'),
    $listLi = $($li,$elem).get();
    $listLi.sort(function(a, b){
        var keyA = $(a).text().toUpperCase();
        var keyB = $(b).text().toUpperCase();
        if($(a).attr("data-original-index") != 0) {
            return (keyA < keyB) ? -1 : 1;
            //uncomment below and comment above if you want descending order
            //return (keyA > keyB) ? -1 : 1;
        }
    });
}