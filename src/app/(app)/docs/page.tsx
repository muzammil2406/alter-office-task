import CodeSnippet from "@/components/analytics/CodeSnippet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const eventExample = `{
  "event": "login_form_cta_click",
  "url": "https://example.com/page",
  "referrer": "https://google.com",
  "device": "mobile",
  "ipAddress": "192.168.1.1",
  "timestamp": "2024-02-20T12:34:56Z",
  "metadata": {
    "browser": "Chrome",
    "os": "Android",
    "screenSize": "1080x1920"
  }
}`;

const fetchExample = `fetch('https://api.analytixverse.com/api/analytics/collect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE'
  },
  body: JSON.stringify({
    "event": "button_click",
    "url": window.location.href,
    "referrer": document.referrer,
    "device": "desktop",
    // ... other properties
  })
});`;

export default function DocsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Learn how to integrate AnalytixVerse with your application.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            All API requests must be authenticated using an API key. Provide your key in the <code className="font-code text-sm bg-muted px-1 py-0.5 rounded">x-api-key</code> header. You can generate and manage your keys in the API Keys section.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Collecting Events</h2>
        <p className="text-muted-foreground">
          To send event data, make a POST request to the collection endpoint.
        </p>
        
        <div className="font-mono text-sm bg-muted/80 rounded p-3">
          POST /api/analytics/collect
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Body</CardTitle>
          <CardDescription>
            The request body should be a JSON object with the following structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeSnippet code={eventExample} language="json" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example: Client-Side Fetch</CardTitle>
          <CardDescription>
            Here&apos;s an example of how to send an event from a browser using JavaScript.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeSnippet code={fetchExample} language="javascript" />
        </CardContent>
      </Card>
    </div>
  );
}
