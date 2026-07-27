import React from 'react';

const DashboardSidebar = () => {
    return (
        <div>
            <h1>Dashboard Sidebar</h1>
        </div>
    );
};

export default DashboardSidebar;

// import { getUserSession } from "@/lib/core/session";
// import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Briefcase, Bookmark, File, CreditCard, OfficeBadge } from "@gravity-ui/icons";
// import { Button, Drawer } from "@heroui/react";
// import Link from "next/link";

// export async function DashboardSidebar() {
//     const user = await getUserSession();

//     const adminNavItems = [
//         { icon: House, href: "/dashboard/admin", label: "Dashboard" },
//         { icon: Person, href: "/dashboard/admin/users", label: "Users" },
//         { icon: OfficeBadge, href: "/dashboard/admin/companies", label: "Companies" },
//         { icon: File, href: "/dashboard/admin/applications", label: "Applications" },
//         { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
//         { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
//     ];

//     const founderNavItems = [
//         { icon: House, href: "/dashboard/founder", label: "Dashboard" },
//         { icon: Magnifier, href: "/dashboard/founder/jobs", label: "Jobs" },
//         { icon: Bell, href: "/dashboard/founder/jobs/new", label: "Create A Job" },
//         { icon: Briefcase, href: "/dashboard/founder/company", label: "Company Profile" },
//         { icon: Envelope, href: "/dashboard/founder/messages", label: "Messages" },
//         { icon: Person, href: "/dashboard/founder/profile", label: "Profile" },
//         { icon: Gear, href: "/dashboard/founder/settings", label: "Settings" },
//     ];

//     const collaboratorNavItems = [
//         { icon: House, href: "/dashboard/collaborator", label: "Dashboard" },
//         { icon: Magnifier, href: "/dashboard/collaborator/jobs", label: "Jobs" },
//         { icon: Bookmark, href: "/dashboard/collaborator/saved-jobs", label: "Saved Jobs" },
//         { icon: File, href: "/dashboard/collaborator/applications", label: "Applications" },
//         { icon: CreditCard, href: "/dashboard/collaborator/billing", label: "Billing" },
//         { icon: Person, href: "/dashboard/collaborator/profile", label: "Profile" },
//         { icon: Gear, href: "/dashboard/collaborator/settings", label: "Settings" },
//     ];

//     const navItemsMap = {
//         collaborator: collaboratorNavItems,
//         founder: founderNavItems,
//         admin: adminNavItems
//     };

//     // আপনার ডাটাবেজ বা সেশনের রোল ছোট হাতের (founder/collaborator/admin) থাকতে পারে,
//     // তাই সেফটির জন্য .toLowerCase() ব্যবহার করা হয়েছে অথবা ডিফল্ট seeker থাকবে।
//     const role = user?.role ? user.role.toLowerCase() : 'collaborator';
//     const navItems = navItemsMap[role] || seekerNavItems;

//     const navContent = (
//         <nav className="flex flex-col gap-1.5">
//             {navItems.map((item) => (
//                 <Link
//                     key={item.label}
//                     className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white group"
//                     href={item.href}
//                 >
//                     <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
//                     <span>{item.label}</span>
//                 </Link>
//             ))}
//         </nav>
//     );

//     return (
//         <>
//             {/* বড় স্ক্রিনের জন্য সাইডবার */}
//             <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4 lg:block min-h-[calc(100vh-4rem)]">
//                 {navContent}
//             </aside>

//             {/* ছোট স্ক্রিনের জন্য ড্রয়ার মেনু */}
//             <Drawer>
//                 <div className="p-4 lg:hidden border-b border-zinc-800 bg-zinc-950 flex items-center">
//                     <Button variant="secondary" className="bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-xl px-4 py-2 flex items-center gap-2">
//                         <LayoutSideContentLeft className="w-5 h-5 text-indigo-400" />
//                         <span>Menu</span>
//                     </Button>
//                 </div>
//                 <Drawer.Backdrop>
//                     <Drawer.Content placement="left" className="bg-zinc-950 text-white border-r border-zinc-800 w-72 p-6">
//                         <Drawer.Dialog>
//                             <Drawer.CloseTrigger className="text-zinc-400 hover:text-white" />
//                             <Drawer.Header className="px-0 pt-2 mb-4">
//                                 <Drawer.Heading className="text-lg font-bold text-white tracking-tight">Navigation Menu</Drawer.Heading>
//                             </Drawer.Header>
//                             <Drawer.Body className="px-0">
//                                 {navContent}
//                             </Drawer.Body>
//                         </Drawer.Dialog>
//                     </Drawer.Content>
//                 </Drawer.Backdrop>
//             </Drawer>
//         </>
//     );
// }