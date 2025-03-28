<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Profile Information') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" enctype="multipart/form-data" class="mt-6 space-y-6" onsubmit="return validateForm()">
        @csrf
        @method('patch')

        <div class="grid grid-cols-2 space-x-8">
            <div class="left col-span-1 space-y-6">
                <div>
                    <x-input-label for="name" :value="__('Name')" />
                    <x-text-input id="name" name="name" type="text" class="mt-1 block w-full"
                        :value="old('name', $user->name)" required autocomplete="name" />
                    <p id="name-error" class="text-red-500 text-sm hidden">Name must be at least 3 characters.</p>
                    <x-input-error class="mt-2" :messages="$errors->get('name')" />
                </div>

                <div>
                    <x-input-label for="email" :value="__('Email')" />
                    <x-text-input id="email" name="email" type="email" class="mt-1 block w-full"
                        :value="old('email', $user->email)" required autocomplete="username" />
                    <p id="email-error" class="text-red-500 text-sm hidden">Enter a valid email address.</p>
                    <x-input-error class="mt-2" :messages="$errors->get('email')" />
                </div>

                <div class="flex items-center gap-4">
                    <x-primary-button>{{ __('Save') }}</x-primary-button>
                    @if (session('status') === 'profile-updated')
                        <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                            class="text-sm text-gray-600 dark:text-gray-400">
                            {{ __('Saved.') }}
                        </p>
                    @endif
                </div>
            </div>

            <!-- Right Side (Image & Upload) -->
            <div class="right col-span-1 flex flex-col">
                <!-- Profile Image -->
                <label for="profile-image" class="cursor-pointer">
                    <img id="previewImage" src="{{ $user->photo ?? asset('img/user.png') }}" alt="User Image"
                        class="w-36 h-36 mx-auto rounded-full border-2 border-gray-300">
                </label>

                <!-- Upload Button -->
                <input type="file" id="profile-image" name="profile_image" class="hidden" accept="image/*"
                    onchange="previewFile()">

                <p class="text-center mt-2 text-sm dark:text-gray-200">Click to change profile picture</p>
                <p id="image-error" class="text-red-500 text-sm hidden">Invalid file type or size exceeds 5MB.</p>
            </div>
        </div>
    </form>
</section>

<!-- JavaScript for Image Preview -->
<script>
    function previewFile() {
        const input = document.getElementById('profile-image');
        const preview = document.getElementById('previewImage');

        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function validateForm() {
        let valid = true;

        // Name Validation
        const name = document.getElementById('name').value.trim();
        const nameError = document.getElementById('name-error');
        const namePattern = /^[A-Za-z0-9\s'-]+$/; // Allows numbers but prevents special characters

        if (name.length < 3 || !namePattern.test(name)) {
            nameError.textContent = "Name must be at least 3 characters and can only contain letters, numbers, spaces, hyphens, and apostrophes.";
            nameError.classList.remove('hidden');
            valid = false;
        } else {
            nameError.classList.add('hidden');
        }

        // Email Validation
        const email = document.getElementById('email').value.trim();
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.classList.remove('hidden');
            valid = false;
        } else {
            emailError.classList.add('hidden');
        }

        // Image Validation
        const imageInput = document.getElementById('profile-image');
        const imageError = document.getElementById('image-error');
        const file = imageInput.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) { // 2MB max
                imageError.classList.remove('hidden');
                valid = false;
            } else {
                imageError.classList.add('hidden');
            }
        }

        return valid;
    }
</script>
