document.querySelectorAll('.project .thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        this.parentNode.querySelector('.full-image').classList.toggle('active');
    });
});
