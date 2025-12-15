import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-white text-black hover:bg-zinc-200",
            card: "bg-zinc-900 border border-zinc-800",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton:
              "border-zinc-700 text-white hover:bg-zinc-800",
            formFieldLabel: "text-zinc-300",
            formFieldInput:
              "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500",
            footerActionLink: "text-white hover:text-zinc-300",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-zinc-400 hover:text-white",
          },
        }}
      />
    </div>
  );
}
