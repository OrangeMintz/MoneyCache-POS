<!-- Main Modal -->
<div id="edit-user-modal" tabindex="-1" aria-hidden="true" class="hidden fixed inset-0 z-50 items-center justify-center">
  <!-- Overlay -->
  <div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

  <!-- Modal Content -->
  <div class="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 z-50">
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 rounded-t">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Update User
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-close-modal>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
          </button>
      </div>

      <!-- Modal Body -->
      <form class="p-1 md:p-2">
          <div class=" mb-4 md:mb-8 grid-cols-2">
              <div class="col-span-2 sm:col-span-1">
                  <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                  <select id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                      <option selected="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Cashier">Cashier</option>
                  </select>
              </div>
              <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" placeholder="Type user name" required>
              </div>
              <div class="col-span-2 sm:col-span-1">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" placeholder="Type user email" required>
              </div>

          </div>
          <button type="submit" class="w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center">
              Update user
          </button>
      </form>
  </div>
</div>

{{-- toggle modal script --}}
<script>
  document.addEventListener("DOMContentLoaded", function () {
      const modal = document.getElementById("edit-user-modal");
      const overlay = modal.querySelector(".absolute.inset-0");
      const openModalBtns = document.querySelectorAll("[data-modal-toggle='edit-user-modal']");
      const closeModalBtns = modal.querySelectorAll("[data-close-modal]");
  
      // Open modal
      openModalBtns.forEach(button => {
          button.addEventListener("click", function () {
              modal.classList.remove("hidden");
          });
      });
  
      // Close modal when clicking close button
      closeModalBtns.forEach(button => {
          button.addEventListener("click", function () {
              modal.classList.add("hidden");
          });
      });
  
      // Close modal when clicking outside of it (on the overlay)
      overlay.addEventListener("click", function () {
          modal.classList.add("hidden");
      });
  });
</script>
