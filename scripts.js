
document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio website loaded successfully.");

    // Attach click listeners to all project images
    const projectImages = document.querySelectorAll(".project-image");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    projectImages.forEach(imageDiv => {
        imageDiv.addEventListener("click", function () {
            const imgSrc = imageDiv.querySelector("img").src;
            modalImg.src = imgSrc;
            modal.classList.add("active");
        });
    });

    // Close modal on click anywhere in the modal
    modal.addEventListener("click", function () {
        modal.classList.remove("active");
    });
});

