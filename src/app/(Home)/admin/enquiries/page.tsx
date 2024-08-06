// app/admin/enquiries/page.tsx
import { Suspense } from "react";
import EnquiriesContent from "@/components/EnquiryContent";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function EnquiriesPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnquiriesContent />
    </Suspense>
  );
}
