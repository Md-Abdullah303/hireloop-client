import { getUserSessionInServer } from "@/lib/core/session";
import {
  LayoutSideContent,
  Suitcase,
  Envelope,
  House,
  Plus,
  Person,
  Bookmark,
  FileText,
  CreditCard,
  LayoutCellsLarge,
  Briefcase,
  PersonFill,
  HouseFill,
  Gear,
  FileDollar,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSessionInServer();

  const recruiterSidebarLink = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    {
      icon: Plus,
      label: "Add Job",
      href: "/dashboard/recruiter/jobs/new",
    },
    {
      icon: Plus,
      label: "Add Company",
      href: "/dashboard/recruiter/company",
    },
    { icon: Suitcase, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    { icon: Envelope, label: "Messages", href: "/dashboard/recruiter" },
    { icon: Person, label: "Profile", href: "/dashboard/recruiter" },
    { icon: Gear, label: "Settings", href: "/dashboard/recruiter" },
  ];

  const seekerSidebarLink = [
    {
      icon: LayoutCellsLarge,
      label: "Jobs",
      href: "/dashboard/seeker/jobs",
    },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: CreditCard,
      label: "Billing",
      href: "/dashboard/seeker/billing",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/seeker/settings",
    },
  ];

  const adminSidebarLink = [
    {
      icon: LayoutCellsLarge,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: PersonFill,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: HouseFill,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/dashboard/admin/jobs",
    },
    {
      icon: FileDollar,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ];

  const navLinksMap = {
    seeker: seekerSidebarLink,
    recruiter: recruiterSidebarLink,
    admin: adminSidebarLink,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <button
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className={"lg:hidden my-10 mx-4"} variant="ghost">
          <LayoutSideContent />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
