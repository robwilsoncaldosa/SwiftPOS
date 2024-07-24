import React, { PropsWithChildren } from "react";
import { Dashboard } from "@/components/ui/dashboard";

type DashboardPageProps = PropsWithChildren;
const DashboardPage = ({ children }: DashboardPageProps) => {
  return <Dashboard>{children}</Dashboard>;
};

export default DashboardPage;
