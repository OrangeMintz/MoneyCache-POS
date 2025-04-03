<?php

namespace App\Http\Controllers;

use App\Events\MyEvent;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse | JsonResponse
    {
        $user = Auth::user();

        $user->fill($request->validated());

        // Handle Image Upload
        if ($request->hasFile('profile_image')) {
            $uploadedImage = Cloudinary::uploadApi()->upload($request->file('profile_image')->getRealPath());
            $user->photo = $uploadedImage['secure_url']; // Correctly extract the image URL
        }

        // Reset email verification if email is changed
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        $notification = array ( //toaster notif when updated
            'message' => 'Profile updated successfully',
            'alert-type' => 'success',
        );

        event(new MyEvent("Profile updated successfully!"));

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully'
            ]);
        }else{
            return redirect()->back()->with($notification);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateApi(Request $request)
    {
        // Ensure the user is authenticated
        $user = Auth::user();
        
        // Validate the input data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // optional profile image
        ]);

        // Update the user's name and email
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // Handle the profile image upload if it exists
        if ($request->hasFile('profile_image')) {
            $uploadedImage = Cloudinary::uploadApi()->upload($request->file('profile_image')->getRealPath());
            $user->photo = $uploadedImage['secure_url']; // Correctly extract the image URL
        }

        // Save the updated user details
        $user->save();

        event(new MyEvent("Profile updated successfully!"));

        return response()->json([
            'status' => 'success',
            'message' => 'User information updated successfully!',
            'user' => $user
        ]);
    }
}
