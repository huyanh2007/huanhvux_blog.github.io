// Lấy các phần tử HTML
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const modalVid = document.getElementById("vid01");
const closeBtn = document.querySelector(".close-btn");
const zoomBtn = document.getElementById("zoomBtn");
const downloadBtn = document.getElementById("downloadBtn");
const mediaItems = document.querySelectorAll(".media-item");

let currentZoom = 1;
let currentMediaSrc = "";

// Lặp qua tất cả ảnh/video có class 'media-item'
mediaItems.forEach(item => {
    item.addEventListener("click", function() {
        modal.style.display = "block";
        currentZoom = 1; // Reset zoom
        modalImg.style.transform = `scale(${currentZoom})`;
        modalVid.style.transform = `scale(${currentZoom})`;

        currentMediaSrc = this.src;

        // Kiểm tra xem là ảnh hay video
        if (this.tagName === "IMG") {
            modalImg.style.display = "block";
            modalVid.style.display = "none";
            modalImg.src = this.src;
        } else if (this.tagName === "VIDEO") {
            modalVid.style.display = "block";
            modalImg.style.display = "none";
            modalVid.src = this.src;
            modalVid.play();
        }
    });
});

// Chức năng Đóng
closeBtn.addEventListener("click", closeModal);
// Đóng khi click ra ngoài ảnh
modal.addEventListener("click", function(e) {
    if(e.target === modal || e.target === document.querySelector('.modal-content-wrapper')) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = "none";
    modalVid.pause(); // Dừng video nếu đang chạy
    modalVid.currentTime = 0;
}

// Chức năng Phóng to (Zoom)
zoomBtn.addEventListener("click", function(e) {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài làm đóng modal
    currentZoom += 0.5; // Mỗi lần bấm tăng thêm 0.5
    if (currentZoom > 3) currentZoom = 1; // Nếu to quá thì quay lại ban đầu
    
    modalImg.style.transform = `scale(${currentZoom})`;
    modalVid.style.transform = `scale(${currentZoom})`;
});

// Chức năng Tải về (Download)
downloadBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    
    // Tạo 1 thẻ a ảo để kích hoạt chức năng tải file
    const link = document.createElement("a");
    link.href = currentMediaSrc;
    // Lấy tên file từ đường dẫn để lưu
    link.download = currentMediaSrc.split('/').pop() || "download"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});