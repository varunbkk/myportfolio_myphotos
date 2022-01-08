const searchInput = document.querySelector('#search-input');

// Listens for the key presses i.e. text the user is typing
searchInput.addEventListener('keyup',(e) => {
  // Extracts the value of the key being pressed

  var searchValue = e.target.value;
  var ms = 250;
  var timer;
  clearTimeout(timer);
  timer = setTimeout(function(){
    lookup(searchValue);
  },ms);

});

function lookup(searchValue)
{
  const url = '/search_photos/'

  if (searchValue.trim().length > 0)
  {
    console.log(searchValue.length);
    clrIcon.style.display = 'block';
    deselectBtn.disabled = true;
    $('.filter-checkbox').attr("disabled",true);
    var filterArray = {}
    $('.filter-checkbox').each(function(index,element){
      var filterValue = $(this).val()
      var filterKey = $(this).data('filter');
      filterArray[filterKey]=Array.from(document.querySelectorAll('input[data-filter='+filterKey+']:checked')).map(function(e){
        return e.value;
      });
    });
    var filterArrayLength = filterArray['category'].length;
    console.log('filterArray:',filterArray['category']);
    console.log('Array Length:',filterArrayLength);
    console.log('SearchValue:',searchValue);
    $.ajax({
      url:url,
      type:'GET',
      headers:{
        'X-Requested-With':'XMLHttpRequest'
      },
      data:{'searchValue':searchValue,'filterArray':filterArray['category']}
    }).done(function(data){
      console.log('Data:',data);
      if (data.length ==0)
      {
          $('#filter-result').hide();
          $('#search-result').show();
      }
      else
      {
          //$('#original-output').hide();

          $('#filter-result').hide();
          $('#search-result').html(data.filter_search_result);
          $('#search-result').show();

          // $('#filter-result').fadeOut(250);
          // $("#search-result").fadeOut(250, function() {
          //       setTimeout(function(){
          //          $('#search-result').fadeIn(250);
          //          $('#search-result').html(data.filter_search_result);
          //     });
          //   });

      }
    });
  }
  else
  {
      clrIcon.style.display = 'none';
      deselectBtn.disabled = false;
      $('.filter-checkbox').attr("disabled",false);
      //$('#original-output').hide();
      $('#search-result').fadeOut(250,function(){
        setTimeout(function(){
          $('#filter-result').fadeIn(250);
          $('#search-result').empty();
        });
      });
  }
}
