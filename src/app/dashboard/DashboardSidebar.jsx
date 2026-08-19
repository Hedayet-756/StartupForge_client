
import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Briefcase, Bookmark, File, CreditCard, OfficeBadge } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();

    const adminNavItems = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Person, href: "/dashboard/admin/users", label: "users" },
        { icon: OfficeBadge, href: "/dashboard/admin/startups", label: "Startups" },
        { icon: File, href: "/dashboard/admin/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    ];

    const founderNavItems = [
        { icon: House, href: "/dashboard/founder", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/founder/oppurtunities", label: "Opportunities" },
        { icon: Bell, href: "/dashboard/founder/oppurtunities/new", label: "Create A Job" },
        { icon: Briefcase, href: "/dashboard/founder/startup", label: "Startup Profile" },
        { icon: Person, href: "/profile", label: "Profile" },
    ];

    const collaboratorNavItems = [
        { icon: House, href: "/dashboard/collaborator", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/collaborator/opportunities", label: "Opportunities" },
        // { icon: Bookmark, href: "/dashboard/collaborator/saved-opportunities", label: "Saved Opportunities" },
        { icon: File, href: "/dashboard/collaborator/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/collaborator/billing", label: "Billing" },
        { icon: Person, href: "/dashboard/collaborator/profile", label: "Profile" },
    ];

    const navItemsMap = {
        collaborator: collaboratorNavItems,
        founder: founderNavItems,
        admin: adminNavItems
    }
    const role = user?.role || 'collaborator';
    const navItems = navItemsMap[role] || collaboratorNavItems;
    // const navItems = navItemsMap[user?.role || 'seeker'];

    const navContant = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block"> {navContant} </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContant}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}