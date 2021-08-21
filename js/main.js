(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a, .toContact").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 70
            }, 1500, 'easeInOutExpo');
            
            $("#navbarCollapse").collapse('hide');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    

    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(e){

        $(".contact-form-btn").html("<i class='fa fa-circle-o-notch fa-spin'></i> Loading...");
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }
        if(!check)
            return false;

        e.preventDefault();
      
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxtaqrgJYHhX94t1W69CRpz7R4ZGTFOVJJHGTn7RJfLMPtQpPVo97mmVghPMHYobLr_/exec",
            method: "POST",
            dataType: "json",
            data: $(".contact-form").serialize(),
            success: function(response) {
                
                if(response.result == "success") {
                    $('.contact-form')[0].reset();
                    alert('Thank you for contacting us.');
                    $(".contact-form-btn").html("Submit");
                    $(".form-success").show();
                    return true;
                }
                else {
                    $(".form-error").css('display', 'block');
                    $(".contact-form-btn").html("Submit");
                    alert("Something went wrong. Please try again. You can also email us manually.")
                }
            },
            error: function() {
                $(".form-error").css('display', 'block');
                $(".contact-form-btn").html("Submit");
                alert("Something went wrong. Please try again. You can also email us manually.")
            }
        })
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(".contact-form-btn").html("Submit");
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(".contact-form-btn").html("Submit");
        $(thisAlert).removeClass('alert-validate');
    }
    

    $(document).mouseup(function(e) 
    {
        var container = $("#navbarCollapse");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 ) 
        {
            container.collapse('hide');
        }
    });
    
    $(".navbar-nav a").mouseup(function() {
        // $("#navbarCollapse").collapse('hide');
    });
    
})(jQuery);