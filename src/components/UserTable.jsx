'use client';
import { updateUserRole } from '@/lib/actions/users';
import React from 'react';

const UsersTable = ({ users }) => {
  
  // ইউজার রোল আপডেট করার হ্যান্ডলার (কনফার্মেশনসহ)
  const handleRoleChange = async (userId, newRole) => {
    // কনফার্মেশন ডায়ালগ
    const isConfirmed = window.confirm(`আপনি কি সত্যিই এই ইউজারের রোল পরিবর্তন করে "${newRole}" করতে চান?`);
    
    if (!isConfirmed) return; // যদি ইউজার 'Cancel' দেয়, তবে ফাংশনটি এখান থেকেই থেমে যাবে

    try {
      await updateUserRole(userId, newRole);
      // সার্ভার অ্যাকশনের পর পেজ রিফ্রেশ করতে পারেন
      window.location.reload(); 
    } catch (error) {
      console.error("Role update failed:", error);
      alert("রোল আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  const getActions = (currentRole) => {
    const roles = [
      { name: 'admin', label: 'Make Admin' },
      { name: 'founder', label: 'Make Founder' },
      { name: 'collaborator', label: 'Make Collaborator' }
    ];
    return roles.filter(role => role.name.toLowerCase() !== currentRole.toLowerCase());
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                    <th className="p-4 font-medium">User Name</th>
                    <th className="p-4 font-medium">Email Address</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                </tr>
            </thead>

            <tbody className="text-white">
                {users?.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.role}</td>
                        <td className="p-4">Active</td>
                        <td className="p-4">
                            <div className="flex gap-2">
                                {getActions(user.role).map((action) => (
                                    <button 
                                        key={action.name} 
                                        onClick={() => handleRoleChange(user.id, action.name)}
                                        className="text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                                <button className="text-red-400 hover:text-red-300 text-sm ml-2">Suspend</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default UsersTable;

// import React from 'react';
// // ধরুন updateUserRole ফাংশনটি এখান থেকে ইম্পোর্ট করছেন
// import { updateUserRole } from '@/lib/api/users'; 

// const UsersTable = ({ users }) => {
  
//   // ইউজার রোল আপডেট করার হ্যান্ডলার
//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await updateUserRole(userId, newRole);
//       // এখানে আপনি চাইলে পেইজটি রিফ্রেশ করতে পারেন বা স্টেট আপডেট করতে পারেন
//       window.location.reload(); 
//     } catch (error) {
//       console.error("Role update failed:", error);
//     }
//   };

//   const getActions = (currentRole) => {
//     const roles = [
//       { name: 'admin', label: 'Make Admin' },
//       { name: 'recruiter', label: 'Make Recruiter' },
//       { name: 'job_seeker', label: 'Make Job_seeker' }
//     ];
//     return roles.filter(role => role.name.toLowerCase() !== currentRole.toLowerCase());
//   };

//   return (
//     <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
//       <table className="w-full text-left border-collapse">
//         {/* ... টেবিল হেডার একই থাকবে ... */}
//         <tbody className="text-white">
//           {users?.map((user) => (
//             <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
//               <td className="p-4">{user.name}</td>
//               <td className="p-4">{user.email}</td>
//               <td className="p-4">{user.role}</td>
//               <td className="p-4">Active</td>
//               <td className="p-4">
//                 <div className="flex gap-2">
//                   {getActions(user.role).map((action) => (
//                     <button 
//                       key={action.name} 
//                       onClick={() => handleRoleChange(user.id, action.name)}
//                       className="text-blue-400 hover:text-blue-300 text-sm"
//                     >
//                       {action.label}
//                     </button>
//                   ))}
//                   <button className="text-red-400 hover:text-red-300 text-sm ml-2">Suspend</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersTable;



// "use client";
// import React from 'react';
// import { Table, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip, Button } from '@heroui/react';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { TrashBin } from '@gravity-ui/icons';

// // স্টাইলগুলো আগের মতোই থাকবে...
// const roleStyles = { admin: "bg-purple-500/15 text-purple-300 ring-purple-500/30", recruiter: "bg-blue-500/15 text-blue-300 ring-blue-500/30", "job-seeker": "bg-teal-500/15 text-teal-300 ring-teal-500/30" };
// const statusStyles = { active: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30", suspended: "bg-rose-500/15 text-rose-300 ring-rose-500/30" };
// const roleLabels = { admin: "Admin", recruiter: "Recruiter", "job-seeker": "Job Seeker" };

// export default function UserTable({ users }) {
//     const router = useRouter();

//     const handleRoleChange = async (id, newRole) => {
//         try {
//             await fetch(`/api/users/${id}/role`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: newRole }) });
//             toast.success("Role updated");
//             router.refresh();
//         } catch { toast.error("Failed"); }
//     };

//     const handleStatusChange = async (id, currentStatus) => {
//         const newStatus = currentStatus === "active" ? "suspended" : "active";
//         try {
//             await fetch(`/api/users/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
//             toast.success(`User is now ${newStatus}`);
//             router.refresh();
//         } catch { toast.error("Failed"); }
//     };

//     const handleDelete = async (id) => {
//         if (!confirm("Delete this user?")) return;
//         try {
//             await fetch(`/api/users/${id}`, { method: "DELETE" });
//             toast.success("User deleted");
//             router.refresh();
//         } catch { toast.error("Delete failed"); }
//     };

//     return (
//         <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 shadow-xl">
//             <Table aria-label="User management table">
//                 <Table.Content>
//                     <Table.Header>
//                         <Table.Column className="w-1/4">User</Table.Column>
//                         <Table.Column className="w-1/4">Email</Table.Column>
//                         <Table.Column className="w-1/6">Role</Table.Column>
//                         <Table.Column className="w-1/6">Status</Table.Column>
//                         <Table.Column className="w-1/6 text-center">Action</Table.Column>
//                     </Table.Header>
//                     <Table.Body>
//                         {users.map((user, index) => (
//                             <Table.Row isRowHeader key={user._id || index}>
//                                 <Table.Cell>{user.name}</Table.Cell>
//                                 <Table.Cell>{user.email}</Table.Cell>

//                                 {/* Role Dropdown */}
//                                 <Table.Cell>
//                                     <Dropdown>
//                                         <DropdownTrigger>
//                                             <Button variant="flat" size="sm" className={roleStyles[user.role]}>{roleLabels[user.role] ?? user.role}</Button>
//                                         </DropdownTrigger>
//                                         <DropdownMenu onAction={(key) => handleRoleChange(user._id, key)}>
//                                             <DropdownItem key="admin">Admin</DropdownItem>
//                                             <DropdownItem key="recruiter">Recruiter</DropdownItem>
//                                             <DropdownItem key="job-seeker">Job Seeker</DropdownItem>
//                                         </DropdownMenu>
//                                     </Dropdown>
//                                 </Table.Cell>

//                                 {/* Status Toggle with Tooltip */}
//                                 <Table.Cell>
//                                     <Tooltip content={user.status === "active" ? "Click to Suspend" : "Click to Activate"}>
//                                         <Button
//                                             variant="flat"
//                                             size="sm"
//                                             className={statusStyles[user.status] ?? statusStyles.active}
//                                             onClick={() => handleStatusChange(user._id, user.status)}
//                                         >
//                                             {user.status === "active" ? "Active" : "Suspended"}
//                                         </Button>
//                                     </Tooltip>
//                                 </Table.Cell>

//                                 {/* Delete Action */}
//                                 <Table.Cell className="text-center">
//                                     <Button isIconOnly variant="light" color="danger" onClick={() => handleDelete(user._id)}>
//                                         <TrashBin />
//                                     </Button>
//                                 </Table.Cell>
//                             </Table.Row>
//                         ))}
//                     </Table.Body>
//                 </Table.Content>
//             </Table>
//         </div>
//     );
// }