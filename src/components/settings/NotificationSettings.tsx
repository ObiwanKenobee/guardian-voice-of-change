import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,
    taskReminders: true,
    securityAlerts: true,
    smsAlerts: false,
    criticalUpdates: true,
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      toast({
        title: "Settings updated",
        description: `${setting} has been ${newSettings[setting] ? 'enabled' : 'disabled'}.`
      });
      return newSettings;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              checked={settings.emailAlerts}
              onCheckedChange={() => handleSettingChange('emailAlerts')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">SMS Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get critical updates via SMS
              </p>
            </div>
            <Switch
              checked={settings.smsAlerts}
              onCheckedChange={() => handleSettingChange('smsAlerts')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of activities
              </p>
            </div>
            <Switch
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleSettingChange('weeklyDigest')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};