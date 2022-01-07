
var modal = document.getElementById('original-Modal');
var imgIcon = document.getElementsByClassName('image-thumbnail');
var modalImg = document.getElementById('modal-image');
var captionText = document.getElementById('caption');

for (i=0;i<imgIcon.length;i++)
{
  imgIcon[i].addEventListener('click',function(){
  modalImg.src = this.src;
  modalImg.caption = this.alt;
  console.log('Modal Image source:',modalImg.src);
  console.log('Modal Image Caption:',modalImg.caption);
  modal.style.display = 'block';
  captionText.innerHTML = modalImg.caption;
  });
}
var span = document.getElementsByClassName('close')[0];
span.onclick = function()
{
  modal.style.display = 'none'
}
