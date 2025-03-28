'use client';
import Preloader from "@/app/comps/preloader";
import { useAppContext } from "@/context/AppContext";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import Toast from 'typescript-toastify';
import api from "../../utils/api";

export default function CashierForm() {
    const { user, globalFunction } = useAppContext()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        current_password: null,
        password: null,
        password_confirmation: null,
    });
    cashier_id: 0,
        time: null,
            cash: null,
                check: null,
                    bpi_ccard: null,
                        bpi_dcard: null,
                            metro_ccard: null,
                                metro_dcard: null,
                                    paymaya: null,
                                        aub_ccard: null,
                                            gcash: null,
                                                food_panda: null,
                                                    streetby: null,
                                                        grabfood: null,
                                                            gc_claimed_others: null,
                                                                gc_claimed_own: null,
                                                                    mm_head: null,
                                                                        mm_commissary: null,
                                                                            mm_rm: null,
                                                                                mm_dm: null,
                                                                                    mm_km: null,
                                                                                        food_charge: null,
                                                                                            z_reading_pos: null,
    });

// Profile edit modal state
const [showEditModal, setShowEditModal] = useState(false);
const [profileData, setProfileData] = useState({
    firstName: 'Ramon Paulo',
    lastName: 'Caumban',
    avatar: '/images/r.JPG'
});
const [avatarPreview, setAvatarPreview] = useState(profileData.avatar);
const fileInputRef = useRef<HTMLInputElement>(null);

// Delete account modal state
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletePassword, setDeletePassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const [subtotalTradePOS, setSubtotalTradePOS] = useState(0);
const [subtotalNonTradePOS, setSubtotalNonTradePOS] = useState(0);
const [grandTotalPOS, setGrandTotalPOS] = useState(0);

const [disable, setDisable] = useState(false);

useEffect(() => {
    if (user) {
        setLoading(false)
    }
}, [user])

// Calculate totals whenever formData changes
useEffect(() => {
    globalFunction()
}, []);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

useEffect(() => {
    console.log(formData)
}, [formData])

// Handle avatar image change
const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            setAvatarPreview(imageUrl);
            // Update the profile data with the new image
            setProfileData(prev => ({
                ...prev,
                avatar: imageUrl
            }));
        };
        reader.readAsDataURL(file);
    }
};

// Handle profile edit form submission
const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your API
    console.log('Profile updated:', profileData);
    setShowEditModal(false);
    new Toast({
        position: "bottom-right",
        toastMsg: "Profile updated successfully!",
        autoCloseTime: 2000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "success",
        theme: 'dark',
    });
};

// Handle delete account confirmation
const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the delete request to your API with the password
    console.log('Account deletion confirmed with password');
    setShowDeleteModal(false);
    new Toast({
        position: "bottom-right",
        toastMsg: "Account deleted successfully!",
        autoCloseTime: 2000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "success",
        theme: 'dark',
    });
};

const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('access_token');

    try {

    } catch (error: any) {
        console.error("Error storing transaction:", error);

        let errorMessage = "An unexpected error occurred!";
        if (error.response) {
            errorMessage = error.response.data.message || "Failed to store transaction!";
        } else if (error.request) {
            errorMessage = "No response from server. Please try again!";
        } else {
            errorMessage = error.message;
        }

        new Toast({
            position: "bottom-right",
            toastMsg: errorMessage,
            autoCloseTime: 2000,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "error",
            theme: 'dark',
        });
    }
};

if (loading) {
    return <Preloader />
}

return (
    <main className="bg-gray-100 w-full text-black min-h-screen">
        {/* Edit Profile Modal */}
        {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl text-center font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="flex flex-col items-center mb-4">
                            <div
                                className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer mb-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Image
                                    src={avatarPreview}
                                    alt="Profile"
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                className="text-blue-500 text-sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Change Photo
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md"
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md"
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 border rounded-md"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl text-center font-bold mb-2">Delete Account</h2>
                    <p className="text-red-600 mb-4">
                        Warning: This action is irreversible. All your data will be permanently deleted.
                    </p>
                    <form onSubmit={handleDeleteAccount}>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enter your password to confirm
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border rounded-md pr-10"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 border rounded-md"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        <div className="relative w-full">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden">
                <div className="flex-1">
                    <div className="bg-white p-6 flex w-full grid grid-cols-1 lg:grid-cols-1 rounded-md gap-2">
                        {/* Left Column */}
                        <div className="flex gap-2 lg:grid-cols-5 col-span-5">
                            <div className="col-span-1 w-full">
                                <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">PROFILE DETAILS:</h2>
                                <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={profileData.avatar}
                                                alt="Profile"
                                                width={50}
                                                height={192}
                                                className="w-full h-full object-cover rounded-full"
                                                priority
                                                quality={90}
                                            />
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                                                <p className="text-gray-600">Web Developer</p>
                                            </div>
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                onClick={() => setShowEditModal(true)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2  lg:grid-cols-5 col-span-5">

                            <div className="flex gap-2 lg:grid-cols-5 col-span-5">
                                <div className="col-span-1 w-full">
                                    <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">PASSWORD CONFIGURATION</h2>
                                    <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2 ">
                                        <form action="">
                                            <div className="space-y-4">

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        onChange={handleInputChange}
                                                        type="password"
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        placeholder="Enter current password"
                                                        name="current_password"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        New Password
                                                    </label>
                                                    <input
                                                        onChange={handleInputChange}
                                                        type="password"
                                                        name="password"
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        placeholder="Enter new password"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Retype New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password_confirmation"
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        placeholder="Confirm new password"
                                                        required
                                                    />
                                                </div>
                                                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                                                    Save
                                                </button>

                                            </div>
                                            <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2 ">
                                                <form action="">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Current Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="w-full px-3 py-2 border rounded-md"
                                                                placeholder="Enter current password"
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                New Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="w-full px-3 py-2 border rounded-md"
                                                                placeholder="Enter new password"
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Retype New Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="w-full px-3 py-2 border rounded-md"
                                                                placeholder="Confirm new password"
                                                                required
                                                            />
                                                        </div>
                                                        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 lg:grid-cols-5 col-span-5">
                                    <div className="col-span-1 w-full">
                                        <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">DELETE ACCOUNT</h2>
                                        <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2 ">
                                            <div className="bg-red-50 p-4 rounded-md">
                                                <p className="text-red-700 text-sm mb-4">
                                                    Warning: Deleting your account is a permanent action.
                                                    Once deleted, your account cannot be recovered and all data will be permanently lost.
                                                </p>
                                                <button
                                                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                                                    onClick={() => setShowDeleteModal(true)}
                                                >
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </main>
            );
}