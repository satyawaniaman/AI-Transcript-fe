import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Video from "next-video";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Product Demo Video
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <Video
            src="https://stream.mux.com/SavitEXe1398bxRG4ei8WvSGdgy02T47d2ENhHbBYjFY.m3u8"
            poster="https://image.mux.com/SavitEXe1398bxRG4ei8WvSGdgy02T47d2ENhHbBYjFY/thumbnail.webp"
            controls
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
