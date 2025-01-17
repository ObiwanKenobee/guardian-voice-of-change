import { HeaderBranding } from "./header/HeaderBranding";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderNotifications } from "./header/HeaderNotifications";
import { HeaderUserMenu } from "./header/HeaderUserMenu";

export const WorkspaceHeader = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-40">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <HeaderBranding />
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderSearch />
          <HeaderNotifications />
          <HeaderUserMenu />
        </div>
      </div>
    </header>
  );
};