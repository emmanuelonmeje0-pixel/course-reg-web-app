import {
  Home,
  Calendar,
  BookOpen,
  User,
  Bell,
  Settings,
  GraduationCap,
} from "lucide-react";

export default function AdminDrawer() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-24 bg-gradient-to-b from-indigo-950 to-blue-950 flex flex-col items-center py-8">
        <div className="w-14 h-14 rounded-full bg-white/10 mb-12" />

        <nav className="flex flex-col gap-8 text-slate-400">
          <Home size={24} />
          <Calendar size={24} />
          <BookOpen size={24} />
          <User size={24} />
          <Bell size={24} />
          <Settings size={24} />
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <GraduationCap className="text-blue-600" size={40} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              John Doe
            </h1>
            <p className="text-slate-500 text-lg">Student</p>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm">First Name</p>
              <h3 className="text-2xl font-semibold">John</h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Last Name</p>
              <h3 className="text-2xl font-semibold">Doe</h3>
            </div>
          </div>
        </div>

        {/* GPA Card */}
        <div className="bg-gradient-to-r from-indigo-950 to-blue-700 rounded-3xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-200 mb-2">
                Academic Overview
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                Current GPA
              </h2>

              <div className="text-8xl font-bold">0.00</div>

              <div className="h-2 bg-white/20 rounded-full mt-6">
                <div className="w-0 h-2 bg-white rounded-full"></div>
              </div>

              <div className="mt-6 bg-black/20 rounded-xl p-4">
                Keep going! Your academic journey is just beginning.
              </div>
            </div>

            <GraduationCap
              size={180}
              className="text-white/20 hidden lg:block"
            />
          </div>
        </div>

        {/* Registration Status */}
        <div className="bg-white rounded-3xl p-6 mt-8 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-2xl text-slate-800">
              Not Registered Yet
            </h3>

            <p className="text-slate-500 mt-2">
              You are yet to register for your courses.
            </p>
          </div>

          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Browse Courses
          </button>
        </div>
      </main>
    </div>
  );
}