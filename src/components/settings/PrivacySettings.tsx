import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    shareAnalytics: true,
    shareUsageData: false,
    marketingConsent: true,
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your data sharing preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Share Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help us improve by sharing usage analytics
              </p>
            </div>
            <Switch
              checked={settings.shareAnalytics}
              onCheckedChange={() => handleSettingChange('shareAnalytics')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new features and promotions
              </p>
            </div>
            <Switch
              checked={settings.marketingConsent}
              onCheckedChange={() => handleSettingChange('marketingConsent')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};