export default function LayoutAuth({ title, children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div class="absolute top-0 w-full h-full bg-gray-900"></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-2xl font-bold">{title}</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
