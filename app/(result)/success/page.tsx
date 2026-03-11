import { Suspense } from "react";
import SuccessContent from "../../../components/Checkout/success_content";

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
