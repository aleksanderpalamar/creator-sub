"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { OverlayConfig } from "@/types/overlay";
import { SubscriptionNotification } from "@/components/overlay/subscription-notification";
import { Copy, ExternalLink } from "lucide-react";

export default function OverlayConfigPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<OverlayConfig>({
    titleText: "Novo Assinante!",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    textColor: "#ffffff",
    accentColor: "#9333ea",
    fontFamily: "sans-serif",
    titleSize: "24px",
    messageSize: "18px",
    position: "bottom-right",
    notificationWidth: "400px",
    roundedCorners: true,
    displayDuration: 5,
    soundEnabled: false,
    soundUrl: "",
  });
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      router.push("/dashboard/overlay");
      return;
    }

    console.log("Status de criador:", session.user.isCreator);

    if (session.user.isCreator === false) {
      toast.error({
        title: "Acesso restrito",
        description: "Esta página é apenas para criadores de conteúdo.",
      });
      router.push("/dashboard");
      return;
    }

    // Carregar configurações salvas
    const fetchConfig = async () => {
      try {
        const response = await fetch(
          `/api/overlay/config?creatorId=${session.user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    fetchConfig();
  }, [session, router, toast]);

  const handleSaveConfig = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/overlay/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: session.user.id,
          config,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar configurações");
      }

      toast.success({
        title: "Configurações salvas",
        description: "As configurações do overlay foram salvas com sucesso",
      });
    } catch (error) {
      console.error(error);
      toast.error({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPreview = () => {
    setPreviewVisible(true);
    setTimeout(() => {
      setPreviewVisible(false);
    }, (config.displayDuration || 5) * 1000);
  };

  const copyOverlayUrl = () => {
    if (!session?.user?.id) return;

    const url = `${window.location.origin}/overlay/${session.user.id}`;
    navigator.clipboard.writeText(url);
    toast.success({
      title: "URL copiada",
      description: "URL do overlay copiada para a área de transferência",
    });
  };

  if (!session?.user?.id) {
    return <div>Carregando...</div>;
  }

  const overlayUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/overlay/${session.user.id}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Configuração do Overlay
        </h1>
        <p className="text-muted-foreground">
          Personalize o overlay de notificações para usar no OBS ou outro
          software de streaming.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>URL do Overlay</CardTitle>
          <CardDescription>
            Adicione esta URL como uma fonte de navegador no OBS para exibir
            notificações de assinatura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={overlayUrl} readOnly className="flex-1" />
            <Button variant="outline" size="icon" onClick={copyOverlayUrl}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={overlayUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Tabs defaultValue="appearance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="text">Texto</TabsTrigger>
              <TabsTrigger value="behavior">Comportamento</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={
                      config.backgroundColor?.replace(
                        "rgba(0, 0, 0, 0.7)",
                        "#000000"
                      ) || "#000000"
                    }
                    onChange={(e) =>
                      setConfig({ ...config, backgroundColor: e.target.value })
                    }
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={config.backgroundColor}
                    onChange={(e) =>
                      setConfig({ ...config, backgroundColor: e.target.value })
                    }
                    placeholder="rgba(0, 0, 0, 0.7)"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Você pode usar rgba() para transparência, ex: rgba(0, 0, 0,
                  0.7)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Cor do Texto</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={config.textColor || "#ffffff"}
                    onChange={(e) =>
                      setConfig({ ...config, textColor: e.target.value })
                    }
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={config.textColor}
                    onChange={(e) =>
                      setConfig({ ...config, textColor: e.target.value })
                    }
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Cor de Destaque</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={config.accentColor || "#9333ea"}
                    onChange={(e) =>
                      setConfig({ ...config, accentColor: e.target.value })
                    }
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={config.accentColor}
                    onChange={(e) =>
                      setConfig({ ...config, accentColor: e.target.value })
                    }
                    placeholder="#9333ea"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Fonte</Label>
                <Select
                  value={config.fontFamily || "sans-serif"}
                  onValueChange={(value) =>
                    setConfig({ ...config, fontFamily: value })
                  }
                >
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans-serif">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                    <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                    <SelectItem value="'Open Sans', sans-serif">
                      Open Sans
                    </SelectItem>
                    <SelectItem value="'Montserrat', sans-serif">
                      Montserrat
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roundedCorners">Cantos Arredondados</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="roundedCorners"
                    checked={config.roundedCorners}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, roundedCorners: checked })
                    }
                  />
                  <span>
                    {config.roundedCorners ? "Ativado" : "Desativado"}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="titleText">Texto do Título</Label>
                <Input
                  id="titleText"
                  value={config.titleText || ""}
                  onChange={(e) =>
                    setConfig({ ...config, titleText: e.target.value })
                  }
                  placeholder="Novo Assinante!"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleSize">Tamanho do Título</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="titleSize"
                    value={config.titleSize || "24px"}
                    onChange={(e) =>
                      setConfig({ ...config, titleSize: e.target.value })
                    }
                    placeholder="24px"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageSize">Tamanho da Mensagem</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="messageSize"
                    value={config.messageSize || "18px"}
                    onChange={(e) =>
                      setConfig({ ...config, messageSize: e.target.value })
                    }
                    placeholder="18px"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="position">Posição</Label>
                <Select
                  value={config.position || "bottom-right"}
                  onValueChange={(value) =>
                    setConfig({ ...config, position: value as any })
                  }
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Selecione uma posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Superior Esquerdo</SelectItem>
                    <SelectItem value="top-right">Superior Direito</SelectItem>
                    <SelectItem value="bottom-left">
                      Inferior Esquerdo
                    </SelectItem>
                    <SelectItem value="bottom-right">
                      Inferior Direito
                    </SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationWidth">
                  Largura da Notificação
                </Label>
                <Input
                  id="notificationWidth"
                  value={config.notificationWidth || "400px"}
                  onChange={(e) =>
                    setConfig({ ...config, notificationWidth: e.target.value })
                  }
                  placeholder="400px"
                />
                <p className="text-xs text-muted-foreground">
                  Use px, %, ou outro valor CSS válido (ex: 400px, 50%)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayDuration">
                  Duração da Exibição (segundos)
                </Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="displayDuration"
                    min={1}
                    max={15}
                    step={1}
                    value={[config.displayDuration || 5]}
                    onValueChange={(value) =>
                      setConfig({ ...config, displayDuration: value[0] })
                    }
                    className="flex-1"
                  />
                  <span className="w-12 text-center">
                    {config.displayDuration || 5}s
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soundEnabled">Som de Notificação</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="soundEnabled"
                    checked={config.soundEnabled}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, soundEnabled: checked })
                    }
                  />
                  <span>{config.soundEnabled ? "Ativado" : "Desativado"}</span>
                </div>
              </div>

              {config.soundEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="soundUrl">URL do Som</Label>
                  <Input
                    id="soundUrl"
                    value={config.soundUrl || ""}
                    onChange={(e) =>
                      setConfig({ ...config, soundUrl: e.target.value })
                    }
                    placeholder="https://exemplo.com/som.mp3"
                  />
                  <p className="text-xs text-muted-foreground">
                    URL para um arquivo de áudio (MP3, WAV, etc.)
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleShowPreview}>
              Visualizar
            </Button>
            <Button onClick={handleSaveConfig} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prévia</CardTitle>
              <CardDescription>
                Veja como a notificação aparecerá no seu stream.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] relative bg-gray-800 rounded-md overflow-hidden">
              {/* Fundo quadriculado para simular transparência */}
              <div className="absolute inset-0 bg-[url('/checkerboard.png')] bg-repeat opacity-10"></div>

              {/* Prévia da notificação */}
              {previewVisible && (
                <SubscriptionNotification
                  subscriberName="João Silva"
                  planName="Plano Premium"
                  config={config}
                />
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Clique em "Visualizar" para ver como a notificação aparecerá.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
