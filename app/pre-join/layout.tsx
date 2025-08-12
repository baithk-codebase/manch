"use client";

function PreJoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <main data-lk-theme="default" style={{ height: "100%" }}>
      {children}
    </main>
  );
}

export default PreJoinLayout;
