<?php

namespace App\Http\Controllers;

use App\Events\MyEvent;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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
    public function update(ProfileUpdateRequest $request): RedirectResponse
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
}
