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
                    Time In Confirmation
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
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please take a selfie to confirm your time-in.
                </p>

                <!-- Camera Preview -->
                <video id="camera-preview" autoplay class="w-11/12 h-auto rounded-lg border mx-auto"></video>

                <!-- Captured Image -->
                <canvas id="captured-image"
                    class="hidden w-11/12 h-auto rounded-lg mx-auto  border-2 border-green-400"></canvas>

                <!-- Hidden Input to Store Image -->
            </div>

            <!-- Modal footer -->
            <div
                class="flex items-center justify-evenly p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {{-- button for saving photo --}}
                <button id="capture-btn" type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Capture
                </button>
                {{-- button for retaking photo --}}
                <button id="retake-btn" type="button"
                    class="hidden text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                    Retake
                </button>

                {{-- button for testing --}}
                <button id="submit-timein" type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Submit Time In
                </button>

                <form id="time-in-form" action="{{ route('attendance.shit') }}" method="POST">
                    @csrf
                    <input type="hidden" id="selfie-data" name="selfie_data">
                    <button type="submit"
                        class="py-2.5 px-5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg">
                        Time In Here
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById("time-in-form").addEventListener("submit", function(event) {
        let selfieData = document.getElementById("selfie-data").value;

        console.log("Selfie Data Before Submission:", selfieData); // Debugging

        if (!selfieData) {
            event.preventDefault(); // Prevent form submission
            alert("Please capture a selfie before submitting.");
        }
    });


    document.addEventListener("DOMContentLoaded", function() {
        let video = document.getElementById("camera-preview"); // Camera live preview
        let canvas = document.getElementById("captured-image"); // Captured image
        let captureBtn = document.getElementById("capture-btn"); // Capture button
        let retakeBtn = document.getElementById("retake-btn"); // Retake button
        let submitBtn = document.getElementById("submit-timein"); // Submit button
        let closeModal = document.getElementById("close-modal"); // Close button
        let selfieDataInput = document.getElementById("selfie-data"); // Hidden input for image
        let stream = null; // To store camera stream

        // **Start Camera**
        function startCamera() {
            if (stream) return; // Prevent multiple camera activations

            navigator.mediaDevices.getUserMedia({
                    video: true
                }) // Request camera access
                .then(cameraStream => {
                    stream = cameraStream;
                    video.srcObject = stream;
                    video.play(); // Start video
                    video.classList.remove("hidden"); // Show video
                    canvas.classList.add("hidden"); // Hide canvas
                    captureBtn.classList.remove("hidden"); // Show Capture button
                    retakeBtn.classList.add("hidden"); // Hide Retake button
                })
                .catch(error => {
                    console.error("Camera error:", error);
                    alert("Camera access denied. Please allow camera permissions.");
                });
        }

        // **Capture Image**
        captureBtn.addEventListener("click", function() {
            let context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height); // Capture frame

            let imageData = canvas.toDataURL("image/png"); // Convert to Base64
            selfieDataInput.value = imageData; // Store image

            // Hide video, show captured image
            video.classList.add("hidden");
            canvas.classList.remove("hidden");

            // Show retake button
            captureBtn.classList.add("hidden");
            retakeBtn.classList.remove("hidden");
        });

        // **Retake Image**
        retakeBtn.addEventListener("click", function() {
            selfieDataInput.value = ""; // Clear old image
            video.classList.remove("hidden"); // Show video
            canvas.classList.add("hidden"); // Hide image
            captureBtn.classList.remove("hidden"); // Show Capture button
            retakeBtn.classList.add("hidden"); // Hide Retake button
        });

        // **Submit Image**
        submitBtn.addEventListener("click", function() {
            if (!selfieDataInput.value) {
                alert("Please capture a selfie first!");
                return;
            }

            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            // Simulated submission
            setTimeout(() => {
                alert("Simulated: Time in recorded successfully!");
                closeCamera();
                // document.getElementById("capture-modal").classList.add("hidden"); // Close modal
                submitBtn.textContent = "Submit Time In";
                submitBtn.disabled = false;
            }, 1000);
        });

        // **Stop Camera**
        function closeCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop()); // Stop camera
                stream = null;
            }
        }

        // **Close Modal**
        closeModal.addEventListener("click", function() {
            closeCamera();
            document.getElementById("capture-modal").classList.add("hidden");
        });

        // **Open Modal and Start Camera**
        document.getElementById("capture-button").addEventListener("click", function() {
            document.getElementById("capture-modal").classList.remove("hidden");
            startCamera();
        });
    });
</script>
