import { Upload, Search } from "lucide-react";
import api from "../config/api"
export default function Navbar({
  setInput,
  setParsed,
  setError,
  searchTerm,
  setSearchTerm,
}) {


const handleFileUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".json")) {
    setError("Please upload a valid .json file");
    e.target.value = "";
    return;
  }

  try {
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!data.success) {
      throw new Error(data.error || "Upload failed");
    }

    const formatted = JSON.stringify(
      data.data,
      null,
      2
    );

    setInput(formatted);
    setParsed(data.data);
    setError(null);

  } catch (err) {
    setParsed(null);

    setError(
      err.response?.data?.error ||
      err.message ||
      "Failed to upload file"
    );
  }
};
  return (
    <nav className="h-24 bg-[#121212] border-b border-zinc-800 px-8">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-green-400 text-4xl font-bold">
            {"{}"}
          </span>

          <h1 className="text-white text-4xl font-bold">
            TreeifyJson
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search Node..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                w-72
                bg-[#1f1f1f]
                border border-zinc-700
                rounded-xl
                py-3
                pl-11
                pr-4
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-yellow-400
              "
            />
          </div>

          {/* Upload */}
          <label className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-xl font-medium transition">
         <input
  type="file"
  accept=".json,application/json"
  onChange={handleFileUpload}
  className="hidden"
/>

            <Upload size={16} className="inline mr-2" />
            Upload
          </label>
        </div>
      </div>
    </nav>
  );
}