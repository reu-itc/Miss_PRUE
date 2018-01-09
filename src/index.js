$(function() {
    $('#phone').mask('+7 (000) 000-00-00', { clearIfNotMatch: true });

    var borderHeight = 2;
    $('textarea')
        .css({
            height: this.scrollHeight + borderHeight + 'px',
            'overflow-y': 'hidden'
        })
        .on('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + borderHeight + 'px';
        });

    $('#vklink').mask('httpS://vk.com/99999000000000000000000000000000', {
        clearIfNotMatch: true,
        translation: {
            '0': { pattern: /[A-Za-z0-9_]/, optional: true },
            '9': { pattern: /[A-Za-z0-9_]/ },
            S: { pattern: /[s]/, optional: true }
        }
    });

    $('#photos').change(function(event) {
        var photosCount = $('#photos')[0].files.length;
        $('#photos-count').html(photosCount);
    });

    $('#scroll-hint').click(function() {
        $('html, body').animate(
            {
                scrollTop: $(window).height()
            },
            {
                duration: 200,
                easing: 'swing'
            }
        );
    });

    $('#form').validate({
        rules: {
            fio: {
                required: true,
                maxlength: 256
            },
            kurs: 'selectNotDefault',
            fakultet: 'selectNotDefault',
            vklink: {
                required: true,
                maxlength: 256
            },
            hobbies: {
                required: true,
                maxlength: 1024
            },
            mr_reu_2018: {
                required: true,
                maxlength: 1024
            },
            phone: {
                required: true,
                maxlength: 1024
            },
            height: {
                required: true,
                number: true,
                range: [140, 230]
            }
        },
        submitHandler: function(form) {
            var isYearValid = $('#year')[0].value !== 'unset';
            var isFacultyValid = $('#faculty')[0].value !== 'unset';

            if (isYearValid && isFacultyValid) {
                form.submit();
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });
});

$.validator.addMethod(
    'selectNotDefault',
    function(value, element) {
        console.log(value, element);
        return this.optional(element) || value !== 'unset';
    },
    $.validator.format('Please select a value')
);

$.extend($.validator.messages, {
    required: 'Заполни это поле',
    maxlength: 'В это поле нельзя ввести больше {0} символов',
    number: $.validator.format('Введи корректное число'),
    range: $.validator.format('Введи значение между {0} и {1}'),
    selectNotDefault: 'Выбери значение'
});
