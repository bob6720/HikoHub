import { Link } from '@inertiajs/react';
import logo from '../../images/HIKOHub.svg';

export default function GuestLayout({ children }) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#690A32] to-[#F04639]">

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
