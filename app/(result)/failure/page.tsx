import { Suspense } from "react";
import FailureContent from "../../../components/Checkout/failure_content";

export default function FailurePage() {
  return (
    <Suspense>
      <FailureContent />
    </Suspense>
  );
}
