const filterBoxes = document.querySelectorAll('input[type=checkbox]');
const deselectBtn = document.getElementById('deselect-button')
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
});
