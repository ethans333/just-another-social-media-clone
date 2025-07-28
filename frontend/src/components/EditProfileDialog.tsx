import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserData } from "@/types/models";
import { Edit } from "lucide-react";
import api from "@/lib/api";

export default function EditProfileDialog({ user }: { user: UserData }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    api
      .patch(`/users/${user.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer flex items-center">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-3">
              <Label>Bio</Label>
              <Input name="bio" defaultValue={user.bio!} />
            </div>
            <div className="grid gap-3">
              <Label>Location</Label>
              <Input name="location" defaultValue={user.location!} />
            </div>
            <div className="grid gap-3">
              <Label>Image File</Label>
              <Input name="profile_picture" type="file" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
