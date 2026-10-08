"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { openSubscribe } from "@/lib/redux/slices/subscribeSlice";

export default function SubscribeButton({ className, children = "Subscribe", onClick }) {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        dispatch(openSubscribe());
      }}
    >
      {children}
    </button>
  );
}
