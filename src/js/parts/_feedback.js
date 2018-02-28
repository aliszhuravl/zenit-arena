$(function() {

    var oFeedback = {
        // Const
        HREF_SEND_EMAIL: 'ajax/index.php?action=feedback:send',

        // Variables

        // DOM
        form: $('#form-feedback'),
        btnSend: $('.j_send_feedback'),
        btnAddFile: $('.j_add_file'),
        inputFile: $('#file-upload'),
        fileNameWrapper: $('.j_file_name'),


        init: function() {

            this.btnSend.on('click', function() {
                oFeedback.form.trigger('submit');
            });

            this.form.on('submit', function() {
                var sName = oFeedback.form.find('input[name=name]').val(),
                    sMessage = oFeedback.form.find('textarea[name=message]').val(),
                    aFile = oFeedback.inputFile.prop('files')[0],
                    form_data = false;

                if (window.FormData) {
                    form_data = new FormData();

                    if (aFile) {
                        form_data.append('file', aFile);
                    }
                    form_data.append('name', sName);
                    form_data.append('message', sMessage);
                }

                $.ajax({
                    url: oFeedback.HREF_SEND_EMAIL,
                    type: 'POST',
                    data: form_data,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(oResponse) {
                        if (oResponse.status == 'ok') {
                            oFeedback.showMsg(oResponse);
                        } else if (oResponse.status == 'error') {
                            if (oResponse.data.length > 0) {
                                $.each(oResponse.data, function(index, element) {
                                    oFeedback.form.find('input[name=' + element + ']').addClass('invalid');
                                    oFeedback.form.find('textarea[name=' + element + ']').addClass('invalid');
                                });
                            } else if (oResponse.message) {
                                oFeedback.showMsg(oResponse);
                            }
                        }
                    }
                });

                return false;
            });

            this.form.on('click', 'input, textarea', function() {
                $(this).removeClass('invalid');
            });

            this.btnAddFile.on('click', function() {
                oFeedback.inputFile.trigger('click');
            });

            this.inputFile.on('change', function() {
                var aFile = $(this).prop('files')[0];

                oFeedback.fileNameWrapper.html(aFile.name + ' добавлен');
            });

        },

        showMsg: function(oResponse) {
            oFeedback.form.append('<div class="j_response">' + oResponse.message + '</div>');

            document.getElementById('form-feedback').reset();
            oFeedback.fileNameWrapper.html('');

            setTimeout(function(){
                oFeedback.form.find('.j_response').stop(true, true);
                oFeedback.form.find('.j_response').animate({
                    opacity: 0
                }, {
                    queue: true,
                    duration: 600,
                    complete: function() {
                        $(this).remove();
                    }
                });
            }, 2000);
        }
    };

    oFeedback.init();
});