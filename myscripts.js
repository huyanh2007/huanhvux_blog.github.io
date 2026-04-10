const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const modalVid = document.getElementById("vid01");
const closeBtn = document.querySelector(".close-btn");
const zoomBtn = document.getElementById("zoomBtn");
const downloadBtn = document.getElementById("downloadBtn");
const mediaItems = document.querySelectorAll(".media-item");

let currentMediaSrc = "";
let isZoomed = false; 

// Khi click vào ảnh/video nhỏ bên ngoài
mediaItems.forEach(item => {
    item.addEventListener("click", function() {
        modal.style.display = "block";
        currentMediaSrc = this.src;

        // XÓA TRẠNG THÁI ZOOM CŨ
        isZoomed = false;
        modalImg.classList.remove("zoomed");
        modalImg.style.width = "auto";
        modalImg.style.height = "auto";
        zoomBtn.innerHTML = "🔍 Phóng kích thước thật";

        // KIỂM TRA LÀ ẢNH HAY VIDEO
        if (this.tagName === "IMG") {
            modalImg.style.display = "block";
            modalVid.style.display = "none";
            modalImg.src = this.src;
            zoomBtn.style.display = "inline-block"; // Hiện nút zoom cho ảnh
        } 
        else if (this.tagName === "VIDEO") {
            modalVid.style.display = "block";
            modalImg.style.display = "none";
            modalVid.src = this.src;
            zoomBtn.style.display = "none"; // Ẩn nút zoom (vì video có nút full màn hình riêng)
            modalVid.play(); // Tự động chạy video
        }
    });
});

// Chức năng Đóng
closeBtn.addEventListener("click", closeModal);
document.querySelector('.modal-content-wrapper').addEventListener("click", function(e) {
    if(e.target !== modalImg && e.target !== modalVid) { 
        closeModal();
    }
});

function closeModal() {
    modal.style.display = "none";
    modalVid.pause(); // Tắt video khi đóng
    modalVid.currentTime = 0; // Tua lại từ đầu
}

// Chức năng Phóng to (Chỉ dành cho ẢNH)
zoomBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    isZoomed = !isZoomed; 
    
    if (isZoomed) {
        modalImg.classList.add("zoomed");
        modalImg.style.width = modalImg.naturalWidth + "px";
        modalImg.style.height = modalImg.naturalHeight + "px";
        zoomBtn.innerHTML = "🔍 Thu nhỏ lại vừa màn hình";
    } else {
        modalImg.classList.remove("zoomed");
        modalImg.style.width = "auto";
        modalImg.style.height = "auto";
        zoomBtn.innerHTML = "🔍 Phóng kích thước thật";
    }
});

// Chức năng Tải về (Hoạt động cho cả ẢNH và VIDEO trên Cloudinary)
downloadBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    let downloadUrl = currentMediaSrc;

    // Ép tải xuống cho Cloudinary
    if (downloadUrl.includes("cloudinary.com/")) {
        let parts = downloadUrl.split("/upload/");
        if (parts.length === 2 && !parts[1].includes("fl_attachment")) {
            downloadUrl = parts[0] + "/upload/fl_attachment/" + parts[1];
        }
    }
    window.open(downloadUrl, "_blank");
});