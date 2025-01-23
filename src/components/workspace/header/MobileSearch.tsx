import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HeaderSearch } from "./HeaderSearch";

interface MobileSearchProps {
  open: boolean;
  onClose: () => void;
}

export const MobileSearch = ({ open, onClose }: MobileSearchProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <HeaderSearch />
      </DialogContent>
    </Dialog>
  );
};