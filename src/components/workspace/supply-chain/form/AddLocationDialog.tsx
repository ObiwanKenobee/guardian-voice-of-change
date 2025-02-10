
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin } from "lucide-react";

interface AddLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddLocationDialog = ({ open, onOpenChange }: AddLocationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    facilityType: 'warehouse',
    latitude: '',
    longitude: '',
    capacity: '',
    inventoryLevel: '',
    transportationMode: 'sea'
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      const { error } = await supabase.from('supply_chain_nodes').insert({
        name: formData.name,
        location_type: formData.facilityType,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        capacity: parseInt(formData.capacity),
        inventory_level: parseInt(formData.inventoryLevel),
        user_id: user.id,
        status: 'active',
        metadata: {
          facilityType: formData.facilityType,
          transportationMode: formData.transportationMode
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Location added successfully",
      });
      onOpenChange(false);
      setFormData({
        name: '',
        facilityType: 'warehouse',
        latitude: '',
        longitude: '',
        capacity: '',
        inventoryLevel: '',
        transportationMode: 'sea'
      });
    } catch (error) {
      console.error('Error adding location:', error);
      toast({
        title: "Error",
        description: "Failed to add location",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Add a new location to your supply chain network.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter location name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Facility Type</Label>
            <Select
              value={formData.facilityType}
              onValueChange={(value) => setFormData({ ...formData, facilityType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select facility type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="distribution">Distribution Center</SelectItem>
                <SelectItem value="manufacturing">Manufacturing Plant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="Enter latitude"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="Enter longitude"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Total capacity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inventoryLevel">Current Inventory</Label>
              <Input
                id="inventoryLevel"
                type="number"
                value={formData.inventoryLevel}
                onChange={(e) => setFormData({ ...formData, inventoryLevel: e.target.value })}
                placeholder="Current inventory"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Add Location
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
