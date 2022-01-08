var modal = document.getElementById('original-Modal');
var imgIcon = document.getElementsByClassName('image-thumbnail');
var modalImg = document.getElementById('modal-image');
var captionText = document.getElementById('caption');

// Looping through each of the thumbnail images in the gallery
for (i=0;i<imgIcon.length;i++)
{
  imgIcon[i].addEventListener('click',function(){
  // Injects the clicked image into the modal via the HTML src (URL) property
  modalImg.src = this.src;
  // Injects the caption of the clicked image into the modal via the HTML alt property
  modalImg.caption = this.alt;
  console.log('Modal Image source:',modalImg.src);
  console.log('Modal Image Caption:',modalImg.caption);
  // Displays the modal over the current page
  modal.style.display = 'block';
  captionText.innerHTML = modalImg.caption;
  });
}

var span = document.getElementsByClassName('close')[0];
// Hides the modal, once the close icon is clicked
span.onclick = function()
{
  modal.style.display = 'none'
}
