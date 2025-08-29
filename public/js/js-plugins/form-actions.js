$(function () {
    "use strict";

    $('.subscribe-form').on("submit", function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            email = $.trim($form.find('input[name="email"]').val()),
            _csrf = $.trim($form.find('input[name="_csrf"]').val()),
            url = $form.attr("action");

        // Send the data using post
        var posting = $.post(url, {"email": email,_csrf :_csrf});

        // Put the results in a div
        posting.done(function (results) {
            if (results.success === true) {
                 $form.html('<h4 class="subscribe-title" style="margin-bottom: 25px; line-height: 56px;">Thank you for subscription!</h4>').fadeTo(300, 1);
                $form[0].reset(); // Reset the form fields
                $('#error').html('').fadeTo(300, 0); // Clear any previous error
                return;
            }else{
                $('#error').html('<h4 style="color:red">'+results.message+'</h4>').fadeTo(300, 1);
            }
           
        });

    });
	
	$('.seo-score-form').on("submit", function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            email = $.trim($form.find('input[name="email"]').val()),
			permalink = ($form.find('input[name="permalink"]').length) ? $.trim($form.find('input[name="permalink"]').val()) : '',
            url = $form.attr("action");

        // Send the data using post
        var posting = $.post(url, {'email': email, 'permalink': permalink});

        // Put the results in a div
        posting.done(function () {
            $form.html('<h4 style="color:inherit">Thank you for the message!</h4>').fadeTo(300, 1);
        });

    });

    $('#contact-form').on("submit", function (event) {

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            name = $.trim($form.find('input[name="name"]').val()),
            email = $.trim($form.find('input[name="email"]').val()),

            phone = ($form.find('input[name="phone"]').length) ? $.trim($form.find('input[name="phone"]').val()) : '',
            for_url = ($form.find('input[name="url"]').length) ? $.trim($form.find('input[name="url"]').val()) : '',
            message = $.trim($form.find('textarea[name="message"]').val()),
            _csrf = $.trim($form.find('input[name="_csrf"]').val()),
            url = $form.attr("action");

        // Send the data using post
        var posting = $.post(url, {'name': name, 'email': email, 'message': message, 'phone': phone, 'url': for_url,'_csrf':_csrf}, function (data) {
           // console.log(data, 'data');
        });

        // Put the results in a div
        posting.done(function (results) {
           // console.log(results, 'results');
            if (results.success === true) {
                $form.html('<h4>Thanks for reaching out to us. We’ll get back to you shortly!</h4>').fadeTo(300, 1);
               $('#contact-form')[0].reset(); // Reset the form fields
               $form.find('input[name="phone"]').val('');
               $form.find('input[name="email"]').val('');
               $form.find('input[name="phone"]').val('');
               $form.find('input[name="url"]').val('');
               $form.find('textarea[name="message"]').val('');
                $('#error').html('').fadeTo(300, 0); // Clear any previous error
                return;
            }else{
                $('#error').html('<h4 style="color:red">There was an error submitting your message. Please try again later.</h4>').fadeTo(300, 1);
            }
            
        });

    });

});

