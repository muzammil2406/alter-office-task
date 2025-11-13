import { ApiKeyManager } from "@/components/analytics/ApiKeyManager";

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">
          Manage API keys for your applications to send events to AnalytixVerse.
        </p>
      </div>
      <ApiKeyManager />
    </div>
  );
}
