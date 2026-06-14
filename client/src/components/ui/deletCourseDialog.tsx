import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/Button";
import { Trash } from "lucide-react";
import type { CourseType } from "../StudentView";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCourse: CourseType | null;
  onDelete: () => void;
};

export default function DeleteCourseDialog({
  open,
  setOpen,
  selectedCourse,
  onDelete,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <Trash className="text-red-600" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                Delete Course
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Course Info */}
        {selectedCourse && (
          <div className="mt-4 p-4 border rounded-xl bg-gray-50">
            <p className="font-semibold">
              {selectedCourse.course_title}
            </p>

            <p className="text-sm text-gray-500">
              Course ID: {selectedCourse.course_id}
            </p>
          </div>
        )}

        {/* Buttons */}
        <DialogFooter className="flex gap-3 mt-6">
          <Button
            onClick={() => setOpen(false)}
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            Cancel
          </Button>

          <Button
            onClick={onDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}