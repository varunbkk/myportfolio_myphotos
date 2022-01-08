var clrIcon = document.getElementById('clear-icon');
clrIcon.addEventListener('click',function(){
  console.log('Clear Icon clicked');
  $("input:text").val("");
  deselectBtn.disabled = false;
  var total_checked = 0
  filterBoxes.forEach((item) => {
    if (item.checked == true)
    {
      total_checked +=1;
    }
  });
  console.log('Total boxes checked:',total_checked);
  if (total_checked < 3)
  {
    selectAllBtn.disabled = false;
  }
  else
  {
    selectAllBtn.disabled = true;
  }
  $('.filter-checkbox').attr("disabled",false);
  $('#search-result').fadeOut(250,function(){
    setTimeout(function(){
      $('#filter-result').fadeIn(250);
      $('#search-result').empty();
    });
  });
  clrIcon.style.display = 'none';
});
