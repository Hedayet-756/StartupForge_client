import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';



const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <div className="flex-1 p-4 overflow-auto">{children}</div>
        </div>
    );
};

export default DashboardLayout;