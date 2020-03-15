$(function(){
  // フロートヘッダーメニュー
  // ヒーローイメージより下にスクロールするとヘッダーの背景色と文字色を変更する
  let targetHeight = $('.js-float-menu-target').height();
  $(window).on('scroll', function() {
    $('.js-float-menu').toggleClass('p-header--active', $(this).scrollTop() >= targetHeight);
  });

  // カテゴリセレクト
  $('.js-category-select').on('click',function(){
    if($(this).hasClass('p-categories__item--active')){

    } else {
      // 選択したカテゴリのdata-category属性を取得する
      let category = $(this).attr('data-category');

      // 選択したカテゴリの装飾
      $(this).siblings().removeClass('p-categories__item--active');
      $(this).addClass('p-categories__item--active');

      // 選択したカテゴリがALLかどうかで条件分岐
      if(category == 'all'){
        // ALLの場合
        setTimeout(function(){
          $('.js-category-target').children().fadeIn();
        },500);  
      } else {
        // ALL以外の場合、対応するdata-categoryのオブジェクトを表示する
        // 500ミリ秒で対象外のカテゴリを非表示にし、500ミリ秒後に500ミリ秒かけて対象のカテゴリを表示する
        // 500ミリ秒 = .5秒
        $('.js-category-target').children().not(`[data-category~="` + category + `"]`).fadeOut(500);
        setTimeout(function(){
          $('.js-category-target').children().filter(`[data-category~="` + category + `"]`).fadeIn(500);
        },500);
      } 
    }
  });

  // モーダル表示
  $('.js-show-modal').on('click',function(){
    // 表示するモーダルのdata属性を取得する
    let modal_num = $(this).attr('data-modal-num');
    
    $('.js-show-modal-cover').fadeIn("fast");
    $('.js-show-modal-cover').attr('data-modal-num',modal_num);

    $('.js-show-modal-target-' + modal_num).fadeIn("fast");
    
  })

  // モーダル非表示
  $('.js-close-modal').on('click',function(){
    // 表示中のモーダルのdata属性を取得する
    let modal_num = $(this).attr('data-modal-num');

    $('.js-show-modal-cover').fadeOut("fast");
    $('.js-show-modal-target-' + modal_num).fadeOut("fast");
  })
})