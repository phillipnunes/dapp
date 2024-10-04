import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {ReactNode} from "react";

type DashboardLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const DashboardLayout = ({ title, description, children }: DashboardLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export { DashboardLayout }
