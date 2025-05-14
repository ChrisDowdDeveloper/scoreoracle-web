export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#111827]">
        <main className="min-h-screen flex items-center justify-center">{children}</main>
      </body>
    </html>
  )
}
