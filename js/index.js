$(function(){
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    $('.btn_ready').on('click', function () {
        alert('서비스 준비중이오니 양해 부탁드립니다.');
        return;
      });

    // $(".regular").slick({
        /* dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1 */
    //     lazyLoad: 'ondemand', // ondemand progressive anticipated
    //     infinite: true
    // });
  });