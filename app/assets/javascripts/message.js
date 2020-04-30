$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="main-chat__message-info__name-time">
          <div class="main-chat__message-info__name-time__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-info__name-time__time">
            ${message.created_at}
          </div>
          </div>
          <div class="main-chat__message-info__content">
            <p class="main-chat__message-info__content__text">
              ${message.content}
            </p>
          </div>
          <img class="main-chat__message-info__content__image" src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-chat__message-info__name-time">
          <div class="main-chat__message-info__name-time__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-info__name-time__time">
            ${message.created_at}
          </div>
          </div>
          <div class="main-chat__message-info__content">
            <p class="main-chat__message-info__content__text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData( this );
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
        $('.main-chat__message-info').append(html);
        $('.main-chat__message-info').animate({ scrollTop: $('.main-chat__message-info')[0].scrollHeight});
        $('.new_message')[0].reset();
        $('.main-chat__message-form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});