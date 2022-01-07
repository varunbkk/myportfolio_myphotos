$(document).ready(function(){
  $('.filter-checkbox').on('click',function(){
    var filterArray = {};
    $('.filter-checkbox').each(function(index,element){
      var filterValue = $(this).val()
      var filterKey = $(this).data('filter');
      filterArray[filterKey]=Array.from(document.querySelectorAll('input[data-filter='+filterKey+']:checked')).map(function(e){
			 	return e.value;
			});
    });

    console.log('FilterArray:',filterArray);
    var filterArrayLength = filterArray['category'].length
    sessionStorage.setItem('length',filterArrayLength)
    console.log('filterArrayLength:',filterArray['category'].length);
    const url = '/filter_photos/'
    $.ajax({
      url:url,
      type:'GET',
      headers:{
        'X-Requested-With':'XMLHttpRequest'
      },
      data:{'filterArray':filterArray['category']}
    }).done(function(data){
      console.log('Data:',data);

      if (filterArrayLength > 0)
      {
        deselectBtn.disabled = false;
        $('#search-box').attr("disabled",false);
        $('#original-output').fadeOut(600);
        $("#filter-result").fadeOut(600, function() {
              setTimeout(function(){
                 $('#filter-result').fadeIn(600);
                 $('#filter-result').html(data.filter_result);
            });
          });
      }
      else
      {
        deselectBtn.disabled = true;
        $('#search-box').attr("disabled",true);
         $('#filter-result').fadeOut(600,function(){
           setTimeout(function(){
             $('#original-output').fadeIn(600);
             $('#filter-result').empty();
           });
         });
        $('#search-result').empty();
      }
    });
  });
});
