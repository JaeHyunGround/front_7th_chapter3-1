export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[1000]">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-none">
              Hanghae Company
            </h1>
            <p className="text-[11px] text-gray-500 leading-none mt-0.5">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-800">Demo User</div>
            <div className="text-xs text-gray-500">demo@example.com</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-200 font-semibold text-base">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
