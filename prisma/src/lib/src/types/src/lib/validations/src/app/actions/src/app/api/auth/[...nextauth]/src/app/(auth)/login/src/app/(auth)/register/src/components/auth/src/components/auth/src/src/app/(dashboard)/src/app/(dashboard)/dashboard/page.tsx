import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Bienvenue, {session?.user.name}!</h1>
      <p className="text-gray-600">Votre espace personnel sécurisé.</p>
      
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold">Informations du compte</h2>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="text-sm">{session?.user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Rôle</dt>
            <dd className="text-sm">{session?.user.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
