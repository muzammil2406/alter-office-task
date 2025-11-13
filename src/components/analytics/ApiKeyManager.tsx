"use client";

import { useState } from "react";
import { Copy, PlusCircle, Check, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type ApiKey = {
  id: string;
  key: string;
  maskedKey: string;
  status: "active" | "revoked";
  createdAt: string;
  expiresAt: string;
};

const initialKeys: ApiKey[] = [
  {
    id: "1",
    key: "av_prod_1234567890abcdef1234567890abcdef",
    maskedKey: "av_prod_123...cdef",
    status: "active",
    createdAt: "2023-10-26",
    expiresAt: "2024-10-26",
  },
  {
    id: "2",
    key: "av_prod_fedcba0987654321fedcba0987654321",
    maskedKey: "av_prod_fed...4321",
    status: "revoked",
    createdAt: "2023-08-15",
    expiresAt: "2024-08-15",
  },
];

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generateNewKey = () => {
    const generated = `av_prod_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
    setNewKey(generated);
    const newKeyObject: ApiKey = {
        id: (keys.length + 1).toString(),
        key: generated,
        maskedKey: `${generated.slice(0, 12)}...${generated.slice(-4)}`,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    };
    setKeys(prev => [newKeyObject, ...prev]);
  };

  const copyToClipboard = () => {
    if (newKey) {
      navigator.clipboard.writeText(newKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({ title: "Copied to clipboard!" });
    }
  };

  const revokeKey = (id: string) => {
    setKeys(keys.map(key => key.id === id ? {...key, status: "revoked"} : key));
    toast({ title: "API Key Revoked", description: "The key can no longer be used to send events." });
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              These keys are used to authenticate requests from your applications.
            </CardDescription>
          </div>
          <Button onClick={generateNewKey}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-mono font-medium">{apiKey.maskedKey}</TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === "active" ? "default" : "destructive"}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{apiKey.createdAt}</TableCell>
                  <TableCell>{apiKey.expiresAt}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => revokeKey(apiKey.id)} disabled={apiKey.status === 'revoked'}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Revoke
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!newKey} onOpenChange={(open) => !open && setNewKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please save this key. You will not be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex items-center space-x-2 rounded-md bg-muted p-3">
            <p className="font-mono text-sm flex-1 break-all">{newKey}</p>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewKey(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
