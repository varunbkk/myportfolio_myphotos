const filterBoxes = document.querySelectorAll('input[type=checkbox]');
// const filterCheckbox = document.getElementsByClassName('filter-checkbox')
const deselectBtn = document.getElementById('deselect-button');
const selectAllBtn = document.getElementById('select-all-button');

// Gets the value of each category and injects it into myArray
selectAllBtn.addEventListener('click',function(){
  const myArray = [];
  filterBoxes.forEach((item) => {
    item.checked = true;
    myArray.push(item.value);
  });

  // Creating the dictionary that is passed to Django via Ajax
  var filterArray = {'category':myArray}
  console.log(filterArray);
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

    $('#search-box').attr("disabled",false);
    $('#original-output').fadeOut(600);
    $("#filter-result").fadeOut(600, function() {
          setTimeout(function(){
             $('#filter-result').fadeIn(600);
             $('#filter-result').html(data.filter_result);
        });
      });

  });
  selectAllBtn.disabled = true;
  deselectBtn.disabled = false;
});

// None button clears the filter selection, ajax divs and displays the original output div
deselectBtn.addEventListener('click',function(){
  filterBoxes.forEach((item) => {
  item.checked = false;
  $("input:text").val("");
  $('#search-box').attr("disabled",true);
  $('#original-output').fadeIn(600);
  $('#filter-result').empty();
  $('#search-result').empty();
  });
  deselectBtn.disabled = true;
  selectAllBtn.disabled = false;
});
