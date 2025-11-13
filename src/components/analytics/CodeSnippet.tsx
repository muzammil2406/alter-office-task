"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type CodeSnippetProps = {
  code: string;
  language: string;
};

export default function CodeSnippet({ code, language }: CodeSnippetProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast({ title: "Code copied to clipboard!" });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted text-foreground p-4 rounded-md overflow-x-auto text-sm">
        <code className={`language-${language} font-code`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}
