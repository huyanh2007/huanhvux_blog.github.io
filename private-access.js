document.addEventListener("DOMContentLoaded", () => {

    const content = document.getElementById("privateContent");
    const overlay = document.getElementById("privateOverlay");
    const nameInput = document.getElementById("privateName");
    const submitButton = document.getElementById("privateSubmit");
    const errorMessage = document.getElementById("privateError");


    /*
     * Danh sách những người được phép truy cập.
     *
     * Lưu ý:
     * Đây KHÔNG phải cơ chế bảo mật thực sự.
     */
    const allowedNames = [
        "Vũ Huy Anh",
        "Tào Tuệ Mỹ",
        "Đinh Nguyễn Ngọc Quang"
    ];


    /*
     * Chuẩn hóa tên:
     *
     * "  Nguyễn Văn A  "
     *
     * sẽ thành:
     *
     * "nguyễn văn a"
     */
    function normalizeName(name) {

        return name
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }


    /*
     * Kiểm tra tên
     */
    function checkName() {

        const enteredName = normalizeName(nameInput.value);

        if (enteredName === "") {

            errorMessage.textContent =
                "Vui lòng nhập họ và tên.";

            return;
        }


        const isAllowed = allowedNames.some(
            name => normalizeName(name) === enteredName
        );


        if (isAllowed) {

            /*
             * Bỏ làm mờ nội dung
             */
            content.classList.add("private-unlocked");


            /*
             * Ẩn hộp xác thực
             */
            overlay.style.display = "none";


            /*
             * Cho phép trang cuộn bình thường
             */
            document.body.style.overflow = "";


        } else {

            errorMessage.textContent =
                "❌ Họ và tên không được phép truy cập.";

            nameInput.select();
        }
    }


    /*
     * Click nút
     */
    submitButton.addEventListener(
        "click",
        checkName
    );


    /*
     * Nhấn Enter trong ô nhập tên
     */
    nameInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                checkName();
            }

        }
    );


    /*
     * Focus vào ô nhập tên ngay khi mở trang
     */
    nameInput.focus();


    /*
     * Không cho cuộn phần phía sau khi hộp
     * xác thực đang mở.
     */
    document.body.style.overflow = "hidden";

});