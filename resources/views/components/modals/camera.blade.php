<!-- Main Time-In Modal -->
<div id="capture-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
    class="bg-black bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div
                class="flex items-center justify-between px-2 py-4 md:px-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Photo Capture
                </h3>
                <button type="button" id="close-modal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="capture-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="px-2 py-4 md:px-5 text-center">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-2">
                    Please take a selfie to confirm your time-in.
                </p>
                <!-- Camera Preview -->
                <video id="camera-preview" autoplay class="w-11/12 h-auto rounded-lg border mx-auto"></video>
                <!-- Captured Image -->
                <canvas id="captured-image"
                    class="hidden w-11/12 h-auto rounded-lg mx-auto border-2 border-green-400"></canvas>
            </div>
            <!-- Modal footer -->
            <div
                class="flex items-center justify-evenly p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button id="capture-btn" type="button"
                    class="w-28 text-center px-2 py-2 text-sm rounded-lg bg-blue-700 text-white hover:bg-blue-900">
                    Capture <i class="fa-solid fa-camera"></i>
                </button>
                <button id="retake-btn" type="button"
                    class="hidden w-28 text-center px-2 py-2 text-sm rounded-lg font-medium text-white bg-yellow-500 hover:bg-yellow-600">
                    Retake <i class="fa-solid fa-camera"></i>
                </button>
                <button type="button" id="submit-timein"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Submit <i class="fa-solid fa-file-export"></i>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        let video = document.getElementById("camera-preview");
        let canvas = document.getElementById("captured-image");
        let captureBtn = document.getElementById("capture-btn");
        let retakeBtn = document.getElementById("retake-btn");
        let submitBtn = document.getElementById("submit-timein");
        let closeModal = document.getElementById("close-modal");
        let stream = null;
        let capturedImage = "";

        function startCamera() {
            if (stream) return;
            navigator.mediaDevices.getUserMedia({
                    video: true
                })
                .then(cameraStream => {
                    stream = cameraStream;
                    video.srcObject = stream;
                    video.play();
                    video.classList.remove("hidden");
                    canvas.classList.add("hidden");
                    captureBtn.classList.remove("hidden");
                    retakeBtn.classList.add("hidden");
                })
                .catch(error => {
                    console.error("Camera error:", error);
                    alert("Camera access denied. Please allow permissions.");
                });
        }

        captureBtn.addEventListener("click", function() {
            let context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            capturedImage = canvas.toDataURL("image/png");
            video.classList.add("hidden");
            canvas.classList.remove("hidden");
            captureBtn.classList.add("hidden");
            retakeBtn.classList.remove("hidden");
        });

        retakeBtn.addEventListener("click", function() {
            capturedImage = "";
            video.classList.remove("hidden");
            canvas.classList.add("hidden");
            captureBtn.classList.remove("hidden");
            retakeBtn.classList.add("hidden");
        });

        submitBtn.addEventListener("click", function(event) {
            event.preventDefault();
            if (!capturedImage) {
                alert("Please capture a selfie before submitting.");
                return;
            }

            function base64ToFile(base64String, filename) {
                let arr = base64String.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {
                    type: mime
                });
            }

            let selfieFile = base64ToFile(capturedImage, "selfie.png");
            let formData = new FormData();
            formData.append("_token", document.querySelector('input[name="_token"]').value);
            formData.append("image", selfieFile);

            fetch("{{ route('attendance.timeIn') }}", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                        "Accept": "application/json"
                    },
                    body: formData,
                })
                .then(response => response.json()) // Expect JSON response
                .then(data => {
                    if (data.status === "success") {
                        // Instead of alert, manually redirect
                        window.location.reload(); // This simulates the `redirect()->back()`
                    } else {
                        alert(data.message || "Error occurred!");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Something went wrong. Please try again.");
                });
        });

        closeModal.addEventListener("click", function() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            document.getElementById("capture-modal").classList.add("hidden");
        });

        document.getElementById("capture-button").addEventListener("click", function() {
            document.getElementById("capture-modal").classList.remove("hidden");
            startCamera();
        });
    });
</script>
