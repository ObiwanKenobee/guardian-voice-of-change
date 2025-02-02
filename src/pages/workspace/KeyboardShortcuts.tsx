import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard } from "lucide-react";

const KeyboardShortcuts = () => {
  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { keys: ["⌘", "K"], description: "Open command palette" },
        { keys: ["⌘", "H"], description: "Go to home" },
        { keys: ["⌘", "B"], description: "Toggle sidebar" },
      ]
    },
    {
      category: "Actions",
      items: [
        { keys: ["⌘", "S"], description: "Save changes" },
        { keys: ["⌘", "N"], description: "Create new item" },
        { keys: ["⌘", "⌫"], description: "Delete selected" },
      ]
    },
    {
      category: "Views",
      items: [
        { keys: ["⌘", "1"], description: "Switch to list view" },
        { keys: ["⌘", "2"], description: "Switch to grid view" },
        { keys: ["⌘", "3"], description: "Switch to map view" },
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Keyboard className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Keyboard Shortcuts</h1>
      </div>

      <div className="space-y-6">
        {shortcuts.map((section) => (
          <Card key={section.category}>
            <CardHeader>
              <CardTitle>{section.category}</CardTitle>
              <CardDescription>Shortcuts for {section.category.toLowerCase()} actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeyboardShortcuts;