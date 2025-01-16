export const HeaderMetrics = () => {
  return (
    <div className="hidden lg:flex items-center gap-6 px-4">
      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Wildlife Protected Today:</span>
          <span className="font-semibold ml-1">452</span>
        </div>
        <div>
          <span className="text-muted-foreground">Alerts Resolved:</span>
          <span className="font-semibold ml-1">125</span>
        </div>
      </div>
    </div>
  );
};